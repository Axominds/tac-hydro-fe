import { Building2, Users, Wrench, GraduationCap } from "lucide-react";

export const OurCollaborativeEcosystemSection = () => {
    const ecosystemItems = [
        {
            title: "Project Developers",
            description: "Hydropower developers seeking high-reliability design and strategic consultancy for large-scale energy assets.",
            icon: <Building2 className="w-6 h-6 text-blue-600" />
        },
        {
            title: "Consulting Firms",
            description: "Global engineering and consultancy entities seeking regional sub-consultancy or joint venture participation.",
            icon: <Users className="w-6 h-6 text-green-600" />
        },
        {
            title: "Technical Specialists",
            description: "Experts in niche geology, environmental safeguards, and specialized electro-mechanical systems.",
            icon: <Wrench className="w-6 h-6 text-purple-600" />
        },
        {
            title: "Academic & Research",
            description: "Collaborative research on river dynamics and innovative sustainable energy technology with leading institutions.",
            icon: <GraduationCap className="w-6 h-6 text-orange-600" />
        }
    ];

    return (
        <section id="collaborative-ecosystem" className="relative w-full min-h-screen bg-[#f8f9fa] flex items-center py-20">
            <div className="mx-auto max-w-[1200px] px-6 sm:px-10 lg:px-20 w-full">
                <div className="flex flex-col gap-6 text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-bold text-[#111111]">
                        Our Collaborative Ecosystem
                    </h2>
                    <p className="text-base sm:text-lg text-[#6b6b6b] max-w-[900px] mx-auto leading-relaxed">
                        We provide the strategic bridge for the entire hydropower lifecycle offering developers bankable designs, firms local agility, specialists a platform for niche expertise, and researchers a pathway to real-world application.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {ecosystemItems.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl p-8 shadow-[0_10px_30px_rgba(15,23,42,0.08)] hover:shadow-[0_15px_40px_rgba(15,23,42,0.12)] transition-all duration-300 hover:-translate-y-1 group"
                        >
                            <div className="flex items-start gap-6">
                                <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-white border border-gray-100 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-sm">
                                    {item.icon}
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-[#111111] mb-3 group-hover:text-[#0070c0] transition-colors">
                                        {item.title}
                                    </h3>
                                    <p className="text-base text-[#6b6b6b] leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
