import Link from "next/link";

import { Badge } from "@/components/ui/badge";

type PagePlaceholderProps = {
  title: string;
  description: string;
  phase: number;
};

export function PagePlaceholder({
  title,
  description,
  phase,
}: PagePlaceholderProps) {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-4 p-6">
      <div className="flex flex-wrap items-center gap-2">
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        <Badge variant="outline">Phase {phase}</Badge>
      </div>
      <p className="max-w-2xl text-muted-foreground">{description}</p>
      <div className="rounded-xl border border-dashed bg-muted/30 p-8 text-sm text-muted-foreground">
        This module is a route shell only. Business logic lands in Phase {phase}
        .{" "}
        <Link href="/dashboard" className="font-medium text-foreground underline-offset-4 hover:underline">
          Back to dashboard
        </Link>
      </div>
    </div>
  );
}
