"use client";

import { useActionState } from "react";

import { Field } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { EmployeeFormState } from "@/lib/validation/employees";

export function ResetPasswordForm({
  action,
}: {
  action: (
    state: EmployeeFormState | undefined,
    formData: FormData,
  ) => Promise<EmployeeFormState>;
}) {
  const [state, formAction, pending] = useActionState(action, undefined);

  return (
    <form action={formAction} className="grid max-w-md gap-3">
      {state?.error ? (
        <p className="text-sm text-destructive" role="alert">
          {state.error}
        </p>
      ) : null}
      {state?.success ? (
        <p className="text-sm text-emerald-700 dark:text-emerald-400">{state.success}</p>
      ) : null}
      <Field label="New password">
        <Input
          name="password"
          type="password"
          minLength={8}
          required
          autoComplete="new-password"
          placeholder="At least 8 characters"
        />
      </Field>
      <Button type="submit" variant="outline" disabled={pending}>
        {pending ? "Updating..." : "Reset password"}
      </Button>
    </form>
  );
}
