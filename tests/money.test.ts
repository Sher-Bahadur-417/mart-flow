import assert from "node:assert/strict";
import test from "node:test";

import { computeProfit, computeSaleLine, computeSaleTotals } from "../lib/sales/pricing";
import { toMoney } from "../lib/utils/money";

test("sale line rounds money to two decimals and qty to three", () => {
  const line = computeSaleLine({
    quantity: "2.5",
    unitPrice: "100.00",
    discount: "5",
    taxRate: "10",
    costPrice: "60",
  });

  assert.equal(line.quantity.toFixed(3), "2.500");
  assert.equal(line.discount.toFixed(2), "12.50");
  assert.equal(line.tax.toFixed(2), "23.75");
  assert.equal(line.lineTotal.toFixed(2), "261.25");
  assert.equal(line.cogs.toFixed(2), "150.00");
});

test("profit equals revenue minus COGS minus expenses", () => {
  const profit = computeProfit("1000.00", "400.00", "150.00");
  assert.equal(profit.toFixed(2), "450.00");
});

test("sale totals match summed lines", () => {
  const lines = [
    computeSaleLine({
      quantity: 1,
      unitPrice: "100",
      discount: "0",
      taxRate: "0",
      costPrice: "40",
    }),
    computeSaleLine({
      quantity: 2,
      unitPrice: "50",
      discount: "5",
      taxRate: "0",
      costPrice: "20",
    }),
  ];
  const totals = computeSaleTotals(lines);
  assert.equal(totals.subtotal.toFixed(2), "200.00");
  assert.equal(totals.discountTotal.toFixed(2), "10.00");
  assert.equal(totals.total.toFixed(2), "190.00");
  assert.equal(totals.cogs.toFixed(2), "80.00");
  assert.equal(computeProfit(totals.total, totals.cogs, "10").equals(toMoney("100")), true);
});

test("discount cannot exceed unit price", () => {
  assert.throws(() =>
    computeSaleLine({
      quantity: 1,
      unitPrice: "10",
      discount: "11",
    }),
  );
});
