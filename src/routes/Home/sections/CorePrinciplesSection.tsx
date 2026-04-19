import { useQuery } from "@tanstack/react-query";
import {
  Lightbulb,
  Leaf,
  Target,
  Cpu,
  ShieldCheck,
  Scale,
  DollarSign,
  Trophy,
} from "lucide-react";
import { useCorePrinciples } from "../../../hooks/useCorePrinciples";
import { apiFetch, CorePrinciplesIntroList } from "../../../lib/api";

const ICON_MAP: Record<string, React.ElementType> = {
  Scale,
  Leaf,
  Lightbulb,
  Cpu,
  Target,
  ShieldCheck,
  DollarSign,
  Trophy,
};

export const CorePrinciplesSection = () => {
  const { data: principles, isLoading } = useCorePrinciples();
  const { data: introList } = useQuery<CorePrinciplesIntroList>({
    queryKey: ["core-principles-intro"],
    queryFn: () => apiFetch<CorePrinciplesIntroList>("/api/about-us/core-principles-intro/"),
  });
  const intro = introList?.[0];

  if (isLoading) {
    return (
      <section
        id="core-principles"
        className="flex-1 bg-white flex items-center justify-center"
      >
        <div className="w-full max-w-[1400px] px-6 sm:px-10 lg:px-20 py-8">
          <div className="flex gap-6 py-2 justify-between flex-wrap sm:flex-nowrap">
            {[...Array(8)].map((_, idx) => (
              <div
                key={idx}
                className="group flex flex-col items-center text-center text-slate-900 transition-all duration-300 hover:-translate-y-1 basis-[45%] sm:flex-1 sm:basis-0 animate-pulse"
              >
                <div className="relative mb-3 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-slate-200" />
                </div>
                <p className="text-sm font-semibold leading-snug whitespace-normal break-words">
                  Loading...
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!principles || principles.length === 0) {
    return (
      <section id="core-principles" className="flex-1 bg-white flex items-center justify-center py-16 lg:py-24">
        <div className="flex flex-col items-center justify-center py-32 px-4 bg-white rounded-[40px] border border-dashed border-slate-200 animate-fade-in max-w-lg mx-4">
          <div className="w-16 h-16 mb-6 flex items-center justify-center rounded-3xl bg-slate-50 text-blue-600">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">No Core Principles Found</h3>
          <p className="text-slate-500 text-center max-w-sm mb-8 leading-relaxed">
            We're currently preparing our core principles. Check back soon for updates.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="core-principles"
      className="flex-1 bg-white flex items-center justify-center"
    >
      <div className="w-full max-w-[1400px] px-6 sm:px-10 lg:px-20 py-8">
        <div className="mb-8 sm:mb-20 text-center max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-bold leading-tight text-slate-900 mb-6">
            {intro?.title || "Our Core Principles"}
          </h1>
        </div>
        <div className="flex gap-6 py-2 justify-between flex-wrap sm:flex-nowrap">
          {principles.map((item) => {
            const Icon = ICON_MAP[item.icon_key] ?? Scale;
            return (
              <div
                key={item.id}
                className="group flex flex-col items-center text-center text-slate-900 transition-all duration-300 hover:-translate-y-1 basis-[45%] sm:flex-1 sm:basis-0"
              >
                <div className="relative mb-3 flex items-center justify-center">
                  <div className="absolute inset-0 scale-125 rounded-full border border-slate-100 group-hover:border-blue-100 transition-colors duration-300" />
                  <div
                    className={`w-12 h-12 rounded-full ${item.color_class} flex items-center justify-center text-white shadow-lg transition-transform duration-700 group-hover:rotate-[360deg]`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                </div>

                <p className="text-sm font-semibold leading-snug whitespace-normal break-words">
                  {item.title}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
