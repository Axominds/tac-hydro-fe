import React from "react";

const testimonialData = {
  title: "Project Development",
  description:
    "TAC Hydro Consultancy Pvt. Ltd. is a leading engineering consultancy based in Nepal, specializing in hydropower and infrastructure development (...)",
  backgroundImage: "/downloads/mjlob7k1SeIJX4/img/rectangle-213.png",
  totalSlides: 5,
  currentSlide: 2,
};

export const TestimonialsSection = (): JSX.Element => {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative w-full h-[851px]">
        <img
          className="absolute w-full h-full top-0 left-0 object-cover"
          alt="Background pattern"
          src="/downloads/mjlob7k1SeIJX4/img/vector-1.png"
        />

        <div className="absolute w-full h-[68.91%] top-[23.67%] left-0">
          <img
            className="absolute w-full h-full top-0 left-0 object-cover"
            alt="Vector overlay"
            src="/downloads/mjlob7k1SeIJX4/img/vector-4.svg"
          />

          <div className="absolute inset-0 w-[95.05%] h-[99.97%]">
            <img
              className="absolute w-full h-full top-0 left-0 object-cover"
              alt="Project background"
              src={testimonialData.backgroundImage}
            />

            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
          </div>

          <div className="absolute w-full h-full top-0 left-0 flex flex-col justify-center px-16">
            <div className="max-w-[653px] translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">
              <h2 className="[font-family:'Playfair_Display',Helvetica] font-bold italic text-white text-[44px] leading-[1.2] mb-6">
                {testimonialData.title}
              </h2>

              <p className="[font-family:'Inter',Helvetica] font-normal text-[#ededed] text-base leading-[1.5] max-w-[585px] translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:400ms]">
                {testimonialData.description}
              </p>
            </div>
          </div>

          <div className="absolute bottom-[4.58%] left-1/2 -translate-x-1/2 flex gap-2 translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:600ms]">
            {Array.from({ length: testimonialData.totalSlides }).map((_, index) => (
              <button
                key={index}
                type="button"
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === testimonialData.currentSlide
                    ? "bg-white"
                    : "bg-white/40 hover:bg-white/60"
                }`}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={index === testimonialData.currentSlide ? "true" : "false"}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
