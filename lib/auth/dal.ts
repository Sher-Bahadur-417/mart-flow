import "server-only";

import { cache } from "react";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/db";
import { decrypt, getSessionCookie } from "@/lib/auth/session";
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

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: {
      id: true,
      name: true,
      email: true,
      isActive: true,
      storeId: true,
      store: { select: { name: true, isActive: true } },
      grants: {
        select: {
          permission: { select: { code: true } },
        },
      },
      role: {
        select: {
          code: true,
          name: true,
          permissions: {
            select: {
              permission: { select: { code: true } },
            },
          },
        },
      },
    },
  });

  if (!user || !user.isActive) {
    return null;
  }

  if (user.store && !user.store.isActive) {
    return null;
  }

  const granted = user.grants.map((entry) => entry.permission.code);
  const rolePermissions = user.role.permissions.map(
    (entry) => entry.permission.code,
  );

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    roleCode: user.role.code,
    roleName: user.role.name,
    storeId: user.storeId,
    storeName: user.store?.name ?? null,
    permissions: granted.length > 0 ? granted : rolePermissions,
  };
});

export async function requireUser() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }
  return user;
}
