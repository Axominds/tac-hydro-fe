import React from "react";

export const CallToActionSection = (): JSX.Element => {
  return (
    <section className="relative w-full py-20 bg-white">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-[520px_1fr] gap-12 items-center">
          <div className="relative">
            <img
              className="w-full h-auto rounded-[14px]"
              alt="Mission and Vision"
              src="/downloads/mjlob7k1SeIJX4/img/mask-group-2.png"
            />
          </div>

          <div>
            <div className="mission-panel">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white shadow-[0_4px_8px_rgba(0,0,0,0.12)] text-[11px] tracking-[0.08em] font-semibold [font-family:'Inter',Helvetica] text-[#2b2b2b] mb-6">
                MISSION &amp; VISION
              </div>

              <h2 className="[font-family:'Playfair_Display',Helvetica] font-bold italic text-[#1b1b1b] text-[40px] leading-[1.12] mb-2">
                Guided by Purpose,
              </h2>
              <h2 className="[font-family:'Playfair_Display',Helvetica] font-bold italic text-[#1b1b1b] text-[40px] leading-[1.12] mb-4">
                Built for Impact.
              </h2>

              <p className="[font-family:'Inter',Helvetica] font-normal text-[#5a5a5a] text-base leading-[24px] max-w-[520px] mb-7">
                We create meaningful experiences through organic, safe, and sustainable
                choices—designed for real life.
              </p>

              <div className="space-y-5">
                <div className="flex items-start gap-4 rounded-[18px] bg-white px-6 py-5 shadow-[0_12px_18px_rgba(0,0,0,0.12)]">
                  <span className="w-11 h-11 rounded-full bg-[#bfe5d3] flex items-center justify-center text-[#2f3a35] font-semibold">
                    <svg
                      className="w-6 h-6 text-[#2f3a35]"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </span>
                  <div>
                    <h3 className="[font-family:'Inter',Helvetica] font-semibold text-[#111111] text-lg mb-1">
                      Mission
                    </h3>
                    <p className="[font-family:'Inter',Helvetica] font-normal text-[#5a5a5a] text-sm leading-[20px]">
                      Deliver organic solutions that are clinically trusted, eco-friendly, and
                      genuinely effective.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-[18px] bg-white px-6 py-5 border border-[#1f1f1f] shadow-[0_12px_18px_rgba(0,0,0,0.1)]">
                  <span className="w-11 h-11 rounded-full bg-[#bfe5d3] flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-[#2f3a35]"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="12" cy="12" r="3" />
                      <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z" />
                    </svg>
                  </span>
                  <div>
                    <h3 className="[font-family:'Inter',Helvetica] font-semibold text-[#111111] text-lg mb-1">
                      Vision
                    </h3>
                    <p className="[font-family:'Inter',Helvetica] font-normal text-[#5a5a5a] text-sm leading-[20px]">
                      Become the most trusted organic wellness brand by inspiring healthier
                      routines worldwide.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
