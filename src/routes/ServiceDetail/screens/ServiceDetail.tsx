import React, { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { FooterSection } from "../../../components/sections/FooterSection";
import { SiteHeader } from "../../../components/sections/SiteHeader";
import { HERO_BG_PRIMARY } from "../../../assets";

const navigationItems = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  { label: "Projects", href: "/projects" },
  { label: "Services", href: "/services", isActive: true },
  { label: "Galleries", href: "/galleries" },
  { label: "Contact Us", href: "/contact-us" },
];

const detailItems = [
  {
    slug: "project-identification",
    title: "Project Identification",
    heroImage: "/downloads/mjlodvw6RB1obD/img/mask-group.png",
    galleryImages: [
      "/downloads/mjlodvw6RB1obD/img/mask-group-5.png",
      "/downloads/mjlodvw6RB1obD/img/mask-group-6.png",
    ],
  },
  {
    slug: "desk-study",
    title: "Desk Study",
    heroImage: "/downloads/mjlodvw6RB1obD/img/mask-group-1.png",
    galleryImages: [
      "/downloads/mjlodvw6RB1obD/img/mask-group-4.png",
      "/downloads/mjlodvw6RB1obD/img/rectangle-218.png",
    ],
  },
  {
    slug: "topographical-survey",
    title: "Topographical Survey",
    heroImage: "/downloads/mjlodvw6RB1obD/img/clip-path-group.png",
    galleryImages: [
      "/downloads/mjlodvw6RB1obD/img/mask-group-2.png",
      "/downloads/mjlodvw6RB1obD/img/mask-group-3.png",
    ],
  },
  {
    slug: "feasibility-study",
    title: "Feasibility Study",
    heroImage: "/downloads/mjlodvw6RB1obD/img/mask-group-2.png",
    galleryImages: [
      "/downloads/mjlodvw6RB1obD/img/mask-group.png",
      "/downloads/mjlodvw6RB1obD/img/mask-group-1.png",
    ],
  },
  {
    slug: "due-diligence",
    title: "Due Diligence",
    heroImage: "/downloads/mjlodvw6RB1obD/img/mask-group-3.png",
    galleryImages: [
      "/downloads/mjlodvw6RB1obD/img/mask-group-4.png",
      "/downloads/mjlodvw6RB1obD/img/mask-group-5.png",
    ],
  },
];

const detailCopy = [
  "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia.",
  "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.",
  "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
  "The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
];

const detailBullets = [
  "Tying up the construction site, including cleaning and removing any debris or hazards.",
  "Transferring and getting ready the project's supplies.",
  "Confirming the schedule with all field stakeholders.",
];

export const ServiceDetail = (): JSX.Element => {
  const location = useLocation();
  const activeSlug = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return params.get("item") || detailItems[0].slug;
  }, [location.search]);
  const activeItem = detailItems.find((item) => item.slug === activeSlug) || detailItems[0];

  return (
    <div className="w-full relative bg-[#f8f9fa]">
      <section className="relative w-full min-h-[260px] sm:min-h-[320px] lg:h-[360px]">
        <img
          className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none"
          alt="Service detail hero"
          src={HERO_BG_PRIMARY}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b1522]/85 via-[#0b1522]/45 to-[#0b1522]/85 pointer-events-none" />
        <SiteHeader navigationItems={navigationItems} />
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center">
          <span className="text-[11px] font-semibold uppercase tracking-[0.35em] text-white/70 mb-3">
            SERVICE DETAIL
          </span>
          <h1 className="font-semibold text-white text-3xl sm:text-4xl lg:text-[48px] leading-[1.1]">
            {activeItem.title}
          </h1>
        </div>
      </section>

      <section className="relative w-full bg-[#f8f9fa] py-12">
        <div className="mx-auto w-full px-6 sm:px-10 lg:px-20">
          <div className="flex flex-wrap items-center gap-3 mb-8">
            {detailItems.map((item) => (
              <Link
                key={item.slug}
                to={`/service-detial?item=${item.slug}`}
                className={`rounded-full border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] transition-colors ${item.slug === activeItem.slug
                    ? "border-[#0070c0] bg-[#0070c0] text-white"
                    : "border-[#d9d9d9] bg-white text-[#6b6b6b] hover:border-[#0070c0] hover:text-[#0070c0]"
                  }`}
              >
                {item.title}
              </Link>
            ))}
          </div>

          <div className="bg-white p-0">
            <div className="relative w-full max-w-[1100px] mx-auto overflow-hidden rounded-2xl">
              <img
                className="h-[240px] sm:h-[320px] lg:h-[400px] w-full object-cover"
                alt={activeItem.title}
                src={activeItem.heroImage}
              />
            </div>

            <div className="mt-6 space-y-4 text-sm text-[#4b5563]">
              {detailCopy.map((line) => (
                <p key={line} className="leading-[1.7]">
                  {line}
                </p>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
              {activeItem.galleryImages.map((image, index) => (
                <div
                  key={`${image}-${index}`}
                  className="aspect-[2/1] overflow-hidden rounded-3xl shadow-[0_12px_28px_rgba(15,23,42,0.12)]"
                >
                  <img className="h-full w-full object-cover" alt="Service detail" src={image} />
                </div>
              ))}
            </div>

            <ul className="mt-6 list-disc pl-5 text-sm text-[#4b5563] space-y-2">
              {detailBullets.map((bullet) => (
                <li key={bullet} className="leading-[1.7]">
                  {bullet}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
};
