import { notFound } from "next/navigation";

import { updatePurchaseStatus } from "@/lib/purchases/actions";
import { prisma } from "@/lib/db";
import { requireStorePermission } from "@/lib/permissions";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { formatMoney } from "@/lib/utils/money";

export const metadata = { title: "Purchase" };

export default async function PurchaseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await requireStorePermission("purchases");
  const { id } = await params;
  const purchase = await prisma.purchase.findFirst({
    where: { id, storeId: user.storeId },
    include: { supplier: true, items: { include: { product: true } } },
  });
  if (!purchase) {
    notFound();
  }

  const order = updatePurchaseStatus.bind(null, purchase.id, "ORDERED");
  const receive = updatePurchaseStatus.bind(null, purchase.id, "RECEIVED");
  const complete = updatePurchaseStatus.bind(null, purchase.id, "COMPLETED");

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 p-6">
      <PageHeader title={purchase.number} description={`${purchase.supplier.name} · ${purchase.status}`} />
      <ul className="rounded-xl border p-4 text-sm">
        {purchase.items.map((item) => (
          <li key={item.id} className="flex justify-between border-b py-1 last:border-0">
            <span>{item.product.name}</span>
            <span>
              {item.quantityOrdered.toString()} × {formatMoney(item.unitCost)}
            </span>
          </li>
        ))}
      </ul>
      <p className="font-semibold">Total {formatMoney(purchase.total)}</p>
      <div className="flex gap-2">
        {purchase.status === "DRAFT" ? (
          <form action={order}>
            <Button type="submit">Mark ordered</Button>
          </form>
        ) : null}
        {purchase.status === "ORDERED" ? (
          <form action={receive}>
            <Button type="submit">Receive (add stock)</Button>
          </form>
        ) : null}
        {purchase.status === "RECEIVED" ? (
          <form action={complete}>
            <Button type="submit">Complete</Button>
          </form>
        ) : null}
      </div>
    </div>
  );
}
