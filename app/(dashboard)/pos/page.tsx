import { PosTerminal } from "@/components/pos/pos-terminal";
import { prisma } from "@/lib/db";
import { requireStorePermission } from "@/lib/permissions";

export const metadata = { title: "POS" };

export default async function PosPage() {
  const user = await requireStorePermission("sales");
  const [customers, heldCarts] = await Promise.all([
    prisma.customer.findMany({
      where: { storeId: user.storeId, isActive: true },
      select: { id: true, name: true, phone: true },
      orderBy: { name: "asc" },
    }),
    prisma.heldCart.findMany({
      where: { storeId: user.storeId, cashierId: user.id },
      select: { id: true, label: true },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return <PosTerminal customers={customers} heldCarts={heldCarts} />;
}
