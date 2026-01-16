import { HeaderSection } from "../../../components/sections/HeaderSection";
import { BannerSection } from "../../../components/sections/BannerSection";
import { ProfessionalFrameworkSection } from "../../Home/sections/ProfessionalFrameworkSection";
import { WhyChooseUsSection } from "../sections/WhyChooseUsSection";
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

            <WhyChooseUsSection />

            {/* Reusing Home Section as requested */}
            <ProfessionalFrameworkSection />

            <MoveDownSection sections={FRAMEWORK_SECTIONS} />
            <FooterSection />
        </div>
    );
};
