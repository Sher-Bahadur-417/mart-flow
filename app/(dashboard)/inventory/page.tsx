import { adjustStock, recordDamage } from "@/lib/inventory/actions";
import { getInventorySnapshot } from "@/lib/reports/queries";
import { requireStorePermission } from "@/lib/permissions";
import { PageHeader, EmptyState } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const metadata = { title: "Inventory" };

export default async function InventoryPage() {
  const user = await requireStorePermission("inventory");
  const rows = await getInventorySnapshot(user.storeId);

  return (
    <div className="flex flex-col gap-4 p-6">
      <PageHeader
        title="Inventory"
        description="Stock only changes through inventory movements."
      />
      {rows.length === 0 ? (
        <EmptyState title="No stock records" description="Create products to generate inventory rows." />
      ) : (
        <div className="overflow-auto rounded-xl border">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-left">
              <tr>
                <th className="p-2">Product</th>
                <th className="p-2">Qty</th>
                <th className="p-2">Adjust</th>
                <th className="p-2">Damage</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id} className="border-t align-top">
                  <td className="p-2">
                    {row.product.name}
                    {row.quantity.lte(row.product.minStock) ? (
                      <span className="ml-2 text-destructive">Low</span>
                    ) : null}
                  </td>
                  <td className="p-2">{row.quantity.toString()}</td>
                  <td className="p-2">
                    <form action={adjustStock} className="flex gap-1">
                      <input type="hidden" name="productId" value={row.productId} />
                      <Input name="quantity" className="w-20" defaultValue={row.quantity.toString()} />
                      <Input name="reason" placeholder="Reason" required />
                      <Button type="submit" size="sm">
                        Save
                      </Button>
                    </form>
                  </td>
                  <td className="p-2">
                    <form action={recordDamage} className="flex gap-1">
                      <input type="hidden" name="productId" value={row.productId} />
                      <Input name="quantity" className="w-16" defaultValue="1" />
                      <Input name="reason" placeholder="Damage" />
                      <Button type="submit" size="sm" variant="destructive">
                        - 
                      </Button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
