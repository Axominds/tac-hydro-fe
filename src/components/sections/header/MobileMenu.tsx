import { useState } from "react";
import { NavLink } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { cn } from "../../../lib/utils";
import { SocialSection } from "./SocialSection";
import { NavigationItem } from "./DesktopNav";

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
    navigationItems?: NavigationItem[];
    isScrolled: boolean;
    linkClassName?: string;
}

export const MobileMenu = ({
    isOpen,
    onClose,
    navigationItems = [],
    isScrolled,
    linkClassName,
}: MobileMenuProps) => {
    const [expandedItem, setExpandedItem] = useState<string | null>(null);

    if (!isOpen) return null;

    const baseNavItem =
        "text-white/80 font-semibold text-sm sm:text-base lg:text-lg transition text-center py-2";

    const glassClass = cn(
        "group relative inline-flex items-center px-6 py-2 rounded-[32px] border border-white/20 backdrop-blur-[30px] font-bold text-white transition-all duration-300 text-center",
        isScrolled ? "bg-white/15" : "bg-gradient-to-br from-white/5 via-white/10 to-white/20"
    );

    const glassHover =
        "hover:translate-y-0 hover:border-white/60 hover:bg-white/25 hover:shadow-[0_25px_65px_rgba(0,0,0,0.45)] active:translate-y-0.5";

    const activeGlass = cn(
        glassClass,
        glassHover,
        "border-white/60 bg-white/20 shadow-[0_0_20px_rgba(255,255,255,0.3),inset_0_0_10px_rgba(255,255,255,0.2)] ring-1 ring-white/40 ring-inset"
    );

    return (
        <div className="mt-4 rounded-2xl bg-[#0b1522]/95 p-4 shadow-[0_12px_32px_rgba(0,0,0,0.25)] sm:hidden border border-white/10 backdrop-blur-2xl">
            <nav className="flex flex-col gap-3">
                {navigationItems.map((item, index) => {
                    const hasDropdown = item.dropdown && item.dropdown.length > 0;

                    if (hasDropdown) {
                        return (
                            <div key={`${item.label}-${index}`} className="flex flex-col">
                                <button
                                    onClick={() => setExpandedItem(expandedItem === item.label ? null : item.label)}
                                    className={cn(
                                        baseNavItem,
                                        "flex items-center justify-center gap-1",
                                        linkClassName,
                                    )}
                                >
                                    {item.label}
                                    <ChevronDown className={cn(
                                        "w-4 h-4 transition-transform duration-200",
                                        expandedItem === item.label ? "rotate-180" : ""
                                    )} />
                                </button>

                                {expandedItem === item.label && (
                                    <div className="flex flex-col gap-2 mt-2 ml-4 pl-4 border-l-2 border-white/20">
                                        {item.dropdown!.map((dropdownItem, dropdownIndex) => (
                                            <NavLink
                                                key={`${dropdownItem.label}-${dropdownIndex}`}
                                                to={dropdownItem.href}
                                                onClick={onClose}
                                                className="text-white/70 font-medium text-sm hover:text-white transition-colors py-1"
                                            >
                                                {dropdownItem.label}
                                            </NavLink>
                                        ))}
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
                            onClick={onClose}
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
                <div className="flex items-center justify-center pt-3 border-t border-white/10 mt-2">
                    <SocialSection isScrolled={isScrolled} />
                </div>
            </nav>
        </div>
    );
};
