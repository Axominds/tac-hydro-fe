import { FooterSection } from "../../components/sections/FooterSection";
import { HeaderSection } from "../../components/sections/HeaderSection";
import { BannerSection } from "../../components/sections/BannerSection";
import { NumbersAndFiguresSection } from "../../components/sections/NumbersAndFiguresSection";
import { AboutUsSection } from "./sections/AboutUsSection";
import { TopManagementSection } from "./sections/TopManagementSection";
import { SDGSection } from "./sections/SDGSection";
import { MoveDownSection } from "../../components/sections/MoveDownSection";



const ABOUT_SECTIONS = [
  "numbers-and-figures",
  "about-us-section",
  "top-management-section",
  "sdg-section",
];

export const AboutUs = () => {

  return (
    <div className="w-full relative bg-white">
      <HeaderSection />
      <BannerSection
        title="ABOUT TAC HYDRO"
        description="LEADING ENGINEERING INNOVATION SINCE 2005"
      />
      <NumbersAndFiguresSection />
      <AboutUsSection />
      <TopManagementSection />
      <SDGSection />
      <MoveDownSection sections={ABOUT_SECTIONS} />
      <FooterSection />
    </div >
  );
};
