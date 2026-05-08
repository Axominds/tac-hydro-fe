import type { AboutPageSection } from "../../../lib/api";

interface Props {
  section: AboutPageSection | undefined;
}

export const TopManagementSection = ({ section }: Props) => {
  if (!section) {
    return (
      <section id="top-management-section" className="relative w-full bg-[#f8f9fa] min-h-[50vh] flex items-center justify-center py-16 lg:py-24">
        <div className="flex flex-col items-center justify-center py-32 px-4 bg-white rounded-[40px] border border-dashed border-slate-200 animate-fade-in max-w-lg mx-4">
          <div className="w-16 h-16 mb-6 flex items-center justify-center rounded-3xl bg-slate-50 text-blue-600">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">No Management Info Available</h3>
          <p className="text-slate-500 text-center max-w-sm mb-8 leading-relaxed">
            We're currently preparing information about our management team. Check back soon for updates.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="top-management-section"
      className="w-full relative flex items-center py-10 sm:py-16 bg-[#f8f9fa]"
    >
      <div className="max-w-[1240px] mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Text Column */}
          <div className="flex flex-col gap-6 order-2">
            <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-bold leading-tight text-[#2c3e50]">
              {section.title}
            </h1>
            <div
              className="flex flex-col gap-4 text-[#555555] text-lg leading-relaxed"
              dangerouslySetInnerHTML={{ __html: section.content_html }}
            />
          </div>

          {/* Image Column */}
          <div className="relative w-full h-[80vh] min-h-[400px] max-h-[80vh] rounded-3xl overflow-hidden shadow-2xl lg:sticky lg:top-24 self-start order-1">
            {section.image ? (
              <img
                src={section.image}
                alt="Managing Director"
                className="absolute inset-0 w-full h-full object-cover object-top"
                loading="lazy"
                decoding="async"
              />
            ) : (
              <div className="absolute inset-0 bg-slate-200" />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
