import { HeaderSection } from "../../components/sections/HeaderSection";
import { BannerSection } from "../../components/sections/BannerSection";
import { ProfessionalFrameworkSection } from "./sections/ProfessionalFrameworkSection";
import { MoveDownSection } from "../../components/sections/MoveDownSection";
import { FooterSection } from "../../components/sections/FooterSection";



const FRAMEWORK_SECTIONS = [
    "why-choose-us",
    "professional-framework",
];

export const ProfessionalFramework = () => {
    return (
        <div
            className="overflow-hidden border border-solid border-black w-full relative"
        >
            <HeaderSection />
            <BannerSection
                title="Professional Framework"
                description="Engineering Excellence & Integrity"
            />
            <ProfessionalFrameworkSection />

            <MoveDownSection sections={FRAMEWORK_SECTIONS} />
            <FooterSection />
        </div>
    );
};
