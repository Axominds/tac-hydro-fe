
import { FC } from "react";

export const WhyChooseUsSection: FC = () => {
    return (
        <section className="w-full py-16 px-4 md:px-8 bg-[#f8f9fa] relative overflow-hidden" id="why-choose-us">
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="flex flex-col md:flex-row gap-12 items-center">
                    <div className="w-full md:w-1/2">
                        <h2 className="text-3xl md:text-4xl font-bold text-[#0b1522] mb-6">
                            WHY CHOOSE US ?
                        </h2>
                        <div className="h-1 w-20 bg-blue-600 mb-8"></div>
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
                        {/* Decorative elements */}
                        <div className="absolute -top-6 -right-6 w-32 h-32 bg-blue-100/50 rounded-full blur-2xl -z-10"></div>
                        <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-100/50 rounded-full blur-2xl -z-10"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};
