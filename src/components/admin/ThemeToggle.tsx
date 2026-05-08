"use client";

import { useEffect, useState, useCallback } from "react";
import { Sun, Moon } from "lucide-react";
import Cookies from "js-cookie";

const THEME_KEY = "admin-theme";
const THEME_EVENT = "admin-theme-change";
const DEFAULT_THEME = "light";

export function getTheme(): "light" | "dark" {
  if (typeof window === "undefined") return DEFAULT_THEME;
  return (Cookies.get(THEME_KEY) as "light" | "dark") || DEFAULT_THEME;
}

export function setThemeValue(theme: "light" | "dark") {
  Cookies.set(THEME_KEY, theme, { expires: 365, path: "/" });
  document.documentElement.setAttribute("data-admin-theme", theme);
  window.dispatchEvent(new CustomEvent(THEME_EVENT, { detail: theme }));
}

export function ThemeToggle() {
  const [theme, setThemeState] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const currentTheme = getTheme();
    setThemeState(currentTheme);
    setMounted(true);

    const handleThemeChange = (e: Event) => {
      setThemeState((e as CustomEvent<"light" | "dark">).detail);
    };

    window.addEventListener(THEME_EVENT, handleThemeChange);
    return () => window.removeEventListener(THEME_EVENT, handleThemeChange);
  }, []);

  const toggleTheme = useCallback(() => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setThemeValue(newTheme);
  }, [theme]);

  if (!mounted) {
    return <div className="w-10 h-10" />;
  }

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-6 right-6 z-50 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
      style={{
        backgroundColor: theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)",
        border: theme === "dark" ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.1)",
      }}
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className="w-5 h-5 text-yellow-400" />
      ) : (
        <Moon className="w-5 h-5 text-slate-700" />
      )}
    </button>
  );
}
