"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { writeAuditLog } from "@/lib/auth/audit";
import { collections, FieldValue, newId, serializeValue } from "@/lib/data/fs";
import {
  getHeldCart,
  getSale,
  hydrateSale,
  listHeldCarts,
  listReturnsForSale,
} from "@/lib/data/queries";
import type { InventoryDoc } from "@/lib/data/types";
import { firestore } from "@/lib/firebase-admin";
import { readInventoryInTx, writeStockChange } from "@/lib/inventory";
import { requireStorePermission } from "@/lib/permissions";
import {
  checkoutSale,
  searchSellableProducts,
  type CheckoutItem,
  type CheckoutPayment,
} from "@/lib/sales/checkout";
import { toMoney, toQty } from "@/lib/utils/money";

export async function searchProductsAction(query: string) {
  const user = await requireStorePermission("sales");
  const products = await searchSellableProducts(user.storeId, query);
  return products.map((product) => ({
    id: product.id,
    name: product.name,
    sku: product.sku,
    barcode: product.barcodes[0]?.code ?? null,
    sellingPrice: product.sellingPrice.toString(),
    taxRate: product.taxRate.toString(),
    discount: product.discount.toString(),
    stock: product.inventory?.quantity.toString() ?? "0",
    unit: product.unit?.abbreviation ?? "",
  }));
}

export async function completeSaleAction(input: {
  customerId?: string;
  note?: string;
  items: CheckoutItem[];
  payments: CheckoutPayment[];
}) {
  const user = await requireStorePermission("sales");
  const sale = await checkoutSale({
    storeId: user.storeId,
    cashierId: user.id,
    customerId: input.customerId,
    items: input.items,
    payments: input.payments,
    note: input.note,
  });
  await writeAuditLog({
    action: "SALE_COMPLETE",
    entity: "Sale",
    entityId: sale.id,
    userId: user.id,
    storeId: user.storeId,
    metadata: { invoiceNumber: sale.invoiceNumber, total: sale.total.toString() },
  });
  revalidatePath("/sales");
  revalidatePath("/pos");
  revalidatePath("/dashboard");
  revalidatePath("/khata");
  redirect(`/sales/${sale.id}`);
}

export async function holdCartAction(payload: unknown, label?: string, customerId?: string) {
  const user = await requireStorePermission("sales");
  const id = newId(collections.heldCarts);
  await firestore.collection(collections.heldCarts).doc(id).set({
    id,
    storeId: user.storeId,
    cashierId: user.id,
    customerId: customerId || null,
    label: label || `Hold ${new Date().toLocaleTimeString()}`,
    payload: serializeValue(payload) ?? null,
    createdAt: FieldValue.serverTimestamp(),
  });
  revalidatePath("/pos");
}

export async function listHeldCartsAction() {
  const user = await requireStorePermission("sales");
  return listHeldCarts(user.storeId, user.id);
}

export async function resumeHeldCartAction(id: string) {
  const user = await requireStorePermission("sales");
  const cart = await getHeldCart(id);
  if (!cart || cart.storeId !== user.storeId) {
    throw new Error("Held cart not found.");
  }
  await firestore.collection(collections.heldCarts).doc(id).delete();
  return cart;
}

export async function cancelSaleAction(saleId: string) {
  const user = await requireStorePermission("sales");
  const existingReturns = await listReturnsForSale(user.storeId, saleId);
  if (existingReturns.length > 0) {
    throw new Error("Return this sale instead of cancelling it.");
  }

  await firestore.runTransaction(async (tx) => {
    const saleSnap = await tx.get(firestore.collection(collections.sales).doc(saleId));
    if (!saleSnap.exists) {
      throw new Error("Only completed sales with no returns can be cancelled.");
    }
    const sale = hydrateSale(saleSnap.id, saleSnap.data() ?? {});
    if (sale.storeId !== user.storeId || sale.status !== "COMPLETED") {
      throw new Error("Only completed sales with no returns can be cancelled.");
    }

    const productIds = [...new Set(sale.items.map((item) => item.productId))];
    const inventories: InventoryDoc[] = [];
    for (const productId of productIds) {
      inventories.push(await readInventoryInTx(tx, user.storeId, productId));
    }
    const remaining = new Map(
      inventories.map((inventory) => [inventory.productId, inventory.quantity]),
    );

    for (const item of sale.items) {
      const current = remaining.get(item.productId);
      if (!current) {
        throw new Error("Inventory record not found for this product.");
      }
      writeStockChange(
        tx,
        {
          storeId: user.storeId,
          productId: item.productId,
          type: "RETURN",
          quantityDelta: item.quantity,
          userId: user.id,
          reason: "Sale cancelled",
          referenceType: "Sale",
          referenceId: sale.id,
        },
        current,
      );
      remaining.set(item.productId, current.plus(item.quantity));
    }

    tx.set(
      firestore.collection(collections.sales).doc(sale.id),
      { status: "CANCELLED" },
      { merge: true },
    );
  });
  await writeAuditLog({
    action: "SALE_CANCEL",
    entity: "Sale",
    entityId: saleId,
    userId: user.id,
    storeId: user.storeId,
  });
  revalidatePath("/sales");
  redirect(`/sales/${saleId}`);
}

export async function createReturnAction(formData: FormData) {
  const user = await requireStorePermission("sales");
  const saleId = String(formData.get("saleId") ?? "");
  const refundMethodRaw = String(formData.get("refundMethod") ?? "CASH");
  const refundMethod =
    refundMethodRaw === "CARD" || refundMethodRaw === "STORE_CREDIT"
      ? refundMethodRaw
      : "CASH";
  const sale = await getSale(saleId);
  if (!sale || sale.storeId !== user.storeId || sale.status === "CANCELLED") {
    throw new Error("Sale cannot be returned.");
  }

  const existingReturns = await listReturnsForSale(user.storeId, saleId);
  const returnedQty = new Map<string, ReturnType<typeof toQty>>();
  for (const existing of existingReturns.flatMap((entry) => entry.items)) {
    returnedQty.set(
      existing.saleItemId,
      (returnedQty.get(existing.saleItemId) ?? toQty(0)).plus(existing.quantity),
    );
  }

  const lines = sale.items
    .map((item) => {
      const qty = toQty(String(formData.get(`qty-${item.id}`) ?? "0"));
      return { item, qty };
    })
    .filter((line) => line.qty.gt(0));

  if (lines.length === 0) {
    throw new Error("Select at least one item to return.");
  }

  const returnId = newId(collections.returns);

  await firestore.runTransaction(async (tx) => {
    const saleSnap = await tx.get(firestore.collection(collections.sales).doc(sale.id));
    if (!saleSnap.exists) {
      throw new Error("Sale cannot be returned.");
    }

    const productIds = [...new Set(lines.map((line) => line.item.productId))];
    const inventories: InventoryDoc[] = [];
    for (const productId of productIds) {
      inventories.push(await readInventoryInTx(tx, user.storeId, productId));
    }

    let total = toMoney(0);
    for (const line of lines) {
      const already = returnedQty.get(line.item.id) ?? toQty(0);
      if (already.plus(line.qty).gt(line.item.quantity)) {
        throw new Error(`Return quantity exceeds sold quantity for ${line.item.name}.`);
      }
      const unitNet = toMoney(line.item.lineTotal.dividedBy(line.item.quantity));
      total = toMoney(total.plus(unitNet.times(line.qty)));
    }

    const returnItems = lines.map((line) => ({
      id: newId(collections.returns),
      saleItemId: line.item.id,
      productId: line.item.productId,
      quantity: line.qty,
      unitPrice: line.item.unitPrice,
      lineTotal: toMoney(
        toMoney(line.item.lineTotal.dividedBy(line.item.quantity)).times(line.qty),
      ),
    }));
    const refundId = newId(collections.returns);

    tx.set(firestore.collection(collections.returns).doc(returnId), {
      id: returnId,
      storeId: user.storeId,
      saleId: sale.id,
      invoiceNumber: sale.invoiceNumber,
      cashierId: user.id,
      cashierName: user.name,
      customerId: sale.customerId,
      total: total.toString(),
      note: null,
      items: returnItems.map((item) => ({
        ...item,
        quantity: item.quantity.toString(),
        unitPrice: item.unitPrice.toString(),
        lineTotal: item.lineTotal.toString(),
      })),
      refunds: [{ id: refundId, method: refundMethod, amount: total.toString() }],
      createdAt: FieldValue.serverTimestamp(),
    });

    const remaining = new Map(
      inventories.map((inventory) => [inventory.productId, inventory.quantity]),
    );
    for (const line of lines) {
      const current = remaining.get(line.item.productId);
      if (!current) {
        throw new Error("Inventory record not found for this product.");
      }
      writeStockChange(
        tx,
        {
          storeId: user.storeId,
          productId: line.item.productId,
          type: "RETURN",
          quantityDelta: line.qty,
          userId: user.id,
          referenceType: "Return",
          referenceId: returnId,
        },
        current,
      );
      remaining.set(line.item.productId, current.plus(line.qty));
    }

    const allReturned = sale.items.every((item) => {
      const previous = returnedQty.get(item.id) ?? toQty(0);
      const extra = lines.find((line) => line.item.id === item.id)?.qty ?? toQty(0);
      return previous.plus(extra).gte(item.quantity);
    });

    tx.set(
      firestore.collection(collections.sales).doc(sale.id),
      { status: allReturned ? "RETURNED" : "PARTIALLY_RETURNED" },
      { merge: true },
    );
  });

  await writeAuditLog({
    action: "SALE_RETURN",
    entity: "Return",
    entityId: returnId,
    userId: user.id,
    storeId: user.storeId,
    metadata: { saleId, refundMethod },
  });
  revalidatePath("/sales");
  revalidatePath("/returns");
  redirect(`/sales/${saleId}`);
}
