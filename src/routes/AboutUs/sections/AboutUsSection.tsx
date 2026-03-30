import type { AboutPageSection } from "../../../lib/api";

interface Props {
  section: AboutPageSection | undefined;
}

export const AboutUsSection = ({ section }: Props) => {
  if (!section) {
    return (
      <section id="about-us-section" className="relative w-full bg-[#f8f9fa] min-h-[50vh] flex items-center justify-center py-16 lg:py-24">
        <div className="flex flex-col items-center justify-center py-32 px-4 bg-white rounded-[40px] border border-dashed border-slate-200 animate-fade-in max-w-lg mx-4">
          <div className="w-16 h-16 mb-6 flex items-center justify-center rounded-3xl bg-slate-50 text-blue-600">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">No Content Available</h3>
          <p className="text-slate-500 text-center max-w-sm mb-8 leading-relaxed">
            We're currently preparing information about us. Check back soon for updates.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="about-us-section"
      className="w-full relative min-h-screen flex items-center py-16 sm:py-24 bg-[#f8f9fa]"
    >
      <div className="max-w-[1240px] mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Image Column */}
          <div className="relative w-full h-[80vh] min-h-[400px] max-h-[80vh] rounded-3xl overflow-hidden shadow-2xl lg:sticky lg:top-24 self-start">
            {section.image ? (
              <img
                src={section.image}
                alt={section.title}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
            ) : (
              <div className="absolute inset-0 bg-slate-200" />
            )}
          </div>

          {/* Text Column */}
          <div className="flex flex-col gap-8">
            <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-bold leading-tight text-[#2c3e50]">
              {section.title}
            </h1>
            <div
              className="flex flex-col gap-8 text-[#555555] text-lg leading-relaxed"
              dangerouslySetInnerHTML={{ __html: section.content_html }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
