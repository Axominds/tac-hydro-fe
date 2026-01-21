import { useEffect, useState, useCallback } from "react";
import { ArrowDown } from "lucide-react";

interface MoveDownSectionProps {
    sections: string[];
    footerId?: string;
}

export const MoveDownSection = ({ sections, footerId = "footer-section" }: MoveDownSectionProps) => {
    const [targetId, setTargetId] = useState<string | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    const updateTarget = useCallback(() => {
        const scrollPosition = window.scrollY + window.innerHeight / 2;

        let currentSectionIndex = -1;

        for (let i = 0; i < sections.length; i++) {
            const section = document.getElementById(sections[i]);
            if (section) {
                const { top, bottom } = section.getBoundingClientRect();
                const absoluteTop = top + window.scrollY;
                const absoluteBottom = bottom + window.scrollY;

                if (scrollPosition >= absoluteTop && scrollPosition <= absoluteBottom) {
                    currentSectionIndex = i;
                    break;
                }
            }
        }

        if (currentSectionIndex !== -1 && currentSectionIndex < sections.length - 1) {
            setTargetId(sections[currentSectionIndex + 1]);
            setIsVisible(true);
        } else {
            setTargetId(null);
            setIsVisible(false);
        }

        // Hide if near footer
        const footer = document.getElementById(footerId);
        if (footer) {
            const footerTop = footer.getBoundingClientRect().top;
            if (footerTop < window.innerHeight) {
                setIsVisible(false);
            }
        }
    }, [sections, footerId]);

    useEffect(() => {
        window.addEventListener("scroll", updateTarget, { passive: true });
        window.addEventListener("resize", updateTarget);

        // Initial check
        const timer = setTimeout(updateTarget, 100);

        return () => {
            window.removeEventListener("scroll", updateTarget);
            window.removeEventListener("resize", updateTarget);
            clearTimeout(timer);
        };
    }, [updateTarget]);

    const handleScroll = () => {
        if (!targetId) return;
        const targetElement = document.getElementById(targetId);
        if (!targetElement) return;

        const targetPosition = targetElement.offsetTop;
        const startPosition = window.scrollY;
        const distance = targetPosition - startPosition;
        const duration = 1200;
        let start: number | null = null;

        const easeInOutQuart = (t: number) =>
            t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;

        const animation = (currentTime: number) => {
            if (start === null) start = currentTime;
            const timeElapsed = currentTime - start;
            const progress = Math.min(timeElapsed / duration, 1);
            const ease = easeInOutQuart(progress);

            window.scrollTo(0, startPosition + distance * ease);

            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        };

        requestAnimationFrame(animation);
    };

    if (!isVisible || !targetId) return null;

    return (
        <button
            onClick={handleScroll}
            className="fixed bottom-8 right-8 z-[100] flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-2xl transition-all duration-300 hover:bg-blue-700 hover:scale-110 active:scale-95 animate-bounce md:bottom-12 md:right-12"
            aria-label="Scroll to next section"
        >
            <ArrowDown className="h-6 w-6" />
        </button>
    );
};
