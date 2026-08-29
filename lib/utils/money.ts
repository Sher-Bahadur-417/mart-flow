import { Prisma } from "@prisma/client";

export type DecimalInput = string | number | Prisma.Decimal;

export const moneyZero = new Prisma.Decimal(0);
export const qtyZero = new Prisma.Decimal(0);

export function toMoney(value: DecimalInput) {
  return new Prisma.Decimal(value).toDecimalPlaces(2);
}

export function toQty(value: DecimalInput) {
  return new Prisma.Decimal(value).toDecimalPlaces(3);
}

export function sumMoney(values: Prisma.Decimal[]) {
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
