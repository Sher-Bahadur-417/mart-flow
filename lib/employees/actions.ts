"use server";

import { FieldValue } from "firebase-admin/firestore";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { ROLE_CODES, type RoleCode } from "@/constants/permissions";
import { writeAuditLog } from "@/lib/auth/audit";
import { getRoleDoc, listRoleDocs } from "@/lib/auth/bootstrap";
import type { StoreUser } from "@/lib/auth/store";
import { collections, newId } from "@/lib/data/fs";
import {
  findUserByEmail,
  findUserByUsername,
  getCounterValue,
  getEmployeeByUserId,
  getUser,
  listEmployeesByStore,
  listUsersByStore,
} from "@/lib/data/queries";
import { adminAuth, firestore } from "@/lib/firebase-admin";
import { mapAdminAuthError } from "@/lib/firebase/rest-auth";
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

function formError(error: unknown): EmployeeFormState {
  const mapped = mapAdminAuthError(error);
  if (mapped) {
    return { error: mapped };
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

async function uniqueUsername(base: string, excludeUserId?: string) {
  const parsed = USERNAME_SCHEMA.safeParse(base);
  let candidate = parsed.success ? parsed.data : normalizeUsername(base);
  if (candidate.length < 3) {
    candidate = `emp${candidate}`.padEnd(3, "0");
  }

  for (let index = 0; index < 30; index += 1) {
    const username = index === 0 ? candidate : `${candidate}${index + 1}`;
    const exists = await findUserByUsername(username);
    if (!exists || exists.id === excludeUserId) {
      return username;
    }
  }

  return `${candidate}${Date.now().toString(36)}`.slice(0, 32);
}

async function allocateEmployeeCode(storeId: string, requested?: string) {
  const employees = await listEmployeesByStore(storeId);
  if (requested) {
    if (employees.some((row) => row.employeeCode === requested)) {
      throw new Error("That Employee ID is already in use.");
    }
    return requested;
  }

  for (let attempt = 0; attempt < 20; attempt += 1) {
    const code = await nextDocumentNumber(storeId, "employee", "EMP");
    const latest = await listEmployeesByStore(storeId);
    if (!latest.some((row) => row.employeeCode === code)) {
      return code;
    }
  }

  throw new Error("Could not allocate a unique Employee ID.");
}

async function replaceUserPermissions(userId: string, codes: string[]) {
  const existing = await firestore
    .collection("userPermissions")
    .where("userId", "==", userId)
    .get();
  const batch = firestore.batch();
  existing.docs.forEach((doc) => batch.delete(doc.ref));
  for (const code of codes) {
    batch.set(firestore.collection("userPermissions").doc(`${userId}_${code}`), {
      userId,
      permissionId: code,
      permissionCode: code,
    });
  }
  await batch.commit();
}

async function countOtherActiveOwners(storeId: string, excludeUserId: string) {
  const users = await listUsersByStore(storeId);
  return users.filter(
    (row) =>
      row.id !== excludeUserId &&
      row.isActive &&
      row.roleCode === ROLE_CODES.OWNER,
  ).length;
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

async function rollbackAuthUser(uid: string) {
  await adminAuth.deleteUser(uid).catch((error) => {
    console.error("Failed to delete Firebase Auth user after employee create error", error);
  });
}

export async function suggestEmployeeCode() {
  const actor = await requireStorePermission("users");
  const value = await getCounterValue(actor.storeId, "employee");
  return `EMP-${String(value + 1).padStart(6, "0")}`;
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

  const role = getRoleDoc(parsed.data.roleCode);
  if (!role) {
    return { error: "Role not found." };
  }

  const permissions = resolvePermissions(
    actor,
    parsed.data.roleCode,
    parsed.data.permissions,
  );
  const phone = parsed.data.phone?.trim() || null;
  const jobTitle = parsed.data.jobTitle?.trim() || null;
  const isActive = parsed.data.isActive ?? true;
  const email = parsed.data.email;

  let userId: string | undefined;
  try {
    if (await findUserByEmail(email)) {
      throw new Error("That email is already in use.");
    }
    const nextUsername =
      username || (await uniqueUsername(email.split("@")[0] ?? "employee"));
    if (username && (await findUserByUsername(nextUsername))) {
      throw new Error("That username is already in use.");
    }

    const authUser = await adminAuth.createUser({
      email,
      password: raw.password,
      displayName: parsed.data.name,
      disabled: !isActive,
    });
    userId = authUser.uid;

    const code = await allocateEmployeeCode(actor.storeId, employeeCode);
    const employeeId = newId(collections.employees);
    const now = FieldValue.serverTimestamp();
    const batch = firestore.batch();
    batch.set(firestore.collection(collections.users).doc(userId), {
      id: userId,
      storeId: actor.storeId,
      roleId: role.id,
      roleCode: role.code,
      roleName: role.name,
      name: parsed.data.name,
      email,
      username: nextUsername,
      phone,
      permissions,
      isActive,
      lastLoginAt: null,
      createdAt: now,
      updatedAt: now,
    });
    batch.set(firestore.collection(collections.employees).doc(employeeId), {
      id: employeeId,
      storeId: actor.storeId,
      userId,
      employeeCode: code,
      phone,
      jobTitle,
      hireDate: now,
      salary: parsed.data.salary ? toMoney(parsed.data.salary).toString() : null,
      isActive,
      createdAt: now,
      updatedAt: now,
    });
    for (const permission of permissions) {
      batch.set(firestore.collection("userPermissions").doc(`${userId}_${permission}`), {
        userId,
        permissionId: permission,
        permissionCode: permission,
      });
    }
    await batch.commit();

    await writeAuditLog({
      action: "EMPLOYEE_CREATE",
      entity: "User",
      entityId: userId,
      userId: actor.id,
      storeId: actor.storeId,
      metadata: {
        email,
        username: nextUsername,
        employeeCode: code,
        roleCode: parsed.data.roleCode,
        permissions,
      },
    });
  } catch (error) {
    if (userId) {
      await rollbackAuthUser(userId);
    }
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

  const target = await getUser(userId);
  if (!target || target.storeId !== actor.storeId) {
    return { error: "Employee not found." };
  }
  if (!canManageTarget(actor.roleCode, target.roleCode)) {
    return { error: "You cannot edit this account." };
  }

  const employee = await getEmployeeByUserId(userId);
  const nextActive = parsed.data.isActive ?? target.isActive;
  if (actor.id === userId && !nextActive) {
    return { error: "You cannot deactivate your own account." };
  }

  const role = getRoleDoc(parsed.data.roleCode);
  if (!role) {
    return { error: "Role not found." };
  }

  const permissions = resolvePermissions(
    actor,
    parsed.data.roleCode,
    parsed.data.permissions,
  );
  const previousPermissions = target.permissions;
  const phone = parsed.data.phone?.trim() || null;
  const jobTitle = parsed.data.jobTitle?.trim() || null;

  try {
    const otherActiveOwnerCount = await countOtherActiveOwners(actor.storeId, userId);
    if (
      wouldRemoveLastOwner({
        targetRoleCode: target.roleCode,
        targetIsActive: target.isActive,
        nextRoleCode: parsed.data.roleCode,
        nextIsActive: nextActive,
        otherActiveOwnerCount,
      })
    ) {
      throw new Error("The store must keep at least one active Owner.");
    }

    const nextUsername =
      username ?? (await uniqueUsername(parsed.data.email.split("@")[0] ?? "employee", userId));
    if (username) {
      const taken = await findUserByUsername(nextUsername);
      if (taken && taken.id !== userId) {
        throw new Error("That username is already in use.");
      }
    }
    if (parsed.data.email !== target.email) {
      const takenEmail = await findUserByEmail(parsed.data.email);
      if (takenEmail && takenEmail.id !== userId) {
        throw new Error("That email is already in use.");
      }
    }

    const nextCode =
      employeeCode ?? employee?.employeeCode ?? (await allocateEmployeeCode(actor.storeId));
    if (employeeCode && employeeCode !== employee?.employeeCode) {
      const employees = await listEmployeesByStore(actor.storeId);
      if (employees.some((row) => row.employeeCode === employeeCode && row.userId !== userId)) {
        throw new Error("That Employee ID is already in use.");
      }
    }

    await adminAuth.updateUser(userId, {
      email: parsed.data.email,
      displayName: parsed.data.name,
      disabled: !nextActive,
      ...(raw.password ? { password: raw.password } : {}),
    });

    const now = FieldValue.serverTimestamp();
    await firestore.collection(collections.users).doc(userId).set(
      {
        name: parsed.data.name,
        email: parsed.data.email,
        username: nextUsername,
        phone,
        roleId: role.id,
        roleCode: role.code,
        roleName: role.name,
        permissions,
        isActive: nextActive,
        updatedAt: now,
      },
      { merge: true },
    );

    if (employee) {
      await firestore.collection(collections.employees).doc(employee.id).set(
        {
          employeeCode: nextCode,
          phone,
          jobTitle,
          salary: parsed.data.salary ? toMoney(parsed.data.salary).toString() : null,
          isActive: nextActive,
          updatedAt: now,
        },
        { merge: true },
      );
    } else {
      const employeeId = newId(collections.employees);
      await firestore.collection(collections.employees).doc(employeeId).set({
        id: employeeId,
        storeId: actor.storeId,
        userId,
        employeeCode: nextCode,
        phone,
        jobTitle,
        hireDate: now,
        salary: parsed.data.salary ? toMoney(parsed.data.salary).toString() : null,
        isActive: nextActive,
        createdAt: now,
        updatedAt: now,
      });
    }

    await replaceUserPermissions(userId, permissions);
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
      employeeCode: employeeCode ?? employee?.employeeCode,
      roleCode: parsed.data.roleCode,
      isActive: nextActive,
      permissions,
    },
  });

  if (target.roleCode !== parsed.data.roleCode) {
    await writeAuditLog({
      action: "EMPLOYEE_ROLE_CHANGE",
      entity: "User",
      entityId: userId,
      userId: actor.id,
      storeId: actor.storeId,
      metadata: { from: target.roleCode, to: parsed.data.roleCode },
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

  const target = await getUser(userId);
  if (!target || target.storeId !== actor.storeId) {
    throw new Error("Employee not found.");
  }
  if (!canManageTarget(actor.roleCode, target.roleCode)) {
    throw new Error("You cannot change this account.");
  }

  if (
    wouldRemoveLastOwner({
      targetRoleCode: target.roleCode,
      targetIsActive: target.isActive,
      nextIsActive: nextActive,
      otherActiveOwnerCount: await countOtherActiveOwners(actor.storeId, userId),
    })
  ) {
    throw new Error("The store must keep at least one active Owner.");
  }

  const employee = await getEmployeeByUserId(userId);
  const now = FieldValue.serverTimestamp();
  await adminAuth.updateUser(userId, { disabled: !nextActive });
  await firestore.collection(collections.users).doc(userId).set(
    { isActive: nextActive, updatedAt: now },
    { merge: true },
  );
  if (employee) {
    await firestore.collection(collections.employees).doc(employee.id).set(
      { isActive: nextActive, updatedAt: now },
      { merge: true },
    );
  }

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
  const target = await getUser(userId);
  if (!target || target.storeId !== actor.storeId) {
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

  const target = await getUser(userId);
  if (!target || target.storeId !== actor.storeId) {
    return { error: "Employee not found." };
  }
  if (!canManageTarget(actor.roleCode, target.roleCode)) {
    return { error: "You cannot reset this password." };
  }

  try {
    await adminAuth.updateUser(userId, { password: parsed.data.password });
  } catch (error) {
    return formError(error);
  }

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
  const codes = new Set(assignableRoles(actorRole));
  return listRoleDocs(true).filter((role) => codes.has(role.code as RoleCode));
}
