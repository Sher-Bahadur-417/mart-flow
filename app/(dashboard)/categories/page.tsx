import { createCategory } from "@/lib/inventory/actions";
import { prisma } from "@/lib/db";
import { requireStorePermission } from "@/lib/permissions";
import { PageHeader, EmptyState, Field } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const metadata = { title: "Categories" };

export default async function CategoriesPage() {
  const user = await requireStorePermission("products");
  const categories = await prisma.category.findMany({
    where: { storeId: user.storeId },
    include: { _count: { select: { products: true } } },
    orderBy: { name: "asc" },
  });

  return (
    <div className="flex flex-col gap-4 p-6">
      <PageHeader title="Categories" description="Group products for reporting." />
      <form action={createCategory} className="flex max-w-md gap-2">
        <Field label="Name" className="flex-1">
          <Input name="name" required />
        </Field>
        <Button type="submit" className="mt-6">
          Add
        </Button>
      </form>
      {categories.length === 0 ? (
        <EmptyState title="No categories" description="Add a category to organize the catalog." />
      ) : (
        <ul className="divide-y rounded-xl border">
          {categories.map((category) => (
            <li key={category.id} className="flex items-center justify-between p-3 text-sm">
              <span>{category.name}</span>
              <span className="text-muted-foreground">{category._count.products} products</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
