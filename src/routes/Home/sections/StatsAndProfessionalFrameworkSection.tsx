import { StatsSection } from "../../../components/sections/StatsSection";
import { ProfessionalFrameworkSection } from "./ProfessionalFrameworkSection";

export const StatsAndProfessionalFrameworkSection = () => {
  return (
    <section
      id="stats-and-professional-framework"
      className="relative w-full min-h-screen flex flex-col bg-[#f8f9fa]"
    >
      <StatsSection />
      <ProfessionalFrameworkSection />
    </section>
  );
};
