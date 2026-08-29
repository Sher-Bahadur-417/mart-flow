"use server";

import { revalidatePath } from "next/cache";

import { requireStoreUser } from "@/lib/auth/store";
import { prisma } from "@/lib/db";
import { requireStorePermission } from "@/lib/permissions";

export async function markNotificationRead(id: string) {
  const user = await requireStoreUser();
  await prisma.notification.updateMany({
    where: {
      id,
      storeId: user.storeId,
      OR: [{ userId: null }, { userId: user.id }],
    },
    data: { isRead: true },
  });
  revalidatePath("/dashboard");
  revalidatePath("/settings");
}

export async function saveSetting(formData: FormData) {
  const user = await requireStorePermission("settings");
  const key = String(formData.get("key") ?? "");
  const value = String(formData.get("value") ?? "");
  if (!key) {
    return;
  }
  await prisma.setting.upsert({
    where: { storeId_key: { storeId: user.storeId, key } },
    update: { value },
    create: { storeId: user.storeId, key, value },
  });
  revalidatePath("/settings");
}
