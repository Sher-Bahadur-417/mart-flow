import "server-only";

import { redirect } from "next/navigation";

import { requireUser } from "@/lib/auth/dal";
import { requireStoreUser, type StoreUser } from "@/lib/auth/store";
import {
  canAccess,
  type PermissionCode,
} from "@/constants/permissions";
import type { SessionUser } from "@/types/auth";

export function hasPermission(user: SessionUser, permission: PermissionCode) {
  return canAccess(user.roleCode, user.permissions, permission);
}

export async function requirePermission(permission: PermissionCode) {
  const user = await requireUser();
  if (!hasPermission(user, permission)) {
    redirect("/access-denied");
  }
  return user;
}

export async function requireStorePermission(
  permission: PermissionCode,
): Promise<StoreUser> {
  const user = await requireStoreUser();
  if (!hasPermission(user, permission)) {
    redirect("/access-denied");
  }
  return user;
}
