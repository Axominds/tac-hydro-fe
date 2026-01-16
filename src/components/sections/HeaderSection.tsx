import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { cn } from "../../lib/utils";
import { LOGO_PRIMARY } from "../../assets";
import { LogoContainer } from "./header/LogoContainer";
import { SocialSection } from "./header/SocialSection";
import { DesktopNav, NavigationItem } from "./header/DesktopNav";
import { MobileMenu } from "./header/MobileMenu";

export type { NavigationItem };

type HeaderSectionProps = {
  // navigationItems is now optional/ignored as we define it internally
  navigationItems?: NavigationItem[];
  headerClassName?: string;
  innerClassName?: string;
  navClassName?: string;
  linkClassName?: string;
  logoClassName?: string;
  logoSrc?: string;
  logoAlt?: string;
};

const NAV_ITEMS: NavigationItem[] = [
  { label: "Home", href: "/" },
  {
    label: "About Us",
    href: "/about-us",
    dropdown: [
      { label: "Our Organizational Chart", href: "/about-us/our-organization-chart" },
      { label: "Our Team", href: "/about-us/our-team" },
      { label: "Our Professional Framework", href: "/about-us/our-professional-framework" },
    ]
  },
  { label: "Projects", href: "/projects" },
  { label: "Services", href: "/services" },
  { label: "Galleries", href: "/galleries" },
  { label: "Contact Us", href: "/contact-us" },
];

export const HeaderSection = ({
  headerClassName,
  innerClassName,
  navClassName,
  linkClassName,
  logoClassName,
  logoSrc = LOGO_PRIMARY,
  logoAlt = "TAC Hydro Consultancy logo",
}: HeaderSectionProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();

  // Dynamic navigation items with active state
  const navigationItems = NAV_ITEMS.map(item => {
    const isCurrent = item.href === "/"
      ? location.pathname === "/"
      : location.pathname.startsWith(item.href);

    return {
      ...item,
      isActive: isCurrent
    };
  });


  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Update scrolled state for styling
      setIsScrolled(currentScrollY > 20);

      // Scroll direction logic
      if (currentScrollY < 20) {
        // Always show header at the top
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        // Scrolling down - hide header (unless mobile menu is open, usually good to allow scrolling)
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up - show header
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 w-full z-50 px-4 py-3 sm:px-8 lg:px-20 transition-all duration-300 pointer-events-auto",
        isScrolled ? "py-3 bg-[#0b1522]/40 backdrop-blur-xl border-b border-white/5" : "py-6 sm:py-[30px]",
        isVisible ? "translate-y-0" : "-translate-y-full",
        headerClassName,
      )}
    >
      <div
        className={cn(
          "relative flex items-center justify-between transition-all duration-500",
          innerClassName,
        )}
      >
        <LogoContainer
          isScrolled={isScrolled}
          logoSrc={logoSrc}
          logoAlt={logoAlt}
          logoClassName={logoClassName}
        />

        <div className="flex items-center justify-end gap-3 sm:hidden">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full border border-white/30 p-2 text-white transition-colors hover:border-white/60"
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

        <div className="hidden sm:flex items-center justify-end gap-4">
          <DesktopNav
            navigationItems={navigationItems}
            isScrolled={isScrolled}
            navClassName={navClassName}
            linkClassName={linkClassName}
          />
          <SocialSection isScrolled={isScrolled} className="hidden lg:flex" />
        </div>
      </div>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navigationItems={navigationItems}
        isScrolled={isScrolled}
        linkClassName={linkClassName}
      />
    </header>
  );
};


