"use client";

import { SidebarNav } from "@/components/layout/sidebar-nav";

type AppSidebarProps = {
  permissions: string[];
  roleCode: string;
};

export function AppSidebar({ permissions, roleCode }: AppSidebarProps) {
  return (
    <aside className="hidden h-dvh w-64 shrink-0 border-r border-sidebar-border print:hidden md:sticky md:top-0 md:flex md:flex-col">
      <SidebarNav permissions={permissions} roleCode={roleCode} />
    </aside>
  );
}
