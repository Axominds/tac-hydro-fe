import React from "react";
import { Button } from "../../../../../components/ui/button";

export const ServicesSection = (): JSX.Element => {
  return (
    <section className="relative w-full border border-solid border-black shadow-[0px_4px_4px_#00000040,0px_4px_4px_#00000040]">
      <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 px-6 lg:px-16 py-12 lg:py-20">
        <div className="flex-shrink-0 translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:0ms]">
          <img
            className="w-full max-w-[566px] h-auto"
            alt="Consultation illustration"
            src="/downloads/mjlob7k1SeIJX4/img/vector.png"
          />
        </div>

        <div className="flex flex-col gap-6 max-w-2xl">
          <div className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">
            <p className="font-normal text-[#6b8f7b] text-xs leading-[normal] uppercase">
              SCHEDULE A CONSULTATION TODAY
            </p>
          </div>

          <div className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:400ms]">
            <h2 className="font-bold text-[#1f3d2b] text-4xl leading-[normal]">
              Start Your Journey To
              <br />
              Talent Excellence
            </h2>
          </div>

          <div className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:600ms]">
            <p className="font-normal text-[#5f6f66] text-sm leading-[normal]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              <br />
              Ut elit tellus, luctus nec ullamcorper mattis.
            </p>
          </div>

          <div className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:800ms]">
            <Button className="h-auto bg-[#6b8f7b] hover:bg-[#5a7a68] text-white px-8 py-3 rounded-md transition-colors font-bold text-sm">
              Get A Quote →
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
