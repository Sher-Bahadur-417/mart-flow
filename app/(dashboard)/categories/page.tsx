import { createCategory } from "@/lib/inventory/actions";
import { listCategories, listProducts } from "@/lib/data/queries";
import { requireStorePermission } from "@/lib/permissions";
import { PageHeader, EmptyState, Field } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const metadata = { title: "Categories" };

export default async function CategoriesPage() {
  const user = await requireStorePermission("products");
  const [categories, products] = await Promise.all([
    listCategories(user.storeId),
    listProducts(user.storeId),
  ]);
  const rows = categories.map((category) => ({
    ...category,
    _count: {
      products: products.filter((product) => product.categoryId === category.id).length,
    },
  }));

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
      {rows.length === 0 ? (
        <EmptyState title="No categories" description="Add a category to organize the catalog." />
      ) : (
        <ul className="divide-y rounded-xl border">
          {rows.map((category) => (
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
