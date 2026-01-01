import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";

export const CallToActionSection = (): JSX.Element => {
  const missionVisionData = [
    {
      title: "Mission",
      icon: "/downloads/mjlodvw6RB1obD/img/vector-5.svg",
      description: [
        "Deliver organic solutions that are clinically",
        "trusted, eco-friendly, and genuinely effective.",
      ],
    },
    {
      title: "Vision",
      icon: "/downloads/mjlodvw6RB1obD/img/vector-27.svg",
      description: [
        "Become the most trusted organic wellness brand",
        "by inspiring healthier routines worldwide.",
      ],
    },
  ];

  return (
    <section className="relative w-full bg-[url(/downloads/mjlodvw6RB1obD/img/vector-3.svg)] bg-[100%_100%] py-[150px]">
      <div className="relative w-[83.33%] mx-auto">
        <img
          className="absolute w-full h-[98.25%] top-0 left-0"
          alt=""
          aria-hidden="true"
          src="/downloads/mjlodvw6RB1obD/img/vector-23.svg"
        />

        <img
          className="absolute w-[38.33%] h-[73.68%] top-[12.28%] left-[56.67%]"
          alt=""
          aria-hidden="true"
          src="/downloads/mjlodvw6RB1obD/img/vector-10.svg"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative">
          <div className="relative">
            <img
              className="w-full max-w-[520px] h-auto"
              alt="Team collaboration"
              src="/downloads/mjlodvw6RB1obD/img/mask-group-2.png"
            />
          </div>

          <div className="relative space-y-6">
            <div className="relative">
              <img
                className="w-[27.27%] h-auto mb-2"
                alt=""
                aria-hidden="true"
                src="/downloads/mjlodvw6RB1obD/img/vector-18.svg"
              />

              <div className="[text-shadow:0px_0px_4px_#00000040] [-webkit-text-stroke:1px_#000000] [font-family:'Inter',Helvetica] font-bold italic text-[#2b2b2b] text-xs tracking-[0] leading-[normal] mb-4">
                MISSION &amp; VISION
              </div>

              <h2 className="[font-family:'Playfair_Display',Helvetica] font-bold italic text-[#111111] text-[46px] tracking-[0] leading-[normal]">
                Guided by Purpose,
              </h2>

              <h2 className="[font-family:'Playfair_Display',Helvetica] font-bold italic text-[#111111] text-[46px] tracking-[0] leading-[normal] mb-6">
                Built for Impact.
              </h2>

              <div className="space-y-1 mb-8">
                <p className="[font-family:'Inter',Helvetica] font-normal text-[#555555] text-base tracking-[0] leading-[normal]">
                  We create meaningful experiences through organic,
                </p>
                <p className="[font-family:'Inter',Helvetica] font-normal text-[#555555] text-base tracking-[0] leading-[normal]">
                  safe, and sustainable choices—designed for real life.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {missionVisionData.map((item, index) => (
                <Card
                  key={index}
                  className={`shadow-[-10px_9px_4px_#00000040] ${index === 0 ? "bg-white" : "bg-white"}`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center">
                        <img className="w-full h-auto" alt={`${item.title} icon`} src={item.icon} />
                      </div>
                      <div className="flex-1">
                        <h3 className="[font-family:'Inter',Helvetica] font-bold italic text-[#111111] text-lg tracking-[0] leading-[normal] mb-3">
                          {item.title}
                        </h3>
                        <div className="space-y-1">
                          {item.description.map((line, lineIndex) => (
                            <p
                              key={lineIndex}
                              className="[font-family:'Inter',Helvetica] font-normal text-[#555555] text-sm tracking-[0] leading-[normal]"
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
