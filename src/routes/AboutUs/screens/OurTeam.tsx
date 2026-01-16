import { HeaderSection } from "../../../components/sections/HeaderSection";
import { BannerSection } from "../../../components/sections/BannerSection";
import { TeamSection } from "../sections/TeamSection";
import { MoveDownSection } from "../../../components/sections/MoveDownSection";
import { FooterSection } from "../../../components/sections/FooterSection";



const TEAM_SECTIONS = [
    "team-section",
];

export const OurTeam = () => {
    return (
        <div className="w-full relative bg-white">
            <HeaderSection />
            <BannerSection
                title="MEET OUR TEAM"
                description="THE MINDS BEHIND OUR INNOVATION"
            />

            <TeamSection />

            <MoveDownSection sections={TEAM_SECTIONS} />
            <FooterSection />
        </div>
    );
};
