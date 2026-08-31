import "server-only";

import type { DocumentData } from "firebase-admin/firestore";

import {
  asDate,
  asDateOrNull,
  collections,
  hydrateDoc,
  listByStore,
  newId,
} from "@/lib/data/fs";
import type {
  AuditLogDoc,
  BrandDoc,
  CategoryDoc,
  CustomerDoc,
  CustomerPaymentDoc,
  EmployeeDoc,
  ExpenseCategoryDoc,
  ExpenseDoc,
  HeldCartDoc,
  InventoryDoc,
  NotificationDoc,
  ProductDoc,
  ProductWithRelations,
  PurchaseDoc,
  ReturnDoc,
  SaleDoc,
  SettingDoc,
  StoreDoc,
  SupplierDoc,
  SupplierPaymentDoc,
  UnitDoc,
  UserDoc,
} from "@/lib/data/types";
import { firestore } from "@/lib/firebase-admin";
import { toMoney, toQty } from "@/lib/utils/money";

function moneyField(value: unknown, fallback = "0") {
  return toMoney(String(value ?? fallback));
}

function qtyField(value: unknown, fallback = "0") {
  return toQty(String(value ?? fallback));
}

function optionalMoney(value: unknown) {
  if (value == null || value === "") {
    return null;
  }
  return toMoney(String(value));
}

export function hydrateStore(id: string, data: DocumentData): StoreDoc {
  return hydrateDoc<StoreDoc>(id, data, { dates: ["createdAt", "updatedAt"] });
}

export function hydrateUser(id: string, data: DocumentData): UserDoc {
  return {
    id,
    storeId: (data.storeId as string | null) ?? null,
    roleId: String(data.roleId ?? data.roleCode ?? ""),
    roleCode: String(data.roleCode ?? ""),
    roleName: String(data.roleName ?? ""),
    name: String(data.name ?? ""),
    email: String(data.email ?? ""),
    username: String(data.username ?? ""),
    phone: (data.phone as string | null) ?? null,
    permissions: Array.isArray(data.permissions)
      ? data.permissions.map(String)
      : [],
    isActive: data.isActive !== false,
    lastLoginAt: asDateOrNull(data.lastLoginAt),
    createdAt: asDate(data.createdAt),
    updatedAt: asDate(data.updatedAt),
  };
}

export function hydrateEmployee(id: string, data: DocumentData): EmployeeDoc {
  return {
    id,
    storeId: String(data.storeId ?? ""),
    userId: String(data.userId ?? ""),
    employeeCode: String(data.employeeCode ?? ""),
    phone: (data.phone as string | null) ?? null,
    jobTitle: (data.jobTitle as string | null) ?? null,
    hireDate: asDateOrNull(data.hireDate),
    salary: optionalMoney(data.salary),
    isActive: data.isActive !== false,
    createdAt: asDate(data.createdAt),
    updatedAt: asDate(data.updatedAt),
  };
}

export function hydrateSetting(id: string, data: DocumentData): SettingDoc {
  return {
    id,
    storeId: String(data.storeId ?? ""),
    key: String(data.key ?? ""),
    value: String(data.value ?? ""),
  };
}

export function hydrateUnit(id: string, data: DocumentData): UnitDoc {
  return {
    id,
    storeId: String(data.storeId ?? ""),
    name: String(data.name ?? ""),
    abbreviation: String(data.abbreviation ?? ""),
  };
}

export function hydrateCategory(id: string, data: DocumentData): CategoryDoc {
  return hydrateDoc<CategoryDoc>(id, data, { dates: ["createdAt", "updatedAt"] });
}

export function hydrateBrand(id: string, data: DocumentData): BrandDoc {
  return hydrateDoc<BrandDoc>(id, data, { dates: ["createdAt", "updatedAt"] });
}

export function hydrateProduct(id: string, data: DocumentData): ProductDoc {
  return {
    id,
    storeId: String(data.storeId ?? ""),
    name: String(data.name ?? ""),
    sku: String(data.sku ?? ""),
    categoryId: (data.categoryId as string | null) ?? null,
    brandId: (data.brandId as string | null) ?? null,
    unitId: (data.unitId as string | null) ?? null,
    purchasePrice: moneyField(data.purchasePrice),
    sellingPrice: moneyField(data.sellingPrice),
    taxRate: moneyField(data.taxRate),
    discount: moneyField(data.discount),
    minStock: qtyField(data.minStock),
    maxStock: data.maxStock == null || data.maxStock === "" ? null : qtyField(data.maxStock),
    expiryDate: asDateOrNull(data.expiryDate),
    imageUrl: (data.imageUrl as string | null) ?? null,
    isActive: data.isActive !== false,
    barcodes: Array.isArray(data.barcodes) ? data.barcodes.map(String) : [],
    createdAt: asDate(data.createdAt),
    updatedAt: asDate(data.updatedAt),
  };
}

export function hydrateInventory(id: string, data: DocumentData): InventoryDoc {
  return {
    id,
    storeId: String(data.storeId ?? ""),
    productId: String(data.productId ?? id),
    quantity: qtyField(data.quantity),
    updatedAt: asDate(data.updatedAt),
  };
}

function hydrateLineItem(item: Record<string, unknown>) {
  return {
    id: String(item.id ?? ""),
    productId: String(item.productId ?? ""),
    name: String(item.name ?? ""),
    sku: String(item.sku ?? ""),
    quantity: qtyField(item.quantity),
    unitPrice: moneyField(item.unitPrice),
    costPrice: moneyField(item.costPrice),
    discount: moneyField(item.discount),
    tax: moneyField(item.tax),
    lineTotal: moneyField(item.lineTotal),
  };
}

export function hydrateSale(id: string, data: DocumentData): SaleDoc {
  return {
    id,
    storeId: String(data.storeId ?? ""),
    invoiceNumber: String(data.invoiceNumber ?? ""),
    cashierId: String(data.cashierId ?? ""),
    cashierName: String(data.cashierName ?? ""),
    customerId: (data.customerId as string | null) ?? null,
    customerName: (data.customerName as string | null) ?? null,
    status: (data.status as SaleDoc["status"]) ?? "COMPLETED",
    subtotal: moneyField(data.subtotal),
    discountTotal: moneyField(data.discountTotal),
    taxTotal: moneyField(data.taxTotal),
    total: moneyField(data.total),
    paidAmount: moneyField(data.paidAmount),
    creditAmount: moneyField(data.creditAmount),
    note: (data.note as string | null) ?? null,
    items: Array.isArray(data.items)
      ? data.items.map((item) => hydrateLineItem(item as Record<string, unknown>))
      : [],
    payments: Array.isArray(data.payments)
      ? data.payments.map((payment) => {
          const row = payment as Record<string, unknown>;
          return {
            id: String(row.id ?? ""),
            method: (row.method as SaleDoc["payments"][number]["method"]) ?? "CASH",
            amount: moneyField(row.amount),
          };
        })
      : [],
    createdAt: asDate(data.createdAt),
  };
}

export function hydrateReturn(id: string, data: DocumentData): ReturnDoc {
  return {
    id,
    storeId: String(data.storeId ?? ""),
    saleId: String(data.saleId ?? ""),
    invoiceNumber: String(data.invoiceNumber ?? ""),
    cashierId: String(data.cashierId ?? ""),
    cashierName: String(data.cashierName ?? ""),
    customerId: (data.customerId as string | null) ?? null,
    total: moneyField(data.total),
    note: (data.note as string | null) ?? null,
    items: Array.isArray(data.items)
      ? data.items.map((item) => {
          const row = item as Record<string, unknown>;
          return {
            id: String(row.id ?? ""),
            saleItemId: String(row.saleItemId ?? ""),
            productId: String(row.productId ?? ""),
            quantity: qtyField(row.quantity),
            unitPrice: moneyField(row.unitPrice),
            lineTotal: moneyField(row.lineTotal),
          };
        })
      : [],
    refunds: Array.isArray(data.refunds)
      ? data.refunds.map((refund) => {
          const row = refund as Record<string, unknown>;
          return {
            id: String(row.id ?? ""),
            method: (row.method as ReturnDoc["refunds"][number]["method"]) ?? "CASH",
            amount: moneyField(row.amount),
          };
        })
      : [],
    createdAt: asDate(data.createdAt),
  };
}

export function hydratePurchase(id: string, data: DocumentData): PurchaseDoc {
  return {
    id,
    storeId: String(data.storeId ?? ""),
    supplierId: String(data.supplierId ?? ""),
    supplierName: String(data.supplierName ?? ""),
    number: String(data.number ?? ""),
    status: (data.status as PurchaseDoc["status"]) ?? "DRAFT",
    subtotal: moneyField(data.subtotal),
    total: moneyField(data.total),
    note: (data.note as string | null) ?? null,
    orderedAt: asDateOrNull(data.orderedAt),
    receivedAt: asDateOrNull(data.receivedAt),
    createdById: String(data.createdById ?? ""),
    items: Array.isArray(data.items)
      ? data.items.map((item) => {
          const row = item as Record<string, unknown>;
          return {
            id: String(row.id ?? ""),
            productId: String(row.productId ?? ""),
            productName: String(row.productName ?? ""),
            quantityOrdered: qtyField(row.quantityOrdered),
            quantityReceived: qtyField(row.quantityReceived),
            unitCost: moneyField(row.unitCost),
            lineTotal: moneyField(row.lineTotal),
          };
        })
      : [],
    createdAt: asDate(data.createdAt),
    updatedAt: asDate(data.updatedAt),
  };
}

export function hydrateCustomer(id: string, data: DocumentData): CustomerDoc {
  return {
    id,
    storeId: String(data.storeId ?? ""),
    name: String(data.name ?? ""),
    phone: (data.phone as string | null) ?? null,
    email: (data.email as string | null) ?? null,
    address: (data.address as string | null) ?? null,
    openingBalance: moneyField(data.openingBalance),
    creditLimit: optionalMoney(data.creditLimit),
    isActive: data.isActive !== false,
    createdAt: asDate(data.createdAt),
    updatedAt: asDate(data.updatedAt),
  };
}

export function hydrateSupplier(id: string, data: DocumentData): SupplierDoc {
  return {
    id,
    storeId: String(data.storeId ?? ""),
    name: String(data.name ?? ""),
    phone: (data.phone as string | null) ?? null,
    email: (data.email as string | null) ?? null,
    address: (data.address as string | null) ?? null,
    openingBalance: moneyField(data.openingBalance),
    isActive: data.isActive !== false,
    createdAt: asDate(data.createdAt),
    updatedAt: asDate(data.updatedAt),
  };
}

export function hydrateCustomerPayment(
  id: string,
  data: DocumentData,
): CustomerPaymentDoc {
  return {
    id,
    storeId: String(data.storeId ?? ""),
    customerId: String(data.customerId ?? ""),
    amount: moneyField(data.amount),
    method: (data.method as CustomerPaymentDoc["method"]) ?? "CASH",
    note: (data.note as string | null) ?? null,
    createdById: String(data.createdById ?? ""),
    createdAt: asDate(data.createdAt),
  };
}

export function hydrateSupplierPayment(
  id: string,
  data: DocumentData,
): SupplierPaymentDoc {
  return {
    id,
    storeId: String(data.storeId ?? ""),
    supplierId: String(data.supplierId ?? ""),
    amount: moneyField(data.amount),
    method: (data.method as SupplierPaymentDoc["method"]) ?? "CASH",
    note: (data.note as string | null) ?? null,
    createdById: String(data.createdById ?? ""),
    createdAt: asDate(data.createdAt),
  };
}

export function hydrateExpenseCategory(
  id: string,
  data: DocumentData,
): ExpenseCategoryDoc {
  return {
    id,
    storeId: String(data.storeId ?? ""),
    name: String(data.name ?? ""),
  };
}

export function hydrateExpense(id: string, data: DocumentData): ExpenseDoc {
  return {
    id,
    storeId: String(data.storeId ?? ""),
    categoryId: String(data.categoryId ?? ""),
    categoryName: String(data.categoryName ?? ""),
    amount: moneyField(data.amount),
    date: asDate(data.date),
    method: (data.method as ExpenseDoc["method"]) ?? "CASH",
    description: (data.description as string | null) ?? null,
    createdById: String(data.createdById ?? ""),
    createdByName: String(data.createdByName ?? ""),
    createdAt: asDate(data.createdAt),
  };
}

export function hydrateNotification(
  id: string,
  data: DocumentData,
): NotificationDoc {
  return {
    id,
    storeId: String(data.storeId ?? ""),
    userId: (data.userId as string | null) ?? null,
    title: String(data.title ?? ""),
    body: String(data.body ?? ""),
    isRead: Boolean(data.isRead),
    createdAt: asDate(data.createdAt),
  };
}

export function hydrateAuditLog(id: string, data: DocumentData): AuditLogDoc {
  return {
    id,
    storeId: (data.storeId as string | null) ?? null,
    userId: (data.userId as string | null) ?? null,
    userName: (data.userName as string | null) ?? null,
    action: String(data.action ?? ""),
    entity: String(data.entity ?? ""),
    entityId: (data.entityId as string | null) ?? null,
    metadata: (data.metadata as Record<string, unknown> | null) ?? null,
    ipAddress: (data.ipAddress as string | null) ?? null,
    userAgent: (data.userAgent as string | null) ?? null,
    createdAt: asDate(data.createdAt),
  };
}

export function hydrateHeldCart(id: string, data: DocumentData): HeldCartDoc {
  return {
    id,
    storeId: String(data.storeId ?? ""),
    cashierId: String(data.cashierId ?? ""),
    customerId: (data.customerId as string | null) ?? null,
    label: (data.label as string | null) ?? null,
    payload: data.payload,
    createdAt: asDate(data.createdAt),
  };
}

export async function getStore(id: string) {
  const snap = await firestore.collection(collections.stores).doc(id).get();
  if (!snap.exists) {
    return null;
  }
  return hydrateStore(snap.id, snap.data() ?? {});
}

export async function getUser(id: string) {
  const snap = await firestore.collection(collections.users).doc(id).get();
  if (!snap.exists) {
    return null;
  }
  return hydrateUser(snap.id, snap.data() ?? {});
}

export async function findUserByUsername(username: string) {
  const snap = await firestore
    .collection(collections.users)
    .where("username", "==", username)
    .limit(1)
    .get();
  const doc = snap.docs[0];
  return doc ? hydrateUser(doc.id, doc.data()) : null;
}

export async function findUserByEmail(email: string) {
  const snap = await firestore
    .collection(collections.users)
    .where("email", "==", email)
    .limit(1)
    .get();
  const doc = snap.docs[0];
  return doc ? hydrateUser(doc.id, doc.data()) : null;
}

export async function findStoreBySlug(slug: string) {
  const snap = await firestore
    .collection(collections.stores)
    .where("slug", "==", slug)
    .limit(1)
    .get();
  const doc = snap.docs[0];
  return doc ? hydrateStore(doc.id, doc.data()) : null;
}

export async function listUsersByStore(storeId: string) {
  return listByStore(collections.users, storeId, hydrateUser);
}

export async function listEmployeesByStore(storeId: string) {
  return listByStore(collections.employees, storeId, hydrateEmployee);
}

export async function getEmployeeByUserId(userId: string) {
  const snap = await firestore
    .collection(collections.employees)
    .where("userId", "==", userId)
    .limit(1)
    .get();
  const doc = snap.docs[0];
  return doc ? hydrateEmployee(doc.id, doc.data()) : null;
}

export async function listSettings(storeId: string) {
  return listByStore(collections.settings, storeId, hydrateSetting);
}

export async function getSetting(storeId: string, key: string) {
  const snap = await firestore
    .collection(collections.settings)
    .doc(`${storeId}_${key}`)
    .get();
  if (!snap.exists) {
    return null;
  }
  return hydrateSetting(snap.id, snap.data() ?? {});
}

export async function listUnits(storeId: string) {
  return listByStore(collections.units, storeId, hydrateUnit);
}

export async function listCategories(storeId: string) {
  const rows = await listByStore(collections.categories, storeId, hydrateCategory);
  return rows.sort((a, b) => a.name.localeCompare(b.name));
}

export async function listBrands(storeId: string) {
  const rows = await listByStore(collections.brands, storeId, hydrateBrand);
  return rows.sort((a, b) => a.name.localeCompare(b.name));
}

export async function listProducts(storeId: string) {
  return listByStore(collections.products, storeId, hydrateProduct);
}

export async function getProduct(id: string) {
  const snap = await firestore.collection(collections.products).doc(id).get();
  if (!snap.exists) {
    return null;
  }
  return hydrateProduct(snap.id, snap.data() ?? {});
}

export async function listInventories(storeId: string) {
  return listByStore(collections.inventories, storeId, hydrateInventory);
}

export async function attachProductRelations(
  storeId: string,
  products: ProductDoc[],
): Promise<ProductWithRelations[]> {
  const [inventories, categories, brands, units] = await Promise.all([
    listInventories(storeId),
    listCategories(storeId),
    listBrands(storeId),
    listUnits(storeId),
  ]);
  const inventoryByProduct = new Map(inventories.map((row) => [row.productId, row]));
  const categoryById = new Map(categories.map((row) => [row.id, row]));
  const brandById = new Map(brands.map((row) => [row.id, row]));
  const unitById = new Map(units.map((row) => [row.id, row]));

  return products.map((product) => ({
    ...product,
    inventory: inventoryByProduct.get(product.id) ?? null,
    category: product.categoryId
      ? categoryById.get(product.categoryId) ?? null
      : null,
    brand: product.brandId ? brandById.get(product.brandId) ?? null : null,
    unit: product.unitId ? unitById.get(product.unitId) ?? null : null,
    barcodes: product.barcodes.map((code) => ({
      id: `${product.id}_${code}`,
      storeId: product.storeId,
      productId: product.id,
      code,
    })),
  }));
}

export async function getProductWithRelations(storeId: string, id: string) {
  const product = await getProduct(id);
  if (!product || product.storeId !== storeId) {
    return null;
  }
  const [hydrated] = await attachProductRelations(storeId, [product]);
  return hydrated ?? null;
}

export async function listCustomers(storeId: string) {
  const rows = await listByStore(collections.customers, storeId, hydrateCustomer);
  return rows.sort((a, b) => a.name.localeCompare(b.name));
}

export async function getCustomer(id: string) {
  const snap = await firestore.collection(collections.customers).doc(id).get();
  if (!snap.exists) {
    return null;
  }
  return hydrateCustomer(snap.id, snap.data() ?? {});
}

export async function listSuppliers(storeId: string) {
  const rows = await listByStore(collections.suppliers, storeId, hydrateSupplier);
  return rows.sort((a, b) => a.name.localeCompare(b.name));
}

export async function getSupplier(id: string) {
  const snap = await firestore.collection(collections.suppliers).doc(id).get();
  if (!snap.exists) {
    return null;
  }
  return hydrateSupplier(snap.id, snap.data() ?? {});
}

export async function listCustomerPayments(storeId: string) {
  return listByStore(collections.customerPayments, storeId, hydrateCustomerPayment);
}

export async function listSupplierPayments(storeId: string) {
  return listByStore(collections.supplierPayments, storeId, hydrateSupplierPayment);
}

export async function listSales(storeId: string) {
  const rows = await listByStore(collections.sales, storeId, hydrateSale);
  return rows.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}

export async function getSale(id: string) {
  const snap = await firestore.collection(collections.sales).doc(id).get();
  if (!snap.exists) {
    return null;
  }
  return hydrateSale(snap.id, snap.data() ?? {});
}

export async function listReturns(storeId: string) {
  const rows = await listByStore(collections.returns, storeId, hydrateReturn);
  return rows.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}

export async function listReturnsForSale(storeId: string, saleId: string) {
  const rows = await listReturns(storeId);
  return rows.filter((row) => row.saleId === saleId);
}

export async function listPurchases(storeId: string) {
  const rows = await listByStore(collections.purchases, storeId, hydratePurchase);
  return rows.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}

export async function getPurchase(id: string) {
  const snap = await firestore.collection(collections.purchases).doc(id).get();
  if (!snap.exists) {
    return null;
  }
  return hydratePurchase(snap.id, snap.data() ?? {});
}

export async function listExpenseCategories(storeId: string) {
  const rows = await listByStore(
    collections.expenseCategories,
    storeId,
    hydrateExpenseCategory,
  );
  return rows.sort((a, b) => a.name.localeCompare(b.name));
}

export async function listExpenses(storeId: string) {
  const rows = await listByStore(collections.expenses, storeId, hydrateExpense);
  return rows.sort((a, b) => b.date.getTime() - a.date.getTime());
}

export async function listNotifications(storeId: string) {
  const rows = await listByStore(collections.notifications, storeId, hydrateNotification);
  return rows.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}

export async function listAuditLogs(storeId: string) {
  const rows = await listByStore(collections.auditLogs, storeId, hydrateAuditLog);
  return rows.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}

export async function listHeldCarts(storeId: string, cashierId: string) {
  const rows = await listByStore(collections.heldCarts, storeId, hydrateHeldCart);
  return rows
    .filter((row) => row.cashierId === cashierId)
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}

export async function getHeldCart(id: string) {
  const snap = await firestore.collection(collections.heldCarts).doc(id).get();
  if (!snap.exists) {
    return null;
  }
  return hydrateHeldCart(snap.id, snap.data() ?? {});
}

export async function getCounterValue(storeId: string, key: string) {
  const snap = await firestore
    .collection(collections.counters)
    .doc(`${storeId}_${key}`)
    .get();
  return snap.exists ? Number(snap.data()?.value ?? 0) : 0;
}

export { newId, collections };
