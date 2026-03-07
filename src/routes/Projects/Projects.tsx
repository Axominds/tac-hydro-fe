import { FooterSection } from "../../components/sections/FooterSection";
import { HeaderSection } from "../../components/sections/HeaderSection";
import { BannerSection } from "../../components/sections/BannerSection";
import { ProjectSection } from "./sections/ProjectSection";

export const Projects = () => {
  return (
    <div className="w-full relative bg-[#f8f9fa]">
      <HeaderSection />
      <BannerSection
        title="Our Projects"
        description="Delivering Excellence In Hydropower And Infrastructure Development Across Nepal."
      />
      <ProjectSection />
      <FooterSection />
    </div>
  );
};
