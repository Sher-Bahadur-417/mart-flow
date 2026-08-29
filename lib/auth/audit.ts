import "server-only";

import type { Prisma } from "@prisma/client";
import { headers } from "next/headers";

import { prisma } from "@/lib/db";

type AuditInput = {
  action: string;
  entity: string;
  entityId?: string | null;
  userId?: string | null;
  storeId?: string | null;
  metadata?: Prisma.InputJsonObject;
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
    await prisma.auditLog.create({
      data: {
        action: input.action,
        entity: input.entity,
        entityId: input.entityId ?? null,
        userId: input.userId ?? null,
        storeId: input.storeId ?? null,
        metadata: input.metadata,
        ipAddress,
        userAgent,
      },
    });
  } catch (error) {
    console.error("Failed to write audit log", error);
  }
}
