
import { FooterSection } from "../../../components/sections/FooterSection";
import { HeaderSection } from "../../../components/sections/HeaderSection";
import { BannerSection } from "../../../components/sections/BannerSection";

import { ProjectsGridSection } from "./sections/ProjectsGridSection";



export const Projects = () => {
  return (
    <div className="w-full relative bg-[#f8f9fa]">
      <HeaderSection />
      <BannerSection
        title="Our Projects"
        description="Discover our portfolio of hydropower and infrastructure work."
      />


      <ProjectsGridSection />
      <FooterSection />
    </div>
  );
};
