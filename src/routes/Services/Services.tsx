"use client";

import { FooterSection } from "../../components/sections/FooterSection";
import { HeaderSection } from "../../components/sections/HeaderSection";
import { BannerSection } from "../../components/sections/BannerSection";
import { ExpertiseAndServicesSection } from "../../components/sections/ExpertiseAndServicesSection";
import { SectorsOfServicesSection } from "../../components/sections/SectorsOfServicesSection";

export const Services = () => {
  return (
    <div className="w-full relative bg-[#f8f9fa]">
      <HeaderSection />
      <BannerSection
        title="Our Services"
        description="Expertise From Feasibility To Delivery Across Every Project Phase."
      />
      <ExpertiseAndServicesSection />
      <SectorsOfServicesSection />
      <FooterSection />
    </div>
  );
};
