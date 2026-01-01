import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../components/ui/dialog";

const serviceItems = [
  {
    id: 1,
    image: "/downloads/mjlodvw6RB1obD/img/mask-group.png",
    title: "Project Development",
    description:
      "Comprehensive project development services from initial concept to feasibility studies and implementation planning.",
    longDescription:
      "Our Project Development service provides end-to-end support for hydropower and infrastructure projects, from initial concept through to implementation. We begin with comprehensive feasibility studies that assess technical, economic, environmental, and social aspects of proposed projects. Our team conducts detailed site investigations, hydrological analyses, and resource assessments to ensure project viability. We develop robust business cases and financial models that attract investors and secure funding. Our expertise includes stakeholder engagement, regulatory compliance, and risk management. We work closely with clients to refine project concepts, optimize designs, and develop implementation strategies that maximize value while minimizing risks. Our project development services have helped bring numerous successful projects to fruition, contributing to sustainable development and economic growth. We pride ourselves on our ability to navigate complex regulatory environments and build strong partnerships with local communities and government agencies.",
  },
  {
    id: 2,
    image: "/downloads/mjlodvw6RB1obD/img/mask-group-1.png",
    title: "Project Engineering",
    description:
      "Expert engineering solutions for hydropower and infrastructure projects with focus on innovation and sustainability.",
    longDescription:
      "Our Project Engineering service delivers innovative, sustainable engineering solutions for complex hydropower and infrastructure projects. We provide comprehensive engineering design services covering civil, mechanical, electrical, and structural disciplines. Our team utilizes state-of-the-art design tools and methodologies to optimize project performance and efficiency. We specialize in developing solutions that balance technical excellence with environmental responsibility and cost-effectiveness. Our engineering services include detailed design, technical specifications, construction drawings, and quality assurance. We conduct rigorous analysis and modeling to ensure designs meet the highest standards of safety and reliability. Our engineers work collaboratively with clients and stakeholders to address technical challenges and deliver solutions that exceed expectations. With extensive experience in challenging terrain and complex project conditions, we bring proven expertise to every engagement. Our commitment to innovation drives us to continuously explore new technologies and approaches that enhance project outcomes.",
  },
  {
    id: 3,
    image: "/downloads/mjlodvw6RB1obD/img/clip-path-group.png",
    title: "Project Management",
    description:
      "Professional project management services ensuring timely delivery and quality control throughout project lifecycle.",
    longDescription:
      "Our Project Management service provides comprehensive oversight and coordination for hydropower and infrastructure projects of all sizes. We employ proven project management methodologies and best practices to ensure projects are delivered on time, within budget, and to the highest quality standards. Our experienced project managers coordinate all aspects of project execution, from procurement and contracting to construction supervision and commissioning. We implement robust monitoring and control systems that track progress, manage risks, and ensure compliance with specifications and regulations. Our team facilitates effective communication among all project stakeholders, resolving issues promptly and maintaining project momentum. We provide regular reporting and documentation that keeps clients informed and engaged throughout the project lifecycle. Our project management approach emphasizes proactive problem-solving, continuous improvement, and stakeholder satisfaction. With a track record of successfully managing complex, multi-disciplinary projects, we bring the expertise and dedication needed to achieve project success.",
  },
  {
    id: 4,
    image: "/downloads/mjlodvw6RB1obD/img/mask-group-2.png",
    title: "Specialized Hydromech Works",
    description:
      "Advanced hydromechanical engineering services for complex water resource and hydropower projects.",
    longDescription:
      "Our Specialized Hydromech Works service provides expert solutions for the most challenging aspects of hydropower and water resource projects. We specialize in the design, analysis, and optimization of hydromechanical equipment including turbines, gates, valves, and control systems. Our team has deep expertise in hydraulic engineering, fluid mechanics, and mechanical systems integration. We conduct detailed hydraulic modeling and analysis to optimize system performance and efficiency. Our services include equipment selection, specification development, performance testing, and commissioning support. We work with leading equipment manufacturers to ensure clients receive the best available technology for their specific applications. Our hydromechanical engineers address complex technical challenges including cavitation, vibration, and erosion issues. We provide ongoing support for equipment operation, maintenance, and upgrades. With extensive experience in both new installations and rehabilitation projects, we deliver solutions that maximize performance, reliability, and longevity of hydromechanical systems.",
  },
  {
    id: 5,
    image: "/downloads/mjlodvw6RB1obD/img/mask-group-3.png",
    title: "Product Development",
    description:
      "Innovative product development solutions tailored to meet specific project requirements and industry standards.",
    longDescription:
      "Our Product Development service creates innovative solutions tailored to the unique needs of hydropower and infrastructure projects. We work closely with clients to understand their specific requirements and develop custom products that address technical challenges and enhance project performance. Our development process includes concept design, prototyping, testing, and refinement to ensure products meet the highest standards of quality and reliability. We leverage advanced engineering tools and methodologies to optimize product designs for performance, manufacturability, and cost-effectiveness. Our team has expertise in developing a wide range of products including specialized equipment, monitoring systems, and control solutions. We conduct rigorous testing and validation to ensure products perform as intended under real-world conditions. Our product development services include documentation, training, and ongoing support to ensure successful implementation and operation. We maintain strong relationships with manufacturing partners to ensure quality production and timely delivery. Our commitment to innovation and excellence drives us to continuously push the boundaries of what's possible in hydropower and infrastructure technology.",
  },
  {
    id: 6,
    image: "/downloads/mjlodvw6RB1obD/img/mask-group-4.png",
    title: "Consulting Services",
    description:
      "Strategic consulting services providing expert guidance for hydropower and infrastructure development projects.",
    longDescription:
      "Our Consulting Services provide strategic guidance and expert advice for all aspects of hydropower and infrastructure development. We offer independent, objective analysis and recommendations that help clients make informed decisions and achieve their project objectives. Our consulting services cover a broad range of areas including strategic planning, technical due diligence, regulatory compliance, and risk assessment. We conduct comprehensive reviews of project proposals, designs, and implementation plans to identify opportunities for improvement and optimization. Our consultants bring decades of combined experience and deep industry knowledge to every engagement. We provide expert witness services, dispute resolution support, and technical advisory services for complex projects. Our consulting approach emphasizes collaboration, transparency, and practical solutions that address real-world challenges. We work with government agencies, private developers, financial institutions, and international organizations to support sustainable development initiatives. Our commitment to excellence and integrity has made us a trusted advisor for some of the most significant hydropower and infrastructure projects in the region.",
  },
];

export const ServicesGridSection = (): JSX.Element => {
  const [selectedService, setSelectedService] = useState<(typeof serviceItems)[0] | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleServiceClick = (service: (typeof serviceItems)[0]) => {
    setSelectedService(service);
    setIsOpen(true);
  };

  return (
    <>
      <section className="relative w-full py-16 bg-[#f5f5f5]">
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceItems.map((item) => (
              <div
                key={item.id}
                onClick={() => handleServiceClick(item)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    handleServiceClick(item);
                  }
                }}
                aria-label={`Open details for ${item.title}`}
                role="button"
                tabIndex={0}
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
              {selectedService?.title}
            </DialogTitle>
          </DialogHeader>
          {selectedService && (
            <div className="space-y-4">
              <div className="relative w-full aspect-[16/9] overflow-hidden rounded-lg">
                <img
                  className="w-full h-full object-cover"
                  alt={selectedService.title}
                  src={selectedService.image}
                />
              </div>
              <p className="[font-family:'Montserrat',Helvetica] font-normal text-[#555555] text-base tracking-[0] leading-[28px] text-justify">
                {selectedService.longDescription}
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
