import { useQuery } from "@tanstack/react-query";

import { FooterSection } from "../../components/sections/FooterSection";
import { HeaderSection } from "../../components/sections/HeaderSection";
import { BannerSection } from "../../components/sections/BannerSection";
import { CorePrinciplesSection } from "./sections/CorePrinciplesSection";
import { MoveDownSection } from "../../components/sections/MoveDownSection";
import { apiFetch, CorePrinciplesIntroList } from "../../lib/api";
import { useCorePrinciples } from "../../hooks/useCorePrinciples";

const FRAMEWORK_SECTIONS = ["why-choose-us", "core-principles"];

export const CorePrinciples = () => {
  const { data: principles } = useCorePrinciples();
  const { data: introList, isLoading: introLoading } = useQuery<CorePrinciplesIntroList>({
    queryKey: ["core-principles-intro"],
    queryFn: () => apiFetch<CorePrinciplesIntroList>("/api/about-us/core-principles-intro/"),
  });

  const intro = introList?.[0] ?? null;

  if (introLoading || !principles) {
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
        title="Core Principles"
        description="Engineering Excellence & Integrity"
      />
      <CorePrinciplesSection intro={intro} principles={principles} />
      <MoveDownSection sections={FRAMEWORK_SECTIONS} />
      <FooterSection />
    </div>
  );
};
