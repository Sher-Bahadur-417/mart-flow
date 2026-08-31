"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";

export default function AppError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-3 p-6 text-center">
      <h2 className="text-lg font-semibold">This page couldn&apos;t load</h2>
      <p className="max-w-md text-sm text-muted-foreground">
        {error.message || "A server error occurred. Reload to try again."}
      </p>
      <Button onClick={() => retry()}>Reload</Button>
    </div>
  );
}
