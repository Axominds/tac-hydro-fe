export const OurCollaborativeEcosystemSection = () => {
    const ecosystemPartners = [
        {
            category: "Government Agencies",
            description: "Collaborating with regulatory bodies and government institutions to ensure compliance and sustainable development.",
            partners: ["Ministry of Energy", "Environmental Authorities", "Local Governments"]
        },
        {
            category: "Financial Institutions",
            description: "Partnering with banks and investment firms to secure funding for sustainable hydropower projects.",
            partners: ["Development Banks", "Private Investors", "International Funds"]
        },
        {
            category: "Technology Partners",
            description: "Working with leading technology providers to implement cutting-edge solutions.",
            partners: ["Equipment Manufacturers", "Software Providers", "Research Institutions"]
        },
        {
            category: "Local Communities",
            description: "Engaging with communities to ensure projects deliver social and economic benefits.",
            partners: ["Community Leaders", "Local Businesses", "Educational Institutions"]
        },
        {
            category: "Environmental Organizations",
            description: "Collaborating with environmental groups to minimize ecological impact and promote conservation.",
            partners: ["Conservation Groups", "Environmental NGOs", "Sustainability Experts"]
        },
        {
            category: "Industry Associations",
            description: "Active participation in industry networks to share knowledge and best practices.",
            partners: ["Hydropower Associations", "Engineering Societies", "Trade Organizations"]
        }
    ];

    return (
        <section id="collaborative-ecosystem" className="relative w-full min-h-screen bg-[#f8f9fa] flex items-center">
            <div className="mx-auto max-w-[1200px] px-6 sm:px-10 lg:px-20 py-16 w-full">
                <div className="flex flex-col gap-6 text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-bold text-[#111111]">
                        Our Collaborative Ecosystem
                    </h2>
                    <p className="text-base sm:text-lg text-[#6b6b6b] max-w-[800px] mx-auto">
                        We work with a diverse network of partners to deliver comprehensive, sustainable hydropower solutions.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {ecosystemPartners.map((partner, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl p-8 shadow-[0_10px_30px_rgba(15,23,42,0.08)] hover:shadow-[0_15px_40px_rgba(15,23,42,0.12)] transition-all duration-300 hover:-translate-y-1"
                        >
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-[#0070c0] to-[#d4002a] flex items-center justify-center">
                                    <span className="text-2xl">🤝</span>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-[#111111] mb-3">
                                        {partner.category}
                                    </h3>
                                    <p className="text-sm text-[#6b6b6b] leading-relaxed mb-4">
                                        {partner.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {partner.partners.map((p, idx) => (
                                            <span
                                                key={idx}
                                                className="px-3 py-1 bg-[#f8f9fa] rounded-full text-xs font-semibold text-[#0070c0]"
                                            >
                                                {p}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
