import "server-only";

import { Prisma } from "@prisma/client";

import { prisma } from "@/lib/db";
import { moneyZero, toMoney } from "@/lib/utils/money";

export async function getCustomerOutstanding(storeId: string, customerId: string) {
  const customer = await prisma.customer.findFirst({
    where: { id: customerId, storeId },
    include: {
      sales: {
        where: { status: { not: "CANCELLED" } },
        select: { creditAmount: true },
      },
      payments: { select: { amount: true } },
      returns: {
        include: { refunds: { select: { method: true, amount: true } } },
      },
    },
  });

  if (!customer) {
    throw new Error("Customer not found.");
  }

  const credits = customer.sales.reduce(
    (total, sale) => total.plus(sale.creditAmount),
    moneyZero,
  );
  const payments = customer.payments.reduce(
    (total, payment) => total.plus(payment.amount),
    moneyZero,
  );
  const storeCredit = customer.returns
    .flatMap((entry) => entry.refunds)
    .filter((refund) => refund.method === "STORE_CREDIT")
    .reduce((total, refund) => total.plus(refund.amount), moneyZero);

  return toMoney(customer.openingBalance.plus(credits).minus(payments).minus(storeCredit));
}

export async function getSupplierPayable(storeId: string, supplierId: string) {
  const supplier = await prisma.supplier.findFirst({
    where: { id: supplierId, storeId },
    include: {
      purchases: {
        where: { status: { in: ["RECEIVED", "COMPLETED"] } },
        select: { total: true },
      },
      payments: { select: { amount: true } },
    },
  });

  if (!supplier) {
    throw new Error("Supplier not found.");
  }

  const purchases = supplier.purchases.reduce(
    (total, purchase) => total.plus(purchase.total),
    moneyZero,
  );
  const payments = supplier.payments.reduce(
    (total, payment) => total.plus(payment.amount),
    moneyZero,
  );

  return toMoney(supplier.openingBalance.plus(purchases).minus(payments));
}

export function assertCreditLimit(
  outstanding: Prisma.Decimal,
  extraCredit: Prisma.Decimal,
  creditLimit: Prisma.Decimal | null,
) {
  if (!creditLimit) {
    return;
  }
  if (outstanding.plus(extraCredit).gt(creditLimit)) {
    throw new Error("Customer credit limit exceeded.");
  }
}
