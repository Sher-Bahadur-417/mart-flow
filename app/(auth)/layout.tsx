import { APP_NAME } from "@/constants/navigation";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-dvh flex-col bg-muted/40">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_oklch(0.88_0.08_255),transparent_55%),radial-gradient(ellipse_at_bottom,_oklch(0.92_0.08_350),transparent_50%)] dark:bg-[radial-gradient(ellipse_at_top,_oklch(0.28_0.1_255),transparent_55%),radial-gradient(ellipse_at_bottom,_oklch(0.24_0.08_350),transparent_50%)]" />
      <header className="relative z-10 px-6 py-5 text-sm font-semibold tracking-tight">
        {APP_NAME}
      </header>
      <div className="relative z-10 flex flex-1 items-center justify-center p-6">
        {children}
      </div>
    </div>
  );
}
