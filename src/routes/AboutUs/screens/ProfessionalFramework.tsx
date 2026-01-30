import { HeaderSection } from "../../../components/sections/HeaderSection";
import { BannerSection } from "../../../components/sections/BannerSection";
import { ProfessionalFrameworkSection } from "../sections/ProfessionalFrameworkSection";
import { MoveDownSection } from "../../../components/sections/MoveDownSection";
import { FooterSection } from "../../../components/sections/FooterSection";



const FRAMEWORK_SECTIONS = [
    "why-choose-us",
    "professional-framework",
];

export const ProfessionalFramework = () => {
    return (
        <div className="w-full relative bg-white">
            <HeaderSection />
            <BannerSection
                title="PROFESSIONAL FRAMEWORK"
                description="ENGINEERING EXCELLENCE & INTEGRITY"
            />
            <ProfessionalFrameworkSection />

            <MoveDownSection sections={FRAMEWORK_SECTIONS} />
            <FooterSection />
        </div>
    );
};
