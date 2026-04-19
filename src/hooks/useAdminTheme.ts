"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const THEME_KEY = "admin-theme";
const DEFAULT_THEME = "light";

export function getTheme(): "light" | "dark" {
  if (typeof window === "undefined") return DEFAULT_THEME;
  return (Cookies.get(THEME_KEY) as "light" | "dark") || DEFAULT_THEME;
}

export const adminColors = {
  dark: {
    bg: "#070707",
    cardBg: "rgba(255,255,255,0.03)",
    cardBgHover: "rgba(255,255,255,0.06)",
    border: "rgba(255,255,255,0.08)",
    borderHover: "rgba(255,255,255,0.12)",
    text: "#ffffff",
    textSecondary: "#888888",
    textMuted: "#555555",
    inputBg: "rgba(255,255,255,0.05)",
    modalBg: "#0a0a0a",
  },
  light: {
    bg: "#f8fafc",
    cardBg: "#ffffff",
    cardBgHover: "#f8fafc",
    border: "#e2e8f0",
    borderHover: "#cbd5e1",
    text: "#1e293b",
    textSecondary: "#64748b",
    textMuted: "#94a3b8",
    inputBg: "#ffffff",
    modalBg: "#ffffff",
  },
};

export function useAdminTheme() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTheme(getTheme());
    setMounted(true);

    const handleThemeChange = () => setTheme(getTheme());
    window.addEventListener("admin-theme-change", handleThemeChange);
    return () => window.removeEventListener("admin-theme-change", handleThemeChange);
  }, []);

  return { theme, colors: adminColors[theme], mounted };
}

export function getThemedClasses(theme: "light" | "dark") {
  const c = adminColors[theme];
  const isDark = theme === "dark";
  return {
    card: {
      default: { backgroundColor: c.cardBg, borderWidth: "1px", borderStyle: "solid", borderColor: c.border },
      hover: { backgroundColor: c.cardBgHover, borderColor: c.borderHover },
    },
    text: {
      primary: { color: c.text },
      secondary: { color: c.textSecondary },
      muted: { color: c.textMuted },
    },
    input: {
      bg: { backgroundColor: isDark ? "rgba(255,255,255,0.05)" : "#f1f5f9", borderWidth: "1px", borderStyle: "solid", borderColor: c.border, color: c.text },
    },
    modal: {
      bg: { backgroundColor: c.modalBg, borderColor: c.border },
    },
    colors: c,
  };
}
