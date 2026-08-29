"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/db";
import { requireStorePermission } from "@/lib/permissions";
import { toMoney } from "@/lib/utils/money";
import { expenseSchema } from "@/lib/validation/catalog";

export async function createExpenseCategory(formData: FormData) {
  const user = await requireStorePermission("expenses");
  const name = String(formData.get("name") ?? "").trim();
  if (!name) {
    throw new Error("Category name is required.");
  }
  await prisma.expenseCategory.create({
    data: { storeId: user.storeId, name },
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
  await prisma.expense.create({
    data: {
      storeId: user.storeId,
      categoryId: parsed.data.categoryId,
      amount: toMoney(parsed.data.amount),
      date: new Date(parsed.data.date),
      method: parsed.data.method,
      description: parsed.data.description || null,
      createdById: user.id,
    },
  });
  revalidatePath("/expenses");
  redirect("/expenses");
}
