"use client";

import Link from "next/link";
import { useActionState } from "react";

import { signup } from "@/lib/auth/signup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { LoginFormState } from "@/lib/validation/auth";

export function SignupForm() {
  const [state, action, pending] = useActionState<
    LoginFormState | undefined,
    FormData
  >(signup, undefined);

  return (
    <form action={action} className="space-y-3">
      <div className="space-y-1.5">
        <label className="text-sm font-medium" htmlFor="storeName">
          Store name
        </label>
        <Input
          id="storeName"
          name="storeName"
          required
          placeholder="Main Store"
          autoComplete="organization"
        />
      </div>
      <div className="space-y-1.5">
        <label className="text-sm font-medium" htmlFor="name">
          Your name
        </label>
        <Input id="name" name="name" required autoComplete="name" />
      </div>
      <div className="space-y-1.5">
        <label className="text-sm font-medium" htmlFor="email">
          Email
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
        />
      </div>
      <div className="space-y-1.5">
        <label className="text-sm font-medium" htmlFor="username">
          Username
        </label>
        <Input
          id="username"
          name="username"
          required
          minLength={3}
          autoComplete="username"
        />
      </div>
      <div className="space-y-1.5">
        <label className="text-sm font-medium" htmlFor="phone">
          Phone
        </label>
        <Input id="phone" name="phone" type="tel" autoComplete="tel" />
      </div>
      <div className="space-y-1.5">
        <label className="text-sm font-medium" htmlFor="password">
          Password
        </label>
        <Input
          id="password"
          name="password"
          type="password"
          required
          minLength={8}
          autoComplete="new-password"
          placeholder="At least 8 characters"
        />
      </div>
      <div className="space-y-1.5">
        <label className="text-sm font-medium" htmlFor="confirmPassword">
          Confirm password
        </label>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          required
          minLength={8}
          autoComplete="new-password"
        />
      </div>
      {state?.error ? (
        <p className="text-sm text-destructive" role="alert">
          {state.error}
        </p>
      ) : null}
      <Button type="submit" disabled={pending} className="w-full">
        {pending ? "Creating account..." : "Create account"}
      </Button>
      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-primary hover:underline">
          Sign in
        </Link>
      </p>
    </form>
  );
}
