import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import { FooterSection } from "../../../components/sections/FooterSection";
import { SiteHeader } from "../../../components/sections/SiteHeader";
import { HERO_BG_PRIMARY } from "../../../assets";

const navigationItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about", isActive: true },
  { label: "Project", href: "/projects" },
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/gallery" },
];

const stats = [
  { number: "80", label: "+projects", description: "We recently done our 80+ quality project" },
  { number: "90", label: "+team", description: "My agency consists of 90+ team members" },
  { number: "7k", label: "+clients", description: "Our happy client our service" },
];

export const Homepage = (): JSX.Element => {
  const [counts, setCounts] = useState(() => stats.map(() => 0));
  const [statsAnimationSeed, setStatsAnimationSeed] = useState(0);
  const statsSectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!statsSectionRef.current) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsAnimationSeed((prev) => prev + 1);
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(statsSectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (statsAnimationSeed === 0) {
      return;
    }
    const targets = stats.map((stat) => parseFloat(stat.number) || 0);
    const duration = 1200;
    const startTime = performance.now();
    let frameId = 0;

    setCounts(stats.map(() => 0));

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      setCounts(targets.map((value) => Math.floor(value * progress)));
      if (progress < 1) {
        frameId = window.requestAnimationFrame(tick);
      }
    };

    frameId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frameId);
  }, [statsAnimationSeed]);

  return (
    <div className="w-full min-w-[1440px] relative bg-white">
      {/* Hero Section with Header */}
      <section className="relative w-full h-[560px]">
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
          <span className="[font-family:'Montserrat',Helvetica] text-[11px] font-semibold uppercase tracking-[0.35em] text-white/70 mb-4">
            ABOUT
          </span>
          <h1 className="[font-family:'Playfair_Display',Helvetica] font-semibold italic text-white text-[60px] tracking-[0] leading-[1.05] mb-6">
            Our Vision Unveiled
          </h1>
          <p className="[font-family:'Montserrat',Helvetica] font-normal text-white/75 text-[17px] tracking-[0] leading-[normal] max-w-[560px]">
            Explore the origin of our craft, our commitment to natural
          </p>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="relative w-full py-20 bg-[#f8f9fa]">
        <div className="max-w-[900px] mx-auto px-8 text-center">
          <h2 className="[font-family:'Playfair_Display',Helvetica] font-bold italic text-[#2c3e50] text-[44px] tracking-[0] leading-[normal] mb-6">
            Who we are
          </h2>
          <p className="[font-family:'Montserrat',Helvetica] font-normal text-[#555555] text-lg tracking-[0] leading-[32px] mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent
            libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum
            imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper
            porta. Mauris massa. Vestibulum lacinia arcu eget nulla.
          </p>
        </div>
      </section>

      {/* Chairperson Section */}
      <section className="relative w-full py-20 pt-0 pb-0">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="relative lg:min-h-[620px]">
            <div className="bg-[#2f5f4a] rounded-xl p-6 text-white lg:w-[850px] lg:h-[596px] lg:pr-[340px]">
              <h3 className="[font-family:'Montserrat',Helvetica] font-bold text-white text-[19px] mb-2">
                Message <span className="text-white">From</span> Top Level
              </h3>
              <p className="[font-family:'Montserrat',Helvetica] font-normal text-white/90 text-[16px] leading-[24px] mb-2.5">
                As the Chairman of TAC Hydro Consultancy, I am thrilled to welcome you to our
                website. Our company specializes in providing expert consultancy services for
                project identification, design, construction monitoring, bill verification and
                rehabilitation of hydropower projects.
              </p>
              <p className="[font-family:'Montserrat',Helvetica] font-normal text-white/90 text-[16px] leading-[24px] mb-2.5">
                We understand the importance of meeting sustainable and clean energy sources, and
                we are dedicated to helping our clients achieve their goals in this field. Our team
                of experts has extensive experience and knowledge in the industry, and we are
                committed to providing the highest level of service and professionalism.
              </p>
              <p className="[font-family:'Montserrat',Helvetica] font-normal text-white/90 text-[16px] leading-[24px] mb-4">
                We take pride in our ability to deliver innovative and cost-effective solutions for
                our clients. Our goal is to help you achieve your project objectives and meet your
                specific needs.
              </p>
              <Button className="mt-[35px] h-auto px-6 py-2.5 bg-[#22c55e] hover:bg-[#16a34a] text-white rounded-md [font-family:'Montserrat',Helvetica] font-bold text-xs">
                Let's talk
              </Button>
              <div className="mt-4 flex items-center justify-end">
                <div className="text-right">
                  <p className="[font-family:'Montserrat',Helvetica] font-semibold text-white text-[16px]">
                      Kumar Panday
                  </p>
                  <p className="[font-family:'Montserrat',Helvetica] font-normal text-white/80 text-[15px]">
                    Executive Chairma
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-16 flex justify-center lg:absolute lg:right-[-8px] lg:top-[-32px] lg:mt-0">
              <img
                className="w-[502px] h-[596px] object-cover object-top rounded-[5px] opacity-100 shadow-[0_18px_30px_rgba(0,0,0,0.25)]"
                alt="Managing Director"
                src="/chairperson.png"
              />
            </div>
          </div>

        </div>
      </section>

      <section className="relative w-full bg-white pt-0 pb-12">
        <div className="mx-auto w-[1402.3663px] h-[556.1921px] opacity-100 px-8 py-10">
          <div className="grid h-full grid-cols-1 lg:grid-cols-[0.65fr_1.35fr] gap-8 items-start">
            <div className="overflow-hidden rounded-[10px] shadow-[0_18px_30px_rgba(0,0,0,0.2)] opacity-100 -mt-20 relative z-20">
              <img
                className="w-[540.6107px] h-[556.1921px] object-cover"
                alt="Safety helmet"
                src="/downloads/mjlodvw6RB1obD/img/mask-group-5.png"
              />
            </div>

            <div
              className="flex flex-col gap-6 opacity-100 w-[803.3657px] h-[402.3088px] p-6"
              ref={statsSectionRef}
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
                {stats.map((stat, index) => (
                  <div key={index} className="text-left w-[222.8271px] h-[181.039px] opacity-100">
                    <div className="relative w-[200px] h-[120px] opacity-100">
                      <span className="[font-family:'Gothic_A1',Helvetica] font-bold text-[#4f4f4f] text-[140px] leading-[130px]">
                        {counts[index]}
                        {stat.number.replace(/[0-9.]/g, "")}
                      </span>
                      <span className="[font-family:'Gothic_A1',Helvetica] font-medium text-[#4f4f4f] text-[19px] leading-none tracking-[0] w-[83px] h-[23px] opacity-100 absolute right-[12px] top-[44px] bg-white flex items-center justify-center">
                        {stat.label}
                      </span>
                    </div>
                    <p className="[font-family:'Gothic_A1',Helvetica] font-medium text-[#6b6b6b] text-[20px] leading-[1] tracking-[0] mt-1 max-w-[200px]">
                      {stat.description}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-5">
                <div className="grid grid-cols-[80px_1fr] gap-4 items-start">
                  <span className="[font-family:'Gothic_A1',Helvetica] font-bold text-[#0070c0] text-[20px] leading-[1] tracking-[0]">
                    Vision
                  </span>
                  <p className="[font-family:'Gothic_A1',Helvetica] font-normal text-[#666666] text-[18px] leading-[28px] tracking-[0] text-justify">
                    From the earliest conceptual sketches to the final touches on a completed project
                    every step of our journey has been marked.
                  </p>
                </div>
                <div className="grid grid-cols-[80px_1fr] gap-4 items-start border-t border-[#d9d9d9] pt-4">
                  <span className="[font-family:'Gothic_A1',Helvetica] font-bold text-[#0070c0] text-[20px] leading-[1] tracking-[0]">
                    Mission
                  </span>
                  <p className="[font-family:'Gothic_A1',Helvetica] font-normal text-[#666666] text-[18px] leading-[28px] tracking-[0] text-justify">
                    When our power of choice is untrammelled and when nothing prevents our being able
                    to do what we like best every pleasure it.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative w-full py-20 bg-[#F4F1E1]">
        <div className="max-w-[900px] mx-auto px-8 text-center">
          <h2 className="[font-family:'Playfair_Display',Helvetica] font-bold italic text-[#2c3e50] text-[44px] tracking-[0] leading-[normal] mb-4">
            We make every trip a harmonious
          </h2>
          <h2 className="[font-family:'Playfair_Display',Helvetica] font-bold italic text-[#2c3e50] text-[44px] tracking-[0] leading-[normal] mb-6">
            blend of comfort and discovery.
          </h2>
          <p className="[font-family:'Montserrat',Helvetica] font-normal text-[#555555] text-lg tracking-[0] leading-[normal] mb-8">
            Start your adventure with Armonia - contact us now!
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center w-[360px] h-[66.125px] opacity-100"
          >
            <img className="w-full h-full object-contain" alt="Contact us" src="/button.png" />
          </Link>
        </div>
      </section>

      <FooterSection />
    </div>
  );
};
