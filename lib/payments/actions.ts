"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/db";
import { requireStorePermission } from "@/lib/permissions";
import { toMoney } from "@/lib/utils/money";
import { partySchema } from "@/lib/validation/catalog";

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
  await prisma.customer.create({
    data: {
      storeId: user.storeId,
      name: parsed.data.name,
      phone: parsed.data.phone || null,
      email: parsed.data.email || null,
      address: parsed.data.address || null,
      openingBalance: toMoney(parsed.data.openingBalance),
      creditLimit: parsed.data.creditLimit
        ? toMoney(parsed.data.creditLimit)
        : null,
    },
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
  await prisma.supplier.create({
    data: {
      storeId: user.storeId,
      name: parsed.data.name,
      phone: parsed.data.phone || null,
      email: parsed.data.email || null,
      address: parsed.data.address || null,
      openingBalance: toMoney(parsed.data.openingBalance),
    },
  });
  revalidatePath("/suppliers");
  redirect("/suppliers");
}

export async function recordCustomerPayment(formData: FormData) {
  const user = await requireStorePermission("customers");
  await prisma.customerPayment.create({
    data: {
      storeId: user.storeId,
      customerId: String(formData.get("customerId")),
      amount: toMoney(String(formData.get("amount") ?? "0")),
      method: String(formData.get("method") ?? "CASH") as "CASH" | "CARD" | "CREDIT",
      note: String(formData.get("note") ?? "") || null,
      createdById: user.id,
    },
  });
  revalidatePath("/khata");
  revalidatePath("/customers");
}

export async function recordSupplierPayment(formData: FormData) {
  const user = await requireStorePermission("suppliers");
  await prisma.supplierPayment.create({
    data: {
      storeId: user.storeId,
      supplierId: String(formData.get("supplierId")),
      amount: toMoney(String(formData.get("amount") ?? "0")),
      method: String(formData.get("method") ?? "CASH") as "CASH" | "CARD" | "CREDIT",
      note: String(formData.get("note") ?? "") || null,
      createdById: user.id,
    },
  });
  revalidatePath("/khata");
  revalidatePath("/suppliers");
}
