import { Link } from "react-router-dom";
import { FooterSection } from "../../components/sections/FooterSection";
import { SecondaryHeader } from "../../components/sections/secondaryHeader";
import { NumbersAndFiguresSection } from "../../components/sections/NumbersAndFiguresSection";
import { AboutUsSection } from "./sections/AboutUsSection";
import { TopManagementSection } from "./sections/TopManagementSection";

const navigationItems = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us", isActive: true },
  { label: "Projects", href: "/projects" },
  { label: "Services", href: "/services" },
  { label: "Galleries", href: "/galleries" },
  { label: "Contact Us", href: "/contact-us" },
];

export const AboutUs = () => {

  return (
    <div className="w-full relative bg-white">
      <SecondaryHeader
        title="ABOUT TAC HYDRO"
        description="LEADING ENGINEERING INNOVATION SINCE 2005"
        navigationItems={navigationItems}
      />
      <NumbersAndFiguresSection />
      <AboutUsSection />

      <TopManagementSection />

      {/* CTA Section */}
      <section className="relative w-full py-16 sm:py-20 bg-[#f8f9fa]">
        <div className="max-w-[900px] mx-auto px-6 sm:px-8 text-center">
          <h2 className="font-bold text-[#2c3e50] text-3xl sm:text-4xl lg:text-[44px] leading-[normal] mb-4">
            We make every trip a harmonious
          </h2>
          <h2 className="font-bold text-[#2c3e50] text-3xl sm:text-4xl lg:text-[44px] leading-[normal] mb-6">
            blend of comfort and discovery.
          </h2>
          <p className="font-normal text-[#555555] text-base sm:text-lg leading-[normal] mb-8">
            Start your adventure with Armonia - contact us now!
          </p>
          <Link
            to="/contact-us"
            className="inline-flex items-center justify-center w-full max-w-[360px] h-auto opacity-100"
          >
            <img className="w-full h-full object-contain" alt="Contact us" src="/button.png" />
          </Link>
        </div>
      </section>

      <FooterSection />
    </div >
  );
};
