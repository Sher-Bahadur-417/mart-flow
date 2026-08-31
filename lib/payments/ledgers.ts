import "server-only";

import {
  getCustomer,
  getSupplier,
  listCustomerPayments,
  listPurchases,
  listReturns,
  listSales,
  listSupplierPayments,
} from "@/lib/data/queries";
import { Decimal } from "@/lib/utils/decimal";
import { moneyZero, toMoney } from "@/lib/utils/money";

export async function getCustomerOutstanding(storeId: string, customerId: string) {
  const customer = await getCustomer(customerId);
  if (!customer || customer.storeId !== storeId) {
    throw new Error("Customer not found.");
  }

  const [sales, payments, returns] = await Promise.all([
    listSales(storeId),
    listCustomerPayments(storeId),
    listReturns(storeId),
  ]);

  const credits = sales
    .filter((sale) => sale.customerId === customerId && sale.status !== "CANCELLED")
    .reduce((total, sale) => total.plus(sale.creditAmount), moneyZero);
  const paid = payments
    .filter((payment) => payment.customerId === customerId)
    .reduce((total, payment) => total.plus(payment.amount), moneyZero);
  const storeCredit = returns
    .filter((entry) => entry.customerId === customerId)
    .flatMap((entry) => entry.refunds)
    .filter((refund) => refund.method === "STORE_CREDIT")
    .reduce((total, refund) => total.plus(refund.amount), moneyZero);

  return toMoney(customer.openingBalance.plus(credits).minus(paid).minus(storeCredit));
}

export async function getSupplierPayable(storeId: string, supplierId: string) {
  const supplier = await getSupplier(supplierId);
  if (!supplier || supplier.storeId !== storeId) {
    throw new Error("Supplier not found.");
  }

  const [purchases, payments] = await Promise.all([
    listPurchases(storeId),
    listSupplierPayments(storeId),
  ]);

  const purchased = purchases
    .filter(
      (purchase) =>
        purchase.supplierId === supplierId &&
        (purchase.status === "RECEIVED" || purchase.status === "COMPLETED"),
    )
    .reduce((total, purchase) => total.plus(purchase.total), moneyZero);
  const paid = payments
    .filter((payment) => payment.supplierId === supplierId)
    .reduce((total, payment) => total.plus(payment.amount), moneyZero);

  return toMoney(supplier.openingBalance.plus(purchased).minus(paid));
}

export function assertCreditLimit(
  outstanding: Decimal,
  extraCredit: Decimal,
  creditLimit: Decimal | null,
) {
  if (!creditLimit) {
    return;
  }
  if (outstanding.plus(extraCredit).gt(creditLimit)) {
    throw new Error("Customer credit limit exceeded.");
  }
}
