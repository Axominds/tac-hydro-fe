"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
  LogOut,
} from "lucide-react";
import { Montserrat } from "next/font/google";
import Cookies from "js-cookie";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["700"] });

const MENU_ITEMS = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "About Us", href: "/admin/about", icon: Users },
  { name: "Services", href: "/admin/services", icon: Briefcase },
  { name: "Projects", href: "/admin/projects", icon: BarChart3 },
  { name: "Galleries", href: "/admin/galleries", icon: ImageIcon },
  { name: "Banners", href: "/admin/banners", icon: Megaphone },
  { name: "News", href: "/admin/news", icon: Newspaper },
  { name: "Site Settings", href: "/admin/settings", icon: Settings },
];

interface AdminSidebarProps {
  theme: "light" | "dark";
}

export function AdminSidebar({ theme }: AdminSidebarProps) {
  const pathname = usePathname();
  const isDark = theme === "dark";

  const colors = {
    sidebarBg: isDark ? "#0c0c0c" : "#ffffff",
    sidebarBorder: isDark ? "rgba(255,255,255,0.08)" : "#e2e8f0",
    textColor: isDark ? "#ffffff" : "#1e293b",
    mutedColor: isDark ? "#888888" : "#64748b",
    hoverBg: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
    activeBg: "rgba(37, 99, 235, 0.1)",
    activeText: "#3b82f6",
  };

  return (
    <aside
      className="w-72 h-screen fixed left-0 top-0 flex flex-col z-50 transition-colors duration-300 shadow-lg"
      style={{
        backgroundColor: colors.sidebarBg,
        borderRight: `1px solid ${colors.sidebarBorder}`,
        boxShadow: isDark ? "4px 0 20px rgba(0,0,0,0.5)" : "4px 0 20px rgba(0,0,0,0.08)",
      }}
    >
      {/* Brand Header */}
      <div
        className="p-8 flex items-center justify-between transition-colors duration-300"
        style={{ borderBottom: `1px solid ${colors.sidebarBorder}` }}
      >
        <h1
          className={`${montserrat.className} text-xl tracking-tight font-bold`}
          style={{ color: colors.textColor }}
        >
          Tac-Hydro <span className="text-blue-500">Admin</span>
        </h1>
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-6 space-y-2 overflow-y-auto custom-scrollbar">
        {MENU_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 group"
              style={{
                backgroundColor: isActive ? colors.activeBg : "transparent",
                color: isActive ? colors.activeText : colors.mutedColor,
                boxShadow: isActive ? "inset 0 0 15px rgba(37,99,235,0.1)" : "none",
              }}
            >
              <item.icon
                className={`h-5 w-5 transition-transform duration-300 ${isActive ? "scale-110" : "group-hover:scale-110"}`}
                style={{ color: isActive ? colors.activeText : colors.mutedColor }}
              />
              <span className="font-medium text-sm tracking-wide">{item.name}</span>
              {isActive && (
                <ChevronRight className="h-4 w-4 ml-auto" style={{ color: colors.activeText }} />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer Profile/Logout */}
      <div
        className="p-6 mt-auto transition-colors duration-300"
        style={{ borderTop: `1px solid ${colors.sidebarBorder}` }}
      >
        <button
          onClick={() => {
            Cookies.remove("access_token");
            Cookies.remove("refresh_token");
            window.location.href = "/admin/login";
          }}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm group"
          style={{ color: "#ef4444" }}
        >
          <LogOut className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
          <span>Terminate Session</span>
        </button>
      </div>
    </aside>
  );
}
