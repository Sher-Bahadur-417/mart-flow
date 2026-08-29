import "server-only";

import { prisma } from "@/lib/db";
import { computeProfit } from "@/lib/sales/pricing";
import { moneyZero, toMoney } from "@/lib/utils/money";

function startOfDay(date: Date) {
  const value = new Date(date);
  value.setHours(0, 0, 0, 0);
  return value;
}

export async function getDashboardMetrics(storeId: string) {
  const today = startOfDay(new Date());
  const [sales, purchases, expenses, products, customers, suppliers] =
    await Promise.all([
      prisma.sale.findMany({
        where: { storeId, status: { not: "CANCELLED" }, createdAt: { gte: today } },
        include: { items: true },
      }),
      prisma.purchase.findMany({
        where: { storeId, status: { in: ["RECEIVED", "COMPLETED"] }, receivedAt: { gte: today } },
      }),
      prisma.expense.findMany({ where: { storeId, date: { gte: today } } }),
      prisma.product.findMany({
        where: { storeId },
        include: { inventory: true },
      }),
      prisma.customer.findMany({
        where: { storeId },
        include: {
          sales: { where: { status: { not: "CANCELLED" } }, select: { creditAmount: true } },
          payments: { select: { amount: true } },
          returns: { include: { refunds: true } },
        },
      }),
      prisma.supplier.findMany({
        where: { storeId },
        include: {
          purchases: {
            where: { status: { in: ["RECEIVED", "COMPLETED"] } },
            select: { total: true },
          },
          payments: { select: { amount: true } },
        },
      }),
    ]);

  const revenue = sales.reduce((sum, sale) => sum.plus(sale.total), moneyZero);
  const cogs = sales.reduce(
    (sum, sale) =>
      sum.plus(
        sale.items.reduce(
          (lineSum, item) => lineSum.plus(item.costPrice.times(item.quantity)),
          moneyZero,
        ),
      ),
    moneyZero,
  );
  const purchaseTotal = purchases.reduce((sum, item) => sum.plus(item.total), moneyZero);
  const expenseTotal = expenses.reduce((sum, item) => sum.plus(item.amount), moneyZero);
  const lowStock = products.filter(
    (product) =>
      product.inventory && product.inventory.quantity.gt(0) && product.inventory.quantity.lte(product.minStock),
  ).length;
  const outOfStock = products.filter(
    (product) => !product.inventory || product.inventory.quantity.lte(0),
  ).length;

  const receivables = customers.reduce((sum, customer) => {
    const credit = customer.sales.reduce((value, sale) => value.plus(sale.creditAmount), moneyZero);
    const paid = customer.payments.reduce((value, payment) => value.plus(payment.amount), moneyZero);
    const storeCredit = customer.returns
      .flatMap((entry) => entry.refunds)
      .filter((refund) => refund.method === "STORE_CREDIT")
      .reduce((value, refund) => value.plus(refund.amount), moneyZero);
    return sum.plus(customer.openingBalance.plus(credit).minus(paid).minus(storeCredit));
  }, moneyZero);

  const payables = suppliers.reduce((sum, supplier) => {
    const purchased = supplier.purchases.reduce((value, purchase) => value.plus(purchase.total), moneyZero);
    const paid = supplier.payments.reduce((value, payment) => value.plus(payment.amount), moneyZero);
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
  const sales = await prisma.sale.findMany({
    where: { storeId, status: { not: "CANCELLED" }, createdAt: { gte: from } },
    include: { items: true },
    orderBy: { createdAt: "asc" },
  });

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
  const [sales, expenses] = await Promise.all([
    prisma.sale.findMany({
      where: {
        storeId,
        status: { not: "CANCELLED" },
        createdAt: { gte: from, lte: to },
      },
      include: { items: true },
    }),
    prisma.expense.findMany({
      where: { storeId, date: { gte: from, lte: to } },
    }),
  ]);

  const revenue = sales.reduce((sum, sale) => sum.plus(sale.total), moneyZero);
  const cogs = sales.reduce(
    (sum, sale) =>
      sum.plus(
        sale.items.reduce(
          (lineSum, item) => lineSum.plus(item.costPrice.times(item.quantity)),
          moneyZero,
        ),
      ),
    moneyZero,
  );
  const expenseTotal = expenses.reduce((sum, item) => sum.plus(item.amount), moneyZero);

  return {
    from,
    to,
    revenue: toMoney(revenue),
    cogs: toMoney(cogs),
    expenses: toMoney(expenseTotal),
    profit: computeProfit(revenue, cogs, expenseTotal),
    saleCount: sales.length,
  };
}

export async function getInventorySnapshot(storeId: string) {
  return prisma.inventory.findMany({
    where: { storeId },
    include: { product: true },
    orderBy: { product: { name: "asc" } },
  });
}
