import React from "react";
import { Link } from "react-router-dom";
import { FooterSection } from "../../../components/sections/FooterSection";
import { SiteHeader } from "../../../components/sections/SiteHeader";
import { HERO_BG_PRIMARY } from "../../../assets";
import { ServicesGridSection } from "./sections/ServicesGridSection";

const navigationItems = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  { label: "Projects", href: "/projects" },
  { label: "Services", href: "/services", isActive: true },
  { label: "Galleries", href: "/galleries" },
];

export const Services = (): JSX.Element => {
  return (
    <div className="w-full relative bg-[#f5f5f5]">
      {/* Hero Section with Header */}
      <section className="relative w-full min-h-[360px] sm:min-h-[460px] lg:h-[560px]">
        <img
          className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none"
          alt="Hero Background"
          src={HERO_BG_PRIMARY}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b1522]/90 via-[#0b1522]/50 to-[#0b1522]/90 pointer-events-none" />

        {/* Header Navigation */}
        <SiteHeader navigationItems={navigationItems} />

        {/* Hero Content */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center">
          <h1 className="font-semibold text-white text-3xl sm:text-4xl lg:text-[60px] leading-[1.05] mb-6">
            Our Services
          </h1>
          <p className="font-normal text-white/75 text-sm sm:text-base lg:text-[17px] leading-[normal] max-w-[560px] px-4">
            Expertise from feasibility to delivery across every project phase.
          </p>
        </div>
      </section>

      <ServicesGridSection />
      <FooterSection />
    </div>
  );
};
