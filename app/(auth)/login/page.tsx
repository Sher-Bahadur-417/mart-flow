import type { Metadata } from "next";

import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Sign in",
};

export default function LoginPage() {
  return (
    <div className="w-full max-w-sm rounded-xl border bg-card p-6 shadow-sm">
      <div className="mb-6 space-y-1">
        <h1 className="text-xl font-semibold tracking-tight">Sign in</h1>
        <p className="text-sm text-muted-foreground">
          Sign in with your email or username. Access is controlled by server-side roles.
        </p>
      </div>
      <LoginForm />
    </div>
  );
}
