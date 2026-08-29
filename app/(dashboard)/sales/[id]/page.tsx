import { notFound } from "next/navigation";

import { PrintButton } from "@/components/layout/print-button";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { cancelSaleAction, createReturnAction } from "@/lib/sales/actions";
import { prisma } from "@/lib/db";
import { requireStorePermission } from "@/lib/permissions";
import { formatMoney } from "@/lib/utils/money";

export const metadata = { title: "Invoice" };

export default async function SaleDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await requireStorePermission("sales");
  const { id } = await params;
  const [sale, footer] = await Promise.all([
    prisma.sale.findFirst({
      where: { id, storeId: user.storeId },
      include: {
        items: true,
        payments: true,
        cashier: true,
        customer: true,
        returns: { include: { items: true, refunds: true } },
      },
    }),
    prisma.setting.findUnique({
      where: { storeId_key: { storeId: user.storeId, key: "receipt_footer" } },
    }),
  ]);
  if (!sale) {
    notFound();
  }
  const cancel = cancelSaleAction.bind(null, sale.id);

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 p-6">
      <PageHeader
        title={sale.invoiceNumber}
        description={`${sale.cashier.name} · ${sale.createdAt.toLocaleString()}`}
        actions={<PrintButton label="Print receipt" />}
      />
      <div className="receipt rounded-xl border p-4 text-sm">
        <p className="text-center font-semibold">{user.storeName}</p>
        <p className="text-center text-xs text-muted-foreground">{sale.invoiceNumber}</p>
        <p>Customer: {sale.customer?.name ?? "Walk-in"}</p>
        <p>Cashier: {sale.cashier.name}</p>
        <p>Status: {sale.status}</p>
        <table className="mt-3 w-full">
          <tbody>
            {sale.items.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="py-1">{item.name}</td>
                <td>{item.quantity.toString()}</td>
                <td className="text-right">{formatMoney(item.lineTotal)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-3 font-semibold">Total {formatMoney(sale.total)}</p>
        <p>
          Paid {formatMoney(sale.paidAmount)} · Credit {formatMoney(sale.creditAmount)}
        </p>
        {sale.payments.map((payment) => (
          <p key={payment.id}>
            {payment.method} {formatMoney(payment.amount)}
          </p>
        ))}
        <p className="mt-4 text-center text-xs">
          {footer?.value ?? "Thank you for shopping."}
        </p>
      </div>
      <div className="flex flex-col gap-4 print:hidden">
        {sale.status === "COMPLETED" ? (
          <form action={cancel}>
            <Button variant="destructive" type="submit">
              Cancel sale
            </Button>
          </form>
        ) : null}
        {sale.status !== "CANCELLED" && sale.status !== "RETURNED" ? (
          <form action={createReturnAction} className="space-y-2 rounded-xl border p-4">
            <input type="hidden" name="saleId" value={sale.id} />
            <h2 className="font-medium">Return items</h2>
            {sale.items.map((item) => (
              <label key={item.id} className="flex items-center justify-between gap-2 text-sm">
                <span>{item.name}</span>
                <input
                  className="h-8 w-20 rounded-lg border px-2"
                  name={`qty-${item.id}`}
                  type="number"
                  min={0}
                  step="0.001"
                  defaultValue="0"
                />
              </label>
            ))}
            <select name="refundMethod" className="h-8 rounded-lg border px-2 text-sm">
              <option value="CASH">Cash refund</option>
              <option value="CARD">Card refund</option>
              <option value="STORE_CREDIT">Store credit</option>
            </select>
            <Button type="submit">Process return</Button>
          </form>
        ) : null}
      </div>
    </div>
  );
}
