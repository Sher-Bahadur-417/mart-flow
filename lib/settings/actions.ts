"use server";

import { revalidatePath } from "next/cache";

import { requireStoreUser } from "@/lib/auth/store";
import { collections } from "@/lib/data/fs";
import { firestore } from "@/lib/firebase-admin";
import { requireStorePermission } from "@/lib/permissions";

export async function markNotificationRead(id: string) {
  const user = await requireStoreUser();
  const snap = await firestore.collection(collections.notifications).doc(id).get();
  if (!snap.exists) {
    return;
  }
  const data = snap.data() ?? {};
  if (String(data.storeId ?? "") !== user.storeId) {
    return;
  }
  const ownerId = (data.userId as string | null) ?? null;
  if (ownerId != null && ownerId !== user.id) {
    return;
  }
  await snap.ref.set({ isRead: true }, { merge: true });
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
  const id = `${user.storeId}_${key}`;
  await firestore.collection(collections.settings).doc(id).set(
    {
      id,
      storeId: user.storeId,
      key,
      value,
    },
    { merge: true },
  );
  revalidatePath("/settings");
}
