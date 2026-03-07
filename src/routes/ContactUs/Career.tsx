import { HeaderSection } from "../../components/sections/HeaderSection";
import { BannerSection } from "../../components/sections/BannerSection";
import { CurrentVacancySection } from "./sections/CurrentVacancySection";
import { GeneralDropCVSection } from "./sections/GeneralDropCVSection";
import { MoveDownSection } from "../../components/sections/MoveDownSection";
import { FooterSection } from "../../components/sections/FooterSection";

const CAREER_SECTIONS = ["active-opportunities", "general-drop-cv"];

export const Career = () => {
  return (
    <div className="overflow-x-clip border border-solid border-black w-full relative">
      <HeaderSection />
      <BannerSection
        title="Career"
        description="Join Our Team And Build The Future Of Hydropower."
      />
      <CurrentVacancySection />
      <GeneralDropCVSection />
      <MoveDownSection sections={CAREER_SECTIONS} />
      <FooterSection />
    </div>
  );
};
