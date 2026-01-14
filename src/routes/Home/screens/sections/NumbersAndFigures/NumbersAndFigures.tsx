import { useEffect, useRef, useState } from "react";

const stats = [
    { number: "120", label: "+projects", description: "A vast and diverse portfolio of successfully delivered energy solutions." },
    { number: "20", label: "+years", description: "Two decades of institutional expertise and stability." },
    { number: "60", label: "+clients", description: "Proven reliability for a diverse network of global and local partners." },
    { number: "50", label: "+team members", description: "A deep technical bench dedicated to engineering precision" },
];

export const NumbersAndFiguresSection = () => {
    const [counts, setCounts] = useState(() => stats.map(() => 0));
    const [statsAnimationSeed, setStatsAnimationSeed] = useState(0);
    const statsSectionRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!statsSectionRef.current) {
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setStatsAnimationSeed((prev) => prev + 1);
                }
            },
            { threshold: 0.35 }
        );

        observer.observe(statsSectionRef.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (statsAnimationSeed === 0) {
            return;
        }
        const targets = stats.map((stat) => parseFloat(stat.number) || 0);
        const duration = 1200;
        const startTime = performance.now();
        let frameId = 0;

        setCounts(stats.map(() => 0));

        const tick = (now: number) => {
            const progress = Math.min((now - startTime) / duration, 1);
            setCounts(targets.map((value) => Math.floor(value * progress)));
            if (progress < 1) {
                frameId = window.requestAnimationFrame(tick);
            }
        };

        frameId = window.requestAnimationFrame(tick);
        return () => window.cancelAnimationFrame(frameId);
    }, [statsAnimationSeed]);

    return (
        <section id="numbers-and-figures" className="relative w-full bg-[#f8f9fa] min-h-screen flex items-center justify-center py-24 overflow-hidden">
            <div className="mx-auto w-full max-w-[1400px] opacity-100 px-6 sm:px-10 lg:px-20">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20 items-center">
                    <div className="overflow-hidden rounded-[24px] shadow-[0_24px_50px_rgba(0,0,0,0.15)] opacity-100 relative z-20 aspect-[4/5]">
                        <img
                            className="w-full h-full object-cover"
                            alt="Safety helmet"
                            src="/downloads/mjlob7k1SeIJX4/img/mask-group-1.png"
                        />
                    </div>

                    <div
                        className="flex flex-col gap-10 opacity-100 w-full"
                        ref={statsSectionRef}
                    >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-16">
                            {stats.map((stat, index) => (
                                <div key={index} className="text-left group">
                                    <div className="relative w-full max-w-[280px]">
                                        <div className="flex items-baseline gap-1">
                                            <span className="font-extrabold text-slate-900 text-7xl sm:text-8xl lg:text-[160px] leading-[0.9] tracking-tighter">
                                                {counts[index]}
                                            </span>
                                            <span className="font-bold text-slate-900 text-4xl sm:text-5xl lg:text-7xl leading-none">
                                                {stat.number.replace(/[0-9.]/g, "")}
                                            </span>
                                        </div>
                                        <div className="inline-flex items-center justify-center bg-blue-600 text-white px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-widest mt-4 shadow-lg shadow-blue-200 transition-transform group-hover:scale-110">
                                            {stat.label}
                                        </div>
                                    </div>
                                    <p className="font-medium text-slate-500 text-lg sm:text-xl leading-relaxed mt-6 max-w-[320px]">
                                        {stat.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

        </section>
    );
};
