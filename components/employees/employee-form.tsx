"use client";

import { useActionState, useMemo, useState } from "react";

import {
  ALL_PERMISSIONS,
  PERMISSION_LABELS,
  ROLE_PERMISSIONS,
  type PermissionCode,
  type RoleCode,
} from "@/constants/permissions";
import { Field, NativeSelect } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { suggestEmployeeCode } from "@/lib/employees/actions";
import type { EmployeeFormState } from "@/lib/validation/employees";

type RoleOption = {
  code: string;
  name: string;
};

type EmployeeFormValues = {
  name?: string;
  email?: string;
  username?: string;
  phone?: string;
  jobTitle?: string;
  salary?: string;
  employeeCode?: string;
  roleCode?: string;
  isActive?: boolean;
  permissions?: string[];
};

export function EmployeeForm({
  action,
  roles,
  grantable,
  defaults,
  submitLabel,
  passwordRequired,
}: {
  action: (
    state: EmployeeFormState | undefined,
    formData: FormData,
  ) => Promise<EmployeeFormState>;
  roles: RoleOption[];
  grantable: PermissionCode[];
  defaults?: EmployeeFormValues;
  submitLabel: string;
  passwordRequired: boolean;
}) {
  const [state, formAction, pending] = useActionState(action, undefined);
  const initialRole = defaults?.roleCode ?? roles[0]?.code ?? "CASHIER";
  const [roleCode, setRoleCode] = useState(initialRole);
  const [employeeCode, setEmployeeCode] = useState(defaults?.employeeCode ?? "");
  const [generating, setGenerating] = useState(false);

  const grantableSet = useMemo(() => new Set(grantable), [grantable]);
  const roleDefaults = useMemo(
    () =>
      (ROLE_PERMISSIONS[roleCode as RoleCode] ?? []).filter((code) =>
        grantableSet.has(code),
      ),
    [grantableSet, roleCode],
  );

  const [selected, setSelected] = useState<string[]>(
    defaults?.permissions?.filter((code) => grantableSet.has(code as PermissionCode)) ??
      roleDefaults,
  );

  function onRoleChange(nextRole: string) {
    setRoleCode(nextRole);
    const next =
      ROLE_PERMISSIONS[nextRole as RoleCode]?.filter((code) => grantableSet.has(code)) ??
      [];
    setSelected(next);
  }

  async function onGenerateCode() {
    setGenerating(true);
    try {
      const next = await suggestEmployeeCode();
      setEmployeeCode(next);
    } finally {
      setGenerating(false);
    }
  }

  function togglePermission(code: string, checked: boolean) {
    setSelected((current) =>
      checked ? [...new Set([...current, code])] : current.filter((item) => item !== code),
    );
  }

  return (
    <form action={formAction} className="grid gap-3 sm:grid-cols-2">
      {state?.error ? (
        <p className="text-sm text-destructive sm:col-span-2" role="alert">
          {state.error}
        </p>
      ) : null}
      <Field label="Name">
        <Input name="name" required defaultValue={defaults?.name} autoComplete="name" />
      </Field>
      <Field label="Employee ID">
        <div className="flex gap-2">
          <Input
            name="employeeCode"
            value={employeeCode}
            onChange={(event) => setEmployeeCode(event.target.value)}
            placeholder="Leave blank to auto-generate"
            autoComplete="off"
          />
          <Button
            type="button"
            variant="outline"
            onClick={onGenerateCode}
            disabled={generating}
          >
            {generating ? "..." : "Generate"}
          </Button>
        </div>
      </Field>
      <Field label="Email">
        <Input
          name="email"
          type="email"
          required
          defaultValue={defaults?.email}
          autoComplete="email"
        />
      </Field>
      <Field label="Username">
        <Input
          name="username"
          defaultValue={defaults?.username}
          placeholder="Leave blank to use email prefix"
          autoComplete="username"
        />
      </Field>
      <Field label="Phone">
        <Input name="phone" defaultValue={defaults?.phone} autoComplete="tel" />
      </Field>
      <Field label="Job title">
        <Input name="jobTitle" defaultValue={defaults?.jobTitle} />
      </Field>
      <Field label={passwordRequired ? "Password" : "Password (optional)"}>
        <Input
          name="password"
          type="password"
          minLength={passwordRequired ? 8 : undefined}
          required={passwordRequired}
          autoComplete="new-password"
          placeholder={passwordRequired ? "At least 8 characters" : "Leave blank to keep current"}
        />
      </Field>
      <Field label="Salary">
        <Input
          name="salary"
          type="number"
          step="0.01"
          defaultValue={defaults?.salary}
        />
      </Field>
      <Field label="Role">
        <NativeSelect
          name="roleCode"
          required
          value={roleCode}
          onChange={(event) => onRoleChange(event.target.value)}
        >
          {roles.map((role) => (
            <option key={role.code} value={role.code}>
              {role.name}
            </option>
          ))}
        </NativeSelect>
      </Field>
      <label className="flex items-center gap-2 text-sm sm:col-span-2">
        <input
          type="checkbox"
          name="isActive"
          defaultChecked={defaults?.isActive ?? true}
        />
        Active account
      </label>
      <fieldset className="rounded-xl border p-4 sm:col-span-2">
        <legend className="px-1 text-sm font-medium">Permissions</legend>
        <p className="mb-3 text-xs text-muted-foreground">
          Changing the role resets these to that role&apos;s defaults. Owner and Super
          Admin always retain full control.
        </p>
        <div className="grid gap-2 sm:grid-cols-2">
          {ALL_PERMISSIONS.filter((code) => grantableSet.has(code)).map((code) => (
            <label key={code} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                name="permissions"
                value={code}
                checked={selected.includes(code)}
                onChange={(event) => togglePermission(code, event.target.checked)}
              />
              {PERMISSION_LABELS[code]}
            </label>
          ))}
        </div>
      </fieldset>
      <Button type="submit" disabled={pending} className="sm:col-span-2">
        {pending ? "Saving..." : submitLabel}
      </Button>
    </form>
  );
}
