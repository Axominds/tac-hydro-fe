
export const AboutUsSection = () => {
    return (
        <section id="about-us-section" className="w-full relative min-h-screen flex items-center py-16 sm:py-24 bg-[#f8f9fa]">
            <div className="max-w-[1240px] mx-auto px-6 sm:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Image Column */}
                    <div className="relative w-full aspect-[4/3] lg:aspect-auto lg:h-full min-h-[400px] rounded-3xl overflow-hidden shadow-2xl">
                        <img
                            src="/downloads/mjlodvw6RB1obD/img/image-3-1.png"
                            alt="About TAC Hydro"
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    </div>

                    {/* Text Column */}
                    <div className="flex flex-col gap-8">
                        <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#2c3e50] leading-tight">
                            About Us
                        </h2>
                        <div className="flex flex-col gap-8 text-[#555555] text-lg leading-relaxed">
                            <p>
                                TAC Hydro Consultancy Pvt. Ltd. is a leading engineering consultancy
                                based in Nepal, specializing in hydropower and infrastructure
                                development. Our journey began in <span className="font-bold text-[#2c3e50]">2005</span>, when a team of experienced
                                engineers came together with a shared vision to contribute to the nation's
                                energy sector through the study and design of small and medium-scale
                                hydropower projects.
                            </p>
                            <p>
                                As national energy demands grew, so did our capabilities. In <span className="font-bold text-[#2c3e50]">2011</span>, we
                                established <span className="font-bold text-[#2c3e50]">TAC Hydro Engineers</span>, expanding our expertise to serve larger
                                and more complex projects. This growth continued, and in <span className="font-bold text-[#2c3e50]">2017</span>, we
                                evolved into <span className="font-bold text-[#2c3e50]">TAC Hydro Consultancy Pvt. Ltd.</span>, reflecting our expanded
                                scope and commitment to excellence in engineering solutions.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
