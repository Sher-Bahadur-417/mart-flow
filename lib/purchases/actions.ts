"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/db";
import { applyStockChange } from "@/lib/inventory";
import { requireStorePermission } from "@/lib/permissions";
import { nextDocumentNumber } from "@/lib/utils/document-number";
import { toMoney, toQty, moneyZero } from "@/lib/utils/money";

export async function createPurchase(formData: FormData) {
  const user = await requireStorePermission("purchases");
  const supplierId = String(formData.get("supplierId") ?? "");
  const productIds = formData.getAll("productId").map(String);
  const quantities = formData.getAll("quantity").map(String);
  const costs = formData.getAll("unitCost").map(String);
  if (!supplierId || productIds.length === 0) {
    throw new Error("Supplier and at least one item are required.");
  }

  const items = productIds.map((productId, index) => {
    const quantity = toQty(quantities[index] ?? "0");
    const unitCost = toMoney(costs[index] ?? "0");
    return {
      productId,
      quantityOrdered: quantity,
      unitCost,
      lineTotal: toMoney(unitCost.times(quantity)),
    };
  });
  const total = items.reduce((sum, item) => sum.plus(item.lineTotal), moneyZero);

  const purchase = await prisma.$transaction(async (tx) => {
    const number = await nextDocumentNumber(tx, user.storeId, "purchase", "PO");
    return tx.purchase.create({
      data: {
        storeId: user.storeId,
        supplierId,
        number,
        status: "DRAFT",
        subtotal: toMoney(total),
        total: toMoney(total),
        createdById: user.id,
        items: { create: items },
      },
    });
  });

  revalidatePath("/purchases");
  redirect(`/purchases/${purchase.id}`);
}

export async function updatePurchaseStatus(purchaseId: string, status: "ORDERED" | "RECEIVED" | "COMPLETED") {
  const user = await requireStorePermission("purchases");
  await prisma.$transaction(async (tx) => {
    const purchase = await tx.purchase.findFirst({
      where: { id: purchaseId, storeId: user.storeId },
      include: { items: true },
    });
    if (!purchase) {
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

    if (status === "RECEIVED") {
      for (const item of purchase.items) {
        await applyStockChange(tx, {
          storeId: user.storeId,
          productId: item.productId,
          type: "PURCHASE",
          quantityDelta: item.quantityOrdered,
          userId: user.id,
          referenceType: "Purchase",
          referenceId: purchase.id,
        });
        await tx.purchaseItem.update({
          where: { id: item.id },
          data: { quantityReceived: item.quantityOrdered },
        });
      }
    }

    await tx.purchase.update({
      where: { id: purchase.id },
      data: {
        status,
        orderedAt: status === "ORDERED" ? new Date() : purchase.orderedAt,
        receivedAt: status === "RECEIVED" ? new Date() : purchase.receivedAt,
      },
    });
  });

  revalidatePath("/purchases");
  revalidatePath("/inventory");
  redirect(`/purchases/${purchaseId}`);
}
