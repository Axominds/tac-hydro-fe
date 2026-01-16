
import { FooterSection } from "../../../components/sections/FooterSection";
import { HeaderSection } from "../../../components/sections/HeaderSection";
import { BannerSection } from "../../../components/sections/BannerSection";

import { ServicesGridSection } from "./sections/ServicesGridSection";



export const Services = () => {
  return (
    <div className="w-full relative bg-[#f8f9fa]">
      <HeaderSection />
      <BannerSection
        title="Our Services"
        description="Expertise from feasibility to delivery across every project phase."
      />


      <ServicesGridSection />
      <FooterSection />
    </div>
  );
};
