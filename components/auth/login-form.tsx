"use client";

import Link from "next/link";
import { useActionState } from "react";

import { login } from "@/lib/auth/actions";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { LoginFormState } from "@/lib/validation/auth";

export function LoginForm() {
  const [state, action, pending] = useActionState<
    LoginFormState | undefined,
    FormData
  >(login, undefined);

  return (
    <div className="space-y-3">
      <form action={action} className="space-y-3">
        <div className="space-y-1.5">
          <label className="text-sm font-medium" htmlFor="identifier">
            Email or username
          </label>
          <Input
            id="identifier"
            name="identifier"
            type="text"
            placeholder="owner@martflow.local"
            autoComplete="username"
            required
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium" htmlFor="password">
            Password
          </label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            autoComplete="current-password"
            required
          />
        </div>
        {state?.error ? (
          <p className="text-sm text-destructive" role="alert">
            {state.error}
          </p>
        ) : null}
        <Button type="submit" disabled={pending} className="w-full">
          {pending ? "Signing in..." : "Sign in"}
        </Button>
      </form>
      <Link
        href="/signup"
        className={cn(buttonVariants({ variant: "outline" }), "w-full")}
      >
        Sign up
      </Link>
    </div>
  );
}
