import "server-only";

import {
  ALL_PERMISSIONS,
  ROLE_CODES,
  ROLE_PERMISSIONS,
  type PermissionCode,
  type RoleCode,
} from "@/constants/permissions";
import type { RoleDoc } from "@/lib/data/types";
import { firestore } from "@/lib/firebase-admin";

export const ROLE_META: Record<RoleCode, { name: string; description: string }> = {
  SUPER_ADMIN: {
    name: "Super Admin",
    description: "Full access across stores.",
  },
  OWNER: {
    name: "Owner",
    description: "Full access for a store.",
  },
  MANAGER: {
    name: "Manager",
    description: "Operations, sales, inventory, and employee management.",
  },
  CASHIER: {
    name: "Cashier",
    description: "POS, sales, and customers.",
  },
  INVENTORY_STAFF: {
    name: "Inventory Staff",
    description: "Catalog, stock, purchases, and suppliers.",
  },
  ACCOUNTANT: {
    name: "Accountant",
    description: "Expenses, finance, and reports.",
  },
};

export function listRoleDocs(excludeSuperAdmin = false): RoleDoc[] {
  return (Object.keys(ROLE_CODES) as RoleCode[])
    .filter((code) => !excludeSuperAdmin || code !== ROLE_CODES.SUPER_ADMIN)
    .map((code) => ({
      id: code,
      code,
      name: ROLE_META[code].name,
      description: ROLE_META[code].description,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function getRoleDoc(code: string): RoleDoc | null {
  if (!(code in ROLE_CODES)) {
    return null;
  }
  const roleCode = code as RoleCode;
  return {
    id: roleCode,
    code: roleCode,
    name: ROLE_META[roleCode].name,
    description: ROLE_META[roleCode].description,
  };
}

export async function ensureRolesAndPermissions() {
  const batch = firestore.batch();

  for (const code of ALL_PERMISSIONS) {
    batch.set(
      firestore.collection("permissions").doc(code),
      { id: code, code, name: code },
      { merge: true },
    );
  }

  for (const code of Object.keys(ROLE_CODES) as RoleCode[]) {
    batch.set(
      firestore.collection("roles").doc(code),
      {
        id: code,
        code,
        name: ROLE_META[code].name,
        description: ROLE_META[code].description,
        permissions: ROLE_PERMISSIONS[code],
      },
      { merge: true },
    );
    for (const permission of ROLE_PERMISSIONS[code]) {
      batch.set(firestore.collection("rolePermissions").doc(`${code}_${permission}`), {
        roleId: code,
        permissionId: permission,
        permissionCode: permission,
      });
    }
  }

  await batch.commit();

  const ownerRole = getRoleDoc(ROLE_CODES.OWNER);
  if (!ownerRole) {
    throw new Error("Owner role could not be created.");
  }

  const permissionByCode = new Map(
    ALL_PERMISSIONS.map((code: PermissionCode) => [code, { id: code, code, name: code }]),
  );

  return { ownerRole, permissionByCode };
}
