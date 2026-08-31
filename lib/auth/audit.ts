import "server-only";

import { FieldValue } from "firebase-admin/firestore";
import { headers } from "next/headers";

import { collections, newId } from "@/lib/data/fs";
import { firestore } from "@/lib/firebase-admin";

type AuditInput = {
  action: string;
  entity: string;
  entityId?: string | null;
  userId?: string | null;
  storeId?: string | null;
  metadata?: Record<string, unknown> | null;
};

export async function getRequestContext() {
  const headerStore = await headers();
  const forwarded = headerStore.get("x-forwarded-for");
  const ipAddress =
    forwarded?.split(",")[0]?.trim() ||
    headerStore.get("x-real-ip") ||
    "unknown";
  const userAgent = headerStore.get("user-agent");

  return { ipAddress, userAgent };
}

export async function writeAuditLog(input: AuditInput) {
  try {
    const { ipAddress, userAgent } = await getRequestContext();
    let userName: string | null = null;
    if (input.userId) {
      const userSnap = await firestore.collection(collections.users).doc(input.userId).get();
      userName = userSnap.exists ? String(userSnap.data()?.name ?? "") : null;
    }
    await firestore.collection(collections.auditLogs).doc(newId(collections.auditLogs)).set({
      action: input.action,
      entity: input.entity,
      entityId: input.entityId ?? null,
      userId: input.userId ?? null,
      userName,
      storeId: input.storeId ?? null,
      metadata: input.metadata ?? null,
      ipAddress,
      userAgent,
      createdAt: FieldValue.serverTimestamp(),
    });
  } catch (error) {
    console.error("Failed to write audit log", error);
  }
}
