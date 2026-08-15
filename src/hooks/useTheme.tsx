import { useCallback, useEffect, useState } from "react";
import { STORAGE_KEYS } from "@/config";

export type ThemeMode = "light" | "dark" | "system";

function apply(mode: ThemeMode) {
  if (typeof document === "undefined") return;
  const prefersDark =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  const dark = mode === "dark" || (mode === "system" && prefersDark);
  document.documentElement.classList.toggle("dark", dark);
}

export function useTheme() {
  const [theme, setThemeState] = useState<ThemeMode>("system");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEYS.theme) as ThemeMode | null;
    const initial: ThemeMode =
      stored === "light" || stored === "dark" || stored === "system" ? stored : "system";
    setThemeState(initial);
    apply(initial);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const listener = () => {
      if (theme === "system") apply("system");
    };
    mq.addEventListener("change", listener);
    return () => mq.removeEventListener("change", listener);
  }, [theme]);

  const setTheme = useCallback((mode: ThemeMode) => {
    setThemeState(mode);
    window.localStorage.setItem(STORAGE_KEYS.theme, mode);
    apply(mode);
  }, []);

  return { theme, setTheme };
}