import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "../../../../components/ui/card";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

const sectorCards = [
  {
    id: 1,
    image: "/downloads/mjlob7k1SeIJX4/img/mask-group.png",
    title: "Hydropower",
    description: "Generation planning, design, and delivery.",
  },
  {
    id: 2,
    image: "/downloads/mjlob7k1SeIJX4/img/mask-group-1.png",
    title: "Tunnel",
    description: "Geotechnical analysis and tunnel alignment.",
  },
  {
    id: 3,
    image: "/downloads/mjlob7k1SeIJX4/img/mask-group.png",
    title: "Transmission Line",
    description: "Line routing and structural design.",
  },
  {
    id: 4,
    image: "/downloads/mjlob7k1SeIJX4/img/mask-group-2.png",
    title: "Road",
    description: "Roadway planning and site connectivity.",
  },
  {
    id: 5,
    image: "/downloads/mjlob7k1SeIJX4/img/mask-group-3.png",
    title: "Environment",
    description: "Impact studies and mitigation planning.",
  },
  {
    id: 6,
    image: "/downloads/mjlob7k1SeIJX4/img/mask-group-4.png",
    title: "Irrigation & Water Resources",
    description: "Resource allocation and system design.",
  },
];

export const HeroSection = (): JSX.Element => {
  const [activeIndex, setActiveIndex] = useState(0);
  const totalCards = sectorCards.length;
  const positions = [-2, -1, 0, 1, 2];
  const navigate = useNavigate();

  const handleCardClick = (title: string) => {
    navigate(`/services?sector=${encodeURIComponent(title)}`);
  };

  return (
    <section className="relative w-full py-8 bg-[url(/downloads/mjlob7k1SeIJX4/img/vector-3.svg)] bg-cover bg-center">
      <div className="w-full px-0">
        <div className="flex items-center justify-center mb-12 translate-y-[-1rem] animate-fade-in opacity-0">
          <div className="inline-flex h-9 items-center justify-center rounded-full border border-[#111111] px-5">
            <span className="[font-family:'Montserrat',Helvetica] text-sm font-semibold tracking-[0.12em] text-[#444444]">
              SECTORS OF SERVICES
            </span>
          </div>
        </div>

        <div className="relative mx-auto min-h-[420px] sm:min-h-[520px] max-w-[1200px] overflow-visible">
          {positions.map((position) => {
            const cardIndex = (activeIndex + position + totalCards) % totalCards;
            const sector = sectorCards[cardIndex];
            const isActive = position === 0;
            const translateX = position * 200;
            const cardScale = isActive ? 1.08 : 1;
            return (
              <Card
                key={`${sector.id}-${position}`}
                onClick={() => handleCardClick(sector.title)}
                role="button"
                tabIndex={0}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    handleCardClick(sector.title);
                  }
                }}
                aria-label={`View ${sector.title} services`}
                className={`absolute left-1/2 top-1/2 w-[220px] sm:w-[240px] lg:w-[260px] -translate-x-1/2 -translate-y-1/2 overflow-hidden border-0 bg-transparent shadow-[0_20px_40px_rgba(0,0,0,0.18)] transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform cursor-pointer ${
                  "pointer-events-auto"
                }`}
                style={
                  {
                    transform: `translate(-50%, -50%) translateX(${translateX}px) scale(${cardScale})`,
                    opacity: 1,
                    zIndex: isActive ? 5 : 4 - Math.abs(position),
                  } as React.CSSProperties
                }
              >
                <CardContent className="p-0 relative">
                  <div className="relative aspect-[4/5]">
                    <img className="w-full h-full object-cover" alt={sector.title} src={sector.image} />
                    <div className="absolute inset-0 flex flex-col justify-end p-5 bg-gradient-to-t from-black/75 via-black/35 to-transparent">
                      <h3 className="[font-family:'Inter',Helvetica] font-semibold text-white text-lg tracking-[0] leading-tight mb-2">
                        {sector.title}
                      </h3>
                      <p className="[font-family:'Inter',Helvetica] font-normal text-white/90 text-[13px] tracking-[0] leading-[18px]">
                        {sector.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
        <div className="mt-2 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => setActiveIndex((prev) => (prev - 1 + totalCards) % totalCards)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d7d7d7] bg-transparent text-[#111111] shadow-none transition-colors hover:border-[#0070c0] hover:text-[#0070c0]"
            aria-label="Previous sector"
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => setActiveIndex((prev) => (prev + 1) % totalCards)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d7d7d7] bg-transparent text-[#111111] shadow-none transition-colors hover:border-[#0070c0] hover:text-[#0070c0]"
            aria-label="Next sector"
          >
            <ChevronRightIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
