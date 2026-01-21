import { HeroWave } from "./HeroWave";

interface BannerSectionProps {
  title?: string;
  description?: string;
}

export const BannerSection = ({
  title = "ABOUT TAC HYDRO",
  description = "LEADING ENGINEERING INNOVATION SINCE 2005",
}: BannerSectionProps) => {
  return (
    <section className="relative w-full min-h-[360px] sm:min-h-[460px] lg:h-[560px]">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0b1522] via-[#15233e] to-[#0b1522]" />


      {/* Hero Content */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center">
        <h1 className="font-semibold text-white text-3xl sm:text-4xl lg:text-[60px] leading-[1.05] mb-6">
          {title}
        </h1>
        <p className="font-normal text-white/75 text-sm sm:text-base lg:text-[17px] leading-[normal] max-w-[560px] px-4">
          {description}
        </p>
      </div>
      <HeroWave className="text-white/70" />
    </section>
  );
};


