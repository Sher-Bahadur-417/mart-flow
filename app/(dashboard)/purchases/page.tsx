import Link from "next/link";

import { createPurchase } from "@/lib/purchases/actions";
import { listProducts, listPurchases, listSuppliers } from "@/lib/data/queries";
import { requireStorePermission } from "@/lib/permissions";
import { PageHeader, EmptyState, Field, NativeSelect } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatMoney } from "@/lib/utils/money";

export const metadata = { title: "Purchases" };

export default async function PurchasesPage() {
  const user = await requireStorePermission("purchases");
  const [purchaseRows, suppliers, products] = await Promise.all([
    listPurchases(user.storeId),
    listSuppliers(user.storeId),
    listProducts(user.storeId),
  ]);
  const purchases = purchaseRows.map((purchase) => ({
    ...purchase,
    supplier: { name: purchase.supplierName },
  }));

  return (
    <div className="flex flex-col gap-6 p-6">
      <PageHeader title="Purchases" description="DRAFT → ORDERED → RECEIVED → COMPLETED." />
      <form action={createPurchase} className="grid max-w-3xl gap-2 rounded-xl border p-4 sm:grid-cols-2">
        <Field label="Supplier" className="sm:col-span-2">
          <NativeSelect name="supplierId" required>
            <option value="">Select</option>
            {suppliers.map((supplier) => (
              <option key={supplier.id} value={supplier.id}>
                {supplier.name}
              </option>
            ))}
          </NativeSelect>
        </Field>
        <Field label="Product">
          <NativeSelect name="productId" required>
            {products
              .filter((product) => product.isActive)
              .map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
          </NativeSelect>
        </Field>
        <Field label="Qty">
          <Input name="quantity" defaultValue="1" />
        </Field>
        <Field label="Unit cost">
          <Input name="unitCost" defaultValue="0" />
        </Field>
        <Button type="submit" className="sm:col-span-2">
          Create draft
        </Button>
      </form>
      {purchases.length === 0 ? (
        <EmptyState title="No purchases" description="Create a draft purchase order." />
      ) : (
        <ul className="divide-y rounded-xl border">
          {purchases.map((purchase) => (
            <li key={purchase.id} className="flex items-center justify-between p-3 text-sm">
              <Link className="hover:underline" href={`/purchases/${purchase.id}`}>
                {purchase.number} · {purchase.supplier.name}
              </Link>
              <span>
                {purchase.status} · {formatMoney(purchase.total)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
