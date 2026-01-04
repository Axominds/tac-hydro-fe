import React from "react";
import { FooterSection } from "../../../components/sections/FooterSection";
import { SiteHeader } from "../../../components/sections/SiteHeader";
import { HERO_BG_PRIMARY } from "../../../assets";
import { GalleryGridSection } from "./sections/GalleryGridSection";

const navigationItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Project", href: "/projects" },
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/gallery", isActive: true },
];

export const Gallery = (): JSX.Element => {
  return (
    <div className="w-full min-w-[1440px] relative bg-[#f5f5f5]">
      {/* Hero Section with Header */}
      <section className="relative w-full h-[560px]">
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
          <span className="[font-family:'Montserrat',Helvetica] text-[11px] font-semibold uppercase tracking-[0.35em] text-white/70 mb-4">
            GALLERY
          </span>
          <h1 className="[font-family:'Playfair_Display',Helvetica] font-semibold italic text-white text-[60px] tracking-[0] leading-[1.05] mb-6">
            Gallery
          </h1>
          <p className="[font-family:'Montserrat',Helvetica] font-normal text-white/75 text-[17px] tracking-[0] leading-[normal] max-w-[560px]">
            A visual collection of our latest work and milestones.
          </p>
        </div>
      </section>

      <GalleryGridSection />
      <FooterSection />
    </div>
  );
};
