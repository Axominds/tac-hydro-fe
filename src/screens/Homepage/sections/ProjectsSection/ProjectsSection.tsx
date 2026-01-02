import React from "react";

const projectSlide = {
  image: "/reference/ref_projectDEV.png",
  title: "Project Development",
  description:
    "TAC Hydro Consultancy Pvt. Ltd. is a leading engineering consultancy based in Nepal, specializing in hydropower and infrastructure development (...)",
};

export const ProjectsSection = (): JSX.Element => {
  return (
    <section className="relative w-screen h-[520px] overflow-hidden">
      <div className="absolute inset-0 h-full w-full">
        <img
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          alt={projectSlide.title}
          src={projectSlide.image}
        />
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />

        <div className="relative z-10 h-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-20 flex flex-col justify-center">
          <div className="max-w-[680px]">
            <span className="[font-family:'Montserrat',Helvetica] text-sm font-semibold uppercase tracking-[0.3em] text-white/80">
              P
            </span>
            <h2 className="[font-family:'Playfair_Display',Helvetica] font-semibold italic text-white text-[44px] tracking-[0] leading-[1.1] mb-3">
              {projectSlide.title}
            </h2>
            <p className="[font-family:'Inter',Helvetica] font-normal text-white text-[16px] tracking-[0] leading-[24px]">
              {projectSlide.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
