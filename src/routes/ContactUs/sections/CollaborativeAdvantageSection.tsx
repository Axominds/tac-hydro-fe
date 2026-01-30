import {
    Lightbulb,
    Leaf,
    Puzzle,
    Cpu,
    CheckCircle,
    ShieldCheck,
    Coins,
    Trophy
} from "lucide-react";

export const CollaborativeAdvantageSection = () => {
    return (
        <section id="collaborative-advantage" className="relative w-full min-h-screen bg-[#f8f9fa] flex items-center py-20">
            <div className="mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-20 w-full">
                <div className="flex flex-col gap-6 text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-bold text-[#111111]">
                        Collaborative Advantage
                    </h2>
                    <p className="text-base sm:text-lg text-[#6b6b6b] max-w-[800px] mx-auto">
                        Partnering with TAC Hydro ensures a foundation of technical excellence, ethical practice, and global engineering benchmarks.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        {
                            title: "Innovation",
                            description: "Driving progress through creative problem-solving and cutting-edge engineering techniques in every project phase.",
                            icon: <Lightbulb className="w-8 h-8 text-blue-600" />
                        },
                        {
                            title: "Sustainability",
                            description: "Prioritizing environmental stewardship and long-term ecological balance in all hydraulic design and implementation.",
                            icon: <Leaf className="w-8 h-8 text-green-600" />
                        },
                        {
                            title: "Tailored Solutions",
                            description: "Delivering customized engineering approaches that meet the unique technical and topographical needs of every site.",
                            icon: <Puzzle className="w-8 h-8 text-purple-600" />
                        },
                        {
                            title: "Technical Expertise",
                            description: "Leveraging deep institutional knowledge and technical precision for complex infrastructure and energy systems.",
                            icon: <Cpu className="w-8 h-8 text-slate-600" />
                        },
                        {
                            title: "Quality management",
                            description: "Ensuring every deliverable meets and exceeds global industry benchmarks and international standard alignment.",
                            icon: <CheckCircle className="w-8 h-8 text-teal-600" />
                        },
                        {
                            title: "Strong ethics",
                            description: "Upholding the highest standards of integrity, transparency, and professional conduct across all partnerships.",
                            icon: <ShieldCheck className="w-8 h-8 text-indigo-600" />
                        },
                        {
                            title: "Cost Effectiveness",
                            description: "Optimizing resources to deliver high-value outcomes without compromising on performance or structural safety.",
                            icon: <Coins className="w-8 h-8 text-amber-600" />
                        },
                        {
                            title: "Outstanding Results",
                            description: "Measuring our success through the measurable impact and satisfaction of our partners and final project outcomes.",
                            icon: <Trophy className="w-8 h-8 text-yellow-500" />
                        }
                    ].map((advantage, index) => (
                        <div
                            key={index}
                            className="group bg-white rounded-[32px] border border-slate-100 p-8 shadow-sm transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 cursor-pointer flex flex-col items-center text-center gap-4 animate-fade-in opacity-0 fill-mode-forwards transform"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <div className="mb-2 bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center transition-transform duration-700 ease-out group-hover:scale-110 group-hover:bg-blue-50/30">
                                {advantage.icon}
                            </div>
                            <h3 className="text-xl font-bold text-[#111111] group-hover:text-blue-600 transition-colors">
                                {advantage.title}
                            </h3>
                            <p className="text-sm text-[#6b6b6b] leading-relaxed">
                                {advantage.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
