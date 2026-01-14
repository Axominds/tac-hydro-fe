import React from "react";

export const MainContentSection = (): JSX.Element => {
  return (
    <section className="w-full relative py-12">
      <div className="max-w-[997px] mx-auto px-4">
        <h1 className="font-bold text-white text-[52px] leading-[normal] mb-6 translate-y-[-1rem] animate-fade-in opacity-0">
          Empowering Sustainable Resources Through Engineering Excellence
        </h1>

        <div className="inline-block translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">
          <span className="font-bold text-white text-[52px] leading-[normal] underline">
            Innovate
          </span>
        </div>
      </div>
    </section>
  );
};
