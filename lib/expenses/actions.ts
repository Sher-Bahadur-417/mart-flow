"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { collections, FieldValue, newId } from "@/lib/data/fs";
import { listExpenseCategories } from "@/lib/data/queries";
import { firestore } from "@/lib/firebase-admin";
import { requireStorePermission } from "@/lib/permissions";
import { toMoney } from "@/lib/utils/money";
import { expenseSchema } from "@/lib/validation/catalog";

export async function createExpenseCategory(formData: FormData) {
  const user = await requireStorePermission("expenses");
  const name = String(formData.get("name") ?? "").trim();
  if (!name) {
    throw new Error("Category name is required.");
  }
  const id = newId(collections.expenseCategories);
  await firestore.collection(collections.expenseCategories).doc(id).set({
    id,
    storeId: user.storeId,
    name,
  });
  revalidatePath("/expenses");
}

export async function createExpense(formData: FormData) {
  const user = await requireStorePermission("expenses");
  const parsed = expenseSchema.safeParse({
    categoryId: formData.get("categoryId"),
    amount: formData.get("amount"),
    date: formData.get("date"),
    method: formData.get("method"),
    description: formData.get("description"),
  });
  if (!parsed.success) {
    throw new Error(parsed.error.issues[0]?.message ?? "Invalid expense.");
  }
  const categories = await listExpenseCategories(user.storeId);
  const category = categories.find((row) => row.id === parsed.data.categoryId);
  if (!category) {
    throw new Error("Category not found.");
  }
  const id = newId(collections.expenses);
  await firestore.collection(collections.expenses).doc(id).set({
    id,
    storeId: user.storeId,
    categoryId: parsed.data.categoryId,
    categoryName: category.name,
    amount: toMoney(parsed.data.amount).toString(),
    date: new Date(parsed.data.date),
    method: parsed.data.method,
    description: parsed.data.description || null,
    createdById: user.id,
    createdByName: user.name,
    createdAt: FieldValue.serverTimestamp(),
  });
  revalidatePath("/expenses");
  redirect("/expenses");
}
