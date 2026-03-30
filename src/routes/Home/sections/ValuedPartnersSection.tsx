import { useValuedPartners } from "../../../hooks/useValuedPartners";

export const ValuedPartnersSection = () => {
  const { data: partners, isLoading } = useValuedPartners();

  if (isLoading || !partners) {
    return (
      <section
        id="valued-partners"
        className="relative w-full min-h-[50vh] bg-[#f8f9fa] flex items-center justify-center py-10 overflow-hidden"
      >
        <div className="mx-auto w-full max-w-[1400px]">
          <div className="flex flex-col items-center mb-10 text-center px-6">
            <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-bold leading-tight text-slate-900">
              Valued Partners
            </h1>
          </div>
          <div className="flex justify-center py-20">
            <p className="text-slate-500">Loading...</p>
          </div>
        </div>
      </section>
    );
  }

  if (partners.length === 0) {
    return (
      <section id="valued-partners" className="relative w-full bg-[#f8f9fa] min-h-[50vh] flex items-center justify-center py-16 lg:py-24">
        <div className="flex flex-col items-center justify-center py-32 px-4 bg-white rounded-[40px] border border-dashed border-slate-200 animate-fade-in max-w-lg mx-4">
          <div className="w-16 h-16 mb-6 flex items-center justify-center rounded-3xl bg-slate-50 text-blue-600">
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">No Partners Found</h3>
          <p className="text-slate-500 text-center max-w-sm mb-8 leading-relaxed">
            We're currently preparing information about our valued partners. Check back soon for updates.
          </p>
        </div>
      </section>
    );
  }

  const sortedPartners = [...partners].sort((a, b) => a.order - b.order);

  return (
    <section
      id="valued-partners"
      className="relative w-full min-h-[50vh] bg-[#f8f9fa] flex items-center justify-center py-10 overflow-hidden"
    >
      <div className="mx-auto w-full max-w-[1400px]">
        <div className="flex flex-col items-center mb-10 text-center px-6">
          <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-bold leading-tight text-slate-900">
            Valued Partners
          </h1>
          <div className="mt-6">
            <p className="text-slate-500 max-w-2xl mx-auto text-sm sm:text-base">
              Collaborating with industry leaders to deliver excellence in hydropower and
              infrastructure development.
            </p>
          </div>
        </div>

        <div className="relative w-full overflow-hidden">
          <div className="flex animate-marquee-slower whitespace-nowrap gap-12 group py-8 w-max">
            {[...sortedPartners, ...sortedPartners].map((partner, index) => (
              <div
                key={`${partner.id}-${index}`}
                className="relative flex-shrink-0 min-w-[200px] h-[180px] flex items-center justify-center p-6 bg-slate-200/50 rounded-[32px] border border-slate-300/40 transition-all duration-500 hover:-translate-y-8 hover:scale-105 active:scale-95 group/card overflow-hidden"
              >
                {partner.logo ? (
                  <img
                    className="max-w-full h-16 object-contain filter drop-shadow-[0_0_1px_rgba(0,0,0,0.1)] transition-transform duration-500 group-hover/card:scale-110"
                    alt={partner.name}
                    src={partner.logo}
                    decoding="async"
                  />
                ) : (
                  <span className="text-slate-600 font-semibold">{partner.name}</span>
                )}
                <div className="absolute inset-x-0 bottom-0 p-6 flex items-end justify-center opacity-0 group-hover/card:opacity-100 transition-all duration-500">
                  <span className="text-slate-900 font-bold text-base text-center whitespace-normal leading-tight">
                    {partner.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
