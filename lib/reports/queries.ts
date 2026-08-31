import "server-only";

import {
  listCustomers,
  listCustomerPayments,
  listExpenses,
  listInventories,
  listProducts,
  listPurchases,
  listReturns,
  listSales,
  listSupplierPayments,
  listSuppliers,
} from "@/lib/data/queries";
import type { InventoryDoc, ProductDoc } from "@/lib/data/types";
import { computeProfit } from "@/lib/sales/pricing";
import { moneyZero, toMoney } from "@/lib/utils/money";

function startOfDay(date: Date) {
  const value = new Date(date);
  value.setHours(0, 0, 0, 0);
  return value;
}

export async function getDashboardMetrics(storeId: string) {
  const today = startOfDay(new Date());
  const [
    sales,
    purchases,
    expenses,
    products,
    inventories,
    customers,
    suppliers,
    customerPayments,
    returns,
    supplierPayments,
  ] = await Promise.all([
    listSales(storeId),
    listPurchases(storeId),
    listExpenses(storeId),
    listProducts(storeId),
    listInventories(storeId),
    listCustomers(storeId),
    listSuppliers(storeId),
    listCustomerPayments(storeId),
    listReturns(storeId),
    listSupplierPayments(storeId),
  ]);

  const todaySales = sales.filter(
    (sale) => sale.status !== "CANCELLED" && sale.createdAt >= today,
  );
  const todayPurchases = purchases.filter(
    (purchase) =>
      (purchase.status === "RECEIVED" || purchase.status === "COMPLETED") &&
      purchase.receivedAt != null &&
      purchase.receivedAt >= today,
  );
  const todayExpenses = expenses.filter((expense) => expense.date >= today);
  const inventoryByProduct = new Map(
    inventories.map((row) => [row.productId, row]),
  );

  const revenue = todaySales.reduce((sum, sale) => sum.plus(sale.total), moneyZero);
  const cogs = todaySales.reduce(
    (sum, sale) =>
      sum.plus(
        sale.items.reduce(
          (lineSum, item) => lineSum.plus(item.costPrice.times(item.quantity)),
          moneyZero,
        ),
      ),
    moneyZero,
  );
  const purchaseTotal = todayPurchases.reduce((sum, item) => sum.plus(item.total), moneyZero);
  const expenseTotal = todayExpenses.reduce((sum, item) => sum.plus(item.amount), moneyZero);
  const lowStock = products.filter((product) => {
    const inventory = inventoryByProduct.get(product.id);
    return inventory && inventory.quantity.gt(0) && inventory.quantity.lte(product.minStock);
  }).length;
  const outOfStock = products.filter((product) => {
    const inventory = inventoryByProduct.get(product.id);
    return !inventory || inventory.quantity.lte(0);
  }).length;

  const receivables = customers.reduce((sum, customer) => {
    const credit = sales
      .filter((sale) => sale.customerId === customer.id && sale.status !== "CANCELLED")
      .reduce((value, sale) => value.plus(sale.creditAmount), moneyZero);
    const paid = customerPayments
      .filter((payment) => payment.customerId === customer.id)
      .reduce((value, payment) => value.plus(payment.amount), moneyZero);
    const storeCredit = returns
      .filter((entry) => entry.customerId === customer.id)
      .flatMap((entry) => entry.refunds)
      .filter((refund) => refund.method === "STORE_CREDIT")
      .reduce((value, refund) => value.plus(refund.amount), moneyZero);
    return sum.plus(customer.openingBalance.plus(credit).minus(paid).minus(storeCredit));
  }, moneyZero);

  const payables = suppliers.reduce((sum, supplier) => {
    const purchased = purchases
      .filter(
        (purchase) =>
          purchase.supplierId === supplier.id &&
          (purchase.status === "RECEIVED" || purchase.status === "COMPLETED"),
      )
      .reduce((value, purchase) => value.plus(purchase.total), moneyZero);
    const paid = supplierPayments
      .filter((payment) => payment.supplierId === supplier.id)
      .reduce((value, payment) => value.plus(payment.amount), moneyZero);
    return sum.plus(supplier.openingBalance.plus(purchased).minus(paid));
  }, moneyZero);

  return {
    revenue: toMoney(revenue),
    purchases: toMoney(purchaseTotal),
    expenses: toMoney(expenseTotal),
    profit: computeProfit(revenue, cogs, expenseTotal),
    cogs: toMoney(cogs),
    products: products.length,
    lowStock,
    outOfStock,
    receivables: toMoney(receivables),
    payables: toMoney(payables),
  };
}

export async function getSalesTrend(storeId: string, days = 14) {
  const from = startOfDay(new Date());
  from.setDate(from.getDate() - (days - 1));
  const sales = (await listSales(storeId))
    .filter((sale) => sale.status !== "CANCELLED" && sale.createdAt >= from)
    .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());

  const buckets = new Map<string, { sales: typeof moneyZero; profit: typeof moneyZero }>();
  for (let i = 0; i < days; i += 1) {
    const date = new Date(from);
    date.setDate(from.getDate() + i);
    buckets.set(date.toISOString().slice(0, 10), { sales: moneyZero, profit: moneyZero });
  }
  for (const sale of sales) {
    const key = sale.createdAt.toISOString().slice(0, 10);
    const bucket = buckets.get(key);
    if (!bucket) continue;
    const cogs = sale.items.reduce(
      (sum, item) => sum.plus(item.costPrice.times(item.quantity)),
      moneyZero,
    );
    bucket.sales = bucket.sales.plus(sale.total);
    bucket.profit = bucket.profit.plus(sale.total.minus(cogs));
  }

  return [...buckets.entries()].map(([date, value]) => ({
    date,
    sales: Number(value.sales.toFixed(2)),
    profit: Number(value.profit.toFixed(2)),
  }));
}

export async function getProfitLoss(storeId: string, from: Date, to: Date) {
  const [sales, expenses] = await Promise.all([listSales(storeId), listExpenses(storeId)]);
  const rangedSales = sales.filter(
    (sale) =>
      sale.status !== "CANCELLED" && sale.createdAt >= from && sale.createdAt <= to,
  );
  const rangedExpenses = expenses.filter(
    (expense) => expense.date >= from && expense.date <= to,
  );

  const revenue = rangedSales.reduce((sum, sale) => sum.plus(sale.total), moneyZero);
  const cogs = rangedSales.reduce(
    (sum, sale) =>
      sum.plus(
        sale.items.reduce(
          (lineSum, item) => lineSum.plus(item.costPrice.times(item.quantity)),
          moneyZero,
        ),
      ),
    moneyZero,
  );
  const expenseTotal = rangedExpenses.reduce((sum, item) => sum.plus(item.amount), moneyZero);

  return {
    from,
    to,
    revenue: toMoney(revenue),
    cogs: toMoney(cogs),
    expenses: toMoney(expenseTotal),
    profit: computeProfit(revenue, cogs, expenseTotal),
    saleCount: rangedSales.length,
  };
}

export type InventorySnapshotRow = InventoryDoc & { product: ProductDoc };

export async function getInventorySnapshot(storeId: string): Promise<InventorySnapshotRow[]> {
  const [inventories, products] = await Promise.all([
    listInventories(storeId),
    listProducts(storeId),
  ]);
  const productById = new Map(products.map((product) => [product.id, product]));
  return inventories
    .flatMap((row) => {
      const product = productById.get(row.productId);
      return product ? [{ ...row, product }] : [];
    })
    .sort((a, b) => a.product.name.localeCompare(b.product.name));
}
