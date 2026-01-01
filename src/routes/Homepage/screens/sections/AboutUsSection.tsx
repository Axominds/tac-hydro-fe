import React from "react";

export const AboutUsSection = (): JSX.Element => {
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

  return (
    <section className="relative w-full bg-[url(/downloads/mjlodvw6RB1obD/img/vector-3.svg)] bg-[100%_100%] py-[190px]">
      <div className="container mx-auto px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="relative">
            <div className="relative w-full max-w-[586px] h-[614px] bg-[url(/downloads/mjlodvw6RB1obD/img/group-2.png)] bg-[100%_100%]">
              <img
                className="w-full h-full rounded-[10px] object-cover"
                alt="About IQ Organic Solutions"
                src="/downloads/mjlodvw6RB1obD/img/image-3-1.png"
              />
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <h2 className="[font-family:'Playfair_Display',Helvetica] font-bold italic text-[#111111] text-5xl tracking-[0] leading-[normal]">
              About Us
            </h2>

            <div className="flex flex-col gap-4">
              <h3 className="[font-family:'Inter',Helvetica] font-bold italic text-[#111111] text-xl tracking-[0] leading-[normal]">
                History
              </h3>
              <div className="flex flex-col gap-[3px]">
                {historyParagraphs.map((paragraph, index) => (
                  <p
                    key={index}
                    className="[font-family:'Inter',Helvetica] font-normal text-[#555555] text-[15px] tracking-[0] leading-[normal]"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="[font-family:'Inter',Helvetica] font-bold italic text-[#111111] text-xl tracking-[0] leading-[normal]">
                Why Us
              </h3>
              <div className="flex flex-col gap-[3px]">
                {whyUsParagraphs.map((paragraph, index) => (
                  <p
                    key={index}
                    className="[font-family:'Inter',Helvetica] font-normal text-[#555555] text-[15px] tracking-[0] leading-[normal]"
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
