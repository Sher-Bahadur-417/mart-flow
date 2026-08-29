import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

import {
  ALL_PERMISSIONS,
  ROLE_CODES,
  ROLE_PERMISSIONS,
  type PermissionCode,
  type RoleCode,
} from "../constants/permissions";
import { slugify } from "../lib/utils/money";

const prisma = new PrismaClient();

const ROLE_META: Record<RoleCode, { name: string; description: string }> = {
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

const PERMISSION_META: Record<PermissionCode, string> = {
  products: "Manage products and categories",
  inventory: "Manage stock and adjustments",
  sales: "POS, sales, and returns",
  purchases: "Purchase orders and receiving",
  customers: "Customers and khata",
  suppliers: "Supplier records",
  expenses: "Expense records",
  reports: "Reports and exports",
  users: "Users, roles, and employees",
  settings: "Store and system settings",
};

async function main() {
  const password = process.env.SEED_USER_PASSWORD ?? "ChangeMe!123";
  const passwordHash = await hash(password, 12);

  const store = await prisma.store.upsert({
    where: { slug: "main" },
    update: { name: "Main Store", isActive: true },
    create: { name: "Main Store", slug: "main" },
  });

  const permissions = await Promise.all(
    ALL_PERMISSIONS.map((code) =>
      prisma.permission.upsert({
        where: { code },
        update: { name: code, description: PERMISSION_META[code] },
        create: { code, name: code, description: PERMISSION_META[code] },
      }),
    ),
  );

  const permissionByCode = new Map(permissions.map((item) => [item.code, item]));

  const roles = await Promise.all(
    (Object.keys(ROLE_CODES) as RoleCode[]).map((code) =>
      prisma.role.upsert({
        where: { code },
        update: ROLE_META[code],
        create: { code, ...ROLE_META[code] },
      }),
    ),
  );

  for (const role of roles) {
    const allowed = ROLE_PERMISSIONS[role.code as RoleCode];
    await prisma.rolePermission.deleteMany({ where: { roleId: role.id } });
    await prisma.rolePermission.createMany({
      data: allowed.map((code) => ({
        roleId: role.id,
        permissionId: permissionByCode.get(code)!.id,
      })),
    });
  }

  const roleByCode = new Map(roles.map((role) => [role.code, role]));

  const users: Array<{
    email: string;
    username: string;
    name: string;
    role: RoleCode;
    jobTitle: string;
    employeeCode: string;
  }> = [
    {
      email: "admin@martflow.local",
      username: "admin",
      name: "Super Admin",
      role: "SUPER_ADMIN",
      jobTitle: "Administrator",
      employeeCode: "EMP-000001",
    },
    {
      email: "owner@martflow.local",
      username: "owner",
      name: "Store Owner",
      role: "OWNER",
      jobTitle: "Owner",
      employeeCode: "EMP-000002",
    },
    {
      email: "manager@martflow.local",
      username: "manager",
      name: "Store Manager",
      role: "MANAGER",
      jobTitle: "Manager",
      employeeCode: "EMP-000003",
    },
    {
      email: "cashier@martflow.local",
      username: "cashier",
      name: "Cashier",
      role: "CASHIER",
      jobTitle: "Cashier",
      employeeCode: "EMP-000004",
    },
    {
      email: "inventory@martflow.local",
      username: "inventory",
      name: "Inventory Staff",
      role: "INVENTORY_STAFF",
      jobTitle: "Inventory",
      employeeCode: "EMP-000005",
    },
    {
      email: "accountant@martflow.local",
      username: "accountant",
      name: "Store Accountant",
      role: "ACCOUNTANT",
      jobTitle: "Accountant",
      employeeCode: "EMP-000006",
    },
  ];

  const seededUsers = [];
  for (const user of users) {
    const record = await prisma.user.upsert({
      where: { email: user.email },
      update: {
        name: user.name,
        username: user.username,
        roleId: roleByCode.get(user.role)!.id,
        storeId: store.id,
        isActive: true,
        passwordHash,
      },
      create: {
        email: user.email,
        username: user.username,
        name: user.name,
        roleId: roleByCode.get(user.role)!.id,
        storeId: store.id,
        passwordHash,
      },
    });
    await prisma.employee.upsert({
      where: { userId: record.id },
      update: {
        jobTitle: user.jobTitle,
        isActive: true,
        storeId: store.id,
      },
      create: {
        storeId: store.id,
        userId: record.id,
        jobTitle: user.jobTitle,
        employeeCode: user.employeeCode,
        hireDate: new Date(),
      },
    });
    const allowed = ROLE_PERMISSIONS[user.role];
    await prisma.userPermission.deleteMany({ where: { userId: record.id } });
    await prisma.userPermission.createMany({
      data: allowed.map((code) => ({
        userId: record.id,
        permissionId: permissionByCode.get(code)!.id,
      })),
    });
    seededUsers.push(record);
  }

  await prisma.counter.upsert({
    where: { storeId_key: { storeId: store.id, key: "employee" } },
    update: { value: users.length },
    create: { storeId: store.id, key: "employee", value: users.length },
  });

  const inventoryUser =
    seededUsers.find((user) => user.email === "inventory@martflow.local") ??
    seededUsers[0];

  await prisma.setting.upsert({
    where: { storeId_key: { storeId: store.id, key: "receipt_footer" } },
    update: { value: "Thank you for shopping at Main Store." },
    create: {
      storeId: store.id,
      key: "receipt_footer",
      value: "Thank you for shopping at Main Store.",
    },
  });

  const units = await Promise.all(
    [
      { name: "Piece", abbreviation: "pcs" },
      { name: "Kilogram", abbreviation: "kg" },
      { name: "Litre", abbreviation: "L" },
    ].map((unit) =>
      prisma.unit.upsert({
        where: {
          storeId_abbreviation: { storeId: store.id, abbreviation: unit.abbreviation },
        },
        update: { name: unit.name },
        create: { storeId: store.id, ...unit },
      }),
    ),
  );

  const categories = await Promise.all(
    ["Groceries", "Beverages", "Household"].map((name) =>
      prisma.category.upsert({
        where: { storeId_slug: { storeId: store.id, slug: slugify(name) } },
        update: { name },
        create: { storeId: store.id, name, slug: slugify(name) },
      }),
    ),
  );

  const catalog = [
    {
      name: "Wheat Flour 10kg",
      sku: "GRO-FLOUR-10",
      barcode: "8901000000011",
      purchasePrice: "780.00",
      sellingPrice: "890.00",
      minStock: "5",
      quantity: "24",
      category: "Groceries",
      unit: "pcs",
    },
    {
      name: "Basmati Rice 5kg",
      sku: "GRO-RICE-5",
      barcode: "8901000000028",
      purchasePrice: "920.00",
      sellingPrice: "1090.00",
      minStock: "4",
      quantity: "18",
      category: "Groceries",
      unit: "pcs",
    },
    {
      name: "Cooking Oil 1L",
      sku: "GRO-OIL-1",
      barcode: "8901000000035",
      purchasePrice: "410.00",
      sellingPrice: "480.00",
      minStock: "8",
      quantity: "40",
      category: "Groceries",
      unit: "L",
    },
    {
      name: "Cola 1.5L",
      sku: "BEV-COLA-15",
      barcode: "8901000000042",
      purchasePrice: "95.00",
      sellingPrice: "130.00",
      minStock: "12",
      quantity: "60",
      category: "Beverages",
      unit: "pcs",
    },
    {
      name: "Mineral Water 6-pack",
      sku: "BEV-WATER-6",
      barcode: "8901000000059",
      purchasePrice: "140.00",
      sellingPrice: "180.00",
      minStock: "10",
      quantity: "36",
      category: "Beverages",
      unit: "pcs",
    },
    {
      name: "Dish Soap 500ml",
      sku: "HH-SOAP-500",
      barcode: "8901000000066",
      purchasePrice: "85.00",
      sellingPrice: "120.00",
      minStock: "6",
      quantity: "28",
      category: "Household",
      unit: "pcs",
    },
  ];

  const unitByAbbr = new Map(units.map((unit) => [unit.abbreviation, unit]));
  const categoryByName = new Map(categories.map((category) => [category.name, category]));

  for (const item of catalog) {
    const product = await prisma.product.upsert({
      where: { storeId_sku: { storeId: store.id, sku: item.sku } },
      update: {
        name: item.name,
        purchasePrice: item.purchasePrice,
        sellingPrice: item.sellingPrice,
        minStock: item.minStock,
        categoryId: categoryByName.get(item.category)!.id,
        unitId: unitByAbbr.get(item.unit)!.id,
        isActive: true,
      },
      create: {
        storeId: store.id,
        name: item.name,
        sku: item.sku,
        purchasePrice: item.purchasePrice,
        sellingPrice: item.sellingPrice,
        minStock: item.minStock,
        categoryId: categoryByName.get(item.category)!.id,
        unitId: unitByAbbr.get(item.unit)!.id,
      },
    });

    await prisma.productBarcode.upsert({
      where: { storeId_code: { storeId: store.id, code: item.barcode } },
      update: { productId: product.id },
      create: { storeId: store.id, productId: product.id, code: item.barcode },
    });

    const inventory = await prisma.inventory.upsert({
      where: { productId: product.id },
      update: {},
      create: {
        storeId: store.id,
        productId: product.id,
        quantity: item.quantity,
      },
    });

    const movementCount = await prisma.inventoryMovement.count({
      where: { productId: product.id, type: "ADJUSTMENT", reason: "Opening stock" },
    });
    if (movementCount === 0 && Number(inventory.quantity) > 0) {
      await prisma.inventoryMovement.create({
        data: {
          storeId: store.id,
          productId: product.id,
          type: "ADJUSTMENT",
          quantity: item.quantity,
          reason: "Opening stock",
          createdById: inventoryUser.id,
        },
      });
    }
  }

  await prisma.customer.upsert({
    where: { id: "seed-customer-walkin" },
    update: { name: "Walk-in credit", phone: "03000000001" },
    create: {
      id: "seed-customer-walkin",
      storeId: store.id,
      name: "Ayesha Khan",
      phone: "03000000001",
      openingBalance: "0",
      creditLimit: "15000",
    },
  });

  await prisma.supplier.upsert({
    where: { id: "seed-supplier-main" },
    update: { name: "Metro Wholesale" },
    create: {
      id: "seed-supplier-main",
      storeId: store.id,
      name: "Metro Wholesale",
      phone: "04200000001",
      openingBalance: "0",
    },
  });

  for (const name of ["Rent", "Utilities", "Transport"]) {
    await prisma.expenseCategory.upsert({
      where: { storeId_name: { storeId: store.id, name } },
      update: {},
      create: { storeId: store.id, name },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
