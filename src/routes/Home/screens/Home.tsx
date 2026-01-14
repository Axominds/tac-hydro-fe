import { NumbersAndFiguresSection } from "./sections/NumbersAndFigures";
import { HomeHeaderSection } from "./sections/HomeHeader";
import { ExpertiseAndServicesSection } from "./sections/ExpertiseAndServices";
import { ProfessionalFrameworkSection } from "./sections/ProfessionalFramework";
import { MapSection } from "./sections/MapSection";
import { ValuedPartnersSection } from "./sections/ValuedPartners";
import { SectorsOfServicesSection } from "./sections/SectorsOfServices";
import { VideoSection } from "./sections/VideoSection";
import { NewsAndArticlesSection } from "./sections/NewsAndArticles";
import { MoveDownSection } from "./sections/MoveDownSection";
import { FooterSection } from "../../../components/sections/FooterSection";

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
