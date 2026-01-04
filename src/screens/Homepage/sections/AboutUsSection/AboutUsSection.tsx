import React from "react";

const historyParagraphs = [
  "IQ organic solutions is pioneer to be Pakistan no.1 organic",
  "product brand incorporating various segments of skin, hair",
  "and overall beauty range. The brand has been changing the",
  "organic product market since 2019, clinically validated and",
  "registered by Pakistan council of scientific and industrial",
  "research PCSIR and Drug regulatory authority of Pakistan DRAP.",
  "Tracing back to its history, IQ Organics first product was",
  'launched back in 2019 embarking the brand name "IQ Organic Solution".',
];

const whyUsParagraphs = [
  "Organic Skin and Hair Care | Organic and natural ingredients,",
  "no synthetic fragrances Eco-Friendly | MADE SAFE and Certified",
  "ingredients, non-Paraben, gluten-free that are Skin and Hair",
  "friendly.",
];

export const AboutUsSection = (): JSX.Element => {
  return (
    <section id="about-us" className="relative w-full pt-[5.5rem] pb-[5.5rem] bg-white">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,560px)_1fr] gap-10 lg:gap-16 items-start">
          <div className="relative w-full translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">
            <div className="relative w-full aspect-[586/614]">
              <img
                className="w-full h-full object-cover"
                style={{
                  WebkitMaskImage: "url(/downloads/mjlob7k1SeIJX4/img/group-2.png)",
                  maskImage: "url(/downloads/mjlob7k1SeIJX4/img/group-2.png)",
                  WebkitMaskSize: "100% 100%",
                  maskSize: "100% 100%",
                  WebkitMaskRepeat: "no-repeat",
                  maskRepeat: "no-repeat",
                }}
                alt="About TAC Hydro"
                src="/downloads/mjlob7k1SeIJX4/img/image-3-1.png"
              />
            </div>
          </div>

          <div className="flex flex-col space-y-8 translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:400ms]">
            <h2 className="[font-family:'Playfair_Display',Helvetica] font-semibold italic text-[#111111] text-3xl sm:text-4xl lg:text-[42px] tracking-[0] leading-[1.1]">
              About Us
            </h2>

            <div className="space-y-3">
              <h3 className="[font-family:'Inter',Helvetica] font-bold text-[#111111] text-lg tracking-[0] leading-normal">
                History
              </h3>
              <div className="space-y-2">
                {historyParagraphs.map((paragraph, index) => (
                  <p
                    key={index}
                    className="[font-family:'Inter',Helvetica] font-normal text-[#555555] text-sm sm:text-[15px] tracking-[0] leading-[22px]"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="[font-family:'Inter',Helvetica] font-bold text-[#111111] text-lg tracking-[0] leading-normal">
                Why Us
              </h3>
              <div className="space-y-2">
                {whyUsParagraphs.map((paragraph, index) => (
                  <p
                    key={index}
                    className="[font-family:'Inter',Helvetica] font-normal text-[#555555] text-sm sm:text-[15px] tracking-[0] leading-[22px]"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
