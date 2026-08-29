import assert from "node:assert/strict";
import test from "node:test";

import { canAccess, ROLE_PERMISSIONS } from "../constants/permissions";

test("dashboard is open to any authenticated role", () => {
  assert.equal(canAccess("CASHIER", ["sales"], null), true);
});

test("super admin bypasses permission lists", () => {
  assert.equal(canAccess("SUPER_ADMIN", [], "settings"), true);
});

test("owner bypasses permission lists", () => {
  assert.equal(canAccess("OWNER", [], "settings"), true);
  assert.equal(canAccess("OWNER", [], "users"), true);
});

test("cashier cannot open settings", () => {
  assert.equal(canAccess("CASHIER", ["sales", "customers"], "settings"), false);
});

test("cashier can open POS via sales", () => {
  assert.equal(canAccess("CASHIER", ["sales", "customers"], "sales"), true);
});

test("inventory staff cannot open sales", () => {
  assert.equal(
    canAccess("INVENTORY_STAFF", ["products", "inventory"], "sales"),
    false,
  );
});

test("manager can manage employees but not settings", () => {
  assert.equal(canAccess("MANAGER", ROLE_PERMISSIONS.MANAGER, "users"), true);
  assert.equal(canAccess("MANAGER", ROLE_PERMISSIONS.MANAGER, "settings"), false);
});

test("accountant can open reports but not POS", () => {
  assert.equal(canAccess("ACCOUNTANT", ROLE_PERMISSIONS.ACCOUNTANT, "reports"), true);
  assert.equal(canAccess("ACCOUNTANT", ROLE_PERMISSIONS.ACCOUNTANT, "expenses"), true);
  assert.equal(canAccess("ACCOUNTANT", ROLE_PERMISSIONS.ACCOUNTANT, "sales"), false);
});
