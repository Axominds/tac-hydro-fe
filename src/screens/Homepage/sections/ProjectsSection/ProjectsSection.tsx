import React, { useEffect, useMemo, useState } from "react";

const slides = [
  {
    image: "/ref_projects.png",
    title: "Project Development",
    description:
      "TAC Hydro Consultancy Pvt. Ltd. is a leading engineering consultancy based in Nepal, specializing in hydropower and infrastructure development (...)",
  },
  {
    image: "/downloads/mjlob7k1SeIJX4/img/mask-group-4.png",
    title: "Project Development",
    description:
      "TAC Hydro Consultancy Pvt. Ltd. is a leading engineering consultancy based in Nepal, specializing in hydropower and infrastructure development (...)",
  },
  {
    image: "/downloads/mjlob7k1SeIJX4/img/mask-group-5.png",
    title: "Project Development",
    description:
      "TAC Hydro Consultancy Pvt. Ltd. is a leading engineering consultancy based in Nepal, specializing in hydropower and infrastructure development (...)",
  },
  {
    image: "/downloads/mjlob7k1SeIJX4/img/mask-group-6.png",
    title: "Project Development",
    description:
      "TAC Hydro Consultancy Pvt. Ltd. is a leading engineering consultancy based in Nepal, specializing in hydropower and infrastructure development (...)",
  },
  {
    image: "/downloads/mjlob7k1SeIJX4/img/rectangle-218.png",
    title: "Project Development",
    description:
      "TAC Hydro Consultancy Pvt. Ltd. is a leading engineering consultancy based in Nepal, specializing in hydropower and infrastructure development (...)",
  },
];

export const ProjectsSection = (): JSX.Element => {
  const [activeIndex, setActiveIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const sliderImages = useMemo(() => {
    const first = slides[0];
    const last = slides[slides.length - 1];
    return [last, ...slides, first];
  }, []);
  const lastCloneIndex = sliderImages.length - 1;

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsTransitioning(true);
      setActiveIndex((prev) => prev + 1);
    }, 4000);

    return () => window.clearTimeout(timer);
  }, [activeIndex]);

  return (
    <section className="relative w-screen h-[520px] overflow-hidden">
      <div
        className={`absolute inset-0 flex h-full w-full ${
          isTransitioning ? "transition-transform duration-[500ms] ease-in-out" : ""
        }`}
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        onTransitionEnd={() => {
          if (activeIndex === lastCloneIndex) {
            setIsTransitioning(false);
            setActiveIndex(1);
            window.requestAnimationFrame(() => {
              window.requestAnimationFrame(() => setIsTransitioning(true));
            });
          }
        }}
      >
        {sliderImages.map((slide, index) => (
          <div key={`${slide.image}-${index}`} className="relative h-full w-full flex-shrink-0">
            <img
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              alt={slide.title}
              src={slide.image}
            />
            <div className="absolute inset-0 bg-black/40 pointer-events-none" />

            <div className="relative z-10 h-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-20 flex flex-col justify-center">
              <div className="max-w-[680px]">
                <h2 className="[font-family:'Playfair_Display',Helvetica] font-semibold italic text-white text-[44px] tracking-[0] leading-[1.1] mb-3">
                  {slide.title}
                </h2>
                <p className="[font-family:'Inter',Helvetica] font-normal text-white text-[16px] tracking-[0] leading-[24px]">
                  {slide.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 z-20">
        {slides.map((_, index) => (
          <button
            key={`dot-${index}`}
            type="button"
            aria-label={`Go to slide ${index + 1}`}
            onClick={() => {
              setIsTransitioning(true);
              setActiveIndex(index + 1);
            }}
            className={`h-3 w-3 rounded-full transition-colors ${
              index + 1 === activeIndex ? "bg-white" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
};
