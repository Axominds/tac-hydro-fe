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
import type { CorePrinciplesIntro, CorePrinciple } from "../../../lib/api";

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

interface Props {
  intro: CorePrinciplesIntro | null;
  principles: CorePrinciple[];
}

export const CorePrinciplesSection = ({ intro, principles }: Props) => {
  return (
    <section>
      <section
        id="core-principles-text"
        className="w-full py-16 px-4 md:px-8 bg-[#f8f9fa] relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="w-full md:w-1/2">
              <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-bold leading-tight text-[#0b1522] mb-6">
                {intro?.title || "Our Core Principles"}
              </h1>
              <div
                className="space-y-6 text-slate-700 leading-relaxed text-justify"
                dangerouslySetInnerHTML={{ __html: intro?.content_html ?? "" }}
              />
            </div>
            <div className="w-full md:w-1/2 relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl relative group">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1522]/60 to-transparent z-10" />
                {intro?.image ? (
                  <img
                    src={intro.image}
                    alt={intro.image_caption_title ?? "Engineering Excellence"}
                    className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <div className="absolute inset-0 bg-slate-200" />
                )}
                <div className="absolute bottom-6 left-6 z-20">
                  <div className="text-white text-xl font-bold">
                    {intro?.image_caption_title ?? "Engineering Excellence"}
                  </div>
                  {intro?.image_caption_subtitle && (
                    <div className="text-white/80 text-sm">
                      {intro.image_caption_subtitle}
                    </div>
                  )}
                </div>
              </div>
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-blue-100/50 rounded-full blur-2xl -z-10" />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-100/50 rounded-full blur-2xl -z-10" />
            </div>
          </div>
        </div>
      </section>

      <section
        id="core-principles"
        className="relative w-full bg-[#f8f9fa] min-h-screen flex items-center justify-center py-24 overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-30" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-emerald-50 rounded-full blur-3xl opacity-30" />
        </div>

        <div className="relative mx-auto max-w-[1400px] px-6 sm:px-8 lg:px-20">
          <div className="mb-20 text-center max-w-3xl mx-auto">
            <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-bold leading-tight text-slate-900 mb-6">
              Our Core Principles
            </h1>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {principles.map((item) => {
              const Icon = ICON_MAP[item.icon_key] ?? Scale;
              return (
                <div
                  key={item.id}
                  className="group flex flex-col items-center text-center p-6 transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="relative mb-8 flex items-center justify-center">
                    <div className="absolute inset-0 scale-150 rounded-full border border-slate-100 group-hover:border-blue-100 transition-colors duration-300" />
                    <div
                      className={`w-16 h-16 rounded-2xl ${item.color_class} flex items-center justify-center text-white shadow-lg transition-transform duration-500 group-hover:rotate-[360deg]`}
                    >
                      <Icon className="w-8 h-8" />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <h3 className="text-xl font-bold text-slate-900 leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed mt-2">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </section>
  );
};
