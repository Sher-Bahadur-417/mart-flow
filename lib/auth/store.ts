import "server-only";

import { redirect } from "next/navigation";

import { requireUser } from "@/lib/auth/dal";
import type { SessionUser } from "@/types/auth";

export type StoreUser = SessionUser & { storeId: string };

export async function requireStoreUser(): Promise<StoreUser> {
  const user = await requireUser();
  if (!user.storeId) {
    redirect("/access-denied");
  }
  return user as StoreUser;
}
