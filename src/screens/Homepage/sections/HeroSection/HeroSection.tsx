import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";

const projectsData = [
  {
    id: 1,
    image: "/downloads/mjlob7k1SeIJX4/img/mask-group.png",
    title: "Stress reduction",
    description: "internet tend to repeat predefined",
    hasHeart: true,
  },
  {
    id: 2,
    image: "/downloads/mjlob7k1SeIJX4/img/mask-group-1.png",
    title: "",
    description: "",
    hasHeart: false,
  },
  {
    id: 3,
    image: "/downloads/mjlob7k1SeIJX4/img/clip-path-group.png",
    title: "",
    description: "",
    hasHeart: false,
  },
];

export const HeroSection = (): JSX.Element => {
  return (
    <section className="relative w-full py-16 bg-[url(/downloads/mjlob7k1SeIJX4/img/vector-3.svg)] bg-cover bg-center">
      <div className="container mx-auto px-4">
        <h2 className="[font-family:'Inter',Helvetica] font-bold italic text-[#111111] text-[44px] text-center tracking-[0] leading-normal mb-12 translate-y-[-1rem] animate-fade-in opacity-0">
          Our Projects
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {projectsData.map((project, index) => (
            <Card
              key={project.id}
              className="overflow-hidden shadow-[0px_4px_4px_#00000040] border-0 translate-y-[-1rem] animate-fade-in opacity-0"
              style={
                {
                  "--animation-delay": `${200 + index * 200}ms`,
                } as React.CSSProperties
              }
            >
              <CardContent className="p-0 relative">
                <div className="relative aspect-[375/460]">
                  <img
                    className="w-full h-full object-cover"
                    alt={project.title || `Project ${project.id}`}
                    src={project.image}
                  />

                  {project.hasHeart && (
                    <button
                      className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center transition-transform hover:scale-110"
                      type="button"
                      aria-label="Like project"
                    >
                      <img
                        className="w-full h-full"
                        alt="Like"
                        src="/downloads/mjlob7k1SeIJX4/img/group.png"
                      />
                    </button>
                  )}

                  {project.title && (
                    <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/60 to-transparent">
                      <img
                        className="mb-3"
                        alt={project.title}
                        src="/downloads/mjlob7k1SeIJX4/img/stress-reduction.png"
                      />
                      <p className="[font-family:'Inter',Helvetica] font-normal text-white text-[13px] tracking-[0] leading-normal">
                        {project.description}
                      </p>
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
