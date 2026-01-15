
import { FooterSection } from "../../../components/sections/FooterSection";
import { SecondaryHeader } from "../../../components/sections/secondaryHeader";

import { ServicesGridSection } from "./sections/ServicesGridSection";

const navigationItems = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  { label: "Projects", href: "/projects" },
  { label: "Services", href: "/services", isActive: true },
  { label: "Galleries", href: "/galleries" },
  { label: "Contact Us", href: "/contact-us" },
];

export const Services = () => {
  return (
    <div className="w-full relative bg-[#f8f9fa]">
      <SecondaryHeader
        title="Our Services"
        description="Expertise from feasibility to delivery across every project phase."
        navigationItems={navigationItems}
      />


      <ServicesGridSection />
      <FooterSection />
    </div>
  );
};
