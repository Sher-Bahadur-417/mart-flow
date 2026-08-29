import "server-only";

import type { Prisma } from "@prisma/client";

export async function nextDocumentNumber(
  tx: Prisma.TransactionClient,
  storeId: string,
  key: string,
  prefix: string,
) {
  const counter = await tx.counter.upsert({
    where: { storeId_key: { storeId, key } },
    update: { value: { increment: 1 } },
    create: { storeId, key, value: 1 },
  });

  return `${prefix}-${String(counter.value).padStart(6, "0")}`;
}
