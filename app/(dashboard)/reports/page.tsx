import { PageHeader } from "@/components/layout/page-header";
import { PrintButton } from "@/components/layout/print-button";
import { SalesTrendChart } from "@/components/reports/sales-trend-chart";
import { buttonVariants } from "@/components/ui/button";
import { requireStorePermission } from "@/lib/permissions";
import {
  getInventorySnapshot,
  getProfitLoss,
  getSalesTrend,
} from "@/lib/reports/queries";
import { formatMoney } from "@/lib/utils/money";
import { cn } from "@/lib/utils";

export const metadata = { title: "Reports" };

export default async function ReportsPage({
  searchParams,
}: PageProps<"/reports">) {
  const user = await requireStorePermission("reports");
  const params = await searchParams;
  const to = params.to ? new Date(String(params.to)) : new Date();
  const from = params.from
    ? new Date(String(params.from))
    : new Date(to.getTime() - 13 * 24 * 60 * 60 * 1000);
  from.setHours(0, 0, 0, 0);
  to.setHours(23, 59, 59, 999);

  const [pl, trend, inventory] = await Promise.all([
    getProfitLoss(user.storeId, from, to),
    getSalesTrend(user.storeId),
    getInventorySnapshot(user.storeId),
  ]);

  const fromValue = from.toISOString().slice(0, 10);
  const toValue = to.toISOString().slice(0, 10);

  return (
    <div className="flex flex-col gap-6 p-6">
      <PageHeader
        title="Reports"
        description="Profit = revenue − COGS − expenses."
        actions={
          <>
            <a
              className={cn(buttonVariants({ variant: "outline" }))}
              href={`/reports/export?from=${fromValue}&to=${toValue}`}
            >
              Export CSV
            </a>
            <PrintButton label="Print report" />
          </>
        }
      />
      <form className="flex flex-wrap items-end gap-2 print:hidden">
        <label className="text-sm">
          From
          <input
            className="mt-1 block h-8 rounded-lg border px-2 text-sm"
            type="date"
            name="from"
            defaultValue={fromValue}
          />
        </label>
        <label className="text-sm">
          To
          <input
            className="mt-1 block h-8 rounded-lg border px-2 text-sm"
            type="date"
            name="to"
            defaultValue={toValue}
          />
        </label>
        <button className={cn(buttonVariants({ size: "sm" }))} type="submit">
          Apply
        </button>
      </form>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Revenue", value: pl.revenue },
          { label: "COGS", value: pl.cogs },
          { label: "Expenses", value: pl.expenses },
          { label: "Profit", value: pl.profit },
        ].map((item) => (
          <div key={item.label} className="rounded-xl border p-4">
            <p className="text-sm text-muted-foreground">{item.label}</p>
            <p className="text-xl font-semibold">{formatMoney(item.value)}</p>
          </div>
        ))}
      </div>
      <div className="rounded-xl border p-4">
        <h2 className="mb-3 text-sm font-medium">Trend</h2>
        <SalesTrendChart data={trend} />
      </div>
      <div className="rounded-xl border">
        <h2 className="border-b p-3 text-sm font-medium">Inventory valuation</h2>
        <table className="w-full text-sm">
          <thead className="bg-muted/50 text-left">
            <tr>
              <th className="p-2">Product</th>
              <th className="p-2">Qty</th>
              <th className="p-2">Cost value</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((row) => (
              <tr key={row.id} className="border-t">
                <td className="p-2">{row.product.name}</td>
                <td className="p-2">{row.quantity.toString()}</td>
                <td className="p-2">
                  {formatMoney(row.quantity.times(row.product.purchasePrice))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
