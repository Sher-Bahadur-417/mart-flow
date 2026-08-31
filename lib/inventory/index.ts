import "server-only";

import { FieldValue, type Transaction } from "firebase-admin/firestore";

import { collections, newId } from "@/lib/data/fs";
import { hydrateInventory } from "@/lib/data/queries";
import type { InventoryDoc, InventoryMovementType } from "@/lib/data/types";
import { firestore } from "@/lib/firebase-admin";
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

export async function readInventoryInTx(
  tx: Transaction,
  storeId: string,
  productId: string,
): Promise<InventoryDoc> {
  const snap = await tx.get(
    firestore.collection(collections.inventories).doc(productId),
  );
  if (!snap.exists) {
    throw new Error("Inventory record not found for this product.");
  }
  const inventory = hydrateInventory(snap.id, snap.data() ?? {});
  if (inventory.storeId !== storeId) {
    throw new Error("Inventory record not found for this product.");
  }
  return inventory;
}

export function writeStockChange(
  tx: Transaction,
  input: StockChangeInput,
  currentQuantity: DecimalInput,
) {
  const delta = toQty(input.quantityDelta);
  const nextQuantity = nextStockQuantity(
    currentQuantity,
    delta,
    input.allowNegative,
  );

  tx.set(
    firestore.collection(collections.inventories).doc(input.productId),
    {
      quantity: nextQuantity.toString(),
      updatedAt: FieldValue.serverTimestamp(),
    },
    { merge: true },
  );

  const movementId = newId(collections.inventoryMovements);
  tx.set(firestore.collection(collections.inventoryMovements).doc(movementId), {
    id: movementId,
    storeId: input.storeId,
    productId: input.productId,
    type: input.type,
    quantity: delta.toString(),
    reason: input.reason ?? null,
    referenceType: input.referenceType ?? null,
    referenceId: input.referenceId ?? null,
    createdById: input.userId,
    createdAt: FieldValue.serverTimestamp(),
  });

  return nextQuantity;
}

export async function applyStockChange(tx: Transaction, input: StockChangeInput) {
  const inventory = await readInventoryInTx(tx, input.storeId, input.productId);
  return writeStockChange(tx, input, inventory.quantity);
}

export function createProductInventoryWrites(
  tx: Transaction,
  input: { storeId: string; productId: string; quantity?: DecimalInput },
) {
  const quantity = toQty(input.quantity ?? 0);
  tx.set(firestore.collection(collections.inventories).doc(input.productId), {
    id: input.productId,
    storeId: input.storeId,
    productId: input.productId,
    quantity: quantity.toString(),
    updatedAt: FieldValue.serverTimestamp(),
  });
}
