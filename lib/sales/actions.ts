"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { writeAuditLog } from "@/lib/auth/audit";
import { prisma } from "@/lib/db";
import { applyStockChange } from "@/lib/inventory";
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
  await prisma.heldCart.create({
    data: {
      storeId: user.storeId,
      cashierId: user.id,
      customerId: customerId || null,
      label: label || `Hold ${new Date().toLocaleTimeString()}`,
      payload: payload as object,
    },
  });
  revalidatePath("/pos");
}

export async function listHeldCartsAction() {
  const user = await requireStorePermission("sales");
  return prisma.heldCart.findMany({
    where: { storeId: user.storeId, cashierId: user.id },
    orderBy: { createdAt: "desc" },
  });
}

export async function resumeHeldCartAction(id: string) {
  const user = await requireStorePermission("sales");
  const cart = await prisma.heldCart.findFirst({
    where: { id, storeId: user.storeId },
  });
  if (!cart) {
    throw new Error("Held cart not found.");
  }
  await prisma.heldCart.delete({ where: { id } });
  return cart;
}

export async function cancelSaleAction(saleId: string) {
  const user = await requireStorePermission("sales");
  await prisma.$transaction(async (tx) => {
    const sale = await tx.sale.findFirst({
      where: { id: saleId, storeId: user.storeId },
      include: { items: true, returns: true },
    });
    if (!sale || sale.status !== "COMPLETED") {
      throw new Error("Only completed sales with no returns can be cancelled.");
    }
    if (sale.returns.length > 0) {
      throw new Error("Return this sale instead of cancelling it.");
    }
    for (const item of sale.items) {
      await applyStockChange(tx, {
        storeId: user.storeId,
        productId: item.productId,
        type: "RETURN",
        quantityDelta: item.quantity,
        userId: user.id,
        reason: "Sale cancelled",
        referenceType: "Sale",
        referenceId: sale.id,
      });
    }
    await tx.sale.update({
      where: { id: sale.id },
      data: { status: "CANCELLED" },
    });
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
  const refundMethod = String(formData.get("refundMethod") ?? "CASH") as
    | "CASH"
    | "CARD"
    | "STORE_CREDIT";
  const sale = await prisma.sale.findFirst({
    where: { id: saleId, storeId: user.storeId },
    include: { items: true, returns: { include: { items: true } } },
  });
  if (!sale || sale.status === "CANCELLED") {
    throw new Error("Sale cannot be returned.");
  }

  const returnedQty = new Map<string, ReturnType<typeof toQty>>();
  for (const existing of sale.returns.flatMap((entry) => entry.items)) {
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

  const result = await prisma.$transaction(async (tx) => {
    let total = toMoney(0);
    for (const line of lines) {
      const already = returnedQty.get(line.item.id) ?? toQty(0);
      if (already.plus(line.qty).gt(line.item.quantity)) {
        throw new Error(`Return quantity exceeds sold quantity for ${line.item.name}.`);
      }
      const unitNet = toMoney(
        line.item.lineTotal.dividedBy(line.item.quantity),
      );
      total = toMoney(total.plus(unitNet.times(line.qty)));
    }

    const created = await tx.return.create({
      data: {
        storeId: user.storeId,
        saleId: sale.id,
        cashierId: user.id,
        customerId: sale.customerId,
        total,
        items: {
          create: lines.map((line) => ({
            saleItemId: line.item.id,
            productId: line.item.productId,
            quantity: line.qty,
            unitPrice: line.item.unitPrice,
            lineTotal: toMoney(
              toMoney(line.item.lineTotal.dividedBy(line.item.quantity)).times(line.qty),
            ),
          })),
        },
        refunds: {
          create: { method: refundMethod, amount: total },
        },
      },
    });

    for (const line of lines) {
      await applyStockChange(tx, {
        storeId: user.storeId,
        productId: line.item.productId,
        type: "RETURN",
        quantityDelta: line.qty,
        userId: user.id,
        referenceType: "Return",
        referenceId: created.id,
      });
    }

    const allReturned = sale.items.every((item) => {
      const previous = returnedQty.get(item.id) ?? toQty(0);
      const extra = lines.find((line) => line.item.id === item.id)?.qty ?? toQty(0);
      return previous.plus(extra).gte(item.quantity);
    });

    await tx.sale.update({
      where: { id: sale.id },
      data: { status: allReturned ? "RETURNED" : "PARTIALLY_RETURNED" },
    });

    return created;
  });

  await writeAuditLog({
    action: "SALE_RETURN",
    entity: "Return",
    entityId: result.id,
    userId: user.id,
    storeId: user.storeId,
    metadata: { saleId, refundMethod },
  });
  revalidatePath("/sales");
  revalidatePath("/returns");
  redirect(`/sales/${saleId}`);
}
