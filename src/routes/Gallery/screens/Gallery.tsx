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
    <div className="w-full min-w-[1440px] relative bg-[#f5f5f5] animate-fade-in opacity-0">
      {/* Hero Section with Header */}
      <section className="relative w-full h-[350px]">
        <img
          className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none"
          alt="Hero Background"
          src={HERO_BG_PRIMARY}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a2332]/90 to-[#2c3e50]/90 pointer-events-none" />

        {/* Header Navigation */}
        <SiteHeader navigationItems={navigationItems} />

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-[calc(100%-123px)] text-center">
          <h1 className="[font-family:'Montserrat',Helvetica] font-bold text-white text-[48px] tracking-[0] leading-[normal] mb-2">
            GALLERY
          </h1>
        </div>
      </section>

      <GalleryGridSection />
      <FooterSection />
    </div>
  );
};
