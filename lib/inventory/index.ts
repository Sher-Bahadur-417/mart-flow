import "server-only";

import type { InventoryMovementType, Prisma } from "@prisma/client";

import { nextStockQuantity } from "@/lib/inventory/stock-math";
import { toQty, type DecimalInput } from "@/lib/utils/money";

type StockChangeInput = {
  storeId: string;
  productId: string;
  type: InventoryMovementType;
  quantityDelta: DecimalInput;
  userId: string;
  reason?: string;
  referenceType?: string;
  referenceId?: string;
  allowNegative?: boolean;
};

export async function applyStockChange(
  tx: Prisma.TransactionClient,
  input: StockChangeInput,
) {
  const delta = toQty(input.quantityDelta);
  const inventory = await tx.inventory.findUnique({
    where: { productId: input.productId },
  });

  if (!inventory || inventory.storeId !== input.storeId) {
    throw new Error("Inventory record not found for this product.");
  }

  const nextQuantity = nextStockQuantity(
    inventory.quantity,
    delta,
    input.allowNegative,
  );

  await tx.inventory.update({
    where: { id: inventory.id },
    data: { quantity: nextQuantity },
  });

  await tx.inventoryMovement.create({
    data: {
      storeId: input.storeId,
      productId: input.productId,
      type: input.type,
      quantity: delta,
      reason: input.reason,
      referenceType: input.referenceType,
      referenceId: input.referenceId,
      createdById: input.userId,
    },
  });

  return nextQuantity;
}

export async function createProductInventory(
  tx: Prisma.TransactionClient,
  input: { storeId: string; productId: string; quantity?: DecimalInput },
) {
  return tx.inventory.create({
    data: {
      storeId: input.storeId,
      productId: input.productId,
      quantity: toQty(input.quantity ?? 0),
    },
  });
}
