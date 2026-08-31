import Link from "next/link";

import { PageHeader, EmptyState } from "@/components/layout/page-header";
import { buttonVariants } from "@/components/ui/button";
import { attachProductRelations, listProducts } from "@/lib/data/queries";
import { requireStorePermission } from "@/lib/permissions";
import { formatMoney } from "@/lib/utils/money";
import { cn } from "@/lib/utils";

export const metadata = { title: "Products" };

export default async function ProductsPage({
  searchParams,
}: PageProps<"/products">) {
  const user = await requireStorePermission("products");
  const params = await searchParams;
  const q = typeof params.q === "string" ? params.q : "";
  const all = await listProducts(user.storeId);
  const filtered = all.filter((product) => {
    if (!q) {
      return true;
    }
    const term = q.toLowerCase();
    return (
      product.name.toLowerCase().includes(term) ||
      product.sku.toLowerCase().includes(term)
    );
  });
  const products = (await attachProductRelations(user.storeId, filtered)).sort((a, b) =>
    a.name.localeCompare(b.name),
  );

  return (
    <div className="flex flex-col gap-4 p-6">
      <PageHeader
        title="Products"
        description="Catalog, SKUs, prices, and stock."
        actions={
          <Link href="/products/new" className={cn(buttonVariants())}>
            New product
          </Link>
        }
      />
      <form className="max-w-sm">
        <input
          name="q"
          defaultValue={q}
          placeholder="Search name or SKU"
          className="h-8 w-full rounded-lg border border-input px-2.5 text-sm"
        />
      </form>
      {products.length === 0 ? (
        <EmptyState title="No products" description="Create a product to start selling." />
      ) : (
        <div className="overflow-auto rounded-xl border">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-left">
              <tr>
                <th className="p-2">Name</th>
                <th className="p-2">SKU</th>
                <th className="p-2">Price</th>
                <th className="p-2">Stock</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-t">
                  <td className="p-2">
                    <Link className="font-medium hover:underline" href={`/products/${product.id}`}>
                      {product.name}
                    </Link>
                  </td>
                  <td className="p-2">{product.sku}</td>
                  <td className="p-2">{formatMoney(product.sellingPrice)}</td>
                  <td className="p-2">{product.inventory?.quantity.toString() ?? "0"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
