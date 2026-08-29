import Link from "next/link";
import { notFound } from "next/navigation";

import { PageHeader } from "@/components/layout/page-header";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { prisma } from "@/lib/db";
import { requireStorePermission } from "@/lib/permissions";
import { formatMoney } from "@/lib/utils/money";
import { cn } from "@/lib/utils";

export const metadata = { title: "Product" };

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await requireStorePermission("products");
  const { id } = await params;
  const product = await prisma.product.findFirst({
    where: { id, storeId: user.storeId },
    include: { inventory: true, barcodes: true, category: true, brand: true, unit: true },
  });
  if (!product) {
    notFound();
  }

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 p-6">
      <PageHeader
        title={product.name}
        description={product.sku}
        actions={
          <>
            <Link href={`/products/${product.id}/edit`} className={cn(buttonVariants())}>
              Edit
            </Link>
            <Link href={`/products/${product.id}/barcode`} className={cn(buttonVariants({ variant: "outline" }))}>
              Barcode
            </Link>
          </>
        }
      />
      <div className="grid gap-3 rounded-xl border p-4 text-sm sm:grid-cols-2">
        <p>Price: {formatMoney(product.sellingPrice)}</p>
        <p>Cost: {formatMoney(product.purchasePrice)}</p>
        <p>Stock: {product.inventory?.quantity.toString() ?? "0"}</p>
        <p>Tax: {product.taxRate.toString()}%</p>
        <p>Category: {product.category?.name ?? "—"}</p>
        <p>Brand: {product.brand?.name ?? "—"}</p>
        <p>Barcodes: {product.barcodes.map((item) => item.code).join(", ") || "—"}</p>
        <p>
          Status: <Badge variant="secondary">{product.isActive ? "Active" : "Inactive"}</Badge>
        </p>
      </div>
    </div>
  );
}
