
import { FooterSection } from "../../../components/sections/FooterSection";
import { SecondaryHeader } from "../../../components/sections/secondaryHeader";

import { GalleriesGridSection } from "./sections/GalleriesGridSection";

const navigationItems = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  { label: "Projects", href: "/projects" },
  { label: "Services", href: "/services" },
  { label: "Galleries", href: "/galleries", isActive: true },
  { label: "Contact Us", href: "/contact-us" },
];

export const Galleries = () => {
  return (
    <div className="w-full relative bg-[#f8f9fa]">
      <SecondaryHeader
        title="Galleries"
        description="A visual collection of our latest work and milestones."
        navigationItems={navigationItems}
      />


      <GalleriesGridSection />
      <FooterSection />
    </div>
  );
};
