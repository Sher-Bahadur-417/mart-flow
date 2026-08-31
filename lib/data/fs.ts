import "server-only";

import { FieldValue, type DocumentData, type Query } from "firebase-admin/firestore";

import { firestore } from "@/lib/firebase-admin";
import { Decimal } from "@/lib/utils/decimal";
import { toMoney, toQty } from "@/lib/utils/money";

export const collections = {
  stores: "stores",
  users: "users",
  employees: "employees",
  settings: "settings",
  units: "units",
  expenseCategories: "expenseCategories",
  expenses: "expenses",
  counters: "counters",
  categories: "categories",
  brands: "brands",
  products: "products",
  productBarcodes: "productBarcodes",
  inventories: "inventories",
  inventoryMovements: "inventoryMovements",
  stockAdjustments: "stockAdjustments",
  customers: "customers",
  customerPayments: "customerPayments",
  suppliers: "suppliers",
  supplierPayments: "supplierPayments",
  sales: "sales",
  heldCarts: "heldCarts",
  returns: "returns",
  purchases: "purchases",
  notifications: "notifications",
  auditLogs: "auditLogs",
} as const;

export function newId(collectionName: string) {
  return firestore.collection(collectionName).doc().id;
}

export function asDate(value: unknown): Date {
  if (value instanceof Date) {
    return value;
  }
  if (value && typeof value === "object" && "toDate" in value) {
    return (value as { toDate: () => Date }).toDate();
  }
  if (typeof value === "string" || typeof value === "number") {
    return new Date(value);
  }
  return new Date();
}

export function asDateOrNull(value: unknown): Date | null {
  if (value == null || value === "") {
    return null;
  }
  return asDate(value);
}

function convertMoney(record: Record<string, unknown>, keys: string[]) {
  for (const key of keys) {
    if (record[key] != null && record[key] !== "") {
      record[key] = toMoney(String(record[key]));
    }
  }
}

function convertQty(record: Record<string, unknown>, keys: string[]) {
  for (const key of keys) {
    if (record[key] != null && record[key] !== "") {
      record[key] = toQty(String(record[key]));
    }
  }
}

function convertDates(record: Record<string, unknown>, keys: string[]) {
  for (const key of keys) {
    if (record[key] != null) {
      record[key] = asDate(record[key]);
    }
  }
}

export function hydrateDoc<T>(
  id: string,
  data: DocumentData,
  options?: {
    money?: string[];
    qty?: string[];
    dates?: string[];
  },
): T {
  const record: Record<string, unknown> = { id, ...data };
  convertMoney(record, options?.money ?? []);
  convertQty(record, options?.qty ?? []);
  convertDates(record, options?.dates ?? []);
  return record as T;
}

export function serializeValue(value: unknown): unknown {
  if (value instanceof Decimal) {
    return value.toString();
  }
  if (value instanceof Date) {
    return value;
  }
  if (Array.isArray(value)) {
    return value.map(serializeValue);
  }
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([key, entry]) => [
        key,
        serializeValue(entry),
      ]),
    );
  }
  return value;
}

export async function getById<T>(
  collectionName: string,
  id: string,
  hydrate?: (id: string, data: DocumentData) => T,
): Promise<T | null> {
  const snap = await firestore.collection(collectionName).doc(id).get();
  if (!snap.exists) {
    return null;
  }
  const data = snap.data() ?? {};
  return hydrate ? hydrate(snap.id, data) : ({ id: snap.id, ...data } as T);
}

export async function listByStore<T>(
  collectionName: string,
  storeId: string,
  hydrate?: (id: string, data: DocumentData) => T,
): Promise<T[]> {
  const snap = await firestore
    .collection(collectionName)
    .where("storeId", "==", storeId)
    .get();
  return snap.docs.map((doc) =>
    hydrate ? hydrate(doc.id, doc.data()) : ({ id: doc.id, ...doc.data() } as T),
  );
}

export async function findOne<T>(
  query: Query,
  hydrate?: (id: string, data: DocumentData) => T,
): Promise<T | null> {
  const snap = await query.limit(1).get();
  const doc = snap.docs[0];
  if (!doc) {
    return null;
  }
  return hydrate ? hydrate(doc.id, doc.data()) : ({ id: doc.id, ...doc.data() } as T);
}

export { FieldValue };
