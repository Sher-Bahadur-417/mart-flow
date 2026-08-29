import { requireStorePermission } from "@/lib/permissions";
import { getProfitLoss } from "@/lib/reports/queries";

export async function GET(request: Request) {
  const user = await requireStorePermission("reports");
  const url = new URL(request.url);
  const to = url.searchParams.get("to")
    ? new Date(url.searchParams.get("to")!)
    : new Date();
  const from = url.searchParams.get("from")
    ? new Date(url.searchParams.get("from")!)
    : new Date(to.getTime() - 13 * 24 * 60 * 60 * 1000);

  const report = await getProfitLoss(user.storeId, from, to);
  const csv = [
    "from,to,revenue,cogs,expenses,profit,saleCount",
    [
      report.from.toISOString().slice(0, 10),
      report.to.toISOString().slice(0, 10),
      report.revenue.toFixed(2),
      report.cogs.toFixed(2),
      report.expenses.toFixed(2),
      report.profit.toFixed(2),
      String(report.saleCount),
    ].join(","),
  ].join("\n");

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="martflow-pnl.csv"`,
    },
  });
}
