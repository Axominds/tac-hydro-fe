import { Globe, Share2 } from "lucide-react";
import { cn } from "../../../lib/utils";
import { useSiteSettings } from "../../../hooks/useSiteSettings";

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
          <Globe className="w-4 h-4" />
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
          <Share2 className="w-4 h-4" />
          <span className="sr-only">LinkedIn</span>
        </a>
      )}
    </div>
  );
};
