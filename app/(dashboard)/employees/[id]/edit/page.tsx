import { notFound } from "next/navigation";

import { EmployeeForm } from "@/components/employees/employee-form";
import { PageHeader } from "@/components/layout/page-header";
import { listAssignableRoles, updateEmployee } from "@/lib/employees/actions";
import { getEmployeeDetail } from "@/lib/employees/queries";
import {
  canManageTarget,
  grantablePermissions,
} from "@/lib/employees/rules";
import { requireStorePermission } from "@/lib/permissions";

export const metadata = { title: "Edit employee" };

export default async function EditEmployeePage({
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
  if (!canManageTarget(actor.roleCode, employee.role.code)) {
    notFound();
  }

  const roles = await listAssignableRoles(actor.roleCode);
  const action = updateEmployee.bind(null, employee.id);

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 p-6">
      <PageHeader
        title={`Edit ${employee.name}`}
        description="Leave the password blank to keep the current hash. Passwords are never displayed."
      />
      <EmployeeForm
        action={action}
        roles={roles}
        grantable={grantablePermissions(actor.roleCode, actor.permissions)}
        submitLabel="Save employee"
        passwordRequired={false}
        defaults={{
          name: employee.name,
          email: employee.email,
          username: employee.username,
          phone: employee.employee?.phone ?? "",
          jobTitle: employee.employee?.jobTitle ?? "",
          salary: employee.employee?.salary?.toString() ?? "",
          employeeCode: employee.employee?.employeeCode ?? "",
          roleCode: employee.role.code,
          isActive: employee.isActive,
          permissions: employee.grants.map((grant) => grant.permission.code),
        }}
      />
    </div>
  );
}
