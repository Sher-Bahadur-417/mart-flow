import { moneyZero, toMoney, toQty, type DecimalInput } from "@/lib/utils/money";

export type SaleLineInput = {
  quantity: DecimalInput;
  unitPrice: DecimalInput;
  discount?: DecimalInput;
  taxRate?: DecimalInput;
  costPrice?: DecimalInput;
};

export function computeSaleLine(input: SaleLineInput) {
  const quantity = toQty(input.quantity);
  const unitPrice = toMoney(input.unitPrice);
  const discount = toMoney(input.discount ?? 0);
  const taxRate = toMoney(input.taxRate ?? 0);
  const costPrice = toMoney(input.costPrice ?? 0);

  if (quantity.lte(0)) {
    throw new Error("Quantity must be greater than zero.");
  }

  const net = toMoney(unitPrice.minus(discount));
  if (net.lt(0)) {
    throw new Error("Discount cannot exceed price.");
  }

  const lineNet = toMoney(net.times(quantity));
  const tax = toMoney(lineNet.times(taxRate).dividedBy(100));
  const lineTotal = toMoney(lineNet.plus(tax));
  const cogs = toMoney(costPrice.times(quantity));

  return {
    quantity,
    unitPrice,
    costPrice,
    discount: toMoney(discount.times(quantity)),
    tax,
    lineTotal,
    cogs,
  };
}

export function computeSaleTotals(
  lines: Array<ReturnType<typeof computeSaleLine>>,
) {
  const subtotal = lines.reduce(
    (total, line) => total.plus(line.unitPrice.times(line.quantity)),
    moneyZero,
  );
  const discountTotal = lines.reduce(
    (total, line) => total.plus(line.discount),
    moneyZero,
  );
  const taxTotal = lines.reduce((total, line) => total.plus(line.tax), moneyZero);
  const cogs = lines.reduce((total, line) => total.plus(line.cogs), moneyZero);
  const total = toMoney(subtotal.minus(discountTotal).plus(taxTotal));

  return {
    subtotal: toMoney(subtotal),
    discountTotal: toMoney(discountTotal),
    taxTotal: toMoney(taxTotal),
    total,
    cogs: toMoney(cogs),
  };
}

export function computeProfit(
  revenue: DecimalInput,
  cogs: DecimalInput,
  expenses: DecimalInput,
) {
  return toMoney(toMoney(revenue).minus(toMoney(cogs)).minus(toMoney(expenses)));
}
