import { toQty, type DecimalInput } from "@/lib/utils/money";

export function nextStockQuantity(
  current: DecimalInput,
  delta: DecimalInput,
  allowNegative = false,
) {
  const change = toQty(delta);
  if (change.isZero()) {
    throw new Error("Stock change quantity cannot be zero.");
  }

  const nextQuantity = toQty(toQty(current).plus(change));
  if (nextQuantity.lt(0) && !allowNegative) {
    throw new Error("Insufficient stock for this operation.");
  }

  return nextQuantity;
}
