"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { collections, FieldValue, newId } from "@/lib/data/fs";
import { getSupplier, hydratePurchase, listProducts } from "@/lib/data/queries";
import type { InventoryDoc } from "@/lib/data/types";
import { firestore } from "@/lib/firebase-admin";
import { readInventoryInTx, writeStockChange } from "@/lib/inventory";
import { requireStorePermission } from "@/lib/permissions";
import { readNextCounter, writeCounter } from "@/lib/utils/document-number";
import { moneyZero, toMoney, toQty } from "@/lib/utils/money";

export async function createPurchase(formData: FormData) {
  const user = await requireStorePermission("purchases");
  const supplierId = String(formData.get("supplierId") ?? "");
  const productIds = formData.getAll("productId").map(String);
  const quantities = formData.getAll("quantity").map(String);
  const costs = formData.getAll("unitCost").map(String);
  if (!supplierId || productIds.length === 0) {
    throw new Error("Supplier and at least one item are required.");
  }

  const supplier = await getSupplier(supplierId);
  if (!supplier || supplier.storeId !== user.storeId) {
    throw new Error("Supplier not found.");
  }

  const products = await listProducts(user.storeId);
  const productMap = new Map(products.map((product) => [product.id, product]));

  const items = productIds.map((productId, index) => {
    const product = productMap.get(productId);
    if (!product) {
      throw new Error("A product on this purchase is unavailable.");
    }
    const quantity = toQty(quantities[index] ?? "0");
    const unitCost = toMoney(costs[index] ?? "0");
    return {
      id: newId(collections.purchases),
      productId,
      productName: product.name,
      quantityOrdered: quantity,
      quantityReceived: toQty(0),
      unitCost,
      lineTotal: toMoney(unitCost.times(quantity)),
    };
  });
  const total = items.reduce((sum, item) => sum.plus(item.lineTotal), moneyZero);
  const purchaseId = newId(collections.purchases);

  await firestore.runTransaction(async (tx) => {
    const next = await readNextCounter(tx, user.storeId, "purchase");
    const number = `PO-${String(next).padStart(6, "0")}`;
    writeCounter(tx, user.storeId, "purchase", next);
    tx.set(firestore.collection(collections.purchases).doc(purchaseId), {
      id: purchaseId,
      storeId: user.storeId,
      supplierId,
      supplierName: supplier.name,
      number,
      status: "DRAFT",
      subtotal: toMoney(total).toString(),
      total: toMoney(total).toString(),
      note: null,
      orderedAt: null,
      receivedAt: null,
      createdById: user.id,
      items: items.map((item) => ({
        ...item,
        quantityOrdered: item.quantityOrdered.toString(),
        quantityReceived: item.quantityReceived.toString(),
        unitCost: item.unitCost.toString(),
        lineTotal: item.lineTotal.toString(),
      })),
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    });
  });

  revalidatePath("/purchases");
  redirect(`/purchases/${purchaseId}`);
}

export async function updatePurchaseStatus(
  purchaseId: string,
  status: "ORDERED" | "RECEIVED" | "COMPLETED",
) {
  const user = await requireStorePermission("purchases");
  await firestore.runTransaction(async (tx) => {
    const snap = await tx.get(firestore.collection(collections.purchases).doc(purchaseId));
    if (!snap.exists) {
      throw new Error("Purchase not found.");
    }
    const purchase = hydratePurchase(snap.id, snap.data() ?? {});
    if (purchase.storeId !== user.storeId) {
      throw new Error("Purchase not found.");
    }

    if (status === "ORDERED" && purchase.status !== "DRAFT") {
      throw new Error("Only draft purchases can be ordered.");
    }
    if (status === "RECEIVED" && purchase.status !== "ORDERED") {
      throw new Error("Only ordered purchases can be received.");
    }
    if (status === "COMPLETED" && purchase.status !== "RECEIVED") {
      throw new Error("Receive the purchase before completing it.");
    }

    const inventories: InventoryDoc[] = [];
    if (status === "RECEIVED") {
      const productIds = [...new Set(purchase.items.map((item) => item.productId))];
      for (const productId of productIds) {
        inventories.push(await readInventoryInTx(tx, user.storeId, productId));
      }
    }

    const remaining = new Map(
      inventories.map((inventory) => [inventory.productId, inventory.quantity]),
    );
    if (status === "RECEIVED") {
      for (const item of purchase.items) {
        const current = remaining.get(item.productId);
        if (!current) {
          throw new Error("Inventory record not found for this product.");
        }
        writeStockChange(
          tx,
          {
            storeId: user.storeId,
            productId: item.productId,
            type: "PURCHASE",
            quantityDelta: item.quantityOrdered,
            userId: user.id,
            referenceType: "Purchase",
            referenceId: purchase.id,
          },
          current,
        );
        remaining.set(item.productId, current.plus(item.quantityOrdered));
      }
    }

    const nextItems =
      status === "RECEIVED"
        ? purchase.items.map((item) => ({
            ...item,
            quantityReceived: item.quantityOrdered,
          }))
        : purchase.items;

    tx.set(
      firestore.collection(collections.purchases).doc(purchase.id),
      {
        status,
        orderedAt: status === "ORDERED" ? new Date() : purchase.orderedAt,
        receivedAt: status === "RECEIVED" ? new Date() : purchase.receivedAt,
        items: nextItems.map((item) => ({
          ...item,
          quantityOrdered: item.quantityOrdered.toString(),
          quantityReceived: item.quantityReceived.toString(),
          unitCost: item.unitCost.toString(),
          lineTotal: item.lineTotal.toString(),
        })),
        updatedAt: FieldValue.serverTimestamp(),
      },
      { merge: true },
    );
  });

  revalidatePath("/purchases");
  revalidatePath("/inventory");
  redirect(`/purchases/${purchaseId}`);
}
