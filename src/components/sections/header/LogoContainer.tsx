import { NavLink } from "react-router-dom";
import { cn } from "../../../lib/utils";
import { LOGO_PRIMARY } from "../../../assets";

interface LogoContainerProps {
    isScrolled: boolean;
    logoSrc?: string;
    logoAlt?: string;
    logoClassName?: string;
}

export const LogoContainer = ({
    isScrolled,
    logoSrc = LOGO_PRIMARY,
    logoAlt = "TAC Hydro Consultancy logo",
    logoClassName,
}: LogoContainerProps) => {
    return (
        <NavLink
            to="/"
            className={cn(
                "group relative inline-flex items-center rounded-[32px] border border-white/20 backdrop-blur-[30px] shadow-[0_15px_35px_rgba(0,0,0,0.25)] transition-all duration-500",
                isScrolled
                    ? "p-2 sm:p-2.5 bg-white/5 border-white/10"
                    : "p-3 sm:p-4 bg-gradient-to-br from-white/10 via-white/5 to-white/0 hover:border-white/40 hover:bg-white/15"
            )}
            aria-label="Go to home page"
        >
            <img
                className={cn(
                    "h-auto transition-all duration-500",
                    isScrolled
                        ? "w-[140px] sm:w-[160px] lg:w-[180px]"
                        : "w-[180px] sm:w-[200px] lg:w-[240px]",
                    logoClassName
                )}
                alt={logoAlt}
                src={logoSrc}
            />
        </NavLink>
    );
};
