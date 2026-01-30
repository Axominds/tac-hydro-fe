import { frameworkItems } from "../../../data/frameworkItems";

export const ProfessionalFrameworkSection = () => {
    return (
        <div>
            <section id="professional-framework-text" className="w-full py-16 px-4 md:px-8 bg-[#f8f9fa] relative overflow-hidden">
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="flex flex-col md:flex-row gap-12 items-center">
                        <div className="w-full md:w-1/2">
                            <h2 className="text-3xl md:text-4xl font-bold text-[#0b1522] mb-6">
                                Our Professional Framework
                            </h2>
                            <div className="space-y-6 text-slate-700 leading-relaxed text-justify">
                                <p>
                                    TAC Hydro Consultancy Pvt. Ltd. offers comprehensive engineering solutions that extend well beyond hydropower. Our expertise encompasses <span className="font-semibold text-[#0b1522] bg-blue-50 px-1 rounded">tunnel engineering</span>, <span className="font-semibold text-[#0b1522] bg-blue-50 px-1 rounded">transmission lines</span>, <span className="font-semibold text-[#0b1522] bg-blue-50 px-1 rounded">road infrastructure</span>, <span className="font-semibold text-[#0b1522] bg-blue-50 px-1 rounded">environmental studies</span>, <span className="font-semibold text-[#0b1522] bg-blue-50 px-1 rounded">irrigation</span>, and <span className="font-semibold text-[#0b1522] bg-blue-50 px-1 rounded">water resource management</span>.
                                </p>
                                <p>
                                    We are guided by a strong commitment to <span className="font-semibold text-[#0b1522]">innovation</span>, <span className="font-semibold text-[#0b1522]">sustainability</span>, and <span className="font-semibold text-[#0b1522]">cost-effectiveness</span>, ensuring that every project we undertake delivers long-term value. Our team's technical proficiency, thorough approach, and dedication to quality outcomes enable us to consistently meet and exceed client expectations.
                                </p>
                                <p>
                                    We take pride in being a trusted and dependable partner—focused on delivering professional excellence and tailored solutions across the infrastructure and energy sectors.
                                </p>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 relative">
                            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl relative group">
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1522]/60 to-transparent z-10"></div>
                                <img
                                    src="/tunnel1.png"
                                    alt="Engineering Excellence"
                                    className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute bottom-6 left-6 z-20">
                                    <div className="text-white text-xl font-bold">Engineering Excellence</div>
                                    <div className="text-white/80 text-sm">Delivering Value Since 2005</div>
                                </div>
                            </div>
                            <div className="absolute -top-6 -right-6 w-32 h-32 bg-blue-100/50 rounded-full blur-2xl -z-10"></div>
                            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-100/50 rounded-full blur-2xl -z-10"></div>
                        </div>
                    </div>
                </div>
            </section>
            <section id="professional-framework" className="relative w-full bg-[#f8f9fa] min-h-screen flex items-center justify-center py-24 overflow-hidden">
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
                                    <div className="absolute inset-0 scale-150 rounded-full border border-slate-100 group-hover:border-blue-100 transition-colors duration-300" />
                                    <div className={`w-16 h-16 rounded-2xl ${item.color} flex items-center justify-center text-white shadow-lg transition-transform duration-500 group-hover:rotate-[360deg]`}>
                                        <item.icon className="w-8 h-8" />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <h3 className="text-xl font-bold text-slate-900 leading-tight">
                                        {item.title}
                                    </h3>
                                    <p className="text-slate-600 text-sm leading-relaxed mt-2">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </section>
        </div>
    );
};
