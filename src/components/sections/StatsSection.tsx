import { useEffect, useRef, useState, useMemo } from "react";
import { useStats } from "../../hooks/useStats";

const statsConfig = [
  {
    key: "mw_capacity",
    label: "MW Capacity",
    description: "Small to large-scale hydropower expertise.",
  },
  {
    key: "years",
    label: "Years",
    description: "Decades of expertise and experience.",
  },
  {
    key: "projects_count",
    label: "Projects",
    description: "Diverse portfolio of successful energy solutions.",
  },
  {
    key: "team_members_count",
    label: "Team members",
    description: "Deep technical bench for engineering precision.",
  },
  {
    key: "clients_count",
    label: "Clients",
    description: "Diverse network of global & local partnerships.",
  },
];

export const StatsSection = () => {
  const { data: stats, isLoading } = useStats();
  const [counts, setCounts] = useState<number[]>([]);
  const [statsAnimationSeed, setStatsAnimationSeed] = useState(0);
  const statsSectionRef = useRef<HTMLDivElement | null>(null);

  const statsData = useMemo(() => {
    if (!stats) return [];
    return statsConfig.map((config) => {
      const value = stats[config.key as keyof typeof stats] ?? 0;
      return {
        ...config,
        number: String(value),
      };
    });
  }, [stats]);

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
      { threshold: 0.35 },
    );

    observer.observe(statsSectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (statsAnimationSeed === 0 || !statsData.length) {
      return;
    }
    const targets = statsData.map((stat) => parseFloat(stat.number) || 0);
    const duration = 1200;
    const startTime = performance.now();
    let frameId = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      setCounts(targets.map((value) => Math.floor(value * progress)));
      if (progress < 1) {
        frameId = window.requestAnimationFrame(tick);
      }
    };

    frameId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frameId);
  }, [statsAnimationSeed, statsData]);

  if (isLoading || !stats) {
    return (
      <section id="stats" className="relative w-full flex flex-col bg-[#f8f9fa]">
        <div className="relative flex-1 flex items-center justify-center py-10">
          <div className="w-full max-w-[1400px] px-6 sm:px-10 lg:px-20">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 sm:gap-12 lg:gap-8 w-full">
              {[...Array(5)].map((_, idx) => (
                <div key={idx} className="text-center flex flex-col items-center animate-pulse">
                  <div className="w-24 h-12 bg-slate-200 rounded mb-3" />
                  <div className="w-32 h-4 bg-slate-200 rounded" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="stats" className="relative w-full flex flex-col bg-[#f8f9fa]">
      <div className="relative flex-1 flex items-center justify-center py-10" ref={statsSectionRef}>
        <div className="w-full max-w-[1400px] px-6 sm:px-10 lg:px-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 sm:gap-12 lg:gap-8 w-full">
            {statsData.map((stat, index) => (
              <div key={stat.key} className="text-center group flex flex-col items-center">
                <div className="relative w-full flex flex-col items-center">
                  <div className="flex items-baseline justify-center gap-3">
                    <span className="font-extrabold text-slate-900 text-5xl sm:text-6xl lg:text-7xl leading-[0.9] tracking-tighter">
                      <span className="flex items-baseline gap-1">
                        <span>{counts[index]?.toLocaleString() ?? 0}</span>
                        <span className="text-3xl sm:text-4xl lg:text-5xl text-slate-900">+</span>
                      </span>
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
