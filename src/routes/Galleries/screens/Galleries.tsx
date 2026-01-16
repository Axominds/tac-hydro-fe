
import { FooterSection } from "../../../components/sections/FooterSection";
import { HeaderSection } from "../../../components/sections/HeaderSection";
import { BannerSection } from "../../../components/sections/BannerSection";

import { GalleriesGridSection } from "./sections/GalleriesGridSection";



export const Galleries = () => {
  return (
    <div className="w-full relative bg-[#f8f9fa]">
      <HeaderSection />
      <BannerSection
        title="Galleries"
        description="A visual collection of our latest work and milestones."
      />


      <GalleriesGridSection />
      <FooterSection />
    </div>
  );
};
