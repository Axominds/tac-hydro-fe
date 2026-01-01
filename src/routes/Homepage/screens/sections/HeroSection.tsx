import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";

const projectsData = [
  {
    id: 1,
    image: "/downloads/mjlodvw6RB1obD/img/mask-group.png",
    heartIcon: "/downloads/mjlodvw6RB1obD/img/group.png",
    label: "/downloads/mjlodvw6RB1obD/img/stress-reduction.png",
    description: "internet tend to repeat predefined",
    showHeart: true,
  },
  {
    id: 2,
    image: "/downloads/mjlodvw6RB1obD/img/mask-group-1.png",
    showHeart: false,
  },
  {
    id: 3,
    image: "/downloads/mjlodvw6RB1obD/img/clip-path-group.png",
    showHeart: false,
  },
];

export const HeroSection = (): JSX.Element => {
  return (
    <section className="relative w-full py-20 bg-[url(/downloads/mjlodvw6RB1obD/img/vector-3.svg)] bg-cover bg-center">
      <div className="container mx-auto px-8">
        <h2 className="[font-family:'Inter',Helvetica] font-bold italic text-[#111111] text-[44px] text-center tracking-[0] leading-normal mb-16">
          Our Projects
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projectsData.map((project, index) => (
            <Card
              key={project.id}
              className={`shadow-[0px_4px_4px_#00000040] overflow-hidden border-0 ${
                index === 2 ? "mt-5" : ""
              }`}
            >
              <CardContent className="p-0 relative">
                <div className="relative w-full aspect-[375/460]">
                  <img
                    className="w-full h-full object-cover"
                    alt={`Project ${project.id}`}
                    src={project.image}
                  />

                  {project.showHeart && (
                    <img
                      className="absolute w-[12.09%] h-[9.57%] top-[5.98%] right-[5.48%]"
                      alt="Favorite"
                      src={project.heartIcon}
                    />
                  )}

                  {project.label && (
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <img className="w-[46.17%] mb-4" alt="Project label" src={project.label} />
                      {project.description && (
                        <p className="[font-family:'Inter',Helvetica] font-normal text-white text-[13px] tracking-[0] leading-normal">
                          {project.description}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
