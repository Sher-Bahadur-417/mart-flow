import { recordCustomerPayment, recordSupplierPayment } from "@/lib/payments/actions";
import { listCustomers, listSuppliers } from "@/lib/data/queries";
import { hasPermission, requireStorePermission } from "@/lib/permissions";
import { PageHeader, EmptyState, NativeSelect } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getCustomerOutstanding, getSupplierPayable } from "@/lib/payments/ledgers";
import { formatMoney } from "@/lib/utils/money";

export const metadata = { title: "Khata" };

export default async function KhataPage() {
  const user = await requireStorePermission("customers");
  const canSuppliers = hasPermission(user, "suppliers");
  const [customers, suppliers] = await Promise.all([
    listCustomers(user.storeId),
    canSuppliers ? listSuppliers(user.storeId) : Promise.resolve([]),
  ]);
  const customerRows = await Promise.all(
    customers.map(async (customer) => ({
      ...customer,
      outstanding: await getCustomerOutstanding(user.storeId, customer.id),
    })),
  );
  const supplierRows = await Promise.all(
    suppliers.map(async (supplier) => ({
      ...supplier,
      payable: await getSupplierPayable(user.storeId, supplier.id),
    })),
  );

  return (
    <div className="flex flex-col gap-8 p-6">
      <PageHeader
        title="Khata"
        description="Balances are computed from sales, payments, purchases, and opening amounts. They are never overwritten."
      />
      <section className="space-y-3">
        <h2 className="font-medium">Customer receivables</h2>
        {customerRows.length === 0 ? (
          <EmptyState title="No customers" description="Add a customer to track credit." />
        ) : (
          <div className="overflow-auto rounded-xl border">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 text-left">
                <tr>
                  <th className="p-2">Customer</th>
                  <th className="p-2">Outstanding</th>
                  <th className="p-2">Receive payment</th>
                </tr>
              </thead>
              <tbody>
                {customerRows.map((customer) => (
                  <tr key={customer.id} className="border-t">
                    <td className="p-2">{customer.name}</td>
                    <td className="p-2">{formatMoney(customer.outstanding)}</td>
                    <td className="p-2">
                      <form action={recordCustomerPayment} className="flex gap-1">
                        <input type="hidden" name="customerId" value={customer.id} />
                        <Input name="amount" className="w-24" placeholder="Amount" />
                        <NativeSelect name="method">
                          <option value="CASH">Cash</option>
                          <option value="CARD">Card</option>
                        </NativeSelect>
                        <Button size="sm" type="submit">
                          Receive
                        </Button>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
      {canSuppliers ? (
        <section className="space-y-3">
          <h2 className="font-medium">Supplier payables</h2>
          {supplierRows.length === 0 ? (
            <EmptyState title="No suppliers" description="Add a supplier to track payables." />
          ) : (
            <div className="overflow-auto rounded-xl border">
              <table className="w-full text-sm">
                <thead className="bg-muted/50 text-left">
                  <tr>
                    <th className="p-2">Supplier</th>
                    <th className="p-2">Payable</th>
                    <th className="p-2">Pay</th>
                  </tr>
                </thead>
                <tbody>
                  {supplierRows.map((supplier) => (
                    <tr key={supplier.id} className="border-t">
                      <td className="p-2">{supplier.name}</td>
                      <td className="p-2">{formatMoney(supplier.payable)}</td>
                      <td className="p-2">
                        <form action={recordSupplierPayment} className="flex gap-1">
                          <input type="hidden" name="supplierId" value={supplier.id} />
                          <Input name="amount" className="w-24" placeholder="Amount" />
                          <NativeSelect name="method">
                            <option value="CASH">Cash</option>
                            <option value="CARD">Card</option>
                          </NativeSelect>
                          <Button size="sm" type="submit">
                            Pay
                          </Button>
                        </form>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      ) : null}
    </div>
  );
}
