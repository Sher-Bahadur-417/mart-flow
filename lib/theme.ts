export const THEME_STORAGE_KEY = "theme";
export const THEME_COOKIE = "martflow-theme";
export const THEME_RESOLVED_COOKIE = "martflow-theme-resolved";

export type ThemePreference = "light" | "dark" | "system";
export type ResolvedTheme = "light" | "dark";

export function isThemePreference(
  value: string | null | undefined,
): value is ThemePreference {
  return value === "light" || value === "dark" || value === "system";
}

export function htmlThemeClass(resolved: string | undefined): ResolvedTheme {
  return resolved === "dark" ? "dark" : "light";
}
