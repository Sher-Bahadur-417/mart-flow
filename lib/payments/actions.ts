"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { collections, FieldValue, newId } from "@/lib/data/fs";
import { firestore } from "@/lib/firebase-admin";
import { requireStorePermission } from "@/lib/permissions";
import { toMoney } from "@/lib/utils/money";
import { partySchema } from "@/lib/validation/catalog";

function paymentMethod(value: FormDataEntryValue | null) {
  const method = String(value ?? "CASH");
  if (method === "CARD" || method === "CREDIT" || method === "STORE_CREDIT") {
    return method;
  }
  return "CASH";
}

export async function createCustomer(formData: FormData) {
  const user = await requireStorePermission("customers");
  const parsed = partySchema.safeParse({
    name: formData.get("name"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    address: formData.get("address"),
    openingBalance: formData.get("openingBalance") ?? "0",
    creditLimit: formData.get("creditLimit"),
  });
  if (!parsed.success) {
    throw new Error(parsed.error.issues[0]?.message ?? "Invalid customer.");
  }
  const id = newId(collections.customers);
  const now = FieldValue.serverTimestamp();
  await firestore.collection(collections.customers).doc(id).set({
    id,
    storeId: user.storeId,
    name: parsed.data.name,
    phone: parsed.data.phone || null,
    email: parsed.data.email || null,
    address: parsed.data.address || null,
    openingBalance: toMoney(parsed.data.openingBalance).toString(),
    creditLimit: parsed.data.creditLimit ? toMoney(parsed.data.creditLimit).toString() : null,
    isActive: true,
    createdAt: now,
    updatedAt: now,
  });
  revalidatePath("/customers");
  redirect("/customers");
}

export async function createSupplier(formData: FormData) {
  const user = await requireStorePermission("suppliers");
  const parsed = partySchema.safeParse({
    name: formData.get("name"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    address: formData.get("address"),
    openingBalance: formData.get("openingBalance") ?? "0",
  });
  if (!parsed.success) {
    throw new Error(parsed.error.issues[0]?.message ?? "Invalid supplier.");
  }
  const id = newId(collections.suppliers);
  const now = FieldValue.serverTimestamp();
  await firestore.collection(collections.suppliers).doc(id).set({
    id,
    storeId: user.storeId,
    name: parsed.data.name,
    phone: parsed.data.phone || null,
    email: parsed.data.email || null,
    address: parsed.data.address || null,
    openingBalance: toMoney(parsed.data.openingBalance).toString(),
    isActive: true,
    createdAt: now,
    updatedAt: now,
  });
  revalidatePath("/suppliers");
  redirect("/suppliers");
}

export async function recordCustomerPayment(formData: FormData) {
  const user = await requireStorePermission("customers");
  const id = newId(collections.customerPayments);
  await firestore.collection(collections.customerPayments).doc(id).set({
    id,
    storeId: user.storeId,
    customerId: String(formData.get("customerId")),
    amount: toMoney(String(formData.get("amount") ?? "0")).toString(),
    method: paymentMethod(formData.get("method")),
    note: String(formData.get("note") ?? "") || null,
    createdById: user.id,
    createdAt: FieldValue.serverTimestamp(),
  });
  revalidatePath("/khata");
  revalidatePath("/customers");
}

export async function recordSupplierPayment(formData: FormData) {
  const user = await requireStorePermission("suppliers");
  const id = newId(collections.supplierPayments);
  await firestore.collection(collections.supplierPayments).doc(id).set({
    id,
    storeId: user.storeId,
    supplierId: String(formData.get("supplierId")),
    amount: toMoney(String(formData.get("amount") ?? "0")).toString(),
    method: paymentMethod(formData.get("method")),
    note: String(formData.get("note") ?? "") || null,
    createdById: user.id,
    createdAt: FieldValue.serverTimestamp(),
  });
  revalidatePath("/khata");
  revalidatePath("/suppliers");
}
