import { Briefcase, Settings, Users, Lightbulb } from "lucide-react";

const expertiseData = [
  {
    title: "Project Development",
    icon: Briefcase,
    color: "from-blue-500/10 to-blue-600/5",
    iconColor: "text-blue-600",
    hoverBg: "hover:bg-blue-600",
    hoverBorder: "hover:border-blue-600",
    items: [
      "Project Identification",
      "Desk Study",
      "Topographical Study",
      "Detailed Feasibility Study",
      "Due Diligence Appraisal",
      "Engineering Support During Development",
    ],
  },
  {
    title: "Project Engineering",
    icon: Settings,
    color: "from-emerald-500/10 to-emerald-600/5",
    iconColor: "text-emerald-600",
    hoverBg: "hover:bg-emerald-600",
    hoverBorder: "hover:border-emerald-600",
    items: [
      "Detailed Engineering Design",
      "Bidding and Contract Documents Preparation",
      "Bid Evaluation and Selection",
    ],
  },
  {
    title: "Project Management",
    icon: Users,
    color: "from-amber-500/10 to-amber-600/5",
    iconColor: "text-amber-600",
    hoverBg: "hover:bg-amber-600",
    hoverBorder: "hover:border-amber-600",
    items: [
      "Construction Supervision and Quality Control",
      "Progress Monitoring and Bill Vetting",
      "Lenders Technical Consultant",
      "Contract Management and Time Control",
    ],
  },
  {
    title: "Product Development",
    icon: Lightbulb,
    color: "from-purple-500/10 to-purple-600/5",
    iconColor: "text-purple-600",
    hoverBg: "hover:bg-purple-600",
    hoverBorder: "hover:border-purple-600",
    items: ["Structural Analyses (FEA)", "Hydraulic Analyses (CFD)", "Innovative Design"],
  },
];

export const ExpertiseAndServicesSection = () => {
  return (
    <section
      id="expertise-and-services"
      className="relative w-full bg-[#f8f9fa] min-h-screen flex items-center justify-center py-8 overflow-hidden"
    >
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-50 rounded-full blur-3xl opacity-50" />

      <div className="relative mx-auto max-w-[1200px] px-6 sm:px-8 lg:px-20">
        <div className="mb-10 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-bold leading-tight text-slate-900">
            Our Expertise and Services
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {expertiseData.map((category, idx) => (
            <div
              key={idx}
              className={`group relative flex flex-col p-6 rounded-[24px] bg-white border border-slate-200 ${category.hoverBorder} ${category.hoverBg} transition-all duration-500 overflow-hidden cursor-default min-h-[400px] items-start justify-start text-center`}
            >
              {/* Content Container */}
              <div className="flex flex-col z-10 transition-all duration-500 items-center w-full">
                {/* Icon & Title */}
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-blue-50 group-hover:bg-white/20 mb-4 transition-all duration-500 group-hover:scale-105 group-hover:-translate-y-1">
                    <category.icon
                      className={`w-8 h-8 ${category.iconColor} group-hover:text-white transition-all duration-500 group-hover:scale-110 group-hover:rotate-[360deg]`}
                    />
                  </div>

                  <h3 className="text-xl lg:text-2xl font-bold text-slate-900 group-hover:text-white transition-colors duration-500 mb-4">
                    {category.title}
                  </h3>
                </div>

                {/* Details Section */}
                <div className="w-full">
                  <ul className="space-y-3 pb-2 flex flex-col items-start px-4">
                    {category.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="group/item flex items-start gap-3">
                        <div className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center transition-all duration-300 group-hover:bg-white/20 group-hover:scale-110 group-hover/item:scale-110 group-hover/item:rotate-[10deg] group-hover/item:translate-x-1">
                          <svg
                            viewBox="0 0 24 24"
                            className="w-3 h-3 text-blue-600 transition-all duration-300 group-hover:text-white group-hover:scale-110 group-hover/item:scale-110 group-hover/item:rotate-[360deg]"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path d="M9.55 17.2 4.8 12.45l1.4-1.4 3.35 3.35 8.25-8.25 1.4 1.4z" />
                          </svg>
                        </div>
                        <span className="text-sm font-medium text-slate-600 group-hover:text-white/90 leading-snug transition-all text-left group-hover/item:translate-x-1">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Decorative Corner Element */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/10 rounded-bl-[60px] group-hover:bg-white/10 transition-colors duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
