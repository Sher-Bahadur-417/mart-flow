import { DashboardShell } from "@/components/layout/dashboard-shell";
import { requireUser } from "@/lib/auth/dal";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default async function DashboardGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireUser();

  return <DashboardShell user={user}>{children}</DashboardShell>;
}
