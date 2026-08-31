import type { Metadata } from "next";

import { SignupForm } from "@/components/auth/signup-form";

export const metadata: Metadata = {
  title: "Sign up",
};

export default function SignupPage() {
  return (
    <div className="w-full max-w-md rounded-xl border bg-card p-6 shadow-sm">
      <div className="mb-6 space-y-1">
        <h1 className="text-xl font-semibold tracking-tight">Create your store</h1>
        <p className="text-sm text-muted-foreground">
          Fill in your details to create a new Owner account. Passwords are hashed
          and never shown again.
        </p>
      </div>
      <SignupForm />
    </div>
  );
}
