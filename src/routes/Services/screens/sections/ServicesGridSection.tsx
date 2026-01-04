import React, { useEffect, useMemo, useState } from "react";
import { ChevronRightIcon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../components/ui/dialog";

const sectorFilters = [
  "Hydropower",
  "Tunnel",
  "Transmission Line",
  "Road",
  "Environment",
  "Irrigation & Water Resources",
];

const serviceItems = [
  {
    id: 1,
    image: "/downloads/mjlodvw6RB1obD/img/mask-group.png",
    title: "Project Development",
    description:
      "Comprehensive project development services from initial concept to feasibility studies and implementation planning.",
    longDescription:
      "Our Project Development service provides end-to-end support for hydropower and infrastructure projects, from initial concept through to implementation. We begin with comprehensive feasibility studies that assess technical, economic, environmental, and social aspects of proposed projects. Our team conducts detailed site investigations, hydrological analyses, and resource assessments to ensure project viability. We develop robust business cases and financial models that attract investors and secure funding. Our expertise includes stakeholder engagement, regulatory compliance, and risk management. We work closely with clients to refine project concepts, optimize designs, and develop implementation strategies that maximize value while minimizing risks. Our project development services have helped bring numerous successful projects to fruition, contributing to sustainable development and economic growth. We pride ourselves on our ability to navigate complex regulatory environments and build strong partnerships with local communities and government agencies.",
    sectors: [
      "Hydropower",
      "Tunnel",
      "Transmission Line",
      "Road",
      "Environment",
      "Irrigation & Water Resources",
    ],
  },
  {
    id: 2,
    image: "/downloads/mjlodvw6RB1obD/img/mask-group-1.png",
    title: "Project Engineering",
    description:
      "Expert engineering solutions for hydropower and infrastructure projects with focus on innovation and sustainability.",
    longDescription:
      "Our Project Engineering service delivers innovative, sustainable engineering solutions for complex hydropower and infrastructure projects. We provide comprehensive engineering design services covering civil, mechanical, electrical, and structural disciplines. Our team utilizes state-of-the-art design tools and methodologies to optimize project performance and efficiency. We specialize in developing solutions that balance technical excellence with environmental responsibility and cost-effectiveness. Our engineering services include detailed design, technical specifications, construction drawings, and quality assurance. We conduct rigorous analysis and modeling to ensure designs meet the highest standards of safety and reliability. Our engineers work collaboratively with clients and stakeholders to address technical challenges and deliver solutions that exceed expectations. With extensive experience in challenging terrain and complex project conditions, we bring proven expertise to every engagement. Our commitment to innovation drives us to continuously explore new technologies and approaches that enhance project outcomes.",
    sectors: ["Hydropower", "Tunnel", "Transmission Line", "Road", "Irrigation & Water Resources"],
  },
  {
    id: 3,
    image: "/downloads/mjlodvw6RB1obD/img/clip-path-group.png",
    title: "Project Management",
    description:
      "Professional project management services ensuring timely delivery and quality control throughout project lifecycle.",
    longDescription:
      "Our Project Management service provides comprehensive oversight and coordination for hydropower and infrastructure projects of all sizes. We employ proven project management methodologies and best practices to ensure projects are delivered on time, within budget, and to the highest quality standards. Our experienced project managers coordinate all aspects of project execution, from procurement and contracting to construction supervision and commissioning. We implement robust monitoring and control systems that track progress, manage risks, and ensure compliance with specifications and regulations. Our team facilitates effective communication among all project stakeholders, resolving issues promptly and maintaining project momentum. We provide regular reporting and documentation that keeps clients informed and engaged throughout the project lifecycle. Our project management approach emphasizes proactive problem-solving, continuous improvement, and stakeholder satisfaction. With a track record of successfully managing complex, multi-disciplinary projects, we bring the expertise and dedication needed to achieve project success.",
    sectors: ["Hydropower", "Tunnel", "Transmission Line", "Road"],
  },
  {
    id: 4,
    image: "/downloads/mjlodvw6RB1obD/img/mask-group-2.png",
    title: "Research and Development",
    description:
      "Research-driven innovation to improve project outcomes, sustainability, and efficiency.",
    longDescription:
      "Our Research and Development service focuses on applied research, feasibility innovation, and improved methodologies across infrastructure sectors. We evaluate emerging technologies, refine modeling approaches, and develop decision frameworks that reduce risk and improve delivery. Our team runs pilot studies, conducts data-driven analyses, and collaborates with academic and industry partners to translate research into practical project gains. We help clients explore optimization strategies for design, construction, and environmental performance while ensuring compliance with regulations. Our R&D work supports continuous improvement in safety, cost efficiency, and sustainability. By blending research with field insight, we deliver actionable recommendations that elevate project outcomes across diverse geographies and operating conditions.",
    sectors: ["Hydropower", "Environment", "Irrigation & Water Resources"],
  },
];

export const ServicesGridSection = (): JSX.Element => {
  const [selectedService, setSelectedService] = useState<(typeof serviceItems)[0] | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSector, setActiveSector] = useState(sectorFilters[0]);
  const location = useLocation();
  const popupItems = [
    {
      title: "Project identification",
      button: "About Project Identification",
      slug: "project-identification",
    },
    {
      title: "Desk Study",
      button: "About Desk Study",
      slug: "desk-study",
    },
    {
      title: "Topographical Survey",
      button: "About Topographical Survey",
      slug: "topographical-survey",
    },
    {
      title: "Feasibility Study",
      button: "About Feasibility Study",
      slug: "feasibility-study",
    },
    {
      title: "Due Diligence",
      button: "About Due Diligence",
      slug: "due-diligence",
    },
  ];
  const popupDescription =
    "TAC Hydro Consultancy Pvt. Ltd. is a leading engineering consultancy based in Nepal, specializing in hydropower and infrastructure development. Our journey began in 2005, when a team of experienced engineers came together with a shared vision to contribute to the nation's energy sector through the study.";

  const filteredServices = useMemo(
    () => serviceItems.filter((item) => item.sectors.includes(activeSector)),
    [activeSector]
  );

  const handleServiceClick = (service: (typeof serviceItems)[0]) => {
    setSelectedService(service);
    setIsOpen(true);
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const requestedSector = params.get("sector");
    if (requestedSector && sectorFilters.includes(requestedSector)) {
      setActiveSector(requestedSector);
    }
  }, [location.search]);

  return (
    <>
      <section className="relative w-full py-16 bg-[#f5f5f5]">
        <div className="max-w-[1400px] mx-auto px-8">
          <h2 className="[font-family:'Montserrat',Helvetica] text-sm font-semibold uppercase tracking-[0.24em] text-[#6b6b6b] mb-4">
            Sectors
          </h2>
          <div id="services-filter" className="flex flex-wrap items-center gap-3 mb-10">
            {sectorFilters.map((sector) => (
              <button
                key={sector}
                type="button"
                onClick={() => setActiveSector(sector)}
                className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition-colors ${
                  activeSector === sector
                    ? "border-[#0070c0] bg-[#0070c0] text-white"
                    : "border-[#d9d9d9] bg-white text-[#6b6b6b] hover:border-[#0070c0] hover:text-[#0070c0]"
                }`}
                aria-pressed={activeSector === sector}
              >
                {sector}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((item) => (
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
        <DialogContent className="max-w-6xl max-h-[95vh] overflow-hidden bg-[#cfe6f5] p-6">
          <DialogHeader>
            <DialogTitle className="[font-family:'Montserrat',Helvetica] text-center text-2xl font-semibold text-[#1f2a37]">
              {selectedService?.title ?? "Service Details"}
            </DialogTitle>
          </DialogHeader>
          <div className="max-h-[80vh] overflow-y-auto pr-2 hide-scrollbar space-y-5">
            <div className="relative w-full aspect-[16/7] overflow-hidden rounded-2xl bg-white shadow-[0_10px_24px_rgba(15,23,42,0.12)]">
              <img
                className="w-full h-full object-cover"
                alt={selectedService?.title || "Project overview"}
                src={selectedService?.image || "/downloads/mjlodvw6RB1obD/img/mask-group.png"}
              />
            </div>
            <div className="space-y-5">
              {popupItems.map((item, index) => (
                <div key={item.title} className="rounded-2xl border border-[#b8d7ee] bg-[#d9efff] p-4">
                  <div className="flex items-start gap-3">
                    <span className="[font-family:'Montserrat',Helvetica] text-sm font-bold text-[#3b4b5c]">
                      {String(index + 1).padStart(2, "0")}.
                    </span>
                    <div>
                      <h3 className="[font-family:'Montserrat',Helvetica] text-sm font-semibold text-[#2c3e50]">
                        {item.title}
                      </h3>
                      <p className="[font-family:'Montserrat',Helvetica] text-xs text-[#5b6a79] leading-[1.6] mt-1">
                        {popupDescription}
                      </p>
                      <Link
                        to={`/service-detial?item=${item.slug}`}
                        onClick={() => setIsOpen(false)}
                        className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#0070c0] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#005a9c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0070c0]/40"
                        aria-label={`${item.button} (opens page)`}
                      >
                        {item.button}
                        <ChevronRightIcon className="h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
