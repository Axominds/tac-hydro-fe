import { FacebookIcon, LinkedinIcon, MailIcon, MapPinIcon, PhoneIcon, ArrowUp } from "lucide-react";

import { LOGO_FOOTER } from "../../assets";
import { Separator } from "../ui/separator";
import { ProjectScope } from "../../routes/Projects/data/projectData";

const projectScopes: ProjectScope[] = [
  "Detailed Feasibility Study",
  "Detailed Engineering Design",
  "Construction Supervision",
  "Due Diligence Appraisal",
  "Progress Monitoring and Bill Vetting",
];

export const FooterSection = () => {
  const currentYear = new Date().getFullYear();

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer
      id="footer-section"
      className="w-full bg-[#1a365d] py-12 sm:py-[60px] px-6 sm:px-10 lg:px-20"
    >
      <div className="max-w-[1449px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          <div className="flex flex-col">
            <img
              className="w-[220px] h-auto sm:w-[260px] lg:w-[305px] mb-6"
              alt="TAC Hydro Consultancy logo"
              src={LOGO_FOOTER}
              loading="lazy"
              decoding="async"
            />

            <div className="font-semibold text-white text-base sm:text-lg leading-7 mb-4">
              Empowering Sustainable Resources Through Engineering Excellence
            </div>

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

          {/* Spacer column to push content to the right on desktop */}
          <div className="hidden lg:block"></div>

          <div className="flex flex-col">
            <div className="mb-6">
              <h3 className="font-extrabold text-[#f0f1ff] text-base sm:text-lg tracking-[2.00px] leading-[normal] mb-6">
                OUR PROJECTS
              </h3>
              <Separator className="bg-white/30 w-full sm:w-[165px]" />
            </div>

            <div className="flex flex-col gap-4">
              {projectScopes.map((scope, index) => (
                <a
                  key={index}
                  href={`/projects?scope=${encodeURIComponent(scope)}`}
                  className="font-semibold text-white text-sm sm:text-base lg:text-lg leading-6 hover:text-blue-400 transition-colors whitespace-normal text-left decoration-0"
                >
                  {scope}
                </a>
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
                  Sanepa - 02, Lalitpur 44600 , Nepal
                </span>
              </div>

              <div className="flex gap-3 items-center">
                <PhoneIcon className="w-[21px] h-[21px] text-white flex-shrink-0" />
                <span className="font-semibold text-white text-sm sm:text-base lg:text-lg leading-7 whitespace-nowrap">
                  +977 01-5439239
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
          <button
            onClick={handleScrollToTop}
            className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-white/40 text-white hover:bg-white/10 transition-all transform hover:scale-110 active:scale-95"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-6 h-6" />
          </button>
        </div>
      </div>
    </footer>
  );
};
