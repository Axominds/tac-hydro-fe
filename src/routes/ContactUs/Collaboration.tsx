"use client";

import { HeaderSection } from "../../components/sections/HeaderSection";
import { BannerSection } from "../../components/sections/BannerSection";
import { CollaborativeAdvantageSection } from "./sections/CollaborativeAdvantageSection";
import { PartnershipRoadMapSection } from "./sections/PartnershipRoadMapSection";
import { OurCollaborativeEcosystemSection } from "./sections/OurCollaborativeEcosystemSection";
import { InnitiateSynergySection } from "./sections/InnitiateSynergySection";
import { MoveDownSection } from "../../components/sections/MoveDownSection";
import { FooterSection } from "../../components/sections/FooterSection";

const COLLABORATION_SECTIONS = [
  "collaborative-advantage",
  "partnership-roadmap",
  "collaborative-ecosystem",
  "initiate-synergy",
];

export const Collaboration = () => {
  return (
    <div className="overflow-x-clip border border-solid border-black w-full relative">
      <HeaderSection />
      <BannerSection
        title="Collaboration"
        description="Partnering With Us For Sustainable Development."
      />
      <CollaborativeAdvantageSection />
      <PartnershipRoadMapSection />
      <OurCollaborativeEcosystemSection />
      <InnitiateSynergySection />
      <MoveDownSection sections={COLLABORATION_SECTIONS} />
      <FooterSection />
    </div>
  );
};
