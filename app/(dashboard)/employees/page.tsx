import Link from "next/link";

import { PageHeader, EmptyState, NativeSelect } from "@/components/layout/page-header";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ROLE_CODES } from "@/constants/permissions";
import { prisma } from "@/lib/db";
import { setEmployeeActive } from "@/lib/employees/actions";
import { canManageTarget } from "@/lib/employees/rules";
import { requireStorePermission } from "@/lib/permissions";
import { cn } from "@/lib/utils";

export const metadata = { title: "Employees" };

export default async function EmployeesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; role?: string; status?: string }>;
}) {
  const user = await requireStorePermission("users");
  const params = await searchParams;
  const q = typeof params.q === "string" ? params.q.trim() : "";
  const role = typeof params.role === "string" ? params.role : "";
  const status = typeof params.status === "string" ? params.status : "all";

  const [employees, roles] = await Promise.all([
    prisma.user.findMany({
      where: {
        storeId: user.storeId,
        ...(role ? { role: { code: role } } : {}),
        ...(status === "active"
          ? { isActive: true }
          : status === "inactive"
            ? { isActive: false }
            : {}),
        ...(q
          ? {
              OR: [
                { name: { contains: q, mode: "insensitive" } },
                { email: { contains: q, mode: "insensitive" } },
                { username: { contains: q, mode: "insensitive" } },
                { employee: { employeeCode: { contains: q, mode: "insensitive" } } },
                { employee: { phone: { contains: q, mode: "insensitive" } } },
              ],
            }
          : {}),
      },
      select: {
        id: true,
        name: true,
        email: true,
        username: true,
        isActive: true,
        role: { select: { code: true, name: true } },
        employee: { select: { employeeCode: true, phone: true, jobTitle: true } },
      },
      orderBy: [{ isActive: "desc" }, { name: "asc" }],
    }),
    prisma.role.findMany({
      where: { code: { not: ROLE_CODES.SUPER_ADMIN } },
      orderBy: { name: "asc" },
    }),
  ]);

  return (
    <div className="flex flex-col gap-4 p-6">
      <PageHeader
        title="Employees"
        description="Create, edit, and deactivate staff without deleting historical sales or audit records."
        actions={
          <Link href="/employees/new" className={cn(buttonVariants())}>
            Add employee
          </Link>
        }
      />
      <form className="grid gap-2 sm:grid-cols-4">
        <Input name="q" defaultValue={q} placeholder="Search name, ID, email, username" />
        <NativeSelect name="role" defaultValue={role}>
          <option value="">All roles</option>
          {roles.map((item) => (
            <option key={item.code} value={item.code}>
              {item.name}
            </option>
          ))}
        </NativeSelect>
        <NativeSelect name="status" defaultValue={status}>
          <option value="all">All statuses</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </NativeSelect>
        <Button type="submit" variant="outline">
          Filter
        </Button>
      </form>
      {employees.length === 0 ? (
        <EmptyState
          title="No employees match"
          description="Try another search, or add a staff account."
        />
      ) : (
        <div className="overflow-auto rounded-xl border">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-left">
              <tr>
                <th className="p-2">Employee</th>
                <th className="p-2">ID</th>
                <th className="p-2">Role</th>
                <th className="p-2">Status</th>
                <th className="p-2" />
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => {
                const canManage = canManageTarget(user.roleCode, employee.role.code);
                const deactivate = setEmployeeActive.bind(null, employee.id, false);
                const activate = setEmployeeActive.bind(null, employee.id, true);
                return (
                  <tr key={employee.id} className="border-t">
                    <td className="p-2">
                      <Link className="font-medium hover:underline" href={`/employees/${employee.id}`}>
                        {employee.name}
                      </Link>
                      <div className="text-muted-foreground">
                        {employee.username} · {employee.email}
                      </div>
                    </td>
                    <td className="p-2">{employee.employee?.employeeCode ?? "—"}</td>
                    <td className="p-2">{employee.role.name}</td>
                    <td className="p-2">
                      <Badge variant={employee.isActive ? "secondary" : "outline"}>
                        {employee.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </td>
                    <td className="p-2">
                      <div className="flex flex-wrap justify-end gap-2">
                        <Link
                          href={`/employees/${employee.id}`}
                          className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
                        >
                          View
                        </Link>
                        {canManage ? (
                          <Link
                            href={`/employees/${employee.id}/edit`}
                            className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
                          >
                            Edit
                          </Link>
                        ) : null}
                        {canManage && employee.id !== user.id ? (
                          <form action={employee.isActive ? deactivate : activate}>
                            <Button size="sm" variant="outline" type="submit">
                              {employee.isActive ? "Deactivate" : "Activate"}
                            </Button>
                          </form>
                        ) : null}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
