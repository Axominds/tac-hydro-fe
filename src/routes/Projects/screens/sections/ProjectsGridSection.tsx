import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../components/ui/dialog";

const projectItems = [
  {
    id: 1,
    image: "/downloads/mjlodvw6RB1obD/img/mask-group.png",
    title: "Upper Tamakoshi Hydroelectric Project",
    description:
      "A major hydropower project contributing to Nepal's energy infrastructure with sustainable solutions.",
    longDescription:
      "The Upper Tamakoshi Hydroelectric Project is a flagship hydropower initiative in Nepal, representing one of the largest and most ambitious energy infrastructure developments in the country. This project harnesses the power of the Tamakoshi River to generate clean, renewable electricity that significantly contributes to Nepal's energy security and economic development. The project features state-of-the-art turbine technology and innovative engineering solutions designed to maximize efficiency while minimizing environmental impact. Our team provided comprehensive consultancy services throughout the project lifecycle, from initial feasibility studies to final commissioning. The project demonstrates our commitment to sustainable energy development and showcases our expertise in managing large-scale hydropower initiatives. With a focus on environmental conservation and community engagement, this project sets new standards for responsible hydropower development in the region.",
  },
  {
    id: 2,
    image: "/downloads/mjlodvw6RB1obD/img/mask-group-1.png",
    title: "Kulekhani Hydropower Station",
    description:
      "Engineering excellence in hydropower generation with focus on environmental sustainability.",
    longDescription:
      "The Kulekhani Hydropower Station represents a milestone in Nepal's journey toward energy independence and sustainable development. This project combines cutting-edge engineering with environmental stewardship to deliver reliable, clean energy to thousands of households and businesses. Our consultancy team played a crucial role in optimizing the station's design and operational efficiency, ensuring maximum power generation while maintaining ecological balance. The project incorporates advanced monitoring systems and sustainable practices that minimize environmental impact and protect local ecosystems. Through careful planning and innovative solutions, we helped create a hydropower facility that not only meets current energy demands but also sets the foundation for future expansion and development. The Kulekhani project exemplifies our commitment to engineering excellence and environmental responsibility.",
  },
  {
    id: 3,
    image: "/downloads/mjlodvw6RB1obD/img/clip-path-group.png",
    title: "Melamchi Water Supply Project",
    description: "Critical infrastructure development ensuring clean water supply to urban areas.",
    longDescription:
      "The Melamchi Water Supply Project is a transformative infrastructure initiative designed to address water scarcity challenges in urban Nepal. This comprehensive project involves the development of sophisticated water conveyance systems, treatment facilities, and distribution networks that bring clean, reliable water to millions of residents. Our consultancy services encompassed detailed hydrological studies, engineering design, and project management support throughout the implementation phase. The project demonstrates our expertise in complex water resource management and our ability to deliver solutions that improve quality of life for urban populations. By combining technical excellence with sustainable practices, we helped create a water supply system that meets current needs while planning for future growth. The Melamchi project showcases our commitment to developing critical infrastructure that serves communities and supports sustainable urban development.",
  },
  {
    id: 4,
    image: "/downloads/mjlodvw6RB1obD/img/mask-group-2.png",
    title: "Chameliya Hydropower Project",
    description:
      "Innovative hydropower solutions designed for maximum efficiency and minimal environmental impact.",
    longDescription:
      "The Chameliya Hydropower Project represents the cutting edge of sustainable energy development in Nepal. This innovative project leverages advanced hydropower technology to generate clean electricity while maintaining the highest standards of environmental protection. Our team provided comprehensive consultancy services, including feasibility studies, detailed engineering design, and environmental impact assessments. The project features state-of-the-art turbine systems and sophisticated control mechanisms that optimize power generation efficiency. Through careful site selection and innovative design solutions, we minimized the project's environmental footprint while maximizing its contribution to Nepal's energy grid. The Chameliya project demonstrates our ability to balance technical excellence with environmental responsibility, creating sustainable energy solutions that benefit both present and future generations. This project stands as a testament to our commitment to innovation and sustainable development in the hydropower sector.",
  },
  {
    id: 5,
    image: "/downloads/mjlodvw6RB1obD/img/mask-group-3.png",
    title: "Budhi Gandaki Hydroelectric Project",
    description: "Large-scale hydroelectric development with cutting-edge engineering practices.",
    longDescription:
      "The Budhi Gandaki Hydroelectric Project is one of the most ambitious hydropower developments in South Asia, showcasing the potential for large-scale renewable energy generation in mountainous terrain. This mega-project required extensive planning, innovative engineering solutions, and careful environmental management to bring to fruition. Our consultancy team provided critical support throughout the project development phase, including comprehensive feasibility studies, detailed design work, and risk assessment. The project incorporates the latest advances in hydropower technology and demonstrates our capability to manage complex, large-scale infrastructure developments. With a focus on sustainability and community benefit, the Budhi Gandaki project will provide clean energy to millions while creating economic opportunities for local communities. This project exemplifies our expertise in delivering world-class hydropower solutions that drive economic development while protecting the environment.",
  },
  {
    id: 6,
    image: "/downloads/mjlodvw6RB1obD/img/mask-group-4.png",
    title: "Arun III Hydroelectric Project",
    description: "Strategic hydropower development contributing to regional energy security.",
    longDescription:
      "The Arun III Hydroelectric Project is a strategic energy infrastructure development that plays a crucial role in enhancing regional energy security and promoting cross-border energy cooperation. This significant project harnesses the power of the Arun River to generate substantial amounts of clean, renewable electricity for both domestic consumption and export. Our consultancy services covered all aspects of project development, from initial concept through detailed engineering and implementation support. The project features advanced hydropower technology and incorporates best practices in environmental management and social responsibility. Through careful planning and stakeholder engagement, we helped create a project that delivers economic benefits while respecting environmental and social considerations. The Arun III project demonstrates our expertise in developing large-scale hydropower projects that contribute to energy security, economic development, and regional cooperation. This project stands as a model for sustainable energy development in the region.",
  },
];

export const ProjectsGridSection = (): JSX.Element => {
  const [selectedProject, setSelectedProject] = useState<(typeof projectItems)[0] | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleProjectClick = (project: (typeof projectItems)[0]) => {
    setSelectedProject(project);
    setIsOpen(true);
  };

  return (
    <>
      <section className="relative w-full py-16 bg-[#f5f5f5]">
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectItems.map((item) => (
              <div
                key={item.id}
                onClick={() => handleProjectClick(item)}
                className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow cursor-pointer group bg-white"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    alt={item.title}
                    src={item.image}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-6">
                  <h3 className="[font-family:'Montserrat',Helvetica] font-bold text-[#2c3e50] text-xl tracking-[0] leading-[normal] mb-3">
                    {item.title}
                  </h3>
                  <p className="[font-family:'Montserrat',Helvetica] font-normal text-[#555555] text-sm tracking-[0] leading-[24px]">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="[font-family:'Montserrat',Helvetica] font-bold text-[#2c3e50] text-2xl tracking-[0] leading-[normal] mb-4">
              {selectedProject?.title}
            </DialogTitle>
          </DialogHeader>
          {selectedProject && (
            <div className="space-y-4">
              <div className="relative w-full aspect-[16/9] overflow-hidden rounded-lg">
                <img
                  className="w-full h-full object-cover"
                  alt={selectedProject.title}
                  src={selectedProject.image}
                />
              </div>
              <p className="[font-family:'Montserrat',Helvetica] font-normal text-[#555555] text-base tracking-[0] leading-[28px] text-justify">
                {selectedProject.longDescription}
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
