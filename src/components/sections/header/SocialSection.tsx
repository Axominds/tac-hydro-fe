import { cn } from "../../../lib/utils";
import { useSiteSettings } from "../../../hooks/useSiteSettings";

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

interface SocialSectionProps {
  isScrolled: boolean;
  className?: string;
}

export const SocialSection = ({ isScrolled, className }: SocialSectionProps) => {
  const { data: settings } = useSiteSettings();

  const socialGlass = cn(
    "group relative inline-flex items-center gap-2 px-4 py-2 rounded-[28px] border border-white/30 backdrop-blur-[30px] font-semibold text-sm text-white transition-all duration-300 shadow-[0_15px_30px_rgba(0,0,0,0.25)]",
    isScrolled
      ? "bg-white/20 hover:bg-white/30"
      : "bg-white/10 hover:bg-white/20 hover:-translate-y-0.5",
  );

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {settings?.facebook_url && (
        <a
          href={settings.facebook_url}
          target="_blank"
          rel="noreferrer"
          className={socialGlass}
        >
          <FacebookIcon className="w-[20px] h-[20px] text-white" />
          <span className="sr-only">Facebook</span>
        </a>
      )}
      {settings?.linkedin_url && (
        <a
          href={settings.linkedin_url}
          target="_blank"
          rel="noreferrer"
          className={socialGlass}
        >
          <LinkedInIcon className="w-[20px] h-[20px] text-white" />
          <span className="sr-only">LinkedIn</span>
        </a>
      )}
    </div>
  );
};
