import {
    Lightbulb,
    Leaf,
    Target,
    Cpu,
    ShieldCheck,
    Scale,
    DollarSign,
    Trophy
} from "lucide-react";
const frameworkItems = [
    {
        title: "Innovation",
        description: "Driving progress through creative problem-solving and cutting-edge engineering technologies.",
        icon: Lightbulb,
        color: "bg-blue-500",
    },
    {
        title: "Sustainability",
        description: "Prioritizing environmental stewardship and long-term ecological balance in every project.",
        icon: Leaf,
        color: "bg-emerald-500",
    },
    {
        title: "Tailored Solutions",
        description: "Delivering customized engineering approaches that meet the unique needs of every partner.",
        icon: Target,
        color: "bg-indigo-500",
    },
    {
        title: "Technical Expertise",
        icon: Cpu,
        description: "Leveraging deep institutional knowledge and technical precision for complex infrastructure.",
        color: "bg-slate-700",
    },
    {
        title: "Quality Management",
        subtitle: "And International Standard Alignment",
        description: "Ensuring every deliverable meets and exceeds global industry benchmarks for excellence.",
        icon: ShieldCheck,
        color: "bg-red-500",
    },
    {
        title: "Strong Ethics",
        description: "Upholding the highest standards of integrity, transparency, and professional conduct.",
        icon: Scale,
        color: "bg-amber-600",
    },
    {
        title: "Cost Effectiveness",
        description: "Optimizing resources to deliver high-value outcomes without compromising on performance.",
        icon: DollarSign,
        color: "bg-green-600",
    },
    {
        title: "Outstanding Results",
        description: "Measuring our success through the measurable impact and satisfaction of our clients.",
        icon: Trophy,
        color: "bg-yellow-500",
    },
];

export const ProfessionalFrameworkSection = () => {
    return (
        <section id="professional-framework" className="relative w-full bg-[#f8f9fa] min-h-screen flex items-center justify-center py-24 overflow-hidden">
            {/* Subtle Background Accents */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-30" />
                <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-emerald-50 rounded-full blur-3xl opacity-30" />
            </div>

            <div className="relative mx-auto max-w-[1400px] px-6 sm:px-8 lg:px-20">
                <div className="mb-20 text-center max-w-3xl mx-auto">
                    <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight mb-6">
                        Our Professional Framework
                    </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
                    {frameworkItems.map((item, idx) => (
                        <div
                            key={idx}
                            className="group flex flex-col items-center text-center p-6 transition-all duration-300 hover:-translate-y-2"
                        >
                            <div className={`relative mb-8 flex items-center justify-center`}>
                                {/* Background Ring */}
                                <div className="absolute inset-0 scale-150 rounded-full border border-slate-100 group-hover:border-blue-100 transition-colors duration-300" />

                                {/* Icon Container */}
                                <div className={`w-16 h-16 rounded-2xl ${item.color} flex items-center justify-center text-white shadow-lg transition-transform duration-500 group-hover:rotate-[360deg]`}>
                                    <item.icon className="w-8 h-8" />
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <h3 className="text-xl font-bold text-slate-900 leading-tight">
                                    {item.title}
                                    {item.subtitle && (
                                        <span className="block text-sm font-semibold text-slate-500 mt-1 uppercase tracking-wider">
                                            {item.subtitle}
                                        </span>
                                    )}
                                </h3>
                                <p className="text-slate-600 text-sm leading-relaxed mt-2 line-clamp-3">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </section>
    );
};
