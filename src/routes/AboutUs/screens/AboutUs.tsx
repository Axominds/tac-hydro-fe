import { Link } from "react-router-dom";
import { FooterSection } from "../../../components/sections/FooterSection";
import { HeroWave } from "../../../components/sections/HeroWave";
import { SiteHeader } from "../../../components/sections/SiteHeader";
import { HERO_BG_PRIMARY } from "../../../assets";

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
      {/* Hero Section with Header */}
      <section className="relative w-full min-h-[360px] sm:min-h-[460px] lg:h-[560px]">
        <img
          className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none"
          alt="Hero Background"
          src={HERO_BG_PRIMARY}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b1522]/90 via-[#0b1522]/50 to-[#0b1522]/90 pointer-events-none" />

        {/* Header Navigation */}
        <SiteHeader navigationItems={navigationItems} />

        {/* Hero Content */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center">
          <h1 className="font-semibold text-white text-3xl sm:text-4xl lg:text-[60px] leading-[1.05] mb-6">
            Our Vision Unveiled
          </h1>
          <p className="font-normal text-white/75 text-sm sm:text-base lg:text-[17px] leading-[normal] max-w-[560px] px-4">
            Explore the origin of our craft, our commitment to natural
          </p>
        </div>
        <HeroWave className="text-white/70" />
      </section>

      {/* Who We Are Section */}
      <section className="relative w-full py-16 sm:py-20 bg-[#f8f9fa]">
        <div className="max-w-[900px] mx-auto px-6 sm:px-8 text-center">
          <h2 className="font-bold text-[#2c3e50] text-3xl sm:text-4xl lg:text-[44px] leading-[normal] mb-6">
            Who we are
          </h2>
          <p className="font-normal text-[#555555] text-base sm:text-lg leading-[30px] sm:leading-[32px] mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent
            libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum
            imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper
            porta. Mauris massa. Vestibulum lacinia arcu eget nulla.
          </p>
        </div>
      </section>

      {/* Chairperson Section */}
      <section className="relative w-full py-16 sm:py-20 pt-0 pb-0 bg-[#f8f9fa]">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-8">
          <div className="relative lg:min-h-[620px]">
            <div className="bg-[#2f5f4a] rounded-xl p-6 sm:p-8 text-white w-full lg:max-w-[850px] lg:pr-[340px]">
              <h3 className="font-bold text-white text-[19px] mb-2">
                Message <span className="text-white">From</span> Top Level
              </h3>
              <p className="font-normal text-white/90 text-[16px] leading-[24px] mb-2.5">
                As the Chairman of TAC Hydro Consultancy, I am thrilled to welcome you to our
                website. Our company specializes in providing expert consultancy services for
                project identification, design, construction monitoring, bill verification and
                rehabilitation of hydropower projects.
              </p>
              <p className="font-normal text-white/90 text-[16px] leading-[24px] mb-2.5">
                We understand the importance of meeting sustainable and clean energy sources, and
                we are dedicated to helping our clients achieve their goals in this field. Our team
                of experts has extensive experience and knowledge in the industry, and we are
                committed to providing the highest level of service and professionalism.
              </p>
              <p className="font-normal text-white/90 text-[16px] leading-[24px] mb-4">
                We take pride in our ability to deliver innovative and cost-effective solutions for
                our clients. Our goal is to help you achieve your project objectives and meet your
                specific needs.
              </p>
              <div className="mt-4 flex items-center justify-end">
                <div className="text-right">
                  <p className="font-semibold text-white text-[16px]">
                    Kumar Panday
                  </p>
                  <p className="font-normal text-white/80 text-[15px]">
                    Executive Chairman
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 sm:mt-16 flex justify-center lg:absolute lg:right-[-8px] lg:top-[-32px] lg:mt-0">
              <img
                className="w-full max-w-[420px] sm:max-w-[460px] lg:max-w-[502px] h-auto object-cover object-top rounded-[5px] opacity-100 shadow-[0_18px_30px_rgba(0,0,0,0.25)]"
                alt="Managing Director"
                src="/chairperson.png"
              />
            </div>
          </div>

        </div>
      </section>

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
