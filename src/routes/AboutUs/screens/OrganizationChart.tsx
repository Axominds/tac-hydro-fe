import { HeaderSection } from "../../../components/sections/HeaderSection";
import { BannerSection } from "../../../components/sections/BannerSection";
import { ExpertiseAndServicesSection } from "../../Home/sections/ExpertiseAndServicesSection";
import { OrganizationChartSection } from "../sections/OrganizationChartSection";
import { MoveDownSection } from "../../../components/sections/MoveDownSection";
import { FooterSection } from "../../../components/sections/FooterSection";



const ORG_CHART_SECTIONS = [
    "expertise-and-services",
    "organization-chart",
];

export const OrganizationChart = () => {
    return (
        <div className="w-full relative bg-white">
            <HeaderSection />
            <BannerSection
                title="ORGANIZATIONAL CHART"
                description="STRUCTURED FOR EXCELLENCE AND INNOVATION"
            />

            {/* Reusing Home Section as requested */}
            <ExpertiseAndServicesSection />

            <OrganizationChartSection />

            <MoveDownSection sections={ORG_CHART_SECTIONS} />
            <FooterSection />
        </div>
    );
};
