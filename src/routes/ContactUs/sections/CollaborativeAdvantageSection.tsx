export const CollaborativeAdvantageSection = () => {
    return (
        <section id="collaborative-advantage" className="relative w-full min-h-screen bg-[#f8f9fa] flex items-center">
            <div className="mx-auto max-w-[1200px] px-6 sm:px-10 lg:px-20 py-16 w-full">
                <div className="flex flex-col gap-6">
                    <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-bold text-[#111111]">
                        Collaborative Advantage
                    </h2>
                    <p className="text-base sm:text-lg text-[#6b6b6b] max-w-[800px]">
                        Partnering with TacHydro means accessing decades of expertise, innovative solutions,
                        and a commitment to sustainable development.
                    </p>
                </div>

                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                        {
                            title: "Technical Excellence",
                            description: "Leverage our deep technical expertise in hydropower engineering and sustainable energy solutions.",
                            icon: "⚡"
                        },
                        {
                            title: "Proven Track Record",
                            description: "Benefit from our successful project portfolio spanning multiple countries and diverse project scales.",
                            icon: "🏆"
                        },
                        {
                            title: "Innovation Focus",
                            description: "Access cutting-edge technologies and innovative approaches to hydropower development.",
                            icon: "💡"
                        },
                        {
                            title: "Sustainability Commitment",
                            description: "Partner with a team dedicated to minimizing environmental impact and maximizing social benefits.",
                            icon: "🌱"
                        },
                        {
                            title: "Local Expertise",
                            description: "Tap into our deep understanding of local contexts, regulations, and stakeholder engagement.",
                            icon: "🌍"
                        },
                        {
                            title: "End-to-End Support",
                            description: "Receive comprehensive support from feasibility studies to project commissioning and beyond.",
                            icon: "🤝"
                        }
                    ].map((advantage, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl p-6 shadow-[0_10px_30px_rgba(15,23,42,0.08)] hover:shadow-[0_15px_40px_rgba(15,23,42,0.12)] transition-all duration-300 hover:-translate-y-1"
                        >
                            <div className="text-4xl mb-4">{advantage.icon}</div>
                            <h3 className="text-xl font-bold text-[#111111] mb-3">
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
