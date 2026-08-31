import Link from "next/link";

import { PageHeader, EmptyState } from "@/components/layout/page-header";
import { listReturns } from "@/lib/data/queries";
import { requireStorePermission } from "@/lib/permissions";
import { formatMoney } from "@/lib/utils/money";

export const metadata = { title: "Returns" };

export default async function ReturnsPage() {
  const user = await requireStorePermission("sales");
  const returns = (await listReturns(user.storeId)).map((entry) => ({
    ...entry,
    sale: { invoiceNumber: entry.invoiceNumber },
    cashier: { name: entry.cashierName },
  }));

  return (
    <div className="flex flex-col gap-4 p-6">
      <PageHeader title="Returns" description="Linked to the original sale; stock is restored." />
      {returns.length === 0 ? (
        <EmptyState title="No returns" description="Process a return from an invoice." />
      ) : (
        <ul className="divide-y rounded-xl border">
          {returns.map((entry) => (
            <li key={entry.id} className="flex items-center justify-between p-3 text-sm">
              <Link className="hover:underline" href={`/sales/${entry.saleId}`}>
                {entry.sale.invoiceNumber}
              </Link>
              <span>{formatMoney(entry.total)}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
