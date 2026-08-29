import type { PermissionCode } from "@/constants/permissions";

export const APP_NAME = "MartFlow";
export const APP_DESCRIPTION = "Production-ready mart management system.";
export const DEFAULT_STORE_LABEL = "Main Store";

export type NavIconName =
  | "layout-dashboard"
  | "monitor"
  | "package"
  | "tags"
  | "warehouse"
  | "receipt"
  | "undo-2"
  | "shopping-cart"
  | "truck"
  | "users"
  | "book-open"
  | "wallet"
  | "user-cog"
  | "bar-chart-3"
  | "settings";

export type NavItem = {
  title: string;
  href: string;
  icon: NavIconName;
  phase: number;
  permission?: PermissionCode;
};

export type NavGroup = {
  title: string;
  items: NavItem[];
};

export const NAV_GROUPS: NavGroup[] = [
  {
    title: "Overview",
    items: [
      {
        title: "Dashboard",
        href: "/dashboard",
        icon: "layout-dashboard",
        phase: 0,
      },
      { title: "POS", href: "/pos", icon: "monitor", phase: 4, permission: "sales" },
    ],
  },
  {
    title: "Catalog",
    items: [
      {
        title: "Products",
        href: "/products",
        icon: "package",
        phase: 3,
        permission: "products",
      },
      {
        title: "Categories",
        href: "/categories",
        icon: "tags",
        phase: 3,
        permission: "products",
      },
      {
        title: "Inventory",
        href: "/inventory",
        icon: "warehouse",
        phase: 3,
        permission: "inventory",
      },
    ],
  },
  {
    title: "Commerce",
    items: [
      { title: "Sales", href: "/sales", icon: "receipt", phase: 5, permission: "sales" },
      { title: "Returns", href: "/returns", icon: "undo-2", phase: 5, permission: "sales" },
      {
        title: "Purchases",
        href: "/purchases",
        icon: "shopping-cart",
        phase: 6,
        permission: "purchases",
      },
      { title: "Suppliers", href: "/suppliers", icon: "truck", phase: 6, permission: "suppliers" },
      { title: "Customers", href: "/customers", icon: "users", phase: 7, permission: "customers" },
      { title: "Khata", href: "/khata", icon: "book-open", phase: 7, permission: "customers" },
    ],
  },
  {
    title: "Finance",
    items: [
      { title: "Expenses", href: "/expenses", icon: "wallet", phase: 8, permission: "expenses" },
      { title: "Reports", href: "/reports", icon: "bar-chart-3", phase: 9, permission: "reports" },
    ],
  },
  {
    title: "Admin",
    items: [
      { title: "Employees", href: "/employees", icon: "user-cog", phase: 10, permission: "users" },
      { title: "Settings", href: "/settings", icon: "settings", phase: 1, permission: "settings" },
    ],
  },
];

export function findNavItem(pathname: string): NavItem | undefined {
  return NAV_GROUPS.flatMap((group) => group.items).find(
    (item) => pathname === item.href || pathname.startsWith(`${item.href}/`),
  );
}
