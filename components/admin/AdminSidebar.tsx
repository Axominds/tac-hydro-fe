"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
  BarChart3,
  Users,
  Settings,
  Image as ImageIcon,
  Briefcase,
  LayoutDashboard,
  Megaphone,
  Newspaper,
  ChevronRight,
  ChevronLeft,
  LogOut,
  Sun,
  Moon,
  Handshake,
} from "lucide-react";
import { Montserrat } from "next/font/google";
import Cookies from "js-cookie";
import { setThemeValue } from "../../src/components/admin/ThemeToggle";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["700"] });

const MENU_ITEMS = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { 
    name: "About Us", 
    href: "/admin/about", 
    icon: Users,
    isDropdown: true,
    subItems: [
      { name: "About Us", href: "/admin/about" },
      { name: "Core Principles", href: "/admin/about/core-principles" },
      { name: "Team", href: "/admin/about/team" },
    ]
  },
  { name: "Services", href: "/admin/services", icon: Briefcase },
  { name: "Projects", href: "/admin/projects", icon: BarChart3 },
  { name: "Galleries", href: "/admin/galleries", icon: ImageIcon },
  { name: "Banners", href: "/admin/banners", icon: Megaphone },
  { name: "News", href: "/admin/news", icon: Newspaper },
  { name: "Valued Partners", href: "/admin/partners", icon: Handshake },
  { name: "Site Settings", href: "/admin/settings", icon: Settings },
];

interface AdminSidebarProps {
  theme: "light" | "dark";
}

export function AdminSidebar({ theme }: AdminSidebarProps) {
  const pathname = usePathname();
  const [localTheme, setLocalTheme] = useState(theme);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("tac-admin-sidebar-collapsed") === "true";
    }
    return false;
  });
  const isDark = localTheme === "dark";

  const toggleTheme = () => {
    const newTheme = isDark ? "light" : "dark";
    setLocalTheme(newTheme);
    setThemeValue(newTheme);
  };

  const toggleCollapse = () => {
    const newCollapsed = !isCollapsed;
    setIsCollapsed(newCollapsed);
    localStorage.setItem("tac-admin-sidebar-collapsed", String(newCollapsed));
    window.dispatchEvent(new CustomEvent("admin-sidebar-toggle"));
  };

  useEffect(() => {
    setLocalTheme(theme);
  }, [theme]);

  useEffect(() => {
    const stored = localStorage.getItem("tac-admin-sidebar-collapsed");
    if (stored !== null) {
      setIsCollapsed(stored === "true");
    }
  }, []);

  const colors = {
    sidebarBg: isDark ? "#0c0c0c" : "#ffffff",
    sidebarBorder: isDark ? "rgba(255,255,255,0.08)" : "#e2e8f0",
    textColor: isDark ? "#ffffff" : "#1e293b",
    mutedColor: isDark ? "#888888" : "#64748b",
    hoverBg: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
    activeBg: "rgba(37, 99, 235, 0.1)",
    activeText: "#3b82f6",
  };

  const isAboutUsDropDown = (itemName: string) => {
    if (itemName !== "About Us") return false;
    const aboutUsPath = pathname === "/admin/about" || 
                        pathname === "/admin/about/core-principles" || 
                        pathname === "/admin/about/team";
    return aboutUsPath;
  };

  const isDropdownItemActive = (item: typeof MENU_ITEMS[0]) => {
    if (!item.subItems) return pathname === item.href;
    return item.subItems.some(sub => pathname === sub.href);
  };

  return (
    <aside
      className={`h-screen fixed left-0 top-0 flex flex-col z-50 transition-all duration-300 shadow-lg ${
        isCollapsed ? "w-20" : "w-72"
      }`}
      style={{
        backgroundColor: colors.sidebarBg,
        borderRight: `1px solid ${colors.sidebarBorder}`,
        boxShadow: isDark ? "4px 0 20px rgba(0,0,0,0.5)" : "4px 0 20px rgba(0,0,0,0.08)",
      }}
    >
      {/* Brand Header */}
      <div
        className={`flex items-center justify-between transition-colors duration-300 ${isCollapsed ? "p-3" : "p-6"}`}
        style={{ borderBottom: `1px solid ${colors.sidebarBorder}` }}
      >
        {!isCollapsed && (
          <>
            <h1
              className={`${montserrat.className} text-xl tracking-tight font-bold`}
              style={{ color: colors.textColor }}
            >
              Tac-Hydro <span className="text-blue-500">Admin</span>
            </h1>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg transition-all hover:scale-110"
              style={{
                backgroundColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)",
                color: colors.textColor,
              }}
              title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </>
        )}
        {isCollapsed && (
          <button
            onClick={toggleCollapse}
            className="p-2 rounded-lg transition-all hover:scale-110 mx-auto"
            style={{
              backgroundColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)",
              color: colors.textColor,
            }}
            title="Expand sidebar"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
        {!isCollapsed && (
          <button
            onClick={toggleCollapse}
            className="p-2 rounded-lg transition-all hover:scale-110"
            style={{
              backgroundColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)",
              color: colors.textColor,
            }}
            title="Collapse sidebar"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Navigation Links */}
      <nav className={`flex-1 overflow-y-auto custom-scrollbar ${isCollapsed ? "p-3" : "p-6"}`}>
        {MENU_ITEMS.map((item) => {
          if (item.subItems && !isCollapsed) {
            const isDropdownActive = isDropdownItemActive(item);
            return (
              <div key={item.name}>
                <button
                  onClick={() => setOpenDropdown(openDropdown === item.name ? null : item.name)}
                  className="flex items-center gap-3 rounded-xl transition-all duration-300 group w-full px-4 py-3.5"
                  style={{
                    backgroundColor: isDropdownActive ? colors.activeBg : "transparent",
                    color: isDropdownActive ? colors.activeText : colors.mutedColor,
                  }}
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" style={{ color: isDropdownActive ? colors.activeText : colors.mutedColor }} />
                  <span className="font-medium text-sm tracking-wide flex-1 text-left">{item.name}</span>
                  <ChevronRight className={`h-4 w-4 transition-transform ${openDropdown === item.name ? "rotate-90" : ""}`} />
                </button>
                {openDropdown === item.name && (
                  <div className="ml-6 mt-1 space-y-1 border-l-2 border-blue-500/30 pl-4">
                    {item.subItems.map((sub) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        className="block px-4 py-2 rounded-lg text-sm font-medium transition-all"
                        style={{
                          backgroundColor: pathname === sub.href ? colors.activeBg : "transparent",
                          color: pathname === sub.href ? colors.activeText : colors.mutedColor,
                        }}
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          }
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl transition-all duration-300 group ${
                isCollapsed ? "justify-center w-full py-3" : "px-4 py-3.5"
              }`}
              style={{
                backgroundColor: isActive ? colors.activeBg : "transparent",
                color: isActive ? colors.activeText : colors.mutedColor,
                boxShadow: isActive ? "inset 0 0 15px rgba(37,99,235,0.1)" : "none",
              }}
            >
              <item.icon
                className={`h-5 w-5 flex-shrink-0 transition-transform duration-300 ${
                  isActive ? "scale-110" : "group-hover:scale-110"
                }`}
                style={{ color: isActive ? colors.activeText : colors.mutedColor }}
              />
              {!isCollapsed && (
                <span className="font-medium text-sm tracking-wide">{item.name}</span>
              )}
              {isActive && !isCollapsed && (
                <ChevronRight className="h-4 w-4 ml-auto" style={{ color: colors.activeText }} />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer Profile/Logout */}
      <div
        className={`mt-auto transition-colors duration-300 ${isCollapsed ? "p-3" : "p-6"}`}
        style={{ borderTop: `1px solid ${colors.sidebarBorder}` }}
      >
        <button
          onClick={() => {
            Cookies.remove("access_token");
            Cookies.remove("refresh_token");
            window.location.href = "/admin/login";
          }}
className={`w-full flex items-center gap-3 rounded-xl transition-all font-medium text-sm group ${
              isCollapsed ? "justify-center py-3" : "px-4 py-3.5"
            }`}
            style={{ color: "#ef4444" }}
        >
          <LogOut className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}
