"use server";

import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { ROLE_CODES } from "@/constants/permissions";
import { writeAuditLog } from "@/lib/auth/audit";
import { hashPassword } from "@/lib/auth/password";
import { prisma } from "@/lib/db";
import {
  assignableRoles,
  canAssignRole,
  canManageTarget,
  defaultPermissionsForRole,
  normalizeEmployeeCode,
  normalizeUsername,
  sanitizeGrantedPermissions,
  wouldRemoveLastOwner,
} from "@/lib/employees/rules";
import { requireStorePermission } from "@/lib/permissions";
import { nextDocumentNumber } from "@/lib/utils/document-number";
import { toMoney } from "@/lib/utils/money";
import {
  EMPLOYEE_CODE_SCHEMA,
  USERNAME_SCHEMA,
  employeeInputSchema,
  resetPasswordSchema,
  type EmployeeFormState,
} from "@/lib/validation/employees";
import type { StoreUser } from "@/lib/auth/store";

function uniqueFieldError(error: unknown) {
  if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
    const target = error.meta?.target;
    const fields = Array.isArray(target) ? target.join(" ") : String(target ?? "");
    if (fields.includes("email")) {
      return "That email is already in use.";
    }
    if (fields.includes("username")) {
      return "That username is already in use.";
    }
    if (fields.includes("employeeCode")) {
      return "That Employee ID is already in use.";
    }
    return "A unique field is already in use.";
  }
  return null;
}

function formError(error: unknown): EmployeeFormState {
  const unique = uniqueFieldError(error);
  if (unique) {
    return { error: unique };
  }
  if (error instanceof Error) {
    return { error: error.message };
  }
  return { error: "Something went wrong." };
}

function readEmployeeForm(formData: FormData) {
  return {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? "").trim().toLowerCase(),
    username: String(formData.get("username") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    jobTitle: String(formData.get("jobTitle") ?? ""),
    salary: String(formData.get("salary") ?? ""),
    employeeCode: String(formData.get("employeeCode") ?? ""),
    roleCode: String(formData.get("roleCode") ?? ""),
    password: String(formData.get("password") ?? ""),
    isActive:
      formData.get("isActive") === "on" || formData.get("isActive") === "true",
    permissions: formData.getAll("permissions").map(String),
  };
}

async function uniqueUsername(
  tx: Prisma.TransactionClient,
  base: string,
  excludeUserId?: string,
) {
  const parsed = USERNAME_SCHEMA.safeParse(base);
  let candidate = parsed.success ? parsed.data : normalizeUsername(base);
  if (candidate.length < 3) {
    candidate = `emp${candidate}`.padEnd(3, "0");
  }

  for (let index = 0; index < 30; index += 1) {
    const username = index === 0 ? candidate : `${candidate}${index + 1}`;
    const exists = await tx.user.findFirst({
      where: {
        username,
        ...(excludeUserId ? { id: { not: excludeUserId } } : {}),
      },
      select: { id: true },
    });
    if (!exists) {
      return username;
    }
  }

  return `${candidate}${Date.now().toString(36)}`.slice(0, 32);
}

async function allocateEmployeeCode(
  tx: Prisma.TransactionClient,
  storeId: string,
  requested?: string,
) {
  if (requested) {
    const exists = await tx.employee.findUnique({
      where: { storeId_employeeCode: { storeId, employeeCode: requested } },
      select: { id: true },
    });
    if (exists) {
      throw new Error("That Employee ID is already in use.");
    }
    return requested;
  }

  for (let attempt = 0; attempt < 20; attempt += 1) {
    const code = await nextDocumentNumber(tx, storeId, "employee", "EMP");
    const exists = await tx.employee.findUnique({
      where: { storeId_employeeCode: { storeId, employeeCode: code } },
      select: { id: true },
    });
    if (!exists) {
      return code;
    }
  }

  throw new Error("Could not allocate a unique Employee ID.");
}

async function replaceUserPermissions(
  tx: Prisma.TransactionClient,
  userId: string,
  codes: string[],
) {
  const permissions = codes.length
    ? await tx.permission.findMany({ where: { code: { in: codes } } })
    : [];
  await tx.userPermission.deleteMany({ where: { userId } });
  if (permissions.length > 0) {
    await tx.userPermission.createMany({
      data: permissions.map((permission) => ({
        userId,
        permissionId: permission.id,
      })),
    });
  }
}

async function countOtherActiveOwners(
  tx: Prisma.TransactionClient,
  storeId: string,
  excludeUserId: string,
) {
  return tx.user.count({
    where: {
      storeId,
      isActive: true,
      id: { not: excludeUserId },
      role: { code: ROLE_CODES.OWNER },
    },
  });
}

function resolvePermissions(
  actor: StoreUser,
  roleCode: string,
  requested: string[],
) {
  const granted = sanitizeGrantedPermissions(
    actor.roleCode,
    actor.permissions,
    requested,
  );
  if (granted.length > 0) {
    return granted;
  }
  return sanitizeGrantedPermissions(
    actor.roleCode,
    actor.permissions,
    defaultPermissionsForRole(roleCode),
  );
}

function parseOptionalUsername(raw: string) {
  const value = raw.trim();
  if (!value) {
    return undefined;
  }
  const parsed = USERNAME_SCHEMA.safeParse(value);
  if (!parsed.success) {
    throw new Error(parsed.error.issues[0]?.message ?? "Invalid username.");
  }
  return parsed.data;
}

function parseOptionalEmployeeCode(raw: string) {
  const value = raw.trim();
  if (!value) {
    return undefined;
  }
  const parsed = EMPLOYEE_CODE_SCHEMA.safeParse(value);
  if (!parsed.success) {
    throw new Error(parsed.error.issues[0]?.message ?? "Invalid Employee ID.");
  }
  return normalizeEmployeeCode(parsed.data);
}

export async function suggestEmployeeCode() {
  const actor = await requireStorePermission("users");
  const counter = await prisma.counter.findUnique({
    where: { storeId_key: { storeId: actor.storeId, key: "employee" } },
  });
  return `EMP-${String((counter?.value ?? 0) + 1).padStart(6, "0")}`;
}

export async function createEmployee(
  _prevState: EmployeeFormState | undefined,
  formData: FormData,
): Promise<EmployeeFormState> {
  const actor = await requireStorePermission("users");
  const raw = readEmployeeForm(formData);
  const parsed = employeeInputSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid employee details." };
  }
  if ((raw.password?.length ?? 0) < 8) {
    return { error: "Password must be at least 8 characters." };
  }
  if (!canAssignRole(actor.roleCode, parsed.data.roleCode)) {
    return { error: "You cannot assign that role." };
  }

  let username: string;
  let employeeCode: string | undefined;
  try {
    username = parseOptionalUsername(raw.username) ?? "";
    employeeCode = parseOptionalEmployeeCode(raw.employeeCode);
  } catch (error) {
    return formError(error);
  }

  const role = await prisma.role.findUnique({
    where: { code: parsed.data.roleCode },
  });
  if (!role) {
    return { error: "Role not found." };
  }

  const permissions = resolvePermissions(
    actor,
    parsed.data.roleCode,
    parsed.data.permissions,
  );
  const passwordHash = await hashPassword(raw.password);
  const phone = parsed.data.phone?.trim() || null;
  const jobTitle = parsed.data.jobTitle?.trim() || null;

  try {
    const created = await prisma.$transaction(async (tx) => {
      const nextUsername =
        username ||
        (await uniqueUsername(tx, parsed.data.email.split("@")[0] ?? "employee"));
      if (username) {
        const taken = await tx.user.findUnique({
          where: { username: nextUsername },
          select: { id: true },
        });
        if (taken) {
          throw new Error("That username is already in use.");
        }
      }

      const user = await tx.user.create({
        data: {
          name: parsed.data.name,
          email: parsed.data.email,
          username: nextUsername,
          passwordHash,
          roleId: role.id,
          storeId: actor.storeId,
          isActive: parsed.data.isActive ?? true,
        },
      });

      const code = await allocateEmployeeCode(tx, actor.storeId, employeeCode);
      await tx.employee.create({
        data: {
          storeId: actor.storeId,
          userId: user.id,
          employeeCode: code,
          phone,
          jobTitle,
          hireDate: new Date(),
          salary: parsed.data.salary ? toMoney(parsed.data.salary) : null,
          isActive: parsed.data.isActive ?? true,
        },
      });
      await replaceUserPermissions(tx, user.id, permissions);
      return { user, employeeCode: code, username: nextUsername };
    });

    await writeAuditLog({
      action: "EMPLOYEE_CREATE",
      entity: "User",
      entityId: created.user.id,
      userId: actor.id,
      storeId: actor.storeId,
      metadata: {
        email: parsed.data.email,
        username: created.username,
        employeeCode: created.employeeCode,
        roleCode: parsed.data.roleCode,
        permissions,
      },
    });
  } catch (error) {
    return formError(error);
  }

  revalidatePath("/employees");
  redirect("/employees");
}

export async function updateEmployee(
  userId: string,
  _prevState: EmployeeFormState | undefined,
  formData: FormData,
): Promise<EmployeeFormState> {
  const actor = await requireStorePermission("users");
  const raw = readEmployeeForm(formData);
  const parsed = employeeInputSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid employee details." };
  }
  if (raw.password && raw.password.length < 8) {
    return { error: "Password must be at least 8 characters." };
  }
  if (!canAssignRole(actor.roleCode, parsed.data.roleCode)) {
    return { error: "You cannot assign that role." };
  }

  let username: string | undefined;
  let employeeCode: string | undefined;
  try {
    username = parseOptionalUsername(raw.username);
    employeeCode = parseOptionalEmployeeCode(raw.employeeCode);
  } catch (error) {
    return formError(error);
  }

  const target = await prisma.user.findFirst({
    where: { id: userId, storeId: actor.storeId },
    include: {
      role: true,
      employee: true,
      grants: { include: { permission: true } },
    },
  });
  if (!target) {
    return { error: "Employee not found." };
  }
  if (!canManageTarget(actor.roleCode, target.role.code)) {
    return { error: "You cannot edit this account." };
  }

  const nextActive = parsed.data.isActive ?? target.isActive;
  if (actor.id === userId && !nextActive) {
    return { error: "You cannot deactivate your own account." };
  }

  const role = await prisma.role.findUnique({
    where: { code: parsed.data.roleCode },
  });
  if (!role) {
    return { error: "Role not found." };
  }

  const permissions = resolvePermissions(
    actor,
    parsed.data.roleCode,
    parsed.data.permissions,
  );
  const previousPermissions = target.grants.map((grant) => grant.permission.code);
  const phone = parsed.data.phone?.trim() || null;
  const jobTitle = parsed.data.jobTitle?.trim() || null;
  const nextPasswordHash = raw.password ? await hashPassword(raw.password) : undefined;

  try {
    await prisma.$transaction(async (tx) => {
      const otherActiveOwnerCount = await countOtherActiveOwners(
        tx,
        actor.storeId,
        userId,
      );
      if (
        wouldRemoveLastOwner({
          targetRoleCode: target.role.code,
          targetIsActive: target.isActive,
          nextRoleCode: parsed.data.roleCode,
          nextIsActive: nextActive,
          otherActiveOwnerCount,
        })
      ) {
        throw new Error("The store must keep at least one active Owner.");
      }

      const nextUsername =
        username ??
        (await uniqueUsername(tx, parsed.data.email.split("@")[0] ?? "employee", userId));
      if (username) {
        const taken = await tx.user.findFirst({
          where: { username: nextUsername, id: { not: userId } },
          select: { id: true },
        });
        if (taken) {
          throw new Error("That username is already in use.");
        }
      }

      await tx.user.update({
        where: { id: userId },
        data: {
          name: parsed.data.name,
          email: parsed.data.email,
          username: nextUsername,
          roleId: role.id,
          isActive: nextActive,
          ...(nextPasswordHash ? { passwordHash: nextPasswordHash } : {}),
        },
      });

      const nextCode =
        employeeCode ??
        target.employee?.employeeCode ??
        (await allocateEmployeeCode(tx, actor.storeId));

      if (employeeCode && employeeCode !== target.employee?.employeeCode) {
        const taken = await tx.employee.findUnique({
          where: {
            storeId_employeeCode: { storeId: actor.storeId, employeeCode },
          },
          select: { id: true },
        });
        if (taken) {
          throw new Error("That Employee ID is already in use.");
        }
      }

      if (target.employee) {
        await tx.employee.update({
          where: { userId },
          data: {
            employeeCode: nextCode,
            phone,
            jobTitle,
            salary: parsed.data.salary ? toMoney(parsed.data.salary) : null,
            isActive: nextActive,
          },
        });
      } else {
        await tx.employee.create({
          data: {
            storeId: actor.storeId,
            userId,
            employeeCode: nextCode,
            phone,
            jobTitle,
            hireDate: new Date(),
            salary: parsed.data.salary ? toMoney(parsed.data.salary) : null,
            isActive: nextActive,
          },
        });
      }

      await replaceUserPermissions(tx, userId, permissions);
    });
  } catch (error) {
    return formError(error);
  }

  await writeAuditLog({
    action: "EMPLOYEE_UPDATE",
    entity: "User",
    entityId: userId,
    userId: actor.id,
    storeId: actor.storeId,
    metadata: {
      email: parsed.data.email,
      username: username ?? target.username,
      employeeCode: employeeCode ?? target.employee?.employeeCode,
      roleCode: parsed.data.roleCode,
      isActive: nextActive,
      permissions,
    },
  });

  if (target.role.code !== parsed.data.roleCode) {
    await writeAuditLog({
      action: "EMPLOYEE_ROLE_CHANGE",
      entity: "User",
      entityId: userId,
      userId: actor.id,
      storeId: actor.storeId,
      metadata: { from: target.role.code, to: parsed.data.roleCode },
    });
  }

  const previousSet = [...previousPermissions].sort().join(",");
  const nextSet = [...permissions].sort().join(",");
  if (previousSet !== nextSet) {
    await writeAuditLog({
      action: "EMPLOYEE_PERMISSION_CHANGE",
      entity: "User",
      entityId: userId,
      userId: actor.id,
      storeId: actor.storeId,
      metadata: { from: previousPermissions, to: permissions },
    });
  }

  if (target.isActive !== nextActive) {
    await writeAuditLog({
      action: nextActive ? "EMPLOYEE_ACTIVATE" : "EMPLOYEE_DEACTIVATE",
      entity: "User",
      entityId: userId,
      userId: actor.id,
      storeId: actor.storeId,
    });
  }

  revalidatePath("/employees");
  revalidatePath(`/employees/${userId}`);
  redirect(`/employees/${userId}`);
}

export async function setEmployeeActive(userId: string, nextActive: boolean) {
  const actor = await requireStorePermission("users");
  if (actor.id === userId && !nextActive) {
    throw new Error("You cannot deactivate your own account.");
  }

  const target = await prisma.user.findFirst({
    where: { id: userId, storeId: actor.storeId },
    include: { role: true, employee: true },
  });
  if (!target) {
    throw new Error("Employee not found.");
  }
  if (!canManageTarget(actor.roleCode, target.role.code)) {
    throw new Error("You cannot change this account.");
  }

  await prisma.$transaction(async (tx) => {
    if (
      wouldRemoveLastOwner({
        targetRoleCode: target.role.code,
        targetIsActive: target.isActive,
        nextIsActive: nextActive,
        otherActiveOwnerCount: await countOtherActiveOwners(tx, actor.storeId, userId),
      })
    ) {
      throw new Error("The store must keep at least one active Owner.");
    }

    await tx.user.update({
      where: { id: userId },
      data: { isActive: nextActive },
    });
    if (target.employee) {
      await tx.employee.update({
        where: { userId },
        data: { isActive: nextActive },
      });
    }
  });

  await writeAuditLog({
    action: nextActive ? "EMPLOYEE_ACTIVATE" : "EMPLOYEE_DEACTIVATE",
    entity: "User",
    entityId: userId,
    userId: actor.id,
    storeId: actor.storeId,
  });
  revalidatePath("/employees");
  revalidatePath(`/employees/${userId}`);
}

export async function toggleEmployeeActive(userId: string) {
  const actor = await requireStorePermission("users");
  const target = await prisma.user.findFirst({
    where: { id: userId, storeId: actor.storeId },
    select: { isActive: true },
  });
  if (!target) {
    throw new Error("Employee not found.");
  }
  await setEmployeeActive(userId, !target.isActive);
}

export async function resetEmployeePassword(
  userId: string,
  _prevState: EmployeeFormState | undefined,
  formData: FormData,
): Promise<EmployeeFormState> {
  const actor = await requireStorePermission("users");
  const parsed = resetPasswordSchema.safeParse({
    password: formData.get("password"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Enter a valid password." };
  }

  const target = await prisma.user.findFirst({
    where: { id: userId, storeId: actor.storeId },
    include: { role: true },
  });
  if (!target) {
    return { error: "Employee not found." };
  }
  if (!canManageTarget(actor.roleCode, target.role.code)) {
    return { error: "You cannot reset this password." };
  }

  const passwordHash = await hashPassword(parsed.data.password);
  await prisma.user.update({
    where: { id: userId },
    data: { passwordHash },
  });

  await writeAuditLog({
    action: "EMPLOYEE_PASSWORD_RESET",
    entity: "User",
    entityId: userId,
    userId: actor.id,
    storeId: actor.storeId,
  });
  revalidatePath(`/employees/${userId}`);
  return { success: "Password updated." };
}

export async function listAssignableRoles(actorRole: string) {
  const codes = assignableRoles(actorRole);
  if (codes.length === 0) {
    return [];
  }
  return prisma.role.findMany({
    where: { code: { in: codes } },
    orderBy: { name: "asc" },
  });
}
