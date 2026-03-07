import { HeaderSection } from "../../components/sections/HeaderSection";
import { BannerSection } from "../../components/sections/BannerSection";
import { OrganizationChartSection } from "./sections/OrganizationChartSection";
import { MoveDownSection } from "../../components/sections/MoveDownSection";
import { FooterSection } from "../../components/sections/FooterSection";



const ORG_CHART_SECTIONS = [
    "organization-chart",
];

export const OrganizationChart = () => {
    return (
        <div
            className="overflow-hidden border border-solid border-black w-full relative"
        >
            <HeaderSection />
            <BannerSection
                title="Organizational Chart"
                description="Structured For Excellence And Innovation"
            />
            <OrganizationChartSection />
            <MoveDownSection sections={ORG_CHART_SECTIONS} />
            <FooterSection />
        </div>
    );
};
