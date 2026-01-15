
import { FooterSection } from "../../../components/sections/FooterSection";
import { SecondaryHeader } from "../../../components/sections/secondaryHeader";

import { ProjectsGridSection } from "./sections/ProjectsGridSection";

const navigationItems = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  { label: "Projects", href: "/projects", isActive: true },
  { label: "Services", href: "/services" },
  { label: "Galleries", href: "/galleries" },
  { label: "Contact Us", href: "/contact-us" },
];

export const Projects = () => {
  return (
    <div className="w-full relative bg-[#f8f9fa]">
      <SecondaryHeader
        title="Our Projects"
        description="Discover our portfolio of hydropower and infrastructure work."
        navigationItems={navigationItems}
      />


      <ProjectsGridSection />
      <FooterSection />
    </div>
  );
};
