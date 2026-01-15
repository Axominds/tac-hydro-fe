import { Link } from "react-router-dom";
import { FooterSection } from "../../components/sections/FooterSection";
import { SecondaryHeader } from "../../components/sections/secondaryHeader";
import { NumbersAndFiguresSection } from "../../components/sections/NumbersAndFiguresSection";
import { AboutUsSection } from "./sections/AboutUsSection";
import { TopManagementSection } from "./sections/TopManagementSection";
import { SDGSection } from "./sections/SDGSection";
import { MoveDownSection } from "../../components/sections/MoveDownSection";

const navigationItems = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us", isActive: true },
  { label: "Projects", href: "/projects" },
  { label: "Services", href: "/services" },
  { label: "Galleries", href: "/galleries" },
  { label: "Contact Us", href: "/contact-us" },
];

const ABOUT_SECTIONS = [
  "numbers-and-figures",
  "about-us-section",
  "top-management-section",
  "sdg-section",
];

export const AboutUs = () => {

  return (
    <div className="w-full relative bg-white">
      <SecondaryHeader
        title="ABOUT TAC HYDRO"
        description="LEADING ENGINEERING INNOVATION SINCE 2005"
        navigationItems={navigationItems}
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
