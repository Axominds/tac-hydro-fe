"use client";

import { useState, useRef } from "react";
import { Card, CardContent } from "../ui/card";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useServiceSectors } from "../../hooks/useServiceSectors";

export const SectorsOfServicesSection = () => {
  const { data: sectors, isLoading } = useServiceSectors();
  const [activeIndex, setActiveIndex] = useState(0);
  const dragStart = useRef(0);
  const dragCurrent = useRef(0);
  const isDragging = useRef(false);

  if (isLoading) {
    return (
      <section id="sectors-of-services" className="relative w-full min-h-screen flex items-center justify-center py-12 bg-[#f8f9fa]">
        <div className="animate-pulse text-slate-400">Loading sectors...</div>
      </section>
    );
  }

  if (!sectors?.length) {
    return (
      <section id="sectors-of-services" className="relative w-full bg-[#f8f9fa] min-h-[50vh] flex items-center justify-center py-16 lg:py-24">
        <div className="flex flex-col items-center justify-center py-32 px-4 bg-white rounded-[40px] border border-dashed border-slate-200 animate-fade-in max-w-lg mx-4">
          <div className="w-16 h-16 mb-6 flex items-center justify-center rounded-3xl bg-slate-50 text-blue-600">
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">No Sectors Found</h3>
          <p className="text-slate-500 text-center max-w-sm mb-8 leading-relaxed">
            We're currently preparing information about our service sectors. Check back soon for updates.
          </p>
        </div>
      </section>
    );
  }

  const totalCards = sectors.length;
  const positions = [-2, -1, 0, 1, 2];

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    isDragging.current = true;
    const clientX = "touches" in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    dragStart.current = clientX;
    dragCurrent.current = clientX;
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging.current) return;
    const clientX = "touches" in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    dragCurrent.current = clientX;
  };

  const handleDragEnd = () => {
    if (!isDragging.current) return;
    const diff = dragCurrent.current - dragStart.current;
    const threshold = 50;

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        setActiveIndex((prev) => (prev - 1 + totalCards) % totalCards);
      } else {
        setActiveIndex((prev) => (prev + 1) % totalCards);
      }
    }
    isDragging.current = false;
  };

  const handleCardClick = (index: number) => {
    const diff = Math.abs(dragCurrent.current - dragStart.current);
    if (diff < 10) {
      setActiveIndex(index);
    }
  };

  return (
    <section
      id="sectors-of-services"
      className="relative w-full min-h-screen flex items-center justify-center py-12 bg-[#f8f9fa] overflow-hidden"
    >
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg
          className="w-full h-full"
          viewBox="0 0 1440 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 600C200 500 400 700 600 600C800 500 1000 700 1200 600C1400 500 1600 700 1800 600"
            stroke="#0070c0"
            strokeWidth="2"
          />
          <path
            d="M0 400C200 300 400 500 600 400C800 300 1000 500 1200 400C1400 300 1600 500 1800 400"
            stroke="#0070c0"
            strokeWidth="1"
          />
        </svg>
      </div>

      <div className="relative mx-auto max-w-[1400px] px-6">
        <div className="flex flex-col items-center mb-8 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-bold leading-tight text-slate-900">
            Sectors of Services
          </h1>
        </div>

        <div
          className="relative h-[480px] sm:h-[580px] w-full flex items-center justify-center perspective-[1000px] cursor-grab active:cursor-grabbing"
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
        >
          {positions.map((position) => {
            const cardIndex = (activeIndex + position + totalCards) % totalCards;
            const sector = sectors[cardIndex];
            const isActive = position === 0;
            const isVisible = Math.abs(position) <= 2;

            if (!isVisible) return null;

            const translateX = position * 280;
            const scale = isActive ? 1.1 : 0.85;
            const opacity = 1 - Math.abs(position) * 0.3;
            const zIndex = 10 - Math.abs(position);

            return (
              <div
                key={`${sector.id}-${position}`}
                className="absolute transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"
                onClick={() => handleCardClick(cardIndex)}
                style={{
                  transform: `translateX(calc(${translateX}px - 50%)) scale(${scale})`,
                  opacity: opacity,
                  zIndex: zIndex,
                  left: "50%",
                  top: "50%",
                  marginTop: "-240px",
                }}
              >
                <Card className="w-[280px] sm:w-[320px] h-[400px] sm:h-[480px] overflow-hidden border-0 shadow-2xl rounded-[32px] group cursor-pointer">
                  <CardContent className="p-0 h-full relative">
                    <img
                      className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ${isActive ? "scale-110" : "group-hover:scale-110"}`}
                      alt={sector.title}
                      src={sector.image || "/placeholder.svg"}
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent flex flex-col justify-end p-10">
                      <div
                        className={`transform transition-all duration-500 ${isActive ? "translate-y-0" : "translate-y-4 group-hover:translate-y-0"}`}
                      >
                        <h3 className="text-2xl font-bold text-white mb-2">{sector.title}</h3>
                        <div
                          className={`grid transition-all duration-500 ${isActive ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] group-hover:grid-rows-[1fr] opacity-0 group-hover:opacity-100"}`}
                        >
                          <p className="text-white/80 text-sm leading-relaxed overflow-hidden">
                            {sector.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex items-center justify-center gap-6">
          <button
            type="button"
            onClick={() => setActiveIndex((prev) => (prev - 1 + totalCards) % totalCards)}
            className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-slate-200 bg-white text-slate-900 shadow-sm transition-all hover:border-blue-600 hover:text-blue-600 hover:shadow-lg active:scale-95"
          >
            <ChevronLeftIcon className="h-6 w-6" />
          </button>
          <div className="flex gap-2">
            {sectors.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveIndex(i)}
                className={`h-2 rounded-full transition-all duration-300 ${i === activeIndex ? "w-8 bg-blue-600" : "w-2 bg-slate-300 hover:bg-slate-400"}`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => setActiveIndex((prev) => (prev + 1) % totalCards)}
            className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-slate-200 bg-white text-slate-900 shadow-sm transition-all hover:border-blue-600 hover:text-blue-600 hover:shadow-lg active:scale-95"
          >
            <ChevronRightIcon className="h-6 w-6" />
          </button>
        </div>
      </div>
    </section>
  );
};
