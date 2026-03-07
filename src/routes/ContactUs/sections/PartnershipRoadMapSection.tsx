import { Compass, Sliders, FileSignature, Rocket, TrendingUp } from "lucide-react";

export const PartnershipRoadMapSection = () => {
  const roadmapSteps = [
    {
      icon: <Compass className="w-8 h-8 text-blue-600" />,
      milestone: "Milestone 01",
      title: "Strategic Discovery",
      description:
        "Initial consultation to evaluate value proposition and goal alignment. We conduct deep-dive synergy sessions to define clear project KPIs and operational boundaries.",
    },
    {
      icon: <Sliders className="w-8 h-8 text-green-600" />,
      milestone: "Milestone 02",
      title: "Resource Alignment",
      description:
        "Defining technical requirements, financial commitments, and risk-sharing models. Establishing the resource framework for long-term project viability.",
    },
    {
      icon: <FileSignature className="w-8 h-8 text-purple-600" />,
      milestone: "Milestone 03",
      title: "Formalization",
      description:
        "Execution of MoUs or JVs with clearly defined KPIs and governance structures. Setting the legal and operational foundation for collaboration.",
    },
    {
      icon: <Rocket className="w-8 h-8 text-orange-600" />,
      milestone: "Milestone 04",
      title: "Implementation and Execution",
      description:
        "Active project execution with integrated teams and agile communication channels. Deploying specialized talent across on-site and remote environments.",
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-red-600" />,
      milestone: "Milestone 05",
      title: "Growth & Evolution",
      description:
        "Annual reviews to scale the partnership into new markets or technologies. Continuous evaluation of performance to drive perpetual innovation.",
    },
  ];

  return (
    <section
      id="partnership-roadmap"
      className="relative w-full min-h-screen bg-[#f8f9fa] flex items-center py-20"
    >
      <div className="mx-auto max-w-[1200px] px-6 sm:px-10 lg:px-20 w-full">
        <div className="flex flex-col gap-6 text-center mb-16">
          <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-bold leading-tight text-[#111111]">
            Partnership Roadmap
          </h1>
          <p className="text-base sm:text-lg text-[#6b6b6b] max-w-[800px] mx-auto">
            Strengthening the bridge between specialized consulting and operational reality through
            shared milestones
          </p>
        </div>

        <div className="relative">
          {/* Vertical line connector for mobile/tablet */}
          <div className="absolute left-8 top-0 bottom-0 w-[2px] bg-[#0070c0] lg:hidden" />

          {/* Center vertical line for desktop */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-[#0070c0] hidden lg:block -translate-x-1/2" />

          <div className="space-y-12">
            {roadmapSteps.map((item, index) => (
              <div
                key={index}
                className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
              >
                {/* Mobile: Left aligned with line */}
                <div className="flex flex-col md:hidden pl-20 relative w-full">
                  <div className="absolute left-0 w-16 h-16 -ml-0 rounded-full bg-white border-4 border-[#0070c0] flex items-center justify-center shadow-lg z-10">
                    {item.icon}
                  </div>
                  <div className="bg-white rounded-2xl p-6 shadow-md border-l-4 border-[#0070c0]">
                    <div className="mb-2">
                      <span className="block text-sm font-bold text-blue-600 uppercase tracking-wider mb-1">
                        {item.milestone}
                      </span>
                      <h3 className="text-xl font-bold text-[#111111]">{item.title}</h3>
                    </div>
                    <p className="text-sm text-[#6b6b6b]">{item.description}</p>
                  </div>
                </div>

                {/* Desktop: Centered timeline */}
                <div className="hidden md:flex items-center justify-center w-full">
                  <div
                    className={`w-[45%] ${index % 2 === 0 ? "text-right pr-12" : "order-last text-left pl-12"}`}
                  >
                    <div className="bg-white rounded-2xl p-8 shadow-[0_10px_30px_rgba(15,23,42,0.08)] hover:shadow-[0_20px_50px_rgba(15,23,42,0.15)] transition-all duration-300 hover:-translate-y-1">
                      <div className="mb-3">
                        <span className="block text-sm font-bold text-blue-600 uppercase tracking-wider mb-1">
                          {item.milestone}
                        </span>
                        <h3 className="text-xl font-bold text-[#111111]">{item.title}</h3>
                      </div>
                      <p className="text-sm text-[#6b6b6b] leading-relaxed">{item.description}</p>
                    </div>
                  </div>

                  <div className="absolute left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-white border-4 border-[#0070c0] flex items-center justify-center shadow-[0_8px_24px_rgba(0,112,192,0.3)] z-10">
                    {item.icon}
                  </div>

                  <div className="w-[45%]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
