import { FooterSection } from "../../components/sections/FooterSection";
import { HeaderSection } from "../../components/sections/HeaderSection";
import { BannerSection } from "../../components/sections/BannerSection";
import { ContactDetailsSection } from "./sections/ContactDetailsSection";
import { ContactMapSection } from "./sections/ContactMapSection";

export const ContactUs = () => {
  return (
    <div className="overflow-x-clip border border-solid border-black w-full relative">
      <HeaderSection />
      <BannerSection
        title="Contact Us"
        description="Let Us Know How We Can Support Your Next Hydropower Project."
      />
      <ContactDetailsSection />
      <ContactMapSection />
      <FooterSection />
    </div>
  );
};
