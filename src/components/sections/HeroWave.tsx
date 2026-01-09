import React from "react";
import { cn } from "../../lib/utils";

type HeroWaveProps = {
  className?: string;
  backgroundColor?: string;
};

export const HeroWave = ({ className, backgroundColor = "#f8f9fa" }: HeroWaveProps): JSX.Element => {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-x-0 bottom-0 overflow-hidden leading-[0]",
        className,
      )}
    >
      <svg className="w-full h-[140px]" viewBox="0 0 1440 140" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="hero-wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f8f9fa" />
            <stop offset="70%" stopColor="#e4f2f8" />
            <stop offset="100%" stopColor="#d5e8f2" />
          </linearGradient>
          <filter id="hero-wave-blur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        <path
          d="M0 70c120-10 360-5 600 15s420-50 840-20 360 30 600 5V140H0Z"
          fill="url(#hero-wave-gradient)"
          filter="url(#hero-wave-blur)"
        />
      </svg>
      <div
        className="absolute inset-x-0 bottom-0 h-20"
        style={{
          background: `linear-gradient(to top, ${backgroundColor}, rgba(255,255,255,0))`,
        }}
      />
      <div
        className="absolute inset-x-0 -bottom-4 h-12 opacity-60"
        style={{
          background: "radial-gradient(circle at top, rgba(255,255,255,0.8), transparent 65%)",
        }}
      />
    </div>
  );
};
