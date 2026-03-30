import { FooterSection } from "../../components/sections/FooterSection";
import { HeaderSection } from "../../components/sections/HeaderSection";
import { BannerSection } from "../../components/sections/BannerSection";
import { OrganizationChartSection } from "./sections/OrganizationChartSection";
import { MoveDownSection } from "../../components/sections/MoveDownSection";
import { useSiteSettings } from "../../hooks/useSiteSettings";

const ORG_CHART_SECTIONS = ["organization-chart"];

export const OrganizationChart = () => {
  const { data: settings, isLoading } = useSiteSettings();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f9fa]">
        <p className="text-slate-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-clip border border-solid border-black w-full relative">
      <HeaderSection />
      <BannerSection
        title="Organizational Chart"
        description="Structured For Excellence And Innovation"
      />
      <OrganizationChartSection imageUrl={settings?.organization_chart_image} />
      <MoveDownSection sections={ORG_CHART_SECTIONS} />
      <FooterSection />
    </div>
  );
};
