import React from "react";
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
  { number: "80+", label: "projects", description: "We recently done our 80+ quality project" },
  { number: "90+", label: "team", description: "My agency consists of 90+ team members" },
  { number: "7k+", label: "clients", description: "Our happy client our service" },
];

export const Homepage = (): JSX.Element => {
  return (
    <div className="w-full min-w-[1440px] relative bg-white animate-fade-in opacity-0">
      {/* Hero Section with Header */}
      <section className="relative w-full h-[400px]">
        <img
          className="absolute top-0 left-0 w-full h-full object-cover"
          alt="Hero Background"
          src={HERO_BG_PRIMARY}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#2c3e50]/80 to-[#34495e]/80" />

        {/* Header Navigation */}
        <SiteHeader navigationItems={navigationItems} />

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-[calc(100%-123px)] text-center">
          <h1 className="[font-family:'Playfair_Display',Helvetica] font-bold italic text-white text-[56px] tracking-[0] leading-[normal] mb-4">
            Our Vision Unveiled
          </h1>
          <p className="[font-family:'Montserrat',Helvetica] font-normal text-white text-xl tracking-[0] leading-[normal]">
            Explore the dream of our chair, our commitment to natural
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
          <Button className="mt-6 h-auto px-8 py-3 bg-[#f39c12] hover:bg-[#e67e22] text-white rounded-md [font-family:'Montserrat',Helvetica] font-bold text-base">
            Book appointment
          </Button>
        </div>
      </section>

      {/* Message From Top Level Section */}
      <section className="relative w-full py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="bg-[#2d5f4f] rounded-lg p-12 text-white">
                <h3 className="[font-family:'Montserrat',Helvetica] font-bold text-white text-2xl mb-2">
                  Message <span className="text-[#4ade80]">From</span> Top Level
                </h3>
                <p className="[font-family:'Montserrat',Helvetica] font-normal text-white text-base leading-[28px] mb-6">
                  As the chairman of TAC Hydro Consultancy, I am thrilled to welcome you to our
                  website. Our company specializes in providing expert consultancy services for
                  project identification and feasibility studies, with a particular focus on the
                  hydropower sector. We are dedicated to helping our clients navigate the
                  complexities of project development, ensuring that every project we undertake is
                  both viable and sustainable.
                </p>
                <p className="[font-family:'Montserrat',Helvetica] font-normal text-white text-base leading-[28px] mb-6">
                  We understand the importance of tailoring our services to meet the specific needs
                  of each client. Our team of experts brings a wealth of experience and knowledge to
                  the table, combined with our commitment to ethical and sustainable practices. We
                  look forward to working with you and your next project!
                </p>
                <p className="[font-family:'Montserrat',Helvetica] font-normal text-white text-base leading-[28px] mb-6">
                  We are excited to work with you and we bring your hydropower project to fruition.
                  We look forward to working with you on your next project!
                </p>
                <Button className="mt-4 h-auto px-6 py-2.5 bg-[#4ade80] hover:bg-[#22c55e] text-[#2d5f4f] rounded-md [font-family:'Montserrat',Helvetica] font-bold text-sm">
                  Let's talk
                </Button>
                <div className="mt-8 pt-6 border-t border-white/20">
                  <p className="[font-family:'Montserrat',Helvetica] font-bold text-white text-lg">
                    John Doe
                  </p>
                  <p className="[font-family:'Montserrat',Helvetica] font-normal text-white/80 text-sm">
                    Managing Director (MD)
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <img
                className="w-full h-[600px] object-cover rounded-lg shadow-lg"
                alt="Managing Director"
                src="/downloads/mjlodvw6RB1obD/img/mask-group-2.png"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative w-full py-16 bg-[#f8f9fa]">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="[font-family:'Montserrat',Helvetica] font-bold text-[#2c3e50] text-[72px] tracking-[0] leading-[normal] mb-2">
                  {stat.number}
                  <span className="[font-family:'Montserrat',Helvetica] font-normal text-[#2c3e50] text-[36px]">
                    {stat.label}
                  </span>
                </div>
                <p className="[font-family:'Montserrat',Helvetica] font-normal text-[#555555] text-base tracking-[0] leading-[normal]">
                  {stat.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="relative w-full py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="relative">
              <img
                className="w-full h-[500px] object-cover rounded-lg shadow-lg"
                alt="Vision"
                src="/downloads/mjlodvw6RB1obD/img/image-3-1.png"
              />
            </div>

            <div className="space-y-8">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-[#0070c0] rounded-full flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </div>
                  <h3 className="[font-family:'Montserrat',Helvetica] font-bold text-[#0070c0] text-2xl tracking-[0] leading-[normal]">
                    Vision
                  </h3>
                </div>
                <p className="[font-family:'Montserrat',Helvetica] font-normal text-[#555555] text-base leading-[28px]">
                  From the earliest conceptual sketches to the final touches on a completed project
                  every step of our journey has been marked by a commitment to excellence and a
                  passion for creating spaces that inspire. Our vision is to be the leading
                  consultancy firm in the hydropower sector, recognized for our innovative solutions
                  and sustainable practices.
                </p>
              </div>

              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-[#0070c0] rounded-full flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="[font-family:'Montserrat',Helvetica] font-bold text-[#0070c0] text-2xl tracking-[0] leading-[normal]">
                    Mission
                  </h3>
                </div>
                <p className="[font-family:'Montserrat',Helvetica] font-normal text-[#555555] text-base leading-[28px]">
                  When our power of choice is untrammelled and when nothing prevents us being able
                  to do what we like best, every pleasure is to be welcomed and every pain avoided.
                  But in certain circumstances and owing to the claims of duty or the obligations of
                  business it will frequently occur that pleasures have to be repudiated and
                  annoyances accepted.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative w-full py-20 bg-[#f0f4f8]">
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
          <Button className="h-auto px-10 py-4 bg-[#2d5f4f] hover:bg-[#234a3d] text-white rounded-md [font-family:'Montserrat',Helvetica] font-bold text-lg">
            CONTACT US
          </Button>
        </div>
      </section>

      <FooterSection />
    </div>
  );
};
