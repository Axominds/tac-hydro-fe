import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FacebookIcon, LinkedinIcon } from "lucide-react";
import { cn } from "../../lib/utils";
import { LOGO_PRIMARY } from "../../assets";

export type NavigationItem = {
  label: string;
  href: string;
  isActive?: boolean;
};

type SiteHeaderProps = {
  navigationItems: NavigationItem[];
  headerClassName?: string;
  innerClassName?: string;
  navClassName?: string;
  linkClassName?: string;
  logoClassName?: string;
  logoSrc?: string;
  logoAlt?: string;
};

export const SiteHeader = ({
  navigationItems,
  headerClassName,
  innerClassName,
  navClassName,
  linkClassName,
  logoClassName,
  logoSrc = LOGO_PRIMARY,
  logoAlt = "TAC Hydro Consultancy logo",
}: SiteHeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navWrapperClass =
    "relative z-20 flex items-center flex-wrap justify-center gap-3 rounded-[40px] border border-white/20 bg-gradient-to-br from-white/10 via-white/5 to-white/0 px-2 py-2 shadow-[0_25px_45px_rgba(0,0,0,0.45)] backdrop-blur-[30px]";
  const socialWrapperClass = "hidden sm:flex items-center gap-2 ml-4";
  const baseNavItem =
    "text-white/80 font-semibold text-sm sm:text-base lg:text-lg transition text-center";
  const glassClass =
    "group relative inline-flex items-center px-6 py-2 rounded-[32px] border border-white/20 bg-gradient-to-br from-white/5 via-white/10 to-white/20 backdrop-blur-[30px] font-bold text-white leading-[1.1] transition-all duration-300 text-center shadow-[inset_0_0_25px_rgba(255,255,255,0.25)]";
  const glassHover =
    "hover:translate-y-0 hover:border-white/60 hover:bg-white/25 hover:shadow-[0_25px_65px_rgba(0,0,0,0.45)] active:translate-y-0.5";
  const activeGlass =
    `${glassClass} ${glassHover} border-[#0070c0] bg-[#0070c0] shadow-[0_18px_45px_rgba(0,0,0,0.35),inset_0_0_35px_rgba(0,0,0,0.5)] ring-1 ring-white/40 ring-inset`;
  const socialGlass =
    "group relative inline-flex items-center gap-2 px-4 py-2 rounded-[28px] border border-white/30 bg-white/10 backdrop-blur-[30px] font-semibold text-sm text-white transition-all duration-300 shadow-[0_15px_30px_rgba(0,0,0,0.25)] hover:-translate-y-0.5 hover:border-white/60 hover:bg-white/20";

  return (
    <header
      className={cn(
        "relative z-30 px-4 py-6 sm:px-8 lg:px-20 sm:py-[30px] pointer-events-auto",
        headerClassName,
      )}
    >
      <div
        className={cn(
          "relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between",
          innerClassName,
        )}
      >
        <NavLink to="/" className="inline-flex" aria-label="Go to home page">
          <img
            className={cn("w-[200px] h-auto sm:w-[240px] lg:w-[277px]", logoClassName)}
            alt={logoAlt}
            src={logoSrc}
          />
        </NavLink>

        <div className="absolute right-0 top-0 flex items-center justify-end gap-3 sm:static">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full border border-white/30 p-2 text-white transition-colors hover:border-white/60 sm:hidden"
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              {isMobileMenuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>

        <div className="hidden sm:flex items-center justify-end gap-4 w-full">
          <nav className={cn("flex-1 flex justify-center", navClassName)}>
            <div className={navWrapperClass}>
              {navigationItems.map((item, index) => (
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
              ))}
            </div>
          </nav>
          <div className={socialWrapperClass}>
            <a
              href="https://www.facebook.com/tachydro"
              target="_blank"
              rel="noreferrer"
              className={socialGlass}
            >
              <FacebookIcon className="w-4 h-4" />
              <span className="sr-only">Facebook</span>
            </a>
            <a
              href="https://www.linkedin.com/company/tachydro/"
              target="_blank"
              rel="noreferrer"
              className={socialGlass}
            >
              <LinkedinIcon className="w-4 h-4" />
              <span className="sr-only">LinkedIn</span>
            </a>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="mt-4 rounded-2xl bg-[#0b1522]/95 p-4 shadow-[0_12px_32px_rgba(0,0,0,0.25)] sm:hidden">
          <nav className="flex flex-col gap-3">
            {navigationItems.map((item, index) => (
              <NavLink
                key={`${item.label}-${index}`}
                to={item.href}
                end={item.href === "/"}
                onClick={() => setIsMobileMenuOpen(false)}
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
            ))}
            <div className="flex items-center gap-3 pt-3">
              <a
                href="https://www.facebook.com/tachydro"
                target="_blank"
                rel="noreferrer"
                className={socialGlass}
              >
                <FacebookIcon className="w-4 h-4" />
                <span className="sr-only">Facebook</span>
              </a>
              <a
                href="https://www.linkedin.com/company/tachydro/"
                target="_blank"
                rel="noreferrer"
                className={socialGlass}
              >
                <LinkedinIcon className="w-4 h-4" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>

          </nav>
        </div>
      )}
    </header>
  );
};
