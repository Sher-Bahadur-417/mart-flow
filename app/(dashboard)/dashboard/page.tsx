import Link from "next/link";

import { PageHeader } from "@/components/layout/page-header";
import { SalesTrendChart } from "@/components/reports/sales-trend-chart";
import { buttonVariants } from "@/components/ui/button";
import { prisma } from "@/lib/db";
import { requireStoreUser } from "@/lib/auth/store";
import { getDashboardMetrics, getSalesTrend } from "@/lib/reports/queries";
import { formatMoney } from "@/lib/utils/money";
import { cn } from "@/lib/utils";

export const metadata = { title: "Dashboard" };

export default async function DashboardPage() {
  const user = await requireStoreUser();
  const [metrics, trend, unread] = await Promise.all([
    getDashboardMetrics(user.storeId),
    getSalesTrend(user.storeId),
    prisma.notification.count({
      where: {
        storeId: user.storeId,
        isRead: false,
        OR: [{ userId: null }, { userId: user.id }],
      },
    }),
  ]);

  const cards = [
    { label: "Today's sales", value: formatMoney(metrics.revenue) },
    { label: "Today's profit", value: formatMoney(metrics.profit) },
    { label: "Purchases received", value: formatMoney(metrics.purchases) },
    { label: "Expenses", value: formatMoney(metrics.expenses) },
    { label: "Receivables", value: formatMoney(metrics.receivables) },
    { label: "Payables", value: formatMoney(metrics.payables) },
    { label: "Low stock", value: String(metrics.lowStock) },
    { label: "Out of stock", value: String(metrics.outOfStock) },
  ];

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 p-6">
      <PageHeader
        title="Dashboard"
        description={`${user.storeName} · ${user.roleName}`}
        actions={
          unread > 0 ? (
            <Link href="/settings" className={cn(buttonVariants({ variant: "outline" }))}>
              {unread} notification{unread === 1 ? "" : "s"}
            </Link>
          ) : null
        }
      />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <div key={card.label} className="rounded-xl border bg-card p-4 shadow-sm">
            <p className="text-sm text-muted-foreground">{card.label}</p>
            <p className="mt-1 text-xl font-semibold">{card.value}</p>
          </div>
        ))}
      </div>
      <div className="rounded-xl border bg-card p-4">
        <h2 className="mb-3 text-sm font-medium">Sales vs profit (14 days)</h2>
        <SalesTrendChart data={trend} />
      </div>
    </div>
  );
}
