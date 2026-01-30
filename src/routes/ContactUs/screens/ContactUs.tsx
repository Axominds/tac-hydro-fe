import { FooterSection } from "../../../components/sections/FooterSection";
import { HeaderSection } from "../../../components/sections/HeaderSection";
import { BannerSection } from "../../../components/sections/BannerSection";
import { ContactDetailsSection } from "../sections/ContactDetailsSection";
import { ContactMapSection } from "../sections/ContactMapSection";

export const ContactUs = () => {
  return (
    <div className="w-full relative bg-[#f8f9fa]">
      <HeaderSection />
      <BannerSection
        title="Contact Us"
        description="Let us know how we can support your next hydropower project."
      />
      <ContactDetailsSection />
      <ContactMapSection />
      <FooterSection />
    </div>
  );
};
