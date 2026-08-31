import { PosTerminal } from "@/components/pos/pos-terminal";
import { listCustomers, listHeldCarts } from "@/lib/data/queries";
import { requireStorePermission } from "@/lib/permissions";

export const metadata = { title: "POS" };

export default async function PosPage() {
  const user = await requireStorePermission("sales");
  const [customers, heldCarts] = await Promise.all([
    listCustomers(user.storeId),
    listHeldCarts(user.storeId, user.id),
  ]);

  return (
    <PosTerminal
      customers={customers
        .filter((customer) => customer.isActive)
        .map((customer) => ({
          id: customer.id,
          name: customer.name,
          phone: customer.phone,
        }))}
      heldCarts={heldCarts.map((cart) => ({ id: cart.id, label: cart.label }))}
    />
  );
}
