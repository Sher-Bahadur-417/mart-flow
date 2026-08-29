import assert from "node:assert/strict";
import test from "node:test";

import { nextStockQuantity } from "../lib/inventory/stock-math";

test("stock movement applies a signed delta", () => {
  assert.equal(nextStockQuantity("10", "-3").toFixed(3), "7.000");
  assert.equal(nextStockQuantity("7", "2").toFixed(3), "9.000");
});

test("stock cannot go negative unless allowed", () => {
  assert.throws(() => nextStockQuantity("2", "-3"));
  assert.equal(nextStockQuantity("2", "-3", true).toFixed(3), "-1.000");
});

test("zero quantity movements are rejected", () => {
  assert.throws(() => nextStockQuantity("5", "0"));
});
