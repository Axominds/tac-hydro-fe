import { useState, useEffect } from "react";
import { ChevronRightIcon } from "lucide-react";
import { HERO_BG_ALT } from "../../../assets";
import { Button } from "../../../components/ui/button";
import { SiteHeader } from "../../../components/sections/SiteHeader";

const typewriterWords = ["INNOVATE", "ENGINEER", "SUSTAIN"];

interface HomeHeaderProps {
    navigationItems: { label: string; href: string; isActive?: boolean }[];
}

export const HomeHeaderSection = ({ navigationItems }: HomeHeaderProps) => {
    const [typewriterText, setTypewriterText] = useState("");
    const [typewriterIndex, setTypewriterIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleGetStarted = () => {
        const target = document.getElementById("numbers-and-figures");
        if (!target) return;

        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 1500; // Longer duration for slow start
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

    useEffect(() => {
        const currentWord = typewriterWords[typewriterIndex % typewriterWords.length];
        if (!isDeleting && typewriterText === currentWord) {
            const pauseTimer = window.setTimeout(() => setIsDeleting(true), 800);
            return () => window.clearTimeout(pauseTimer);
        }

        if (isDeleting && typewriterText.length === 0) {
            const resetTimer = window.setTimeout(() => {
                setIsDeleting(false);
                setTypewriterIndex((prev) => prev + 1);
            }, 300);
            return () => window.clearTimeout(resetTimer);
        }

        const nextText = isDeleting
            ? currentWord.substring(0, typewriterText.length - 1)
            : currentWord.substring(0, typewriterText.length + 1);
        let delay = isDeleting ? 90 : 130;

        if (!isDeleting && typewriterText.length === currentWord.length - 1) {
            delay = 60;
        }

        const timer = window.setTimeout(() => {
            setTypewriterText(nextText);
        }, delay);

        return () => window.clearTimeout(timer);
    }, [isDeleting, typewriterIndex, typewriterText]);

    return (
        <header className="relative w-full min-h-screen">
            <img
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                alt="Hero Background"
                src={HERO_BG_ALT}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-black/10 to-transparent pointer-events-none" />

            <SiteHeader
                navigationItems={navigationItems}
                headerClassName="absolute top-0 left-0 right-0 animate-fade-in opacity-0"
            />

            <div className="absolute inset-0 z-10">
                <div className="h-full mx-auto px-4 sm:px-8 lg:px-20 flex items-center justify-start">
                    <div className="translate-y-[6.5rem] sm:translate-y-[7rem]">
                        <div className="max-w-[720px] animate-fade-in opacity-0 [--animation-delay:200ms] lg:max-w-[995px]">
                            <h1 className="font-bold text-white text-3xl sm:text-4xl lg:text-[52px] sm:leading-[1.1] lg:leading-[1.1] mb-2">
                                <span className="block">Empowering Sustainable Resources Through Engineering Excellence</span>
                            </h1>
                            <div className="mt-0 flex items-center gap-2 min-h-[32px]">
                                <span className="font-bold text-white text-xl sm:text-2xl lg:text-[32px] leading-[1]">
                                    {typewriterText}
                                </span>
                                <span className="inline-block w-[2px] h-7 bg-white animate-blink" aria-hidden="true" />
                            </div>
                            <div className="bg-white mt-3" />
                            <p className="font-semibold text-white text-base sm:text-lg lg:text-[20px] leading-7 sm:leading-8 lg:leading-[35px] mt-4 max-w-[640px]">
                                TacHydro exists to bring low carbon solutions to minimize the impact of energy
                                creation on the environment.
                            </p>

                            <Button
                                type="button"
                                onClick={handleGetStarted}
                                className="mt-6 inline-flex items-center justify-center gap-[9px] px-6 sm:px-[29px] py-2.5 rounded-[32px] border border-white/40 bg-gradient-to-br from-white/60 via-white/10 to-white/10 backdrop-blur-[30px] font-bold text-white text-sm sm:text-base lg:text-lg shadow-[0_25px_45px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_65px_rgba(0,0,0,0.45)] active:translate-y-0.5"
                            >
                                <span className="font-bold text-white text-sm sm:text-base lg:text-lg leading-[normal]">
                                    Get Started
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
