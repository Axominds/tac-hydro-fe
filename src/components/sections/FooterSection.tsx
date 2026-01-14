import {
  ArrowRightIcon,
  FacebookIcon,
  LinkedinIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
} from "lucide-react";

import { LOGO_FOOTER } from "../../assets";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

const usefulLinks = [
  { name: "Home", column: 1 },
  { name: "About Us", column: 1 },
  { name: "Services", column: 1 },
  { name: "Galleries", column: 1 },
  { name: "Contact Us", column: 1 },
  { name: "Projects", column: 2 },
  { name: "Team", column: 2 },
  { name: "Career", column: 2 },
  { name: "News & Articles", column: 2 },
];

const services = [
  "Project Development",
  "Project Engineering",
  "Project Management",
  "Specialized Hydromech, Works",
  "Product Development",
];

export const FooterSection = () => {
  const currentYear = new Date().getFullYear();
  const linkHrefs: Record<string, string> = {
    Home: "/",
    "About Us": "/about-us",
    Services: "/services",
    Galleries: "/galleries",
    "Contact Us": "/contact-us",
    Projects: "/projects",
  };

  return (
    <footer id="footer-section" className="w-full bg-[#6fb7e6] py-12 sm:py-[60px] px-6 sm:px-10 lg:px-20">
      <div className="max-w-[1449px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          <div className="flex flex-col">
            <img
              className="w-[220px] h-auto sm:w-[260px] lg:w-[305px] mb-6"
              alt="TAC Hydro Consultancy logo"
              src={LOGO_FOOTER}
            />

            <div className="font-semibold text-white text-base sm:text-lg leading-7 mb-4">
              Empowering Sustainable Resources Through Engineering Excellence
            </div>

            <p className="font-medium text-white text-sm sm:text-base leading-7 mb-6">
              From the earliest conceptual sketches to the final touches on a completed project
              every step of our journey has been marked.
            </p>

            <Button
              variant="link"
              className="font-semibold text-white text-base sm:text-lg leading-7 p-0 h-auto justify-start w-fit hover:no-underline"
            >
              Read More
              <ArrowRightIcon className="ml-2 w-4 h-4" />
            </Button>

            <div className="flex gap-4 mt-8">
              <a
                href="https://www.facebook.com/tachydro"
                target="_blank"
                rel="noreferrer"
                aria-label="Visit TAC Hydro on Facebook"
                className="flex h-auto w-auto items-center justify-center rounded-full border border-white/20 p-2 text-white hover:border-white/60"
              >
                <FacebookIcon className="w-[18px] h-[18px] text-white" />
              </a>
              <a
                href="https://www.linkedin.com/company/tachydro/"
                target="_blank"
                rel="noreferrer"
                aria-label="Visit TAC Hydro on LinkedIn"
                className="flex h-auto w-auto items-center justify-center rounded-full border border-white/20 p-2 text-white hover:border-white/60"
              >
                <LinkedinIcon className="w-[20px] h-[20px] text-white" />
              </a>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="mb-6">
              <h3 className="font-extrabold text-[#f0f1ff] text-base sm:text-lg tracking-[2.00px] leading-[normal] mb-6">
                USEFUL LINKS
              </h3>
              <Separator className="bg-white/30 w-full sm:w-[165px]" />
            </div>

            <div className="grid grid-cols-2 gap-x-6 sm:gap-x-10 lg:gap-x-16 gap-y-4 sm:gap-y-5">
              {usefulLinks.map((link, index) => (
                <a
                  key={index}
                  href={linkHrefs[link.name] ?? "/about-us"}
                  target={link.name === "Facebook" || link.name === "LinkedIn" ? "_blank" : undefined}
                  rel={link.name === "Facebook" || link.name === "LinkedIn" ? "noreferrer" : undefined}
                  className="font-semibold text-white text-sm sm:text-base lg:text-lg leading-7 hover:text-[#f0f1ff] transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            <div className="mb-6">
              <h3 className="font-extrabold text-[#f0f1ff] text-base sm:text-lg tracking-[2.00px] leading-[normal] mb-6">
                OUR SERVICES
              </h3>
              <Separator className="bg-white/30 w-full sm:w-[165px]" />
            </div>

            <div className="flex flex-col gap-5">
              {services.map((service, index) => (
                <Button
                  key={index}
                  variant="link"
                  className="font-semibold text-white text-sm sm:text-base lg:text-lg leading-7 p-0 h-auto justify-start hover:no-underline whitespace-normal text-left"
                >
                  {service}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            <div className="mb-6">
              <h3 className="font-extrabold text-[#f0f1ff] text-base sm:text-lg tracking-[2.00px] leading-[normal] mb-6">
                CONTACT INFO
              </h3>
              <Separator className="bg-white/30 w-full sm:w-[165px]" />
            </div>

            <div className="flex flex-col gap-5">
              <div className="flex gap-3 items-start">
                <MapPinIcon className="w-4 h-5 text-white flex-shrink-0 mt-1" />
                <span className="font-semibold text-white text-sm sm:text-base lg:text-lg leading-7">
                  Kupandol, Lalitpur 44600 , Nepal
                </span>
              </div>

              <div className="flex gap-3 items-center">
                <PhoneIcon className="w-[21px] h-[21px] text-white flex-shrink-0" />
                <span className="font-semibold text-white text-sm sm:text-base lg:text-lg leading-7 whitespace-nowrap">
                  +977 01-5422896
                </span>
              </div>

              <div className="flex gap-3 items-center">
                <MailIcon className="w-[23px] h-[17px] text-white flex-shrink-0" />
                <span className="font-semibold text-white text-sm sm:text-base lg:text-lg leading-7 whitespace-nowrap">
                  service@tachydro.com.np
                </span>
              </div>
            </div>
          </div>
        </div>

        <Separator className="bg-white/30 my-10" />

        <div className="flex flex-col lg:flex-row justify-between items-center gap-4 text-center lg:text-left">
          <p className="font-normal text-white text-sm sm:text-base lg:text-lg leading-7">
            ©{currentYear} TAC Hydro Consultancy Pvt Ltd. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
