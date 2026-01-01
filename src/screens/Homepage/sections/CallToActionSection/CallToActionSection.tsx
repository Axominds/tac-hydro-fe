import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";

const missionVisionCards = [
  {
    title: "Mission",
    description: [
      "Deliver organic solutions that are clinically",
      "trusted, eco-friendly, and genuinely effective.",
    ],
    iconSrc: "/downloads/mjlob7k1SeIJX4/img/vector-5.svg",
  },
  {
    title: "Vision",
    description: [
      "Become the most trusted organic wellness brand",
      "by inspiring healthier routines worldwide.",
    ],
    iconSrc: "/downloads/mjlob7k1SeIJX4/img/vector-27.svg",
  },
];

export const CallToActionSection = (): JSX.Element => {
  return (
    <section className="relative w-full py-24 bg-[url(/downloads/mjlob7k1SeIJX4/img/vector-3.svg)] bg-cover bg-center">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">
            <div className="relative">
              <img
                className="w-full h-auto rounded-lg shadow-lg"
                alt="Team collaboration"
                src="/downloads/mjlob7k1SeIJX4/img/mask-group-2.png"
              />
              <img
                className="absolute top-0 left-0 w-full h-full pointer-events-none"
                alt=""
                aria-hidden="true"
                src="/downloads/mjlob7k1SeIJX4/img/vector-23.svg"
              />
              <img
                className="absolute top-[12%] right-[-10%] w-[45%] h-auto pointer-events-none"
                alt=""
                aria-hidden="true"
                src="/downloads/mjlob7k1SeIJX4/img/vector-10.svg"
              />
            </div>
          </div>

          <div className="relative translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:400ms]">
            <div className="mb-8">
              <div className="relative inline-block mb-4">
                <img
                  className="w-auto h-6"
                  alt=""
                  aria-hidden="true"
                  src="/downloads/mjlob7k1SeIJX4/img/vector-18.svg"
                />
                <div className="absolute top-2 left-3 [text-shadow:0px_0px_4px_#00000040] [-webkit-text-stroke:1px_#000000] [font-family:'Inter',Helvetica] font-bold italic text-[#2b2b2b] text-xs text-center tracking-[0] leading-[normal]">
                  MISSION &amp; VISION
                </div>
              </div>

              <h2 className="[font-family:'Playfair_Display',Helvetica] font-bold italic text-[#111111] text-4xl lg:text-[46px] tracking-[0] leading-tight mb-2">
                Guided by Purpose,
              </h2>
              <h2 className="[font-family:'Playfair_Display',Helvetica] font-bold italic text-[#111111] text-4xl lg:text-[46px] tracking-[0] leading-tight mb-6">
                Built for Impact.
              </h2>

              <div className="mb-8">
                <p className="[font-family:'Inter',Helvetica] font-normal text-[#555555] text-base tracking-[0] leading-normal">
                  We create meaningful experiences through organic,
                </p>
                <p className="[font-family:'Inter',Helvetica] font-normal text-[#555555] text-base tracking-[0] leading-normal">
                  safe, and sustainable choices—designed for real life.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {missionVisionCards.map((card, index) => (
                <Card
                  key={card.title}
                  className="shadow-[-10px_9px_4px_#00000040] border-0 translate-y-[-1rem] animate-fade-in opacity-0"
                  style={
                    {
                      "--animation-delay": `${600 + index * 200}ms`,
                    } as React.CSSProperties
                  }
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center">
                        <img className="w-8 h-8" alt={`${card.title} icon`} src={card.iconSrc} />
                      </div>
                      <div className="flex-1">
                        <h3 className="[font-family:'Inter',Helvetica] font-bold italic text-[#111111] text-lg tracking-[0] leading-normal mb-3">
                          {card.title}
                        </h3>
                        <div className="space-y-1">
                          {card.description.map((line, lineIndex) => (
                            <p
                              key={lineIndex}
                              className="[font-family:'Inter',Helvetica] font-normal text-[#555555] text-sm tracking-[0] leading-normal"
                            >
                              {line}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
