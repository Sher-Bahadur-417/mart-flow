"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  BookOpen,
  LayoutDashboard,
  Monitor,
  Package,
  Receipt,
  Settings,
  ShoppingCart,
  Tags,
  Truck,
  Undo2,
  UserCog,
  Users,
  Wallet,
  Warehouse,
} from "lucide-react";

import { APP_NAME, NAV_GROUPS, type NavIconName } from "@/constants/navigation";
import { canAccess } from "@/constants/permissions";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const ICONS: Record<NavIconName, LucideIcon> = {
  "layout-dashboard": LayoutDashboard,
  monitor: Monitor,
  package: Package,
  tags: Tags,
  warehouse: Warehouse,
  receipt: Receipt,
  "undo-2": Undo2,
  "shopping-cart": ShoppingCart,
  truck: Truck,
  users: Users,
  "book-open": BookOpen,
  wallet: Wallet,
  "user-cog": UserCog,
  "bar-chart-3": BarChart3,
  settings: Settings,
};

type SidebarNavProps = {
  onNavigate?: () => void;
  permissions: string[];
  roleCode: string;
};

export function SidebarNav({
  onNavigate,
  permissions,
  roleCode,
}: SidebarNavProps) {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col bg-sidebar text-sidebar-foreground">
      <div className="flex h-14 items-center gap-2 px-4">
        <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-sm font-semibold text-primary-foreground">
          M
        </div>
        <div className="min-w-0">
          <p className="truncate font-heading text-sm font-semibold">{APP_NAME}</p>
          <p className="truncate text-xs text-muted-foreground">Mart management</p>
        </div>
      </div>
      <Separator />
      <ScrollArea className="flex-1">
        <nav className="flex flex-col gap-4 p-3">
          {NAV_GROUPS.map((group) => {
            const items = group.items.filter((item) =>
              canAccess(roleCode, permissions, item.permission),
            );

            if (items.length === 0) {
              return null;
            }

            return (
              <div key={group.title} className="flex flex-col gap-1">
                <p className="px-2 pb-1 text-[11px] font-medium tracking-wider text-muted-foreground uppercase">
                  {group.title}
                </p>
                {items.map((item) => {
                  const Icon = ICONS[item.icon];
                  const isActive =
                    pathname === item.href || pathname.startsWith(`${item.href}/`);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onNavigate}
                      className={cn(
                        "flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm transition-colors",
                        isActive
                          ? "bg-sidebar-accent font-medium text-sidebar-accent-foreground"
                          : "text-sidebar-foreground/80 hover:bg-sidebar-accent/70 hover:text-sidebar-accent-foreground",
                      )}
                    >
                      <Icon className="size-4 shrink-0" />
                      <span className="truncate">{item.title}</span>
                    </Link>
                  );
                })}
              </div>
            );
          })}
        </nav>
      </ScrollArea>
    </div>
  );
}
