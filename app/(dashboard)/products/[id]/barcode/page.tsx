import { notFound } from "next/navigation";

import { PrintButton } from "@/components/layout/print-button";
import { getProductWithRelations } from "@/lib/data/queries";
import { requireStorePermission } from "@/lib/permissions";

export const metadata = { title: "Barcode" };

export default async function ProductBarcodePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await requireStorePermission("products");
  const { id } = await params;
  const product = await getProductWithRelations(user.storeId, id);
  if (!product) {
    notFound();
  }
  const code = product.barcodes[0]?.code ?? product.sku;

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 p-8 print:min-h-0">
      <p className="text-lg font-semibold">{product.name}</p>
      <p className="font-mono text-3xl tracking-[0.3em]">{code}</p>
      <p className="text-sm text-muted-foreground">{product.sku}</p>
      <PrintButton />
    </div>
  );
}
