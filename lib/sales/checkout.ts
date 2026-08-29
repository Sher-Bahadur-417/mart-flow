import "server-only";

import { prisma } from "@/lib/db";
import { applyStockChange } from "@/lib/inventory";
import {
  assertCreditLimit,
  getCustomerOutstanding,
} from "@/lib/payments/ledgers";
import { computeSaleLine, computeSaleTotals } from "@/lib/sales/pricing";
import { nextDocumentNumber } from "@/lib/utils/document-number";
import { moneyZero, toMoney, toQty } from "@/lib/utils/money";

export type CheckoutItem = {
  productId: string;
  quantity: number;
  discount?: number;
};

export type CheckoutPayment = {
  method: "CASH" | "CARD" | "CREDIT";
  amount: number;
};

export async function checkoutSale(input: {
  storeId: string;
  cashierId: string;
  customerId?: string | null;
  items: CheckoutItem[];
  payments: CheckoutPayment[];
  note?: string;
}) {
  if (input.items.length === 0) {
    throw new Error("Cart is empty.");
  }

  return prisma.$transaction(async (tx) => {
    const products = await tx.product.findMany({
      where: {
        storeId: input.storeId,
        id: { in: input.items.map((item) => item.productId) },
        isActive: true,
      },
      include: { inventory: true },
    });
    const productMap = new Map(products.map((product) => [product.id, product]));

    const lineItems = input.items.map((item) => {
      const product = productMap.get(item.productId);
      if (!product) {
        throw new Error("A product in the cart is unavailable.");
      }
      const quantity = toQty(item.quantity);
      const available = product.inventory?.quantity ?? moneyZero;
      if (available.lt(quantity)) {
        throw new Error(`Insufficient stock for ${product.name}.`);
      }
      const priced = computeSaleLine({
        quantity,
        unitPrice: product.sellingPrice,
        discount: item.discount ?? product.discount,
        taxRate: product.taxRate,
        costPrice: product.purchasePrice,
      });
      return { product, ...priced };
    });

    const { subtotal, discountTotal, taxTotal, total } = computeSaleTotals(lineItems);

    const payments = input.payments
      .map((payment) => ({
        method: payment.method,
        amount: toMoney(payment.amount),
      }))
      .filter((payment) => payment.amount.gt(0));

    const paidAmount = payments
      .filter((payment) => payment.method !== "CREDIT")
      .reduce((sum, payment) => sum.plus(payment.amount), moneyZero);
    const creditAmount = payments
      .filter((payment) => payment.method === "CREDIT")
      .reduce((sum, payment) => sum.plus(payment.amount), moneyZero);

    if (!toMoney(paidAmount.plus(creditAmount)).equals(total)) {
      throw new Error("Payments must equal the sale total.");
    }
    if (creditAmount.gt(0) && !input.customerId) {
      throw new Error("Select a customer for credit sales.");
    }
    if (creditAmount.gt(0) && input.customerId) {
      const outstanding = await getCustomerOutstanding(input.storeId, input.customerId);
      const customer = await tx.customer.findFirst({
        where: { id: input.customerId, storeId: input.storeId },
      });
      assertCreditLimit(outstanding, creditAmount, customer?.creditLimit ?? null);
    }

    const invoiceNumber = await nextDocumentNumber(tx, input.storeId, "sale", "INV");
    const sale = await tx.sale.create({
      data: {
        storeId: input.storeId,
        invoiceNumber,
        cashierId: input.cashierId,
        customerId: input.customerId || null,
        status: "COMPLETED",
        subtotal: toMoney(subtotal),
        discountTotal,
        taxTotal,
        total,
        paidAmount,
        creditAmount,
        note: input.note,
        items: {
          create: lineItems.map((line) => ({
            productId: line.product.id,
            name: line.product.name,
            sku: line.product.sku,
            quantity: line.quantity,
            unitPrice: line.unitPrice,
            costPrice: line.costPrice,
            discount: line.discount,
            tax: line.tax,
            lineTotal: line.lineTotal,
          })),
        },
        payments: {
          create: payments,
        },
      },
    });

    for (const line of lineItems) {
      await applyStockChange(tx, {
        storeId: input.storeId,
        productId: line.product.id,
        type: "SALE",
        quantityDelta: line.quantity.negated(),
        userId: input.cashierId,
        referenceType: "Sale",
        referenceId: sale.id,
      });
      const remaining = toQty(
        (line.product.inventory?.quantity ?? moneyZero).minus(line.quantity),
      );
      if (remaining.lte(line.product.minStock)) {
        await tx.notification.create({
          data: {
            storeId: input.storeId,
            title: remaining.lte(0) ? "Out of stock" : "Low stock",
            body: `${line.product.name} is at ${remaining.toString()} units.`,
          },
        });
      }
    }

    return sale;
  });
}

export async function searchSellableProducts(storeId: string, query: string) {
  const term = query.trim();
  if (!term) {
    return prisma.product.findMany({
      where: { storeId, isActive: true },
      include: { inventory: true, barcodes: true, unit: true },
      take: 20,
      orderBy: { name: "asc" },
    });
  }

  return prisma.product.findMany({
    where: {
      storeId,
      isActive: true,
      OR: [
        { name: { contains: term, mode: "insensitive" } },
        { sku: { contains: term, mode: "insensitive" } },
        { barcodes: { some: { code: { contains: term, mode: "insensitive" } } } },
      ],
    },
    include: { inventory: true, barcodes: true, unit: true },
    take: 20,
  });
}
