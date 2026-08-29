import { createExpense, createExpenseCategory } from "@/lib/expenses/actions";
import { prisma } from "@/lib/db";
import { requireStorePermission } from "@/lib/permissions";
import { PageHeader, EmptyState, Field, NativeSelect, Textarea } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatMoney } from "@/lib/utils/money";

export const metadata = { title: "Expenses" };

export default async function ExpensesPage() {
  const user = await requireStorePermission("expenses");
  const [categories, expenses] = await Promise.all([
    prisma.expenseCategory.findMany({
      where: { storeId: user.storeId },
      orderBy: { name: "asc" },
    }),
    prisma.expense.findMany({
      where: { storeId: user.storeId },
      include: { category: true, createdBy: true },
      orderBy: { date: "desc" },
      take: 100,
    }),
  ]);

  const today = new Date().toISOString().slice(0, 10);

  return (
    <div className="flex flex-col gap-6 p-6">
      <PageHeader title="Expenses" description="Operating costs by category and payment method." />
      <div className="grid gap-4 lg:grid-cols-2">
        <form action={createExpenseCategory} className="flex gap-2 rounded-xl border p-4">
          <Input name="name" placeholder="New category" required />
          <Button type="submit">Add</Button>
        </form>
        <form action={createExpense} className="grid gap-2 rounded-xl border p-4 sm:grid-cols-2">
          <Field label="Category" className="sm:col-span-2">
            <NativeSelect name="categoryId" required>
              <option value="">Select</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </NativeSelect>
          </Field>
          <Field label="Amount">
            <Input name="amount" required />
          </Field>
          <Field label="Date">
            <Input name="date" type="date" defaultValue={today} required />
          </Field>
          <Field label="Method">
            <NativeSelect name="method">
              <option value="CASH">Cash</option>
              <option value="CARD">Card</option>
            </NativeSelect>
          </Field>
          <Field label="Note">
            <Textarea name="description" />
          </Field>
          <Button type="submit" className="sm:col-span-2">
            Record expense
          </Button>
        </form>
      </div>
      {expenses.length === 0 ? (
        <EmptyState title="No expenses" description="Record rent, utilities, or other costs." />
      ) : (
        <div className="overflow-auto rounded-xl border">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-left">
              <tr>
                <th className="p-2">Date</th>
                <th className="p-2">Category</th>
                <th className="p-2">Amount</th>
                <th className="p-2">By</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense) => (
                <tr key={expense.id} className="border-t">
                  <td className="p-2">{expense.date.toISOString().slice(0, 10)}</td>
                  <td className="p-2">{expense.category.name}</td>
                  <td className="p-2">{formatMoney(expense.amount)}</td>
                  <td className="p-2">{expense.createdBy.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
