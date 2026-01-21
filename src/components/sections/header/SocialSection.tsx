import { FacebookIcon, LinkedinIcon } from "lucide-react";
import { cn } from "../../../lib/utils";

interface SocialSectionProps {
    isScrolled: boolean;
    className?: string;
}

export const SocialSection = ({ isScrolled, className }: SocialSectionProps) => {
    const socialGlass = cn(
        "group relative inline-flex items-center gap-2 px-4 py-2 rounded-[28px] border border-white/30 backdrop-blur-[30px] font-semibold text-sm text-white transition-all duration-300 shadow-[0_15px_30px_rgba(0,0,0,0.25)]",
        isScrolled
            ? "bg-white/20 hover:bg-white/30"
            : "bg-white/10 hover:bg-white/20 hover:-translate-y-0.5"
    );

    return (
        <div className={cn("flex items-center gap-2", className)}>
            <a
                href="https://www.facebook.com/tachydro"
                target="_blank"
                rel="noreferrer"
                className={socialGlass}
            >
                <FacebookIcon className="w-4 h-4" />
                <span className="sr-only">Facebook</span>
            </a>
            <a
                href="https://www.linkedin.com/company/tachydro/"
                target="_blank"
                rel="noreferrer"
                className={socialGlass}
            >
                <LinkedinIcon className="w-4 h-4" />
                <span className="sr-only">LinkedIn</span>
            </a>
        </div>
    );
};
