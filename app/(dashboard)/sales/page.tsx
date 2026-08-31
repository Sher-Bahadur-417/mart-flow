import Link from "next/link";

import { PageHeader, EmptyState } from "@/components/layout/page-header";
import { listSales } from "@/lib/data/queries";
import { requireStorePermission } from "@/lib/permissions";
import { formatMoney } from "@/lib/utils/money";

export const metadata = { title: "Sales" };

export default async function SalesPage() {
  const user = await requireStorePermission("sales");
  const sales = (await listSales(user.storeId)).slice(0, 100).map((sale) => ({
    ...sale,
    customer: sale.customerName ? { name: sale.customerName } : null,
    cashier: { name: sale.cashierName },
  }));

  return (
    <div className="flex flex-col gap-4 p-6">
      <PageHeader title="Sales" description="Invoices, payments, and status." />
      {sales.length === 0 ? (
        <EmptyState title="No sales" description="Complete a sale from POS to see invoices here." />
      ) : (
        <div className="overflow-auto rounded-xl border">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-left">
              <tr>
                <th className="p-2">Invoice</th>
                <th className="p-2">Customer</th>
                <th className="p-2">Total</th>
                <th className="p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {sales.map((sale) => (
                <tr key={sale.id} className="border-t">
                  <td className="p-2">
                    <Link className="font-medium hover:underline" href={`/sales/${sale.id}`}>
                      {sale.invoiceNumber}
                    </Link>
                  </td>
                  <td className="p-2">{sale.customer?.name ?? "Walk-in"}</td>
                  <td className="p-2">{formatMoney(sale.total)}</td>
                  <td className="p-2">{sale.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
