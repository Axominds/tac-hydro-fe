import { ChevronRightIcon } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { HERO_BG_ALT } from "../../assets";
import { Button } from "../../components/ui/button";
import { SiteHeader } from "../../components/sections/SiteHeader";
import { AboutUsSection } from "./sections/AboutUsSection";
import { CallToActionSection } from "./sections/CallToActionSection";
import { ContactSection } from "./sections/ContactSection";
import { FooterSection } from "../../components/sections/FooterSection";
import { HeroSection } from "./sections/HeroSection";
import { ProjectsSection } from "./sections/ProjectsSection";
import { TestimonialsSection } from "./sections/TestimonialsSection";
import { Link } from "react-router-dom";

const mapImage = "/Nepal_grey.svg";

const mapLocations = [
  { x: 14, y: 26, title: "Feasibility Study", detail: "Early-stage viability and yield analysis." },
  { x: 20, y: 32, title: "Detailed Design", detail: "Full engineering design packages." },
  { x: 30, y: 44, title: "Hydromechanical", detail: "Turbine and gate system design." },
  { x: 42, y: 50, title: "Construction Supervision", detail: "On-site QA/QC and progress checks." },
  { x: 54, y: 56, title: "Due Diligence", detail: "Independent technical reviews." },
  { x: 62, y: 62, title: "Monitoring & Billing", detail: "Project tracking and verification." },
  { x: 70, y: 60, title: "Feasibility Study", detail: "Resource and environmental review." },
  { x: 78, y: 66, title: "Detailed Design", detail: "Structural and hydraulic detailing." },
  { x: 84, y: 70, title: "Hydromechanical", detail: "Equipment selection and specs." },
  { x: 88, y: 76, title: "Construction Supervision", detail: "Field coordination and reporting." },
];

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

const partnerShowcaseFilters = ["ALL", "TRENDING", "INTERNATIONAL", "POLITICS", "BUSINESS"];

const partnerShowcaseItems = [
  {
    id: 1,
    title: "River Basin Capacity Upgrade",
    category: "INTERNATIONAL",
    image: "/downloads/mjlodvw6RB1obD/img/mask-group.png",
  },
  {
    id: 2,
    title: "Green Corridor Retrofit",
    category: "TRENDING",
    image: "/downloads/mjlodvw6RB1obD/img/mask-group-1.png",
  },
  {
    id: 3,
    title: "Turbine Efficiency Pilot",
    category: "BUSINESS",
    image: "/downloads/mjlodvw6RB1obD/img/clip-path-group.png",
  },
  {
    id: 4,
    title: "Rapid Flow Intake Design",
    category: "POLITICS",
    image: "/downloads/mjlodvw6RB1obD/img/mask-group-2.png",
  },
  {
    id: 5,
    title: "Watershed Resilience Program",
    category: "INTERNATIONAL",
    image: "/downloads/mjlodvw6RB1obD/img/mask-group-3.png",
  },
  {
    id: 6,
    title: "Grid Stability Partnership",
    category: "BUSINESS",
    image: "/downloads/mjlodvw6RB1obD/img/mask-group-4.png",
  },
];

const typewriterWords = ["INNOVATE", "ENGINEER", "SUSTAIN"];

export const Homepage = (): JSX.Element => {
  const [typewriterText, setTypewriterText] = useState("");
  const [typewriterIndex, setTypewriterIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [activePartnerFilter, setActivePartnerFilter] = useState("ALL");
  const handleGetStarted = () => {
    const target = document.getElementById("about-us");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

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

  const logoMarqueeItems = useMemo(() => {
    const tiledLogos = Array.from({ length: 15 }, (_, index) => partnerLogos[index % partnerLogos.length]);
    return tiledLogos;
  }, []);

  const filteredPartnerShowcaseItems =
    activePartnerFilter === "ALL"
      ? partnerShowcaseItems
      : partnerShowcaseItems.filter((item) => item.category === activePartnerFilter);
  const resolvedPartnerShowcaseItems =
    filteredPartnerShowcaseItems.length > 0 ? filteredPartnerShowcaseItems : partnerShowcaseItems;
  const [featuredPartnerShowcase, ...partnerShowcaseCards] = resolvedPartnerShowcaseItems;

  return (
    <div className="overflow-hidden border border-solid border-black w-full relative" data-model-id="2:330">
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

              <Button
                type="button"
                onClick={handleGetStarted}
                className="mt-6 h-auto inline-flex items-center justify-center gap-[9px] px-[29px] py-2.5 bg-[#0070c0] hover:bg-[#005a9c] rounded-[40px] transition-colors"
              >
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

      <section className="relative w-full bg-white py-16">
        <div className="mx-auto max-w-[1200px] px-6 sm:px-10 lg:px-20">
          <div className="relative">
            <img className="w-full h-auto object-contain" alt="Project coverage map" src={mapImage} />
            <div
              className="absolute inset-0 pointer-events-none"
              style={
                {
                  maskImage: `url(${mapImage})`,
                  maskSize: "contain",
                  maskRepeat: "no-repeat",
                  maskPosition: "center",
                  WebkitMaskImage: `url(${mapImage})`,
                  WebkitMaskSize: "contain",
                  WebkitMaskRepeat: "no-repeat",
                  WebkitMaskPosition: "center",
                } as React.CSSProperties
              }
            >
              {mapLocations.map((location, index) => (
                <div
                  key={`pin-${location.title}-${index}`}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${location.x}%`, top: `${location.y}%` }}
                >
                  <svg
                    className="h-6 w-6 drop-shadow-[0_6px_10px_rgba(0,112,192,0.35)]"
                    viewBox="0 0 24 24"
                    role="img"
                    aria-hidden="true"
                  >
                    <path
                      fill="#0070c0"
                      d="M12 2c-3.3 0-6 2.7-6 6 0 4.6 6 12 6 12s6-7.4 6-12c0-3.3-2.7-6-6-6z"
                    />
                    <circle cx="12" cy="8" r="2.6" fill="#ffffff" />
                  </svg>
                </div>
              ))}
            </div>
            <div className="absolute inset-0">
              {mapLocations.map((location, index) => (
                <div
                  key={`tooltip-${location.title}-${index}`}
                  className="group absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${location.x}%`, top: `${location.y}%` }}
                >
                  <button
                    type="button"
                    className="h-8 w-8 rounded-full opacity-0"
                    aria-label={`${location.title}: ${location.detail}`}
                  />
                  <div className="pointer-events-auto absolute left-1/2 top-[-8px] w-[190px] -translate-x-1/2 -translate-y-full opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    <div className="rounded-xl border border-[#e3e7ef] bg-white px-3 py-2 shadow-[0_10px_24px_rgba(15,23,42,0.15)]">
                      <span className="[font-family:'Montserrat',Helvetica] text-xs font-semibold uppercase tracking-[0.16em] text-[#0070c0]">
                        {location.title}
                      </span>
                      <p className="[font-family:'Montserrat',Helvetica] text-xs text-[#4b5563]">
                        {location.detail}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <HeroSection />

      <CallToActionSection />

      <ContactSection />

      <section className="relative w-full border border-solid border-[#6f636366] bg-[#f8f5f0] py-[30px]">
        <div className="w-full px-4 flex flex-col gap-[24px]">
          <div className="flex items-center justify-center">
            <div className="inline-flex h-9 items-center justify-center rounded-full border border-[#111111] px-5">
              <span className="[font-family:'Montserrat',Helvetica] text-sm font-semibold tracking-[0.12em] text-[#444444]">
                OUR VALUED PARTNERS
              </span>
            </div>
          </div>         

          <div className="w-full translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:400ms]">
            <div
              className="relative w-full overflow-hidden"
            >
              <div
                className="flex w-max gap-6 animate-marquee"
                style={
                  {
                    "--duration": "45s",
                    "--gap": "24px",
                  } as React.CSSProperties
                }
              >
                {[...logoMarqueeItems, ...logoMarqueeItems].map((logo, index) => (
                  <div
                    key={`logo-marquee-${logo.alt}-${index}`}
                    className="group flex min-w-[170px] items-center justify-center rounded-3xl p-4 [perspective:800px] sm:min-w-[190px] lg:min-w-[220px]"
                    aria-hidden={index >= logoMarqueeItems.length}
                  >
                    <div className="relative h-[170px] w-full">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <img
                          className={`${logo.className} grayscale transition duration-300 group-hover:grayscale-0 group-hover:scale-[1.06]`}
                          alt={logo.alt}
                          src={logo.src}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative w-full bg-[#f2efe9] py-16">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-20">
          <div className="flex flex-col gap-10">
            <div className="flex items-center justify-between gap-6 flex-wrap">
              <div className="flex items-center gap-4">
                <div className="inline-flex h-9 items-center justify-center gap-2.5 px-5 py-2 rounded-[28px] border-b-2 [border-bottom-style:solid] border-l-2 [border-left-style:solid] border-[#111111]">
                  <h2 className="[font-family:'Montserrat',Helvetica] font-bold text-[#444444] text-base tracking-[0] leading-[normal]">
                    BLOG
                  </h2>
                </div>
                <span className="[font-family:'Montserrat',Helvetica] text-sm font-semibold text-[#6b6b6b]">
                  Recently Added
                </span>
              </div>
              <div className="flex items-center gap-6 flex-wrap">
                {partnerShowcaseFilters.map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setActivePartnerFilter(filter)}
                    className={`[font-family:'Montserrat',Helvetica] text-xs font-semibold tracking-[0.18em] uppercase transition-colors ${
                      activePartnerFilter === filter ? "text-[#111111]" : "text-[#9c9c9c]"
                    }`}
                    aria-pressed={activePartnerFilter === filter}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.2fr_1fr]">
              {featuredPartnerShowcase && (
                <div className="relative min-h-[360px] overflow-hidden rounded-[28px]">
                  <img
                    className="absolute inset-0 h-full w-full object-cover"
                    alt={featuredPartnerShowcase.title}
                    src={featuredPartnerShowcase.image}
                  />
                  <div className="absolute inset-0 bg-black/15" />
                  <div className="absolute bottom-8 left-8 max-w-[380px]">
                    <p className="[font-family:'Montserrat',Helvetica] text-lg font-semibold text-white/90">
                      {featuredPartnerShowcase.title}
                    </p>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {partnerShowcaseCards.slice(0, 4).map((item) => (
                  <div key={item.id} className="flex flex-col gap-3">
                    <div className="overflow-hidden rounded-2xl bg-white shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
                      <img className="h-40 w-full object-cover" alt={item.title} src={item.image} />
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="[font-family:'Montserrat',Helvetica] text-sm font-semibold text-[#111111]">
                        {item.title}
                      </p>
                      <span className="[font-family:'Montserrat',Helvetica] text-[11px] font-semibold uppercase tracking-[0.16em] text-[#6a8bc2]">
                        {item.category}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
};
