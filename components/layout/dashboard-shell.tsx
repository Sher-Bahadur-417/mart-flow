"use client";

import { useState } from "react";

import { AppHeader } from "@/components/layout/app-header";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { SidebarNav } from "@/components/layout/sidebar-nav";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import type { SessionUser } from "@/types/auth";

export function DashboardShell({
  children,
  user,
}: {
  children: React.ReactNode;
  user: SessionUser;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-dvh bg-background">
      <AppSidebar permissions={user.permissions} roleCode={user.roleCode} />
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-72 p-0" showCloseButton>
          <SheetHeader className="sr-only">
            <SheetTitle>Navigation</SheetTitle>
          </SheetHeader>
          <SidebarNav
            permissions={user.permissions}
            roleCode={user.roleCode}
            onNavigate={() => setMobileOpen(false)}
          />
        </SheetContent>
      </Sheet>
      <div className="flex min-w-0 flex-1 flex-col">
        <AppHeader user={user} onOpenMobile={() => setMobileOpen(true)} />
        <main className="flex flex-1 flex-col">{children}</main>
      </div>
    </div>
  );
}
