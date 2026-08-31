import "server-only";

import { cache } from "react";
import { redirect } from "next/navigation";

import { ROLE_PERMISSIONS, type RoleCode } from "@/constants/permissions";
import { isNextRedirect, publicAuthError } from "@/lib/auth/safe-error";
import { decrypt, getSessionCookie } from "@/lib/auth/session";
import { getStore, getUser } from "@/lib/data/queries";
import type { SessionUser } from "@/types/auth";

export const verifySession = cache(async () => {
  const cookie = await getSessionCookie();
  const session = await decrypt(cookie);

  if (!session?.userId) {
    redirect("/login");
  }

  return { isAuth: true as const, userId: session.userId };
});

export const getCurrentUser = cache(async (): Promise<SessionUser | null> => {
  const cookie = await getSessionCookie();
  const session = await decrypt(cookie);

  if (!session?.userId) {
    return null;
  }

  try {
    const user = await getUser(session.userId);
    if (!user || !user.isActive) {
      return null;
    }

    const store = user.storeId ? await getStore(user.storeId) : null;
    if (store && !store.isActive) {
      return null;
    }

    const rolePermissions = ROLE_PERMISSIONS[user.roleCode as RoleCode] ?? [];
    const granted = user.permissions;

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      roleCode: user.roleCode,
      roleName: user.roleName,
      storeId: user.storeId,
      storeName: store?.name ?? null,
      permissions: granted.length > 0 ? granted : [...rolePermissions],
    };
  } catch (error) {
    if (isNextRedirect(error)) {
      throw error;
    }
    console.error("getCurrentUser failed", error);
    throw new Error(publicAuthError(error));
  }
});

export async function requireUser() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }
  return user;
}
