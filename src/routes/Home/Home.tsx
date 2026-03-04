import { StatsAndProfessionalFrameworkSection } from "./sections/StatsAndProfessionalFrameworkSection";
import { HeaderSection } from "../../components/sections/HeaderSection";
import { BannerSection } from "./sections/BannerSection";
import { ExpertiseAndServicesSection } from "../../components/sections/ExpertiseAndServicesSection";
import { MapSection } from "./sections/MapSection";
import { ValuedPartnersSection } from "./sections/ValuedPartnersSection";
import { SectorsOfServicesSection } from "./sections/SectorsOfServicesSection";
import { VideoSection } from "./sections/VideoSection";
import { NewsAndArticlesSection } from "./sections/NewsAndArticlesSection";
import { MoveDownSection } from "../../components/sections/MoveDownSection";
import { FooterSection } from "../../components/sections/FooterSection";
import { SDGSection } from "../../components/sections/SDGSection";

const HOME_SECTIONS = [
  "stats-and-professional-framework",
  "sdg-section",
  "expertise-and-services",
  "sectors-of-services",
  "video-section",
  "map-section",
  "valued-partners",
  "news-and-articles",
];

export const Home = () => {
  return (
    <div
      className="overflow-hidden border border-solid border-black w-full relative"
      data-model-id="2:330"
    >
      <HeaderSection />
      <BannerSection />
      <StatsAndProfessionalFrameworkSection />
      <SDGSection />
      <ExpertiseAndServicesSection />
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
