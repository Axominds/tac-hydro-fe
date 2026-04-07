"use client";

import { HeaderSection } from "../../components/sections/HeaderSection";
import { FooterSection } from "../../components/sections/FooterSection";
import { BannerSection } from "../../components/sections/BannerSection";
import { GallerySection } from "./sections/GallerySection";

export const Galleries = () => {
  return (
    <div className="overflow-hidden w-full relative bg-[#f8f9fa]">
      <HeaderSection />
      <BannerSection
        title="Galleries"
        description="A Visual Archive Of Our Projects And Team Culture."
      />
      <GallerySection />
      <FooterSection />
    </div>
  );
};
