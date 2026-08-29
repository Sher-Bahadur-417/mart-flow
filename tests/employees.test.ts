import assert from "node:assert/strict";
import test from "node:test";

import { ROLE_CODES } from "../constants/permissions";
import {
  assignableRoles,
  canAssignRole,
  canManageTarget,
  grantablePermissions,
  wouldRemoveLastOwner,
} from "../lib/employees/rules";

test("owner can assign owner and staff roles", () => {
  assert.deepEqual(assignableRoles(ROLE_CODES.OWNER), [
    ROLE_CODES.OWNER,
    ROLE_CODES.MANAGER,
    ROLE_CODES.CASHIER,
    ROLE_CODES.INVENTORY_STAFF,
    ROLE_CODES.ACCOUNTANT,
  ]);
  assert.equal(canAssignRole(ROLE_CODES.OWNER, ROLE_CODES.OWNER), true);
  assert.equal(canAssignRole(ROLE_CODES.MANAGER, ROLE_CODES.OWNER), false);
  assert.equal(canAssignRole(ROLE_CODES.MANAGER, ROLE_CODES.CASHIER), true);
});

test("manager cannot edit an owner or super admin", () => {
  assert.equal(canManageTarget(ROLE_CODES.MANAGER, ROLE_CODES.OWNER), false);
  assert.equal(canManageTarget(ROLE_CODES.MANAGER, ROLE_CODES.SUPER_ADMIN), false);
  assert.equal(canManageTarget(ROLE_CODES.MANAGER, ROLE_CODES.CASHIER), true);
  assert.equal(canManageTarget(ROLE_CODES.OWNER, ROLE_CODES.OWNER), true);
});

test("manager cannot grant settings", () => {
  const granted = grantablePermissions(ROLE_CODES.MANAGER, [
    "products",
    "users",
    "settings",
  ]);
  assert.equal(granted.includes("settings"), false);
  assert.equal(granted.includes("users"), true);
});

test("deactivating the last active owner is blocked", () => {
  assert.equal(
    wouldRemoveLastOwner({
      targetRoleCode: ROLE_CODES.OWNER,
      targetIsActive: true,
      nextIsActive: false,
      otherActiveOwnerCount: 0,
    }),
    true,
  );
});

test("demoting the last active owner is blocked", () => {
  assert.equal(
    wouldRemoveLastOwner({
      targetRoleCode: ROLE_CODES.OWNER,
      targetIsActive: true,
      nextRoleCode: ROLE_CODES.MANAGER,
      otherActiveOwnerCount: 0,
    }),
    true,
  );
});

test("another active owner can be deactivated or demoted", () => {
  assert.equal(
    wouldRemoveLastOwner({
      targetRoleCode: ROLE_CODES.OWNER,
      targetIsActive: true,
      nextIsActive: false,
      otherActiveOwnerCount: 1,
    }),
    false,
  );
  assert.equal(
    wouldRemoveLastOwner({
      targetRoleCode: ROLE_CODES.CASHIER,
      targetIsActive: true,
      nextIsActive: false,
      otherActiveOwnerCount: 0,
    }),
    false,
  );
});
