import Link from "next/link";
import { notFound } from "next/navigation";

import { ResetPasswordForm } from "@/components/employees/reset-password-form";
import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  resetEmployeePassword,
  setEmployeeActive,
} from "@/lib/employees/actions";
import {
  getEmployeeDetail,
  listEmployeeAuditLogs,
} from "@/lib/employees/queries";
import { canManageTarget } from "@/lib/employees/rules";
import { requireStorePermission } from "@/lib/permissions";
import { formatMoney } from "@/lib/utils/money";
import { cn } from "@/lib/utils";

export const metadata = { title: "Employee" };

function formatDate(value: Date | null | undefined) {
  if (!value) {
    return "—";
  }
  return value.toLocaleString();
}

export default async function EmployeeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const actor = await requireStorePermission("users");
  const { id } = await params;
  const employee = await getEmployeeDetail(actor.storeId, id);
  if (!employee) {
    notFound();
  }

  const auditLogs = await listEmployeeAuditLogs(actor.storeId, employee.id);

  const assigned =
    employee.grants.length > 0
      ? employee.grants.map((grant) => grant.permission.code)
      : employee.rolePermissions.map((entry) => entry.permission.code);
  const canManage = canManageTarget(actor.roleCode, employee.role.code);
  const resetAction = resetEmployeePassword.bind(null, employee.id);
  const deactivate = setEmployeeActive.bind(null, employee.id, false);
  const activate = setEmployeeActive.bind(null, employee.id, true);

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 p-6">
      <PageHeader
        title={employee.name}
        description={`${employee.employee?.employeeCode ?? "No Employee ID"} · ${employee.role.name}`}
        actions={
          <>
            {canManage ? (
              <Link
                href={`/employees/${employee.id}/edit`}
                className={cn(buttonVariants())}
              >
                Edit
              </Link>
            ) : null}
            <Link href="/employees" className={cn(buttonVariants({ variant: "outline" }))}>
              Back
            </Link>
          </>
        }
      />
      <div className="grid gap-3 rounded-xl border p-4 text-sm sm:grid-cols-2">
        <p>Employee ID: {employee.employee?.employeeCode ?? "—"}</p>
        <p>
          Status:{" "}
          <Badge variant={employee.isActive ? "secondary" : "outline"}>
            {employee.isActive ? "Active" : "Inactive"}
          </Badge>
        </p>
        <p>Username: {employee.username}</p>
        <p>Email: {employee.email}</p>
        <p>Phone: {employee.employee?.phone || "—"}</p>
        <p>Job title: {employee.employee?.jobTitle || "—"}</p>
        <p>
          Salary:{" "}
          {employee.employee?.salary ? formatMoney(employee.employee.salary) : "—"}
        </p>
        <p>Hired: {formatDate(employee.employee?.hireDate)}</p>
        <p>Last login: {formatDate(employee.lastLoginAt)}</p>
        <p>Created: {formatDate(employee.createdAt)}</p>
        <p className="sm:col-span-2">
          Permissions: {assigned.join(", ") || "None"}
        </p>
      </div>

      {canManage ? (
        <section className="grid gap-6 rounded-xl border p-4 sm:grid-cols-2">
          <div className="space-y-3">
            <h2 className="font-medium">Account status</h2>
            <p className="text-sm text-muted-foreground">
              Deactivation keeps sales and audit history. The last Owner cannot be
              removed.
            </p>
            {employee.id === actor.id ? (
              <p className="text-sm text-muted-foreground">You cannot deactivate your own account.</p>
            ) : (
              <form action={employee.isActive ? deactivate : activate}>
                <Button type="submit" variant={employee.isActive ? "destructive" : "outline"}>
                  {employee.isActive ? "Deactivate employee" : "Activate employee"}
                </Button>
              </form>
            )}
          </div>
          <div className="space-y-3">
            <h2 className="font-medium">Reset password</h2>
            <p className="text-sm text-muted-foreground">
              The new password is hashed immediately and is never stored in plain text.
            </p>
            <ResetPasswordForm action={resetAction} />
          </div>
        </section>
      ) : null}

      <section className="space-y-3">
        <h2 className="font-medium">Activity / audit history</h2>
        {auditLogs.length === 0 ? (
          <p className="text-sm text-muted-foreground">No activity recorded yet.</p>
        ) : (
          <div className="overflow-auto rounded-xl border">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 text-left">
                <tr>
                  <th className="p-2">When</th>
                  <th className="p-2">Action</th>
                  <th className="p-2">Actor</th>
                  <th className="p-2">Details</th>
                </tr>
              </thead>
              <tbody>
                {auditLogs.map((log) => (
                  <tr key={log.id} className="border-t align-top">
                    <td className="p-2 whitespace-nowrap">{formatDate(log.createdAt)}</td>
                    <td className="p-2">{log.action.replaceAll("_", " ")}</td>
                    <td className="p-2">{log.user?.name ?? "System"}</td>
                    <td className="p-2 text-muted-foreground">
                      {log.metadata ? JSON.stringify(log.metadata) : log.ipAddress || "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
