import { useEffect, useRef, useState } from "react";

const stats = [
    { number: "1700", label: "+MW", description: "Demonstrated experience across small, medium, and large-scale hydropower projects." },
    { number: "20", label: "+years", description: "Two decades of institutional expertise and stability." },
    { number: "120", label: "+projects", description: "A vast and diverse portfolio of successfully delivered energy solutions." },
    { number: "50", label: "+team members", description: "A deep technical bench dedicated to engineering precision." },
    { number: "60", label: "+clients", description: "Proven reliability for a diverse network of global and local partners." },
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
        <section id="numbers-and-figures" className="relative w-full bg-[#f8f9fa] min-h-screen flex items-center justify-center overflow-hidden">
            <div className="mx-auto w-full max-w-[1400px] opacity-100 px-6 sm:px-10 lg:px-20">
                <div
                    className="flex flex-col items-center opacity-100 w-full"
                    ref={statsSectionRef}
                >
                    {/* Title */}
                    <h2 className="font-bold text-slate-900 text-3xl sm:text-4xl lg:text-5xl text-center mb-12 sm:mb-16">
                        Our Impact in Numbers
                    </h2>

                    {/* Stats Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 sm:gap-10 lg:gap-8 w-full max-w-[1400px]">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center group flex flex-col items-center">
                                <div className="relative w-full flex flex-col items-center">
                                    <div className="flex items-baseline justify-center gap-1">
                                        <span className="font-extrabold text-slate-900 text-5xl sm:text-6xl lg:text-7xl leading-[0.9] tracking-tighter">
                                            {counts[index]}
                                        </span>
                                        <span className="font-bold text-slate-900 text-2xl sm:text-3xl lg:text-4xl leading-none">
                                            {stat.number.replace(/[0-9.]/g, "")}
                                        </span>
                                    </div>
                                    <div className="inline-flex items-center justify-center bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mt-3 shadow-lg shadow-blue-200 transition-transform group-hover:scale-110">
                                        {stat.label}
                                    </div>
                                </div>
                                <p className="font-normal text-slate-600 text-sm sm:text-base leading-relaxed mt-4 max-w-[280px]">
                                    {stat.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
