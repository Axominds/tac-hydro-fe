import { FooterSection } from "../../components/sections/FooterSection";
import { HeaderSection } from "../../components/sections/HeaderSection";
import { BannerSection } from "./sections/BannerSection";
import { ProjectSection } from "./sections/ProjectSection";

export const Projects = () => {
    return (
        <div className="w-full relative bg-[#f8f9fa]">
            <HeaderSection />
            <BannerSection />
            <ProjectSection />
            <FooterSection />
        </div>
    );
};
