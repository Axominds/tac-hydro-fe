import { HeaderSection } from "../../../components/sections/HeaderSection";
import { BannerSection } from "../sections/BannerSection";
import { CollaborativeAdvantageSection } from "../sections/CollaborativeAdvantageSection";
import { PartnershipRoadMapSection } from "../sections/PartnershipRoadMapSection";
import { OurCollaborativeEcosystemSection } from "../sections/OurCollaborativeEcosystemSection";
import { InnitiateSynergySection } from "../sections/InnitiateSynergySection";
import { MoveDownSection } from "../../../components/sections/MoveDownSection";
import { FooterSection } from "../../../components/sections/FooterSection";

const COLLABORATION_SECTIONS = [
    "collaborative-advantage",
    "partnership-roadmap",
    "collaborative-ecosystem",
    "innitate-synergy",
];

export const Collaboration = () => {
    return (
        <div className="w-full relative bg-white">
            <HeaderSection />
            <BannerSection />
            <CollaborativeAdvantageSection />
            <PartnershipRoadMapSection />
            <OurCollaborativeEcosystemSection />
            <InnitiateSynergySection />
            <MoveDownSection sections={COLLABORATION_SECTIONS} />
            <FooterSection />
        </div>
    );
};
