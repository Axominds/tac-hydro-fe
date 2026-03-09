import { HeaderSection } from "../../components/sections/HeaderSection";
import { BannerSection } from "../../components/sections/BannerSection";
import { CorePrinciplesSection } from "./sections/CorePrinciplesSection";
import { MoveDownSection } from "../../components/sections/MoveDownSection";
import { FooterSection } from "../../components/sections/FooterSection";

const FRAMEWORK_SECTIONS = ["why-choose-us", "core-principles"];

export const CorePrinciples = () => {
    return (
        <div className="overflow-x-clip border border-solid border-black w-full relative">
            <HeaderSection />
            <BannerSection
                title="Core Principles"
                description="Engineering Excellence & Integrity"
            />
            <CorePrinciplesSection />

            <MoveDownSection sections={FRAMEWORK_SECTIONS} />
            <FooterSection />
        </div>
    );
};
