"use server";

import { FieldValue } from "firebase-admin/firestore";
import { redirect } from "next/navigation";

import { ROLE_CODES, ROLE_PERMISSIONS } from "@/constants/permissions";
import { writeAuditLog, getRequestContext } from "@/lib/auth/audit";
import { ensureRolesAndPermissions, ROLE_META } from "@/lib/auth/bootstrap";
import { consumeLoginAttempt } from "@/lib/auth/rate-limit";
import { isNextRedirect, publicAuthError } from "@/lib/auth/safe-error";
import { createSession } from "@/lib/auth/session";
import { collections, newId } from "@/lib/data/fs";
import { findStoreBySlug, findUserByEmail, findUserByUsername } from "@/lib/data/queries";
import { adminAuth, firestore } from "@/lib/firebase-admin";
import { mapAdminAuthError } from "@/lib/firebase/rest-auth";
import { nextDocumentNumber } from "@/lib/utils/document-number";
import { slugify } from "@/lib/utils/money";
import { SignupSchema, type LoginFormState } from "@/lib/validation/auth";

async function uniqueStoreSlug(name: string) {
  const base = slugify(name) || "store";
  for (let index = 0; index < 30; index += 1) {
    const slug = index === 0 ? base : `${base}-${index + 1}`;
    const exists = await findStoreBySlug(slug);
    if (!exists) {
      return slug;
    }
  }
  return `${base}-${Date.now().toString(36)}`;
}

async function rollbackSignup(uid?: string, storeId?: string) {
  if (uid) {
    await adminAuth.deleteUser(uid).catch((error) => {
      console.error("Failed to delete Firebase Auth user during signup rollback", error);
    });
    const employeeSnap = await firestore
      .collection(collections.employees)
      .where("userId", "==", uid)
      .get();
    const batch = firestore.batch();
    employeeSnap.docs.forEach((doc) => batch.delete(doc.ref));
    batch.delete(firestore.collection(collections.users).doc(uid));
    await batch.commit().catch((error) => {
      console.error("Failed to delete Firestore user during signup rollback", error);
    });
  }
  if (storeId) {
    const names = [
      collections.settings,
      collections.units,
      collections.expenseCategories,
      collections.counters,
      collections.employees,
    ] as const;
    const batch = firestore.batch();
    for (const name of names) {
      const snap = await firestore.collection(name).where("storeId", "==", storeId).get();
      snap.docs.forEach((doc) => batch.delete(doc.ref));
    }
    batch.delete(firestore.collection(collections.stores).doc(storeId));
    await batch.commit().catch((error) => {
      console.error("Failed to delete store during signup rollback", error);
    });
  }
}

export async function signup(
  _prevState: LoginFormState | undefined,
  formData: FormData,
): Promise<LoginFormState> {
  let storeId: string | undefined;
  let userId: string | undefined;

  try {
    const parsed = SignupSchema.safeParse({
      storeName: formData.get("storeName"),
      name: formData.get("name"),
      email: formData.get("email"),
      username: formData.get("username"),
      phone: formData.get("phone"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    });

    if (!parsed.success) {
      return {
        error: parsed.error.issues[0]?.message ?? "Enter valid signup details.",
      };
    }

    const { ipAddress } = await getRequestContext();
    const allowed = consumeLoginAttempt(`${ipAddress}:signup:${parsed.data.email}`);
    if (!allowed) {
      return { error: "Too many signup attempts. Try again in 15 minutes." };
    }

    const email = parsed.data.email.toLowerCase().trim();
    const username = parsed.data.username.toLowerCase().trim();
    if (await findUserByEmail(email)) {
      return { error: "That email is already in use." };
    }
    if (await findUserByUsername(username)) {
      return { error: "That username is already in use." };
    }

    const { ownerRole } = await ensureRolesAndPermissions();
    const ownerPermissions = [...ROLE_PERMISSIONS[ROLE_CODES.OWNER]];
    const phone = parsed.data.phone?.trim() || null;

    let authUser;
    try {
      authUser = await adminAuth.createUser({
        email,
        password: parsed.data.password,
        displayName: parsed.data.name,
        disabled: false,
      });
    } catch (error) {
      return { error: mapAdminAuthError(error) ?? publicAuthError(error) };
    }
    userId = authUser.uid;

    const storeRef = firestore.collection(collections.stores).doc();
    storeId = storeRef.id;
    const slug = await uniqueStoreSlug(parsed.data.storeName);
    const now = FieldValue.serverTimestamp();
    const employeeId = newId(collections.employees);
    const employeeCode = await nextDocumentNumber(storeId, "employee", "EMP");

    const batch = firestore.batch();
    batch.set(storeRef, {
      id: storeId,
      name: parsed.data.storeName,
      slug,
      isActive: true,
      createdAt: now,
      updatedAt: now,
    });
    batch.set(firestore.collection(collections.users).doc(userId), {
      id: userId,
      storeId,
      roleId: ownerRole.id,
      roleCode: ROLE_CODES.OWNER,
      roleName: ROLE_META.OWNER.name,
      name: parsed.data.name,
      email,
      username,
      phone,
      permissions: ownerPermissions,
      isActive: true,
      lastLoginAt: now,
      createdAt: now,
      updatedAt: now,
    });
    batch.set(firestore.collection(collections.employees).doc(employeeId), {
      id: employeeId,
      storeId,
      userId,
      employeeCode,
      phone,
      jobTitle: "Owner",
      hireDate: now,
      salary: null,
      isActive: true,
      createdAt: now,
      updatedAt: now,
    });
    for (const code of ownerPermissions) {
      batch.set(firestore.collection("userPermissions").doc(`${userId}_${code}`), {
        userId,
        permissionId: code,
        permissionCode: code,
      });
    }
    batch.set(firestore.collection(collections.settings).doc(`${storeId}_receipt_footer`), {
      id: `${storeId}_receipt_footer`,
      storeId,
      key: "receipt_footer",
      value: `Thank you for shopping at ${parsed.data.storeName}.`,
    });
    for (const unit of [
      { name: "Piece", abbreviation: "pcs" },
      { name: "Kilogram", abbreviation: "kg" },
      { name: "Litre", abbreviation: "L" },
    ]) {
      const unitId = newId(collections.units);
      batch.set(firestore.collection(collections.units).doc(unitId), {
        id: unitId,
        storeId,
        ...unit,
      });
    }
    for (const name of ["Rent", "Utilities", "Transport"]) {
      const categoryId = newId(collections.expenseCategories);
      batch.set(firestore.collection(collections.expenseCategories).doc(categoryId), {
        id: categoryId,
        storeId,
        name,
      });
    }

    try {
      await batch.commit();
    } catch (error) {
      await rollbackSignup(userId, storeId);
      throw error;
    }

    await createSession(userId);
    await writeAuditLog({
      action: "SIGNUP",
      entity: "User",
      entityId: userId,
      userId,
      storeId,
      metadata: { email, username },
    });
  } catch (error) {
    if (isNextRedirect(error)) {
      throw error;
    }
    console.error("Signup failed", error);
    await rollbackSignup(userId, storeId).catch((rollbackError) => {
      console.error("Signup rollback failed", rollbackError);
    });
    return { error: publicAuthError(error) };
  }

  redirect("/dashboard");
}
