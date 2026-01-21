import { ArrowDown } from "lucide-react";

interface ScrollDownArrowProps {
    targetId: string;
    className?: string;
}

export const ScrollDownArrow = ({ targetId, className = "" }: ScrollDownArrowProps) => {
    const scrollToTarget = () => {
        const target = document.getElementById(targetId);
        if (!target) return;

        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 1500;
        let start: number | null = null;

        const easeInOutQuart = (t: number) => {
            return t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;
        };

        const animation = (currentTime: number) => {
            if (start === null) start = currentTime;
            const timeElapsed = currentTime - start;
            const run = easeInOutQuart(Math.min(timeElapsed / duration, 1)) * distance + startPosition;
            window.scrollTo(0, run);
            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        };

        requestAnimationFrame(animation);
    };

    return (
        <button
            type="button"
            onClick={scrollToTarget}
            aria-label={`Scroll to ${targetId.replace(/-/g, " ")}`}
            className={`absolute bottom-20 right-12 w-16 h-16 flex items-center justify-center rounded-full bg-white text-blue-600 shadow-2xl border border-slate-100 transition-all duration-300 hover:bg-blue-600 hover:text-white hover:-translate-y-2 hover:shadow-blue-200/50 group z-30 ${className}`}
        >
            <ArrowDown className="w-8 h-8 animate-bounce group-hover:animate-none" />
        </button>
    );
};
