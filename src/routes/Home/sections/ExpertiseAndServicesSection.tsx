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
            "Feasibility Study",
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
            "Project Monitoring and Bill Verification",
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
        items: [
            "Structural Analyses (FEA)",
            "Hydraulic Analyses (CFD)",
            "Innovative Design",
        ],
    },
];

export const ExpertiseAndServicesSection = () => {
    return (
        <section id="expertise-and-services" className="relative w-full bg-[#f8f9fa] min-h-screen flex items-center justify-center py-8 overflow-hidden">
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50" />
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-50 rounded-full blur-3xl opacity-50" />

            <div className="relative mx-auto max-w-[1400px] px-6 sm:px-8 lg:px-20">
                <div className="mb-16">
                    <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight text-center">
                        Our Expertise and Services
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {expertiseData.map((category, idx) => (
                        <div
                            key={idx}
                            className={`group relative flex flex-col p-8 rounded-[24px] bg-white border border-slate-200 ${category.hoverBorder} ${category.hoverBg} transition-all duration-500 overflow-hidden cursor-default min-h-[480px] items-center justify-center text-center`}
                        >
                            {/* Content Container */}
                            <div className="flex flex-col z-10 transition-all duration-500 transform translate-y-0 group-hover:-translate-y-4 items-center w-full">
                                {/* Icon & Title */}
                                <div className="flex flex-col items-center">
                                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-blue-50 group-hover:bg-white/20 mb-6 transition-all duration-500">
                                        <category.icon className={`w-8 h-8 ${category.iconColor} group-hover:text-white transition-colors duration-500`} />
                                    </div>

                                    <h3 className="text-xl lg:text-2xl font-bold text-slate-900 group-hover:text-white transition-colors duration-500 mb-0 group-hover:mb-6">
                                        {category.title}
                                    </h3>
                                </div>

                                {/* Sliding Details Section - Extends Upwards */}
                                <div className="h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 transition-all duration-500 ease-out overflow-hidden w-full">
                                    <ul className="space-y-3 pb-2 flex flex-col items-start px-4">
                                        {category.items.map((item, itemIdx) => (
                                            <li key={itemIdx} className="flex items-start gap-3">
                                                <div className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-blue-400 group-hover:bg-white/60 transition-colors" />
                                                <span className="text-sm font-medium text-slate-600 group-hover:text-white/90 leading-snug transition-colors text-left">
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
