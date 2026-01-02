import React, { useEffect, useMemo, useState } from "react";

const slides = [
  "/downloads/mjlob7k1SeIJX4/img/rectangle-213.png",
  "/downloads/mjlob7k1SeIJX4/img/mask-group-4.png",
  "/downloads/mjlob7k1SeIJX4/img/mask-group-5.png",
  "/downloads/mjlob7k1SeIJX4/img/mask-group-6.png",
  "/downloads/mjlob7k1SeIJX4/img/rectangle-218.png",
];

export const TestimonialsSection = (): JSX.Element => {
  const [activeIndex, setActiveIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const sliderImages = useMemo(() => {
    const first = slides[0];
    const last = slides[slides.length - 1];
    return [last, ...slides, first];
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIsTransitioning(true);
      setActiveIndex((prev) => prev + 1);
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative w-screen h-[520px]">
        <div
          className={`absolute inset-0 flex h-full w-full ${
            isTransitioning ? "transition-transform duration-300 ease-in-out" : ""
          }`}
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          onTransitionEnd={() => {
            if (activeIndex === sliderImages.length - 1) {
              setIsTransitioning(false);
              setActiveIndex(1);
              window.requestAnimationFrame(() => setIsTransitioning(true));
            }

            if (activeIndex === 0) {
              setIsTransitioning(false);
              setActiveIndex(slides.length);
              window.requestAnimationFrame(() => setIsTransitioning(true));
            }
          }}
        >
          {sliderImages.map((slide, index) => (
            <div key={`${slide}-${index}`} className="relative h-full w-full flex-shrink-0">
              <img
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                alt="Project development"
                src={slide}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 pointer-events-none" />

              <div className="relative z-10 h-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-20 flex flex-col justify-center">
                <div className="max-w-[653px]">
                  <h2 className="[font-family:'Playfair_Display',Helvetica] font-bold italic text-white text-[44px] leading-[1.2] mb-6">
                    Project Development
                  </h2>

                  <p className="[font-family:'Inter',Helvetica] font-normal text-[#ededed] text-base leading-[1.5] max-w-[585px]">
                    TAC Hydro Consultancy Pvt. Ltd. is a leading engineering consultancy based in
                    Nepal, specializing in hydropower and infrastructure development (...)
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {slides.map((_, index) => (
            <button
              key={`testimonial-dot-${index}`}
              type="button"
              onClick={() => {
                setIsTransitioning(true);
                setActiveIndex(index + 1);
              }}
              className={`w-3 h-3 rounded-full transition-colors ${
                index + 1 === activeIndex ? "bg-white" : "bg-white/40 hover:bg-white/60"
              }`}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index + 1 === activeIndex ? "true" : "false"}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
