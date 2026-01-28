export const PartnershipRoadMapSection = () => {
    const roadmapSteps = [
        {
            step: "01",
            title: "Initial Consultation",
            description: "We begin with a comprehensive discussion to understand your project goals, requirements, and vision."
        },
        {
            step: "02",
            title: "Feasibility Assessment",
            description: "Our team conducts detailed technical and economic feasibility studies to evaluate project viability."
        },
        {
            step: "03",
            title: "Partnership Agreement",
            description: "We formalize our collaboration with clear terms, responsibilities, and mutual commitments."
        },
        {
            step: "04",
            title: "Project Planning",
            description: "Together, we develop comprehensive project plans, timelines, and resource allocation strategies."
        },
        {
            step: "05",
            title: "Implementation",
            description: "Our teams work collaboratively to execute the project with regular communication and progress updates."
        },
        {
            step: "06",
            title: "Ongoing Support",
            description: "We provide continuous support, monitoring, and optimization throughout the project lifecycle."
        }
    ];

    return (
        <section id="partnership-roadmap" className="relative w-full min-h-screen bg-[#f8f9fa] flex items-center">
            <div className="mx-auto max-w-[1200px] px-6 sm:px-10 lg:px-20 py-16 w-full">
                <div className="flex flex-col gap-6 text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-bold text-[#111111]">
                        Partnership Roadmap
                    </h2>
                    <p className="text-base sm:text-lg text-[#6b6b6b] max-w-[800px] mx-auto">
                        Our structured approach ensures a smooth collaboration journey from initial contact to project success.
                    </p>
                </div>

                <div className="relative">
                    {/* Vertical line connector for mobile/tablet */}
                    <div className="absolute left-8 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#0070c0] to-[#d4002a] lg:hidden" />

                    <div className="space-y-8 lg:space-y-12">
                        {roadmapSteps.map((item, index) => (
                            <div
                                key={index}
                                className={`flex flex-col lg:flex-row gap-6 lg:gap-12 items-start lg:items-center ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                                    }`}
                            >
                                {/* Step number circle */}
                                <div className="relative z-10 flex-shrink-0">
                                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#0070c0] to-[#d4002a] flex items-center justify-center shadow-[0_8px_24px_rgba(0,112,192,0.3)]">
                                        <span className="text-2xl font-bold text-white">{item.step}</span>
                                    </div>
                                </div>

                                {/* Content card */}
                                <div className={`flex-1 bg-white rounded-2xl p-6 shadow-[0_10px_30px_rgba(15,23,42,0.08)] hover:shadow-[0_15px_40px_rgba(15,23,42,0.12)] transition-all duration-300 ${index % 2 === 0 ? 'lg:text-left' : 'lg:text-right'
                                    }`}>
                                    <h3 className="text-xl sm:text-2xl font-bold text-[#111111] mb-3">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm sm:text-base text-[#6b6b6b] leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
