import { ChevronRightIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { HERO_BG_ALT } from "../../assets";
import { Button } from "../../components/ui/button";
import { SiteHeader } from "../../components/sections/SiteHeader";
import { AboutUsSection } from "./sections/AboutUsSection";
import { CallToActionSection } from "./sections/CallToActionSection";
import { FooterSection } from "../../components/sections/FooterSection";
import { HeroSection } from "./sections/HeroSection";
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

const typewriterWords = ["INNOVATE", "ENGINEER", "SUSTAIN"];

export const Homepage = (): JSX.Element => {
  const [typewriterText, setTypewriterText] = useState("");
  const [typewriterIndex, setTypewriterIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = typewriterWords[typewriterIndex % typewriterWords.length];
    if (!isDeleting && typewriterText === currentWord) {
      const pauseTimer = window.setTimeout(() => setIsDeleting(true), 800);
      return () => window.clearTimeout(pauseTimer);
    }

    if (isDeleting && typewriterText.length === 0) {
      const resetTimer = window.setTimeout(() => {
        setIsDeleting(false);
        setTypewriterIndex((prev) => prev + 1);
      }, 300);
      return () => window.clearTimeout(resetTimer);
    }

    const nextText = isDeleting
      ? currentWord.substring(0, typewriterText.length - 1)
      : currentWord.substring(0, typewriterText.length + 1);
    let delay = isDeleting ? 90 : 130;

    if (!isDeleting && typewriterText.length === currentWord.length - 1) {
      delay = 60;
    }

    const timer = window.setTimeout(() => {
      setTypewriterText(nextText);
    }, delay);

    return () => window.clearTimeout(timer);
  }, [isDeleting, typewriterIndex, typewriterText]);

  return (
    <div
      className="overflow-hidden border border-solid border-black w-full relative animate-fade-in opacity-0"
      data-model-id="2:330"
    >
      <header className="relative w-full min-w-[1440px] h-[820px]">
        <img
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          alt="Hero Background"
          src={HERO_BG_ALT}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-black/10 to-transparent pointer-events-none" />

        <SiteHeader
          navigationItems={navigationItems}
          headerClassName="absolute top-0 left-0 right-0 px-6 sm:px-10 lg:px-20 translate-y-[-1rem] animate-fade-in opacity-0"
          innerClassName="max-w-[1280px] w-full mx-auto"
          navClassName="gap-6"
          linkClassName="transition-opacity hover:opacity-80"
        />

        <div className="relative z-10 h-full">
          <div className="h-full max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-20 flex items-end pb-10 sm:pb-12 lg:pb-6">
            <div className="max-w-[720px] translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms] lg:absolute lg:left-[78px] lg:top-[393px] lg:max-w-[995px]">
              <h1 className="[font-family:'Montserrat',Helvetica] font-bold text-white text-[52px] leading-[1] tracking-[0] lg:w-[995px] lg:h-[189px]">
                <span className="block">Empowering Sustainable Resources</span>
                <span className="block">Through Engineering Excellence</span>
              </h1>
              <div className="mt-[-4.75rem] flex items-center gap-2 min-h-[32px]">
                <span className="[font-family:'Montserrat',Helvetica] font-bold text-white text-[32px] leading-[1] tracking-[0]">
                  {typewriterText}
                </span>
                <span className="inline-block w-[2px] h-7 bg-white animate-blink" aria-hidden="true" />
              </div>
              <div className="bg-white mt-3" />
              <p className="[font-family:'Montserrat',Helvetica] font-semibold text-white text-[20px] tracking-[0] leading-[35px] mt-4 max-w-[640px]">
                TacHydro exists to bring low carbon solutions to minimize the impact of energy
                creation on the environment.
              </p>

              <Button className="mt-6 h-auto inline-flex items-center justify-center gap-[9px] px-[29px] py-2.5 bg-[#0070c0] hover:bg-[#005a9c] rounded-[40px] transition-colors">
                <span className="[font-family:'Montserrat',Helvetica] font-bold text-white text-lg tracking-[0] leading-[normal]">
                  Get Started
                </span>
                <ChevronRightIcon className="w-5 h-5 text-white" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <AboutUsSection />

      <TestimonialsSection />

      <HeroSection />

      <CallToActionSection />

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
