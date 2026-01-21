import { Button } from "../../../../components/ui/button";

export const ServicesSection = () => {
  return (
    <section
      id="services"
      className="relative w-full flex items-center gap-5 py-16 px-8 border border-solid border-black shadow-[0px_4px_4px_#00000040,0px_4px_4px_#00000040]"
    >
      <div className="flex items-center gap-12 max-w-7xl mx-auto w-full">
        <div className="flex-shrink-0">
          <img
            className="w-[566px] h-[315.33px]"
            alt="Vector"
            src="/downloads/mjlodvw6RB1obD/img/vector.png"
          />
        </div>

        <div className="flex flex-col gap-6 flex-1">
          <div className="font-normal text-[#6b8f7b] text-xs leading-[normal]">
            SCHEDULE A CONSULTATION TODAY
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="font-bold text-[#1f3d2b] text-4xl leading-[normal]">
              Start Your Journey To
            </h2>
            <h2 className="font-bold text-[#1f3d2b] text-4xl leading-[normal]">
              Talent Excellence
            </h2>
          </div>

          <div className="flex flex-col gap-1">
            <p className="font-normal text-[#5f6f66] text-sm leading-[normal]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
            <p className="font-normal text-[#5f6f66] text-sm leading-[normal]">
              Ut elit tellus, luctus nec ullamcorper mattis.
            </p>
          </div>

          <div className="mt-2">
            <Button className="bg-[#6b8f7b] hover:bg-[#5a7a68] text-white h-auto px-6 py-3 rounded-md font-bold text-sm leading-[normal]">
              Get A Quote →
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
