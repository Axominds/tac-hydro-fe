import { NumbersAndFiguresSection } from "../../components/sections/NumbersAndFiguresSection";
import { HomeHeaderSection } from "./sections/HomeHeaderSection";
import { ExpertiseAndServicesSection } from "./sections/ExpertiseAndServicesSection";
import { ProfessionalFrameworkSection } from "./sections/ProfessionalFrameworkSection";
import { MapSection } from "./sections/MapSection";
import { ValuedPartnersSection } from "./sections/ValuedPartnersSection";
import { SectorsOfServicesSection } from "./sections/SectorsOfServicesSection";
import { VideoSection } from "./sections/VideoSection";
import { NewsAndArticlesSection } from "./sections/NewsAndArticlesSection";
import { MoveDownSection } from "./sections/MoveDownSection";
import { FooterSection } from "../../components/sections/FooterSection";

const navigationItems = [
  { label: "Home", href: "/", isActive: true },
  { label: "About Us", href: "/about-us" },
  { label: "Projects", href: "/projects" },
  { label: "Services", href: "/services" },
  { label: "Galleries", href: "/galleries" },
  { label: "Contact Us", href: "/contact-us" },
];

export const Home = () => {
  return (
    <div className="overflow-hidden border border-solid border-black w-full relative" data-model-id="2:330">
      <HomeHeaderSection navigationItems={navigationItems} />
      <NumbersAndFiguresSection />
      <ExpertiseAndServicesSection />
      <ProfessionalFrameworkSection />
      <SectorsOfServicesSection />
      <VideoSection />
      <MapSection />
      <ValuedPartnersSection />
      <NewsAndArticlesSection />
      <MoveDownSection />
      <FooterSection />
    </div>
  );
};
