"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { AdminSidebar } from "../../components/admin/AdminSidebar";
import { ThemeToggle, getTheme } from "../../src/components/admin/ThemeToggle";

const THEME_KEY = "admin-theme";
const DEFAULT_THEME = "light";

export const adminTheme = {
  dark: {
    bg: "#070707",
    text: "#ffffff",
    cardBg: "#111111",
    cardBorder: "#1f1f1f",
    cardShadow: "0 4px 20px rgba(0,0,0,0.4)",
    inputBg: "#1a1a1a",
    inputBorder: "#2a2a2a",
    inputText: "#ffffff",
    muted: "#888888",
    gradient: "rgba(37, 99, 235, 0.05)",
    tableHeader: "#0f0f0f",
    tableBorder: "#1f1f1f",
    tableHover: "rgba(255,255,255,0.02)",
  },
  light: {
    bg: "#f8fafc",
    text: "#1e293b",
    cardBg: "#ffffff",
    cardBorder: "#e2e8f0",
    cardShadow: "0 4px 20px rgba(0,0,0,0.08)",
    inputBg: "#ffffff",
    inputBorder: "#cbd5e1",
    inputText: "#1e293b",
    muted: "#64748b",
    gradient: "rgba(37, 99, 235, 0.02)",
    tableHeader: "#f1f5f9",
    tableBorder: "#e2e8f0",
    tableHover: "rgba(0,0,0,0.02)",
  },
};

export function AdminCard({
  children,
  className = "",
  style = {},
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTheme(getTheme());
    setMounted(true);

    const handleThemeChange = () => setTheme(getTheme());
    window.addEventListener("admin-theme-change", handleThemeChange);
    return () => window.removeEventListener("admin-theme-change", handleThemeChange);
  }, []);

  if (!mounted) return null;

  const colors = adminTheme[theme];

  return (
    <div
      className={`rounded-xl ${className}`}
      style={{
        backgroundColor: colors.cardBg,
        border: `1px solid ${colors.cardBorder}`,
        boxShadow: colors.cardShadow,
        color: colors.text,
        transition: "all 0.3s ease",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function AdminInput({ style = {}, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTheme(getTheme());
    setMounted(true);

    const handleThemeChange = () => setTheme(getTheme());
    window.addEventListener("admin-theme-change", handleThemeChange);
    return () => window.removeEventListener("admin-theme-change", handleThemeChange);
  }, []);

  if (!mounted) return <input {...props} />;

  const colors = adminTheme[theme];

  return (
    <input
      {...props}
      style={{
        backgroundColor: colors.inputBg,
        border: `1px solid ${colors.inputBorder}`,
        color: colors.inputText,
        borderRadius: "0.5rem",
        padding: "0.5rem 0.75rem",
        transition: "all 0.3s ease",
        ...style,
      }}
    />
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const initialTheme = Cookies.get(THEME_KEY) as "light" | "dark" | undefined;
    const theme = initialTheme || DEFAULT_THEME;
    setTheme(theme);
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleThemeChange = (e: Event) => {
      const newTheme = (e as CustomEvent<"light" | "dark">).detail;
      setTheme(newTheme);
    };

    window.addEventListener("admin-theme-change", handleThemeChange);
    return () => window.removeEventListener("admin-theme-change", handleThemeChange);
  }, []);

  const colors = adminTheme[theme];

  return (
    <div
      className="admin-dashboard"
      style={{
        backgroundColor: colors.bg,
        color: colors.text,
        minHeight: "100vh",
        transition: "background-color 0.3s ease, color 0.3s ease",
      }}
    >
      <AdminSidebar theme={theme} />
      {mounted && <ThemeToggle />}
      <main className="flex-1 ml-72 p-10 relative">
        <div
          className="absolute top-0 right-0 w-full h-[300px] pointer-events-none transition-opacity duration-300"
          style={{
            background: `linear-gradient(to bottom right, ${colors.gradient}, transparent)`,
            opacity: theme === "dark" ? 1 : 0.5,
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
