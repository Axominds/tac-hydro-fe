import dynamic from "next/dynamic";
import { StatsAndCorePrinciplesSection } from "./sections/StatsAndCorePrinciplesSection";
import { HeaderSection } from "../../components/sections/HeaderSection";
import { BannerSection } from "./sections/BannerSection";
import { ExpertiseAndServicesSection } from "../../components/sections/ExpertiseAndServicesSection";
import { ValuedPartnersSection } from "./sections/ValuedPartnersSection";
import { SectorsOfServicesSection } from "../../components/sections/SectorsOfServicesSection";
import { VideoSection } from "./sections/VideoSection";
import { NewsAndArticlesSection } from "./sections/NewsAndArticlesSection";
import { MoveDownSection } from "../../components/sections/MoveDownSection";
import { FooterSection } from "../../components/sections/FooterSection";
import { SDGSection } from "../../components/sections/SDGSection";

const MapSection = dynamic(() => import("./sections/MapSection").then(mod => mod.MapSection), {
  ssr: false,
  loading: () => <div className="h-screen w-full bg-slate-50 animate-pulse flex items-center justify-center text-slate-400">Loading Map...</div>
});

const HOME_SECTIONS = [
  "stats-and-core-principles",
  "expertise-and-services",
  "sectors-of-services",
  "video-section",
  "map-section",
  "sdg-section",
  "valued-partners",
  "news-and-events",
];

export const Home = () => {
  return (
    <div
      className="overflow-x-clip border border-solid border-black w-full relative"
      data-model-id="2:330"
    >
      <HeaderSection />
      <BannerSection />
      <StatsAndCorePrinciplesSection />
      <ExpertiseAndServicesSection />
      <SectorsOfServicesSection />
      <VideoSection />
      <MapSection />
      <SDGSection />
      <ValuedPartnersSection />
      <NewsAndArticlesSection />
      <MoveDownSection sections={HOME_SECTIONS} />
      <FooterSection />
    </div>
  );
};
