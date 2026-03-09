import { StatsSection } from "../../../components/sections/StatsSection";
import { CorePrinciplesSection } from "./CorePrinciplesSection";

export const StatsAndCorePrinciplesSection = () => {
    return (
        <section
            id="stats-and-core-principles"
            className="relative w-full min-h-screen flex flex-col bg-[#f8f9fa]"
        >
            <StatsSection />
            <CorePrinciplesSection />
        </section>
    );
};
