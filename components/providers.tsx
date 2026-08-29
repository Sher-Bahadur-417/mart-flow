"use client";

import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";

export function Providers({
  children,
  initialTheme,
}: {
  children: React.ReactNode;
  initialTheme?: string | null;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      initialTheme={initialTheme}
    >
      <TooltipProvider>{children}</TooltipProvider>
    </ThemeProvider>
  );
}
