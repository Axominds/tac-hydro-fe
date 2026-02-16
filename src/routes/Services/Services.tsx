import { FooterSection } from "../../components/sections/FooterSection";
import { HeaderSection } from "../../components/sections/HeaderSection";
import { BannerSection } from "./sections/BannerSection";
import { ExpertiseAndServicesSection } from "../../components/sections/ExpertiseAndServicesSection";

export const Services = () => {
  return (
    <div className="w-full relative bg-[#f8f9fa]">
      <HeaderSection />
      <BannerSection />
      <ExpertiseAndServicesSection />
      <FooterSection />
    </div>
  );
};
