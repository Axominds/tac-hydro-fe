import { useState } from "react";
import { NavLink } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { cn } from "../../../lib/utils";

export type NavigationItem = {
    label: string;
    href: string;
    isActive?: boolean;
    dropdown?: {
        label: string;
        href: string;
    }[];
};

interface DesktopNavProps {
    navigationItems: NavigationItem[];
    isScrolled: boolean;
    navClassName?: string;
    linkClassName?: string;
}

export const DesktopNav = ({
    navigationItems,
    isScrolled,
    navClassName,
    linkClassName,
}: DesktopNavProps) => {
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const navWrapperClass = cn(
        "relative z-20 flex items-center flex-wrap justify-center gap-3 rounded-[40px] border border-white/20 px-2 py-2 transition-all duration-500",
        isScrolled
            ? "bg-white/10 backdrop-blur-[40px] shadow-[0_15px_35px_rgba(0,0,0,0.3)] border-white/30"
            : "bg-gradient-to-br from-white/10 via-white/5 to-white/0 shadow-[0_25px_45px_rgba(0,0,0,0.45)] backdrop-blur-[30px]"
    );

    const baseNavItem =
        "text-white/80 font-semibold text-sm sm:text-base lg:text-lg transition text-center px-4 py-2";

    const glassClass = cn(
        "group relative inline-flex items-center px-6 py-2 rounded-[32px] border border-white/20 backdrop-blur-[30px] font-bold text-white transition-all duration-300 text-center",
        isScrolled ? "bg-white/15" : "bg-gradient-to-br from-white/5 via-white/10 to-white/20"
    );

    const glassHover =
        "hover:translate-y-0 hover:border-white/60 hover:bg-white/25 hover:shadow-[0_25px_65px_rgba(0,0,0,0.45)] active:translate-y-0.5";

    // Refined Active State: Using a subtle glow and border instead of solid blue
    const activeGlass = cn(
        glassClass,
        glassHover,
        "border-white/60 bg-white/20 shadow-[0_0_20px_rgba(255,255,255,0.3),inset_0_0_10px_rgba(255,255,255,0.2)] ring-1 ring-white/40 ring-inset"
    );

    return (
        <nav className={cn("hidden sm:flex justify-center", navClassName)}>
            <div className={navWrapperClass}>
                {navigationItems.map((item, index) => {
                    const hasDropdown = item.dropdown && item.dropdown.length > 0;

                    if (hasDropdown) {
                        return (
                            <div
                                key={`${item.label}-${index}`}
                                className="relative"
                                onMouseEnter={() => setOpenDropdown(item.label)}
                                onMouseLeave={() => setOpenDropdown(null)}
                            >
                                <NavLink
                                    to={item.href}
                                    end={item.href === "/"}
                                    className={({ isActive }) =>
                                        cn(
                                            baseNavItem,
                                            "flex items-center gap-1",
                                            (isActive || item.isActive) ? activeGlass : "hover:text-white",
                                            linkClassName,
                                        )
                                    }
                                >
                                    {item.label}
                                    <ChevronDown className={cn(
                                        "w-4 h-4 transition-transform duration-200",
                                        openDropdown === item.label ? "rotate-180" : ""
                                    )} />
                                </NavLink>

                                {/* Dropdown Menu */}
                                {openDropdown === item.label && (
                                    <div className="absolute top-full left-0 pt-1">
                                        <div className="min-w-[240px] rounded-2xl border border-white/20 bg-[#0b1522]/70 backdrop-blur-[30px] shadow-[0_25px_45px_rgba(0,0,0,0.45)] overflow-hidden">
                                            {item.dropdown!.map((dropdownItem, dropdownIndex) => (
                                                <NavLink
                                                    key={`${dropdownItem.label}-${dropdownIndex}`}
                                                    to={dropdownItem.href}
                                                    className="block px-4 py-3 text-white/80 font-semibold text-sm hover:bg-white/10 hover:text-white transition-all duration-200 first:rounded-t-2xl last:rounded-b-2xl"
                                                    onClick={() => setOpenDropdown(null)}
                                                >
                                                    {dropdownItem.label}
                                                </NavLink>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    }

                    return (
                        <NavLink
                            key={`${item.label}-${index}`}
                            to={item.href}
                            end={item.href === "/"}
                            className={({ isActive }) =>
                                cn(
                                    baseNavItem,
                                    (isActive || item.isActive) ? activeGlass : "hover:text-white",
                                    linkClassName,
                                )
                            }
                        >
                            {item.label}
                        </NavLink>
                    );
                })}
            </div>
        </nav>
    );
};
