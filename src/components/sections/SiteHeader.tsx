import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { cn } from "../../lib/utils";
import { LOGO_PRIMARY } from "../../assets";
import { Button } from "../ui/button";

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
  cta?: React.ReactNode;
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
  cta,
}: SiteHeaderProps): JSX.Element => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

        <nav className={cn("hidden sm:flex flex-wrap items-center justify-center gap-4 sm:gap-6", navClassName)}>
          {navigationItems.map((item, index) => (
            <NavLink
              key={`${item.label}-${index}`}
              to={item.href}
              end={item.href === "/"}
              className={({ isActive }) =>
                cn(
                  "font-bold text-white text-sm sm:text-base lg:text-lg leading-[normal] transition-colors",
                  (isActive || item.isActive) && "text-[#0070c0] underline underline-offset-4",
                  linkClassName,
                )
              }
            >
              {item.label}
            </NavLink>
          ))}

          {cta ?? (
            <NavLink to="/contact" className="inline-flex">
              <Button
                type="button"
                className="h-auto px-5 py-2.5 bg-[#0070c0] rounded-3xl font-bold text-white text-sm sm:text-base lg:text-lg"
              >
                Contact Us
              </Button>
            </NavLink>
          )}
        </nav>
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
                    "font-semibold text-white text-base leading-[normal] transition-colors",
                    (isActive || item.isActive) && "text-[#0070c0]",
                    linkClassName,
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
            {cta ?? (
              <NavLink to="/contact" className="inline-flex" onClick={() => setIsMobileMenuOpen(false)}>
                <Button
                  type="button"
                  className="h-auto w-full px-5 py-2.5 bg-[#0070c0] rounded-3xl font-bold text-white text-base"
                >
                  Contact Us
                </Button>
              </NavLink>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};
