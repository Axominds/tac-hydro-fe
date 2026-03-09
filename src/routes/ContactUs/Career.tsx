import { HeaderSection } from "../../components/sections/HeaderSection";
import { BannerSection } from "../../components/sections/BannerSection";
import { CurrentVacancySection } from "./sections/CurrentVacancySection";
import { FooterSection } from "../../components/sections/FooterSection";

export const Career = () => {
  return (
    <div className="overflow-x-clip border border-solid border-black w-full relative">
      <HeaderSection />
      <BannerSection
        title="Career"
        description="Join Our Team And Build The Future Of Hydropower."
      />
      <CurrentVacancySection />
      <FooterSection />
    </div>
  );
};
