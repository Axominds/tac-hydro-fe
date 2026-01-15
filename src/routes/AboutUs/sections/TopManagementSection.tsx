
export const TopManagementSection = () => {
    return (
        <section id="top-management-section" className="w-full relative flex items-center py-10 sm:py-16 bg-[#f8f9fa]">
            <div className="max-w-[1240px] mx-auto px-6 sm:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Text Column - First in grid for desktop, but visually on the left */}
                    <div className="flex flex-col gap-6 order-2 lg:order-1">
                        <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#2c3e50] leading-tight">
                            Top Management's Commitment
                        </h2>
                        <div className="flex flex-col gap-4 text-[#555555] text-lg leading-relaxed">
                            <p>
                                Dear Clients and Partners,
                            </p>
                            <p>
                                At TAC Hydro Consultancy, our mission is to provide the technical certainty required to transform hydropower potential into high-performing reality. As the global transition to clean energy accelerates, we provide the specialized expertise necessary to navigate the complexities of sustainable power development.
                            </p>
                            <p>
                                Our firm serves as a bridge between vision and execution. We provide a comprehensive suite of services, including project identification, feasibility studies, and detailed engineering design, construction supervision and commissioning of hydropower and solar power projects.
                            </p>
                            <p>
                                We recognize that hydropower projects represent significant capital investments and long-term commitments. To address this, our team of seasoned professionals delivers innovative, cost-effective solutions designed to optimize performance and extend the lifespan of energy assets through strategic rehabilitation.
                            </p>
                            <p>
                                We look forward to a successful partnership and to bringing your next hydropower venture to fruition.
                            </p>
                        </div>
                    </div>

                    {/* Image Column - Second in grid for desktop, but visually on the right */}
                    <div className="relative w-full aspect-[4/3] lg:aspect-auto lg:h-full min-h-[400px] rounded-3xl overflow-hidden shadow-2xl order-1 lg:order-2">
                        <img
                            src="/chairperson.png"
                            alt="Managing Director"
                            className="absolute inset-0 w-full h-full object-cover object-top"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};
