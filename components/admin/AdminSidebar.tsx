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
  LogOut
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

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-72 h-screen fixed left-0 top-0 bg-[#0c0c0c] border-r border-white/5 flex flex-col z-50">
      {/* Brand Header */}
      <div className="p-8 border-b border-white/5 flex items-center justify-between">
        <h1 className={`${montserrat.className} text-xl text-white tracking-tight`}>
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
              className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 group ${
                isActive 
                ? "bg-blue-600/10 text-blue-500 shadow-[inset_0_0_15px_rgba(37,99,235,0.1)]" 
                : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <item.icon className={`h-5 w-5 transition-transform duration-300 ${isActive ? "scale-110" : "group-hover:scale-110"}`} />
              <span className="font-medium text-sm tracking-wide">{item.name}</span>
              {isActive && <ChevronRight className="h-4 w-4 ml-auto" />}
            </Link>
          );
        })}
      </nav>

      {/* Footer Profile/Logout */}
      <div className="p-6 border-t border-white/5 mt-auto bg-[#0a0a0a]/50">
        <button 
          onClick={() => {
            Cookies.remove("access_token");
            Cookies.remove("refresh_token");
            window.location.href = "/admin/login";
          }}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all font-medium text-sm group"
        >
          <LogOut className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
          <span>Terminate Session</span>
        </button>
      </div>
    </aside>
  );
}
