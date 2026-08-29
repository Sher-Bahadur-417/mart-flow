import { createCustomer, recordCustomerPayment } from "@/lib/payments/actions";
import { prisma } from "@/lib/db";
import { requireStorePermission } from "@/lib/permissions";
import { PageHeader, EmptyState, Field, NativeSelect } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getCustomerOutstanding } from "@/lib/payments/ledgers";
import { formatMoney } from "@/lib/utils/money";

export const metadata = { title: "Customers" };

export default async function CustomersPage() {
  const user = await requireStorePermission("customers");
  const customers = await prisma.customer.findMany({
    where: { storeId: user.storeId },
    orderBy: { name: "asc" },
  });
  const rows = await Promise.all(
    customers.map(async (customer) => ({
      ...customer,
      outstanding: await getCustomerOutstanding(user.storeId, customer.id),
    })),
  );

  return (
    <div className="flex flex-col gap-6 p-6">
      <PageHeader title="Customers" />
      <form action={createCustomer} className="grid max-w-3xl gap-2 sm:grid-cols-2">
        <Field label="Name">
          <Input name="name" required />
        </Field>
        <Field label="Phone">
          <Input name="phone" />
        </Field>
        <Field label="Opening balance">
          <Input name="openingBalance" defaultValue="0" />
        </Field>
        <Field label="Credit limit">
          <Input name="creditLimit" />
        </Field>
        <Button type="submit" className="sm:col-span-2">
          Add customer
        </Button>
      </form>
      {rows.length === 0 ? (
        <EmptyState title="No customers" description="Add a customer for credit sales." />
      ) : (
        <div className="overflow-auto rounded-xl border">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-left">
              <tr>
                <th className="p-2">Name</th>
                <th className="p-2">Phone</th>
                <th className="p-2">Outstanding</th>
                <th className="p-2">Payment</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((customer) => (
                <tr key={customer.id} className="border-t align-top">
                  <td className="p-2">{customer.name}</td>
                  <td className="p-2">{customer.phone ?? "—"}</td>
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
    </div>
  );
}
