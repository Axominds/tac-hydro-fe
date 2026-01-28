export const InnitiateSynergySection = () => {
    return (
        <section id="innitate-synergy" className="relative w-full min-h-screen bg-[#f8f9fa] flex items-center">
            <div className="mx-auto max-w-[1200px] px-6 sm:px-10 lg:px-20 py-16 w-full">
                <div className="bg-gradient-to-br from-[#0070c0] to-[#d4002a] rounded-3xl p-8 sm:p-12 lg:p-16 shadow-[0_20px_60px_rgba(0,112,192,0.3)] text-white">
                    <div className="max-w-[800px] mx-auto text-center">
                        <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-bold mb-6">
                            Initiate Synergy
                        </h2>
                        <p className="text-base sm:text-lg lg:text-xl leading-relaxed mb-8 opacity-95">
                            Ready to explore how we can work together to create sustainable hydropower solutions?
                            Let's start a conversation about your project goals and how our expertise can help bring them to life.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                                <div className="text-3xl mb-3">📧</div>
                                <h3 className="font-bold text-lg mb-2">Email Us</h3>
                                <p className="text-sm opacity-90">service@tachydro.com.np</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                                <div className="text-3xl mb-3">📞</div>
                                <h3 className="font-bold text-lg mb-2">Call Us</h3>
                                <p className="text-sm opacity-90">+977 01-5422896</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                                <div className="text-3xl mb-3">📍</div>
                                <h3 className="font-bold text-lg mb-2">Visit Us</h3>
                                <p className="text-sm opacity-90">Kupondole, Lalitpur</p>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="/contact-us"
                                className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-white text-[#0070c0] font-bold text-base sm:text-lg shadow-[0_10px_30px_rgba(0,0,0,0.2)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.3)] hover:-translate-y-1 transition-all duration-300"
                            >
                                Contact Us
                            </a>
                            <a
                                href="/projects"
                                className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-transparent border-2 border-white text-white font-bold text-base sm:text-lg hover:bg-white/10 transition-all duration-300"
                            >
                                View Our Projects
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <div>
                        <div className="text-4xl sm:text-5xl font-bold text-[#0070c0] mb-2">50+</div>
                        <p className="text-sm sm:text-base text-[#6b6b6b]">Successful Partnerships</p>
                    </div>
                    <div>
                        <div className="text-4xl sm:text-5xl font-bold text-[#d4002a] mb-2">100+</div>
                        <p className="text-sm sm:text-base text-[#6b6b6b]">Collaborative Projects</p>
                    </div>
                    <div>
                        <div className="text-4xl sm:text-5xl font-bold text-[#0070c0] mb-2">15+</div>
                        <p className="text-sm sm:text-base text-[#6b6b6b]">Years of Experience</p>
                    </div>
                </div>
            </div>
        </section>
    );
};
