import { HeaderSection } from "../../../components/sections/HeaderSection";
import { CareerBannerSection } from "../sections/CareerBannerSection";
import { CurrentVacancySection } from "../sections/CurrentVacancySection";
import { GeneralDropCVSection } from "../sections/GeneralDropCVSection";
import { MoveDownSection } from "../../../components/sections/MoveDownSection";
import { FooterSection } from "../../../components/sections/FooterSection";

const CAREER_SECTIONS = [
    "active-opportunities",
    "general-drop-cv",
];

export const Career = () => {
    return (
        <div className="w-full relative bg-white">
            <HeaderSection />
            <CareerBannerSection />
            <CurrentVacancySection />
            <GeneralDropCVSection />
            <MoveDownSection sections={CAREER_SECTIONS} />
            <FooterSection />
        </div>
    );
};
