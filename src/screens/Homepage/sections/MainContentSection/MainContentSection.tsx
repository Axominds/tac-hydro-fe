import React from "react";

export const MainContentSection = (): JSX.Element => {
  return (
    <section className="w-full relative py-12">
      <div className="max-w-[997px] mx-auto px-4">
        <h1 className="[font-family:'Montserrat',Helvetica] font-bold text-white text-[52px] tracking-[0] leading-[normal] mb-6 translate-y-[-1rem] animate-fade-in opacity-0">
          Empowering Sustainable Resources <br />
          Through Engineering Excellence
        </h1>

        <div className="inline-block translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">
          <span className="[font-family:'Montserrat',Helvetica] font-bold text-white text-[52px] tracking-[0] leading-[normal] underline">
            Innovate
          </span>
        </div>
      </div>
    </section>
  );
};
