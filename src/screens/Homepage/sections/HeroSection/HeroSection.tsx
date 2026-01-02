import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";

const projectsData = [
  {
    id: 1,
    image: "/downloads/mjlob7k1SeIJX4/img/mask-group.png",
    title: "Project Development",
    description: "End-to-end hydropower planning and delivery.",
  },
  {
    id: 2,
    image: "/downloads/mjlob7k1SeIJX4/img/mask-group-1.png",
    title: "Hydropower Studies",
    description: "Feasibility, design, and engineering support.",
  },
  {
    id: 3,
    image: "/downloads/mjlob7k1SeIJX4/img/mask-group.png",
    title: "Infrastructure Design",
    description: "Sustainable solutions for complex terrain.",
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
              className="group overflow-hidden shadow-[0px_4px_4px_#00000040] border-0 translate-y-[-1rem] animate-fade-in opacity-0 transition-transform duration-300 hover:-translate-y-2 hover:shadow-[0px_12px_24px_#00000055]"
              style={
                {
                  "--animation-delay": `${200 + index * 200}ms`,
                } as React.CSSProperties
              }
            >
              <CardContent className="p-0 relative">
                <div className="relative aspect-[375/460]">
                  <img
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    alt={project.title || `Project ${project.id}`}
                    src={project.image}
                  />
                  <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/75 via-black/40 to-transparent">
                    <h3 className="[font-family:'Inter',Helvetica] font-semibold text-white text-xl tracking-[0] leading-tight mb-2">
                      {project.title}
                    </h3>
                    <p className="[font-family:'Inter',Helvetica] font-normal text-white/90 text-[14px] tracking-[0] leading-[20px]">
                      {project.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
