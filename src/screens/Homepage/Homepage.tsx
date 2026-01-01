import { ChevronRightIcon } from "lucide-react";
import React from "react";
import { HERO_BG_ALT } from "../../assets";
import { Button } from "../../components/ui/button";
import { SiteHeader } from "../../components/sections/SiteHeader";
import { AboutUsSection } from "./sections/AboutUsSection";
import { CallToActionSection } from "./sections/CallToActionSection";
import { FooterSection } from "../../components/sections/FooterSection";
import { HeroSection } from "./sections/HeroSection";
import { MainContentSection } from "./sections/MainContentSection";
import { ProjectsSection } from "./sections/ProjectsSection";
import { TestimonialsSection } from "./sections/TestimonialsSection";

const navigationItems = [
  { label: "Home", href: "/", isActive: true },
  { label: "About", href: "/about" },
  { label: "Project", href: "/projects" },
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/gallery" },
];

const partnerLogos = [
  {
    src: "/downloads/mjlob7k1SeIJX4/img/image-3.png",
    alt: "Partner 1",
    className: "w-[140px] h-[142px] object-cover",
  },
  {
    src: "/downloads/mjlob7k1SeIJX4/img/image-4.png",
    alt: "Partner 2",
    className: "w-[141px] h-[142px] object-cover",
  },
  {
    src: "/downloads/mjlob7k1SeIJX4/img/image-20.png",
    alt: "Partner 3",
    className: "w-[190px] h-[130px] object-cover",
  },
  {
    src: "/downloads/mjlob7k1SeIJX4/img/image-21.png",
    alt: "Partner 4",
    className: "w-[142px] h-[142px] object-cover",
  },
  {
    src: "/downloads/mjlob7k1SeIJX4/img/image-17.png",
    alt: "Partner 5",
    className: "w-[141px] h-[142px]",
  },
  {
    src: "/downloads/mjlob7k1SeIJX4/img/image-18.png",
    alt: "Partner 6",
    className: "w-[141px] h-[142px]",
  },
  {
    src: "/downloads/mjlob7k1SeIJX4/img/image-8.png",
    alt: "Partner 7",
    className: "w-[111px] h-[142px]",
  },
];

export const Homepage = (): JSX.Element => {
  return (
    <div
      className="overflow-hidden border border-solid border-black w-full relative animate-fade-in opacity-0"
      data-model-id="2:330"
    >
      <header className="relative w-full">
        <img className="w-full h-[915px] object-cover" alt="Hero Background" src={HERO_BG_ALT} />

        <SiteHeader
          navigationItems={navigationItems}
          headerClassName="absolute top-[30px] left-0 right-0 px-20 translate-y-[-1rem] animate-fade-in opacity-0"
          innerClassName="max-w-[1289px] w-full mx-auto"
          navClassName="gap-7"
          linkClassName="transition-opacity hover:opacity-80"
        />

        <div className="absolute top-[614px] left-[85px] max-w-[847px] translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">
          <p className="[font-family:'Montserrat',Helvetica] font-semibold text-white text-[25px] tracking-[0] leading-[35px]">
            TacHydro exists to bring low carbon solutions to minimize the impact of energy creation
            on the environment.
          </p>
        </div>

        <Button className="absolute top-[729px] left-[78px] h-auto inline-flex items-center justify-center gap-[9px] px-[29px] py-2.5 bg-[#0070c0] hover:bg-[#005a9c] rounded-[40px] transition-colors translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:400ms]">
          <span className="[font-family:'Montserrat',Helvetica] font-bold text-white text-lg tracking-[0] leading-[normal]">
            Get Started
          </span>
          <ChevronRightIcon className="w-5 h-5 text-white" />
        </Button>
      </header>

      <MainContentSection />

      <AboutUsSection />

      <TestimonialsSection />

      <HeroSection />

      <CallToActionSection />

      <ProjectsSection />

      <section className="relative w-full bg-white border border-solid border-[#6f636366] py-[30px]">
        <div className="w-full px-4 flex flex-col gap-[55px]">
          <div className="flex justify-center translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">
            <div className="inline-flex h-9 items-center justify-center gap-2.5 px-5 py-2 rounded-[28px] border-b-2 [border-bottom-style:solid] border-l-2 [border-left-style:solid] border-[#111111]">
              <h2 className="[font-family:'Montserrat',Helvetica] font-bold text-[#444444] text-base tracking-[0] leading-[normal]">
                OUR VALUED PARTNERS
              </h2>
            </div>
          </div>

          <div className="w-full overflow-hidden translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:400ms]">
            <div className="flex items-center gap-[60px] animate-marquee [--duration:30s] [--gap:60px]">
              {partnerLogos.map((logo, index) => (
                <img
                  key={`logo-1-${index}`}
                  className={`${logo.className} flex-shrink-0`}
                  alt={logo.alt}
                  src={logo.src}
                />
              ))}
              {partnerLogos.map((logo, index) => (
                <img
                  key={`logo-2-${index}`}
                  className={`${logo.className} flex-shrink-0`}
                  alt={logo.alt}
                  src={logo.src}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
};
