import {
  ArrowRightIcon,
  FacebookIcon,
  LinkedinIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  YoutubeIcon,
} from "lucide-react";
import React from "react";
import { LOGO_FOOTER } from "../../assets";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

const usefulLinks = [
  { name: "Home", column: 1 },
  { name: "About us", column: 1 },
  { name: "Services", column: 1 },
  { name: "Gallery", column: 1 },
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

export const FooterSection = (): JSX.Element => {
  const currentYear = new Date().getFullYear();
  const linkHrefs: Record<string, string> = {
    Home: "/",
    "About us": "/about",
    Services: "/services",
    Gallery: "/gallery",
    "Contact Us": "/contact",
    Projects: "/projects",
  };

  return (
    <footer className="w-full bg-[#586772] py-12 sm:py-[60px] px-6 sm:px-10 lg:px-20">
      <div className="max-w-[1449px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          <div className="flex flex-col">
            <img
              className="w-[220px] h-auto sm:w-[260px] lg:w-[305px] mb-6"
              alt="TAC Hydro Consultancy logo"
              src={LOGO_FOOTER}
            />

            <div className="[font-family:'Montserrat',Helvetica] font-semibold text-white text-base sm:text-lg text-justify tracking-[0] leading-7 mb-4">
              Empowering Sustainable Resources
              <br />
              Through Engineering Excellence
            </div>

            <p className="[font-family:'Montserrat',Helvetica] font-medium text-white text-sm sm:text-base text-justify tracking-[0] leading-7 mb-6">
              From the earliest conceptual sketches to the final touches on a completed project
              every step of our journey has been marked.
            </p>

            <Button
              variant="link"
              className="[font-family:'Montserrat',Helvetica] font-semibold text-white text-base sm:text-lg text-justify tracking-[0] leading-7 p-0 h-auto justify-start w-fit hover:no-underline"
            >
              Read More
              <ArrowRightIcon className="ml-2 w-4 h-4" />
            </Button>

            <div className="flex gap-6 mt-8">
              <Button
                variant="ghost"
                size="icon"
                className="h-auto w-auto p-0 hover:bg-transparent"
                aria-label="Visit TAC Hydro on Facebook"
              >
                <FacebookIcon className="w-[13px] h-6 text-white" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-auto w-auto p-0 hover:bg-transparent"
                aria-label="Visit TAC Hydro on LinkedIn"
              >
                <LinkedinIcon className="w-[23px] h-[23px] text-white" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-auto w-auto p-0 hover:bg-transparent"
                aria-label="Visit TAC Hydro on YouTube"
              >
                <YoutubeIcon className="w-[27px] h-[19px] text-white" />
              </Button>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="mb-6">
              <h3 className="[font-family:'Montserrat',Helvetica] font-extrabold text-[#f0f1ff] text-base sm:text-lg tracking-[2.00px] leading-[normal] mb-6">
                USEFUL LINKS
              </h3>
              <Separator className="bg-white/30 w-full sm:w-[165px]" />
            </div>

            <div className="grid grid-cols-2 gap-x-6 sm:gap-x-10 lg:gap-x-16 gap-y-4 sm:gap-y-5">
              {usefulLinks.map((link, index) => (
                <a
                  key={index}
                  href={linkHrefs[link.name] ?? "/about"}
                  className="[font-family:'Montserrat',Helvetica] font-semibold text-white text-sm sm:text-base lg:text-lg text-justify tracking-[0] leading-7 hover:text-[#f0f1ff] transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            <div className="mb-6">
              <h3 className="[font-family:'Montserrat',Helvetica] font-extrabold text-[#f0f1ff] text-base sm:text-lg tracking-[2.00px] leading-[normal] mb-6">
                OUR SERVICES
              </h3>
              <Separator className="bg-white/30 w-full sm:w-[165px]" />
            </div>

            <div className="flex flex-col gap-5">
              {services.map((service, index) => (
                <Button
                  key={index}
                  variant="link"
                  className="[font-family:'Montserrat',Helvetica] font-semibold text-white text-sm sm:text-base lg:text-lg text-justify tracking-[0] leading-7 p-0 h-auto justify-start hover:no-underline whitespace-normal text-left"
                >
                  {service}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            <div className="mb-6">
              <h3 className="[font-family:'Montserrat',Helvetica] font-extrabold text-[#f0f1ff] text-base sm:text-lg tracking-[2.00px] leading-[normal] mb-6">
                CONTACT INFO
              </h3>
              <Separator className="bg-white/30 w-full sm:w-[165px]" />
            </div>

            <div className="flex flex-col gap-5">
              <div className="flex gap-3 items-start">
                <MapPinIcon className="w-4 h-5 text-white flex-shrink-0 mt-1" />
                <span className="[font-family:'Montserrat',Helvetica] font-semibold text-white text-sm sm:text-base lg:text-lg text-justify tracking-[0] leading-7">
                  Kupandol, Lalitpur 44600 , Nepal
                </span>
              </div>

              <div className="flex gap-3 items-center">
                <PhoneIcon className="w-[21px] h-[21px] text-white flex-shrink-0" />
                <span className="[font-family:'Montserrat',Helvetica] font-semibold text-white text-sm sm:text-base lg:text-lg text-justify tracking-[0] leading-7 whitespace-nowrap">
                  +977 01-5422896
                </span>
              </div>

              <div className="flex gap-3 items-center">
                <MailIcon className="w-[23px] h-[17px] text-white flex-shrink-0" />
                <span className="[font-family:'Montserrat',Helvetica] font-semibold text-white text-sm sm:text-base lg:text-lg text-justify tracking-[0] leading-7 whitespace-nowrap">
                  service@tachydro.com.np
                </span>
              </div>
            </div>
          </div>
        </div>

        <Separator className="bg-white/30 my-10" />

        <div className="flex flex-col lg:flex-row justify-between items-center gap-4 text-center lg:text-left">
          <p className="[font-family:'Montserrat',Helvetica] font-normal text-white text-sm sm:text-base lg:text-lg text-justify tracking-[0] leading-7">
            ©{currentYear} TAC Hydro Consultancy Pvt Ltd. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
