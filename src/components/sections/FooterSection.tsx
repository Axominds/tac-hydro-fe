"use client";

import { Mail, MapPin, Phone, ArrowUp } from "lucide-react";

import { LOGO_FOOTER } from "../../assets";
import { Separator } from "../ui/separator";
import { useSiteSettings } from "../../hooks/useSiteSettings";
import { useProjectScopes } from "../../hooks/useProjectScopes";

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
    <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.5-3.89 3.79-3.89 1.1 0 2.25.2 2.25.2v2.46h-1.27c-1.25 0-1.64.78-1.64 1.58V12h2.8l-.45 2.89h-2.35v6.99A10 10 0 0 0 22 12Z" />
  </svg>
);

const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.32 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.1 20.45H3.53V9H7.1v11.45ZM22.23 0H1.77C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.2 0 22.23 0Z" />
  </svg>
);

export const FooterSection = () => {
  const { data: settings } = useSiteSettings();
  const { data: projectScopes } = useProjectScopes();
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
      className="w-full bg-[#254a85] py-12 sm:py-[60px] px-6 sm:px-10 lg:px-20"
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
              {settings?.tagline}
            </div>

            <div className="flex gap-4 mt-8">
              {settings?.facebook_url && (
                <a
                  href={settings.facebook_url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Visit TAC Hydro on Facebook"
                  className="flex h-auto w-auto items-center justify-center rounded-full border border-white/20 p-2 text-white hover:border-white/60"
                >
                  <FacebookIcon className="w-[24px] h-[24px] text-white" />
                </a>
              )}
              {settings?.linkedin_url && (
                <a
                  href={settings.linkedin_url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Visit TAC Hydro on LinkedIn"
                  className="flex h-auto w-auto items-center justify-center rounded-full border border-white/20 p-2 text-white hover:border-white/60"
                >
                  <LinkedInIcon className="w-[20px] h-[20px] text-white" />
                </a>
              )}
            </div>
          </div>

          <div className="hidden lg:block"></div>

          <div className="flex flex-col">
            <div className="mb-6">
              <h3 className="font-extrabold text-[#f0f1ff] text-base sm:text-lg tracking-[2.00px] leading-[normal] mb-6">
                OUR PROJECTS
              </h3>
              <Separator className="bg-white/30 w-full sm:w-[165px]" />
            </div>

            <div className="flex flex-col gap-4">
              {projectScopes?.map((scope) => (
                <a
                  key={scope.id}
                  href={`/projects?scope=${encodeURIComponent(scope.name)}`}
                  className="font-semibold text-white text-sm sm:text-base lg:text-lg leading-6 hover:text-blue-400 transition-colors whitespace-normal text-left decoration-0"
                >
                  {scope.name}
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
              {settings?.address && (
                <a
                  href="/contact-us#location-map"
                  className="flex gap-3 items-start hover:text-blue-400 transition-colors group"
                >
                  <MapPin className="w-4 h-5 text-white flex-shrink-0 mt-1 group-hover:text-blue-400 transition-colors" />
                  <span className="font-semibold text-white text-sm sm:text-base lg:text-lg leading-7 group-hover:text-blue-400 transition-colors">
                    {settings.address}
                  </span>
                </a>
              )}

              {settings?.phone && (
                <a
                  href={`tel:${settings.phone.replace(/\D/g, "")}`}
                  className="flex gap-3 items-center hover:text-blue-400 transition-colors group"
                >
                  <Phone className="w-[21px] h-[21px] text-white flex-shrink-0 group-hover:text-blue-400 transition-colors" />
                  <span className="font-semibold text-white text-sm sm:text-base lg:text-lg leading-7 whitespace-nowrap group-hover:text-blue-400 transition-colors">
                    {settings.phone}
                  </span>
                </a>
              )}

              {settings?.contact_email && (
                <a
                  href={`mailto:${settings.contact_email}`}
                  className="flex gap-3 items-center hover:text-blue-400 transition-colors group"
                >
                  <Mail className="w-[23px] h-[17px] text-white flex-shrink-0 group-hover:text-blue-400 transition-colors" />
                  <span className="font-semibold text-white text-sm sm:text-base lg:text-lg leading-7 whitespace-nowrap group-hover:text-blue-400 transition-colors">
                    {settings.contact_email}
                  </span>
                </a>
              )}
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
