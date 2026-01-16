import { NumbersAndFiguresSection } from "../../components/sections/NumbersAndFiguresSection";
import { HeaderSection } from "../../components/sections/HeaderSection";
import { BannerSection } from "./sections/BannerSection";
import { ExpertiseAndServicesSection } from "./sections/ExpertiseAndServicesSection";
import { ProfessionalFrameworkSection } from "./sections/ProfessionalFrameworkSection";
import { MapSection } from "./sections/MapSection";
import { ValuedPartnersSection } from "./sections/ValuedPartnersSection";
import { SectorsOfServicesSection } from "./sections/SectorsOfServicesSection";
import { VideoSection } from "./sections/VideoSection";
import { NewsAndArticlesSection } from "./sections/NewsAndArticlesSection";
import { MoveDownSection } from "../../components/sections/MoveDownSection";
import { FooterSection } from "../../components/sections/FooterSection";



const HOME_SECTIONS = [
  "numbers-and-figures",
  "expertise-and-services",
  "professional-framework",
  "sectors-of-services",
  "video-section",
  "map-section",
  "valued-partners",
  "news-and-articles",
];

export const Home = () => {
  return (
    <div className="overflow-hidden border border-solid border-black w-full relative" data-model-id="2:330">
      <HeaderSection />
      <BannerSection />
      <NumbersAndFiguresSection />
      <ExpertiseAndServicesSection />
      <ProfessionalFrameworkSection />
      <SectorsOfServicesSection />
      <VideoSection />
      <MapSection />
      <ValuedPartnersSection />
      <NewsAndArticlesSection />
      <MoveDownSection sections={HOME_SECTIONS} />
      <FooterSection />
    </div>
  );
};
