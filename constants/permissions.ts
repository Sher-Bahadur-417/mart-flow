export const ROLE_CODES = {
  SUPER_ADMIN: "SUPER_ADMIN",
  OWNER: "OWNER",
  MANAGER: "MANAGER",
  CASHIER: "CASHIER",
  INVENTORY_STAFF: "INVENTORY_STAFF",
  ACCOUNTANT: "ACCOUNTANT",
} as const;

export type RoleCode = (typeof ROLE_CODES)[keyof typeof ROLE_CODES];

export const PERMISSION_CODES = {
  products: "products",
  inventory: "inventory",
  sales: "sales",
  purchases: "purchases",
  customers: "customers",
  suppliers: "suppliers",
  expenses: "expenses",
  reports: "reports",
  users: "users",
  settings: "settings",
} as const;

export type PermissionCode =
  (typeof PERMISSION_CODES)[keyof typeof PERMISSION_CODES];

export const ALL_PERMISSIONS: PermissionCode[] = Object.values(PERMISSION_CODES);

export const PERMISSION_LABELS: Record<PermissionCode, string> = {
  products: "Products",
  inventory: "Inventory",
  sales: "Sales / POS",
  purchases: "Purchases",
  customers: "Customers",
  suppliers: "Suppliers",
  expenses: "Expenses",
  reports: "Reports",
  users: "Employees",
  settings: "Settings",
};

export const ROLE_PERMISSIONS: Record<RoleCode, PermissionCode[]> = {
  SUPER_ADMIN: [...ALL_PERMISSIONS],
  OWNER: [...ALL_PERMISSIONS],
  MANAGER: [
    "products",
    "inventory",
    "sales",
    "purchases",
    "customers",
    "suppliers",
    "expenses",
    "reports",
    "users",
  ],
  CASHIER: ["sales", "customers"],
  INVENTORY_STAFF: ["products", "inventory", "purchases", "suppliers"],
  ACCOUNTANT: ["expenses", "reports"],
};

export const ROUTE_PERMISSIONS: Record<string, PermissionCode | null> = {
  "/dashboard": null,
  "/pos": "sales",
  "/products": "products",
  "/categories": "products",
  "/inventory": "inventory",
  "/sales": "sales",
  "/returns": "sales",
  "/purchases": "purchases",
  "/suppliers": "suppliers",
  "/customers": "customers",
  "/khata": "customers",
  "/expenses": "expenses",
  "/employees": "users",
  "/reports": "reports",
  "/settings": "settings",
  "/access-denied": null,
};

export function canAccess(
  roleCode: string,
  permissions: string[],
  required?: PermissionCode | null,
) {
  if (!required) {
    return true;
  }

  if (roleCode === ROLE_CODES.SUPER_ADMIN || roleCode === ROLE_CODES.OWNER) {
    return true;
  }

  return permissions.includes(required);
}
