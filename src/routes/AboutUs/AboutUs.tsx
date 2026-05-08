"use client";

import { FooterSection } from "../../components/sections/FooterSection";
import { HeaderSection } from "../../components/sections/HeaderSection";
import { BannerSection } from "../../components/sections/BannerSection";
import { AboutUsSection } from "./sections/AboutUsSection";
import { ChairmanMessageSection } from "./sections/ChairmanMessageSection";
import { TopManagementSection } from "./sections/TopManagementSection";
import { SDGSection } from "../../components/sections/SDGSection";
import { MoveDownSection } from "../../components/sections/MoveDownSection";
import { StatsSection } from "../../components/sections/StatsSection";
import { useAboutSections } from "../../hooks/useAboutSections";

const ABOUT_SECTIONS = [
  "numbers-and-figures",
  "about-us-section",
  "chairman-message-section",
  "top-management-section",
  "sdg-section",
];

export const AboutUs = () => {
  const { data: sections, isLoading } = useAboutSections();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f9fa]">
        <p className="text-slate-500">Loading...</p>
      </div>
    );
  }

  if (!sections) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f9fa]">
        <p className="text-red-500">Failed to load page data.</p>
      </div>
    );
  }

  const aboutSection = sections.find((s) => s.section_key === "about_us");
  const chairmanSection = sections.find((s) => s.section_key === "chairman_message");
  const managementSection = sections.find(
    (s) => s.section_key === "management_commitment"
  );

  return (
    <div className="overflow-x-clip border border-solid border-black w-full relative">
      <HeaderSection />
      <BannerSection
        title="About TAC HYDRO"
        description="Leading Engineering Innovation Since 2005"
      />
      <StatsSection />
      <AboutUsSection section={aboutSection} />
      <ChairmanMessageSection section={chairmanSection} />
      <TopManagementSection section={managementSection} />
      <SDGSection />
      <MoveDownSection sections={ABOUT_SECTIONS} />
      <FooterSection />
    </div>
  );
};
