import { requirePermission } from "@/lib/permissions";
import { PagePlaceholder } from "@/components/layout/page-placeholder";
import type { PermissionCode } from "@/constants/permissions";

type GuardedPlaceholderProps = {
  permission: PermissionCode;
  title: string;
  description: string;
  phase: number;
};

export async function GuardedPlaceholder({
  permission,
  title,
  description,
  phase,
}: GuardedPlaceholderProps) {
  await requirePermission(permission);

  return (
    <PagePlaceholder title={title} description={description} phase={phase} />
  );
}
