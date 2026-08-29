"use client";

import * as React from "react";

import {
  THEME_COOKIE,
  THEME_RESOLVED_COOKIE,
  THEME_STORAGE_KEY,
  isThemePreference,
  type ThemePreference,
} from "@/lib/theme";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: string;
  storageKey?: string;
  initialTheme?: string | null;
  attribute?: string;
  enableSystem?: boolean;
  disableTransitionOnChange?: boolean;
};

type ThemeContextValue = {
  theme: ThemePreference;
  setTheme: (theme: ThemePreference) => void;
};

const ThemeContext = React.createContext<ThemeContextValue | undefined>(
  undefined,
);

function getSystemTheme(): "light" | "dark" {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function persistCookies(preference: ThemePreference, resolved: "light" | "dark") {
  const maxAge = 60 * 60 * 24 * 365;
  document.cookie = `${THEME_COOKIE}=${preference}; path=/; max-age=${maxAge}; samesite=lax`;
  document.cookie = `${THEME_RESOLVED_COOKIE}=${resolved}; path=/; max-age=${maxAge}; samesite=lax`;
}

function applyTheme(theme: ThemePreference) {
  const resolved = theme === "system" ? getSystemTheme() : theme;
  const root = document.documentElement;
  root.classList.remove("light", "dark");
  root.classList.add(resolved);
  root.style.colorScheme = resolved;
  persistCookies(theme, resolved);
  return resolved;
}

function readStoredTheme(storageKey: string, fallback: ThemePreference) {
  try {
    const stored = window.localStorage.getItem(storageKey);
    if (isThemePreference(stored)) {
      return stored;
    }
  } catch {
    // Ignore quota / private-mode failures.
  }
  return fallback;
}

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = THEME_STORAGE_KEY,
  initialTheme,
}: ThemeProviderProps) {
  const fallback = isThemePreference(initialTheme)
    ? initialTheme
    : isThemePreference(defaultTheme)
      ? defaultTheme
      : "system";
  const [theme, setThemeState] = React.useState<ThemePreference>(fallback);

  React.useLayoutEffect(() => {
    applyTheme(readStoredTheme(storageKey, fallback));

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      if (readStoredTheme(storageKey, fallback) === "system") {
        applyTheme("system");
      }
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, [fallback, storageKey]);

  const setTheme = React.useCallback(
    (next: ThemePreference) => {
      setThemeState(next);
      try {
        window.localStorage.setItem(storageKey, next);
      } catch {
        // Ignore quota / private-mode failures.
      }
      applyTheme(next);
    },
    [storageKey],
  );

  const value = React.useMemo(() => ({ theme, setTheme }), [theme, setTheme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider.");
  }
  return context;
}
