import type { Metadata } from "next";
import Link from "next/link";

import { requireUser } from "@/lib/auth/dal";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Access denied",
};

export default async function AccessDeniedPage() {
  await requireUser();

  return (
    <div className="mx-auto flex w-full max-w-xl flex-col gap-3 p-6">
      <h1 className="text-2xl font-semibold tracking-tight">Access denied</h1>
      <p className="text-muted-foreground">
        Your role does not include permission for that page. This check ran on
        the server.
      </p>
      <Link href="/dashboard" className={cn(buttonVariants())}>
        Back to dashboard
      </Link>
    </div>
  );
}
