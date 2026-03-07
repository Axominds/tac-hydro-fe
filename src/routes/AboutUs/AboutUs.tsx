import { FooterSection } from "../../components/sections/FooterSection";
import { HeaderSection } from "../../components/sections/HeaderSection";
import { BannerSection } from "../../components/sections/BannerSection";
import { AboutUsSection } from "./sections/AboutUsSection";
import { ChairmanMessageSection } from "./sections/ChairmanMessageSection";
import { TopManagementSection } from "./sections/TopManagementSection";
import { SDGSection } from "../../components/sections/SDGSection";
import { MoveDownSection } from "../../components/sections/MoveDownSection";
import { StatsSection } from "../../components/sections/StatsSection";

const ABOUT_SECTIONS = [
  "numbers-and-figures",
  "about-us-section",
  "chairman-message-section",
  "top-management-section",
  "sdg-section",
];

export const AboutUs = () => {
  return (
    <div
      className="overflow-hidden border border-solid border-black w-full relative"
    >
      <HeaderSection />
      <BannerSection
        title="About TAC HYDRO"
        description="Leading Engineering Innovation Since 2005"
      />
      <StatsSection />
      <AboutUsSection />
      <ChairmanMessageSection />
      <TopManagementSection />
      <SDGSection />
      <MoveDownSection sections={ABOUT_SECTIONS} />
      <FooterSection />
    </div>
  );
};
