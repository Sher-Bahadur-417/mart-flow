import { Decimal, type DecimalInput } from "@/lib/utils/decimal";

export type { DecimalInput };
export { Decimal };

export const moneyZero = new Decimal(0);
export const qtyZero = new Decimal(0);

export function toMoney(value: DecimalInput) {
  return new Decimal(value).toDecimalPlaces(2);
}

export function toQty(value: DecimalInput) {
  return new Decimal(value).toDecimalPlaces(3);
}

export function sumMoney(values: Decimal[]) {
  return values.reduce((total, value) => total.plus(value), moneyZero);
}

export function formatMoney(value: DecimalInput, currency = "Rs") {
  return `${currency} ${toMoney(value).toFixed(2)}`;
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
