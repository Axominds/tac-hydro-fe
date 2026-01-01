import React from "react";
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
  return (
    <header className={cn("relative z-10 px-20 py-[30px]", headerClassName)}>
      <div className={cn("flex items-center justify-between", innerClassName)}>
        <img className={cn("w-[277px] h-[63px]", logoClassName)} alt={logoAlt} src={logoSrc} />

        <nav className={cn("flex items-center gap-[29px]", navClassName)}>
          {navigationItems.map((item, index) => (
            <a
              key={`${item.label}-${index}`}
              href={item.href}
              className={cn(
                "[font-family:'Montserrat',Helvetica] font-bold text-white text-lg tracking-[0] leading-[normal]",
                item.isActive && "underline",
                linkClassName,
              )}
            >
              {item.label}
            </a>
          ))}

          {cta ?? (
            <Button className="h-auto px-5 py-2.5 bg-[#0070c0] rounded-3xl [font-family:'Montserrat',Helvetica] font-bold text-white text-lg hover:bg-[#005a9c]">
              Contact Us
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
};
