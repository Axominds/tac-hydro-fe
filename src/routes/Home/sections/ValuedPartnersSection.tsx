const partnerLogos = [
    {
        id: 1,
        src: "/partners/spark_hydro.jpg",
        alt: "Spark Hydroelectric Company Limited (SHCL)",
        name: "Spark Hydroelectric",
        logo: "/partners/spark_hydro.jpg",
    },
    {
        id: 2,
        src: "/partners/kasuwa_khola.png",
        alt: "Kasuwa Khola Hydropower Ltd.",
        name: "Kasuwa Khola",
        logo: "/partners/kasuwa_khola.png",
    },
    {
        id: 3,
        src: "/partners/darchula_power.png",
        alt: "Darchula Power Pvt. Ltd.",
        name: "Darchula Power",
        logo: "/partners/darchula_power.png",
    },
    {
        id: 4,
        src: "/partners/dordi_khola.png",
        alt: "Dordi Khola Jal Bidyut Co. Ltd.",
        name: "Dordi Khola",
        logo: "/partners/dordi_khola.png",
    },
    {
        id: 5,
        src: "/partners/universal_power.png",
        alt: "Universal Power Co. Pvt. Ltd.",
        name: "Universal Power",
        logo: "/partners/universal_power.png",
    },
    {
        id: 6,
        src: "/partners/middle_modi.png",
        alt: "Middle Modi Hydropower Ltd.",
        name: "Middle Modi",
        logo: "/partners/middle_modi.png",
    },
    {
        id: 7,
        src: "/partners/doed.png",
        alt: "Department of Electricity Development",
        name: "DOED",
        logo: "/partners/doed.png",
    },
    {
        id: 8,
        src: "/partners/supermaihydro.png",
        alt: "Super Mai Hydropower Pvt. Ltd.",
        name: "Super Mai Hydro",
        logo: "/partners/supermaihydro.png",
    },
    {
        id: 9,
        src: "/partners/manakamana_engineering.png",
        alt: "Manakamana Engineering Hydropower Pvt. Ltd.",
        name: "Manakamana Engineering",
        logo: "/partners/manakamana_engineering.png",
    },
    {
        id: 10,
        src: "/partners/mabilung_energy.png",
        alt: "Mabilung Energy Pvt. Ltd.",
        name: "Mabilung Energy",
        logo: "/partners/mabilung_energy.png",
    },
    {
        id: 11,
        src: "/partners/bhugol_energy.png",
        alt: "Bhugol Energy Development Company Pvt. Ltd.",
        name: "Bhugol Energy",
        logo: "/partners/bhugol_energy.png",
    },
    {
        id: 12,
        src: "/partners/vision_energy.png",
        alt: "Vision Energy & Power Ltd.",
        name: "Vision Energy",
        logo: "/partners/vision_energy.png",
    },
    {
        id: 13,
        src: "/partners/electro_power.png",
        alt: "Electro-Power Company Ltd.",
        name: "Electro-Power",
        logo: "/partners/electro_power.png",
    },
    {
        id: 14,
        src: "/partners/api_power.png",
        alt: "API Power Company Ltd.",
        name: "API Power",
        logo: "/partners/api_power.png",
    },
    {
        id: 15,
        src: "/partners/jhyamolongma.png",
        alt: "Jhyamolongma Hydropower Development Company Pvt. Ltd.",
        name: "Jhyamolongma Hydropower",
        logo: "/partners/jhyamolongma.png",
    },
    {
        id: 16,
        src: "/partners/lower_erkhuwa.png",
        alt: "Lower Erkhuwa Hydropower Company Ltd.",
        name: "Lower Erkhuwa Hydro",
        logo: "/partners/lower_erkhuwa.png",
    },
    {
        id: 17,
        src: "/partners/suryakunda.png",
        alt: "Suryakunda Hydroelectric Ltd.",
        name: "Suryakunda Hydro",
        logo: "/partners/suryakunda.png",
    },
    {
        id: 18,
        src: "/partners/united_idi_mardi.png",
        alt: "United Idi Mardi & RB Hydropower Company (P) Ltd.",
        name: "United Idi Mardi",
        logo: "/partners/united_idi_mardi.png",
    },
    {
        id: 19,
        src: "/partners/rapti_hydro.png",
        alt: "Rapti Hydro and General Construction Ltd.",
        name: "Rapti Hydro",
        logo: "/partners/rapti_hydro.png",
    },
    {
        id: 20,
        src: "/partners/chhyangdi.png",
        alt: "Chhyangdi Hydropower Ltd.",
        name: "Chhyangdi Hydropower",
        logo: "/partners/chhyangdi.png",
    },
    {
        id: 21,
        src: "/partners/aarati_power.png",
        alt: "Aarati Power Company Ltd.",
        name: "Aarati Power",
        logo: "/partners/aarati_power.png",
    },
];

export const ValuedPartnersSection = () => {
    return (
        <section id="valued-partners" className="relative w-full min-h-screen bg-[#f8f9fa] flex items-center justify-center py-20 overflow-hidden">
            <div className="mx-auto w-full max-w-[1400px]">
                <div className="flex flex-col items-center mb-12 text-center px-6 -mt-10">
                    <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
                        Valued Partners
                    </h2>
                    <div className="mt-6">
                        <p className="text-slate-500 max-w-2xl mx-auto text-sm sm:text-base">
                            Collaborating with industry leaders to deliver excellence in hydropower and infrastructure development.
                        </p>
                    </div>
                </div>

                <div className="relative w-full overflow-hidden">
                    <div className="flex animate-marquee-slower whitespace-nowrap gap-12 group py-20 w-max">
                        {[...partnerLogos, ...partnerLogos].map((partner, index) => (
                            <div
                                key={`${partner.id}-${index}`}
                                className="relative flex-shrink-0 min-w-[260px] h-[240px] flex items-center justify-center p-10 bg-slate-200/50 rounded-[40px] border border-slate-300/40 transition-all duration-500 hover:-translate-y-12 hover:scale-105 active:scale-95 group/card overflow-hidden"
                            >
                                <img
                                    className="max-w-full h-20 object-contain filter drop-shadow-[0_0_1px_rgba(0,0,0,0.1)] transition-transform duration-500 group-hover/card:scale-110"
                                    alt={partner.name}
                                    src={partner.logo}
                                />
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
