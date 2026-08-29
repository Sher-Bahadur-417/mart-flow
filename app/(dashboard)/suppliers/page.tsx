import { createSupplier, recordSupplierPayment } from "@/lib/payments/actions";
import { prisma } from "@/lib/db";
import { requireStorePermission } from "@/lib/permissions";
import { PageHeader, EmptyState, Field, NativeSelect } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getSupplierPayable } from "@/lib/payments/ledgers";
import { formatMoney } from "@/lib/utils/money";

export const metadata = { title: "Suppliers" };

export default async function SuppliersPage() {
  const user = await requireStorePermission("suppliers");
  const suppliers = await prisma.supplier.findMany({
    where: { storeId: user.storeId },
    orderBy: { name: "asc" },
  });
  const rows = await Promise.all(
    suppliers.map(async (supplier) => ({
      ...supplier,
      payable: await getSupplierPayable(user.storeId, supplier.id),
    })),
  );

  return (
    <div className="flex flex-col gap-6 p-6">
      <PageHeader title="Suppliers" />
      <form action={createSupplier} className="grid max-w-3xl gap-2 sm:grid-cols-2">
        <Field label="Name">
          <Input name="name" required />
        </Field>
        <Field label="Phone">
          <Input name="phone" />
        </Field>
        <Field label="Opening payable">
          <Input name="openingBalance" defaultValue="0" />
        </Field>
        <Button type="submit" className="sm:col-span-2">
          Add supplier
        </Button>
      </form>
      {rows.length === 0 ? (
        <EmptyState title="No suppliers" description="Add a supplier before creating purchases." />
      ) : (
        <div className="overflow-auto rounded-xl border">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-left">
              <tr>
                <th className="p-2">Name</th>
                <th className="p-2">Payable</th>
                <th className="p-2">Payment</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((supplier) => (
                <tr key={supplier.id} className="border-t">
                  <td className="p-2">{supplier.name}</td>
                  <td className="p-2">{formatMoney(supplier.payable)}</td>
                  <td className="p-2">
                    <form action={recordSupplierPayment} className="flex gap-1">
                      <input type="hidden" name="supplierId" value={supplier.id} />
                      <Input name="amount" className="w-24" />
                      <NativeSelect name="method">
                        <option value="CASH">Cash</option>
                        <option value="CARD">Card</option>
                      </NativeSelect>
                      <Button size="sm" type="submit">
                        Pay
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
