import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Geist, Geist_Mono } from "next/font/google";

import { Providers } from "@/components/providers";
import { APP_DESCRIPTION, APP_NAME } from "@/constants/navigation";
import { THEME_COOKIE, THEME_RESOLVED_COOKIE, htmlThemeClass } from "@/lib/theme";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: APP_NAME,
    template: `%s · ${APP_NAME}`,
  },
  description: APP_DESCRIPTION,
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const cookieStore = await cookies();
  const themeClass = htmlThemeClass(
    cookieStore.get(THEME_RESOLVED_COOKIE)?.value,
  );

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${themeClass} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers initialTheme={cookieStore.get(THEME_COOKIE)?.value}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
