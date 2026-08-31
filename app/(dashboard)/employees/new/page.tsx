import { PageHeader } from "@/components/layout/page-header";
import { EmployeeForm } from "@/components/employees/employee-form";
import { createEmployee, listAssignableRoles } from "@/lib/employees/actions";
import { grantablePermissions } from "@/lib/employees/rules";
import { requireStorePermission } from "@/lib/permissions";

export const metadata = { title: "Add employee" };

export default async function NewEmployeePage() {
  const user = await requireStorePermission("users");
  const roles = await listAssignableRoles(user.roleCode);

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
