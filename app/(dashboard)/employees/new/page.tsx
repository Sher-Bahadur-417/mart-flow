import { PageHeader } from "@/components/layout/page-header";
import { EmployeeForm } from "@/components/employees/employee-form";
import { prisma } from "@/lib/db";
import { createEmployee } from "@/lib/employees/actions";
import { assignableRoles, grantablePermissions } from "@/lib/employees/rules";
import { requireStorePermission } from "@/lib/permissions";

export const metadata = { title: "Add employee" };

export default async function NewEmployeePage() {
  const user = await requireStorePermission("users");
  const codes = assignableRoles(user.roleCode);
  const roles = await prisma.role.findMany({
    where: { code: { in: codes } },
    orderBy: { name: "asc" },
  });

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 p-6">
      <PageHeader
        title="Add employee"
        description="Passwords are hashed on the server and are never shown again."
      />
      <EmployeeForm
        action={createEmployee}
        roles={roles}
        grantable={grantablePermissions(user.roleCode, user.permissions)}
        submitLabel="Create employee"
        passwordRequired
      />
    </div>
  );
}
