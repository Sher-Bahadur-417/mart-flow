import "server-only";

import { collections, FieldValue, newId } from "@/lib/data/fs";
import {
  attachProductRelations,
  getCustomer,
  getUser,
  hydrateProduct,
  listProducts,
} from "@/lib/data/queries";
import type { InventoryDoc, ProductDoc, SaleDoc } from "@/lib/data/types";
import { firestore } from "@/lib/firebase-admin";
import { readInventoryInTx, writeStockChange } from "@/lib/inventory";
import {
  assertCreditLimit,
  getCustomerOutstanding,
} from "@/lib/payments/ledgers";
import { computeSaleLine, computeSaleTotals } from "@/lib/sales/pricing";
import { readNextCounter, writeCounter } from "@/lib/utils/document-number";
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

  if (creditAmount.gt(0) && !input.customerId) {
    throw new Error("Select a customer for credit sales.");
  }
  if (creditAmount.gt(0) && input.customerId) {
    const outstanding = await getCustomerOutstanding(input.storeId, input.customerId);
    const customer = await getCustomer(input.customerId);
    if (!customer || customer.storeId !== input.storeId) {
      throw new Error("Customer not found.");
    }
    assertCreditLimit(outstanding, creditAmount, customer.creditLimit);
  }

  const [cashier, customer] = await Promise.all([
    getUser(input.cashierId),
    input.customerId ? getCustomer(input.customerId) : Promise.resolve(null),
  ]);
  const cashierName = cashier?.name ?? "";
  const customerName =
    customer && customer.storeId === input.storeId ? customer.name : null;

  const saleId = newId(collections.sales);

  return firestore.runTransaction(async (tx) => {
    const productIds = [...new Set(input.items.map((item) => item.productId))];
    const nextCounter = await readNextCounter(tx, input.storeId, "sale");

    const products: ProductDoc[] = [];
    for (const productId of productIds) {
      const snap = await tx.get(firestore.collection(collections.products).doc(productId));
      if (!snap.exists) {
        throw new Error("A product in the cart is unavailable.");
      }
      const product = hydrateProduct(snap.id, snap.data() ?? {});
      if (product.storeId !== input.storeId || !product.isActive) {
        throw new Error("A product in the cart is unavailable.");
      }
      products.push(product);
    }

    const inventories: InventoryDoc[] = [];
    for (const productId of productIds) {
      inventories.push(await readInventoryInTx(tx, input.storeId, productId));
    }

    const productMap = new Map(products.map((product) => [product.id, product]));
    const inventoryMap = new Map(
      inventories.map((inventory) => [inventory.productId, inventory]),
    );

    const lineItems = input.items.map((item) => {
      const product = productMap.get(item.productId);
      const inventory = inventoryMap.get(item.productId);
      if (!product || !inventory) {
        throw new Error("A product in the cart is unavailable.");
      }
      const quantity = toQty(item.quantity);
      const priced = computeSaleLine({
        quantity,
        unitPrice: product.sellingPrice,
        discount: item.discount ?? product.discount,
        taxRate: product.taxRate,
        costPrice: product.purchasePrice,
      });
      return { product, inventory, ...priced };
    });

    const deducted = new Map<string, ReturnType<typeof toQty>>();
    for (const line of lineItems) {
      const previous = deducted.get(line.product.id) ?? toQty(0);
      const next = previous.plus(line.quantity);
      if (line.inventory.quantity.lt(next)) {
        throw new Error(`Insufficient stock for ${line.product.name}.`);
      }
      deducted.set(line.product.id, next);
    }

    const { subtotal, discountTotal, taxTotal, total } = computeSaleTotals(lineItems);

    if (!toMoney(paidAmount.plus(creditAmount)).equals(total)) {
      throw new Error("Payments must equal the sale total.");
    }

    const invoiceNumber = `INV-${String(nextCounter).padStart(6, "0")}`;
    const saleItems = lineItems.map((line) => ({
      id: newId(collections.sales),
      productId: line.product.id,
      name: line.product.name,
      sku: line.product.sku,
      quantity: line.quantity,
      unitPrice: line.unitPrice,
      costPrice: line.costPrice,
      discount: line.discount,
      tax: line.tax,
      lineTotal: line.lineTotal,
    }));
    const salePayments = payments.map((payment) => ({
      id: newId(collections.sales),
      method: payment.method,
      amount: payment.amount,
    }));

    writeCounter(tx, input.storeId, "sale", nextCounter);
    tx.set(firestore.collection(collections.sales).doc(saleId), {
      id: saleId,
      storeId: input.storeId,
      invoiceNumber,
      cashierId: input.cashierId,
      cashierName,
      customerId: input.customerId || null,
      customerName,
      status: "COMPLETED",
      subtotal: toMoney(subtotal).toString(),
      discountTotal: discountTotal.toString(),
      taxTotal: taxTotal.toString(),
      total: total.toString(),
      paidAmount: paidAmount.toString(),
      creditAmount: creditAmount.toString(),
      note: input.note ?? null,
      items: saleItems.map((item) => ({
        ...item,
        quantity: item.quantity.toString(),
        unitPrice: item.unitPrice.toString(),
        costPrice: item.costPrice.toString(),
        discount: item.discount.toString(),
        tax: item.tax.toString(),
        lineTotal: item.lineTotal.toString(),
      })),
      payments: salePayments.map((payment) => ({
        ...payment,
        amount: payment.amount.toString(),
      })),
      createdAt: FieldValue.serverTimestamp(),
    });

    const remainingByProduct = new Map(
      inventories.map((inventory) => [inventory.productId, inventory.quantity]),
    );
    for (const [productId, quantity] of deducted) {
      const current = remainingByProduct.get(productId) ?? moneyZero;
      writeStockChange(
        tx,
        {
          storeId: input.storeId,
          productId,
          type: "SALE",
          quantityDelta: quantity.negated(),
          userId: input.cashierId,
          referenceType: "Sale",
          referenceId: saleId,
        },
        current,
      );
      remainingByProduct.set(productId, current.minus(quantity));
    }

    for (const [productId, remaining] of remainingByProduct) {
      const product = productMap.get(productId);
      if (!product || remaining.gt(product.minStock)) {
        continue;
      }
      const notificationId = newId(collections.notifications);
      tx.set(firestore.collection(collections.notifications).doc(notificationId), {
        id: notificationId,
        storeId: input.storeId,
        userId: null,
        title: remaining.lte(0) ? "Out of stock" : "Low stock",
        body: `${product.name} is at ${remaining.toString()} units.`,
        isRead: false,
        createdAt: FieldValue.serverTimestamp(),
      });
    }

    const sale: SaleDoc = {
      id: saleId,
      storeId: input.storeId,
      invoiceNumber,
      cashierId: input.cashierId,
      cashierName,
      customerId: input.customerId || null,
      customerName,
      status: "COMPLETED",
      subtotal: toMoney(subtotal),
      discountTotal,
      taxTotal,
      total,
      paidAmount,
      creditAmount,
      note: input.note ?? null,
      items: saleItems,
      payments: salePayments,
      createdAt: new Date(),
    };
    return sale;
  });
}

export async function searchSellableProducts(storeId: string, query: string) {
  const term = query.trim().toLowerCase();
  const products = await listProducts(storeId);
  const matches = products
    .filter((product) => {
      if (!product.isActive) {
        return false;
      }
      if (!term) {
        return true;
      }
      return (
        product.name.toLowerCase().includes(term) ||
        product.sku.toLowerCase().includes(term) ||
        product.barcodes.some((code) => code.toLowerCase().includes(term))
      );
    })
    .sort((a, b) => a.name.localeCompare(b.name))
    .slice(0, 20);

  return attachProductRelations(storeId, matches);
}
