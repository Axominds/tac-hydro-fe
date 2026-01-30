import { ChevronRightIcon } from "lucide-react";
import { HERO_BG_ALT } from "../../../assets";
import { Button } from "../../../components/ui/button";

export const CareerBannerSection = () => {
    const handleGetStarted = () => {
        const target = document.getElementById("active-opportunities");
        if (!target) return;

        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 1500;
        let start: number | null = null;

        const easeInOutQuart = (t: number) => {
            return t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;
        };

        const animation = (currentTime: number) => {
            if (start === null) start = currentTime;
            const timeElapsed = currentTime - start;
            const run = easeInOutQuart(Math.min(timeElapsed / duration, 1)) * distance + startPosition;
            window.scrollTo(0, run);
            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        };

        requestAnimationFrame(animation);
    };

    return (
        <header id="career-banner" className="relative w-full min-h-screen overflow-hidden">
            <style>
                {`
                    @keyframes slowZoom {
                        0% { transform: scale(1); }
                        100% { transform: scale(1.1); }
                    }
                `}
            </style>
            <img
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                style={{ animation: 'slowZoom 20s ease-in-out infinite alternate' }}
                alt="Career Background"
                src={HERO_BG_ALT}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-black/10 to-transparent pointer-events-none" />


            <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center">
                <div className="h-full mx-auto px-4 sm:px-8 lg:px-20 flex items-center justify-center">
                    <div className="translate-y-[2rem] sm:translate-y-[2.5rem] flex flex-col items-center">
                        <div className="max-w-[720px] animate-fade-in opacity-0 [--animation-delay:200ms] lg:max-w-[995px] flex flex-col items-center">
                            <h1 className="font-bold text-white text-3xl sm:text-4xl lg:text-[52px] sm:leading-[1.1] lg:leading-[1.1] mb-2 text-center">
                                <span className="block">Shape the Future of Hydropower</span>
                            </h1>

                            <div className="bg-white mt-3" />
                            <p className="font-semibold text-white text-base sm:text-lg lg:text-[20px] leading-7 sm:leading-8 lg:leading-[35px] mt-4 max-w-[720px] text-center">
                                Join TAC Hydro Consultancy Pvt. Ltd. and play a pivotal role in the sustainable energy landscape. We're looking for passionate individuals to help us lead the way in hydropower innovation.
                            </p>

                            <div className="flex flax-wrap justify-center gap-4 mt-6">
                                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium">
                                    <span className="w-2 h-2 rounded-full bg-blue-400"></span> Full Time
                                </span>
                                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium">
                                    <span className="w-2 h-2 rounded-full bg-purple-400"></span> Consultant
                                </span>
                                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium">
                                    <span className="w-2 h-2 rounded-full bg-green-400"></span> Internship
                                </span>
                            </div>

                            <Button
                                type="button"
                                onClick={handleGetStarted}
                                className="mt-8 inline-flex items-center justify-center gap-[9px] px-6 sm:px-[29px] py-2.5 rounded-[32px] border border-white/40 bg-gradient-to-br from-white/60 via-white/10 to-white/10 backdrop-blur-[30px] font-bold text-white text-sm sm:text-base lg:text-lg shadow-[0_25px_45px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_65px_rgba(0,0,0,0.45)] active:translate-y-0.5"
                            >
                                <span className="font-bold text-white text-sm sm:text-base lg:text-lg leading-[normal]">
                                    Explore Opportunities
                                </span>
                                <ChevronRightIcon className="w-5 h-5 text-white" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};
