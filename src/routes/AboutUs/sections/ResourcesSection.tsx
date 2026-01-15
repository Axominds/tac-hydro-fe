

export const ResourcesSection = () => {
  const dots = [0, 1, 2, 3, 4];
  const activeDot = 2;

  return (
    <section className="relative w-full overflow-hidden">
      <img
        className="absolute w-full h-full top-0 left-0 object-cover"
        alt=""
        aria-hidden="true"
        src="/downloads/mjlodvw6RB1obD/img/vector-1.png"
      />

      <div className="relative w-full pt-[23.67%] pb-[7.42%]">
        <div className="relative w-full h-full">
          <img
            className="absolute w-full h-full top-0 left-0 object-cover"
            alt=""
            aria-hidden="true"
            src="/downloads/mjlodvw6RB1obD/img/vector-4.svg"
          />

          <img
            className="absolute w-[95.05%] h-full top-0 left-0 object-cover"
            alt="Project development background"
            src="/downloads/mjlodvw6RB1obD/img/rectangle-213.png"
          />

          <div className="relative w-full px-[4.17%] pt-[21.93%] pb-[53.08%]">
            <div className="max-w-[42.63%]">
              <h2 className="font-bold text-white text-[44px] leading-[normal] mb-4">
                Project Development
              </h2>

              <p className="max-w-[89.96%] font-normal text-[#ededed] text-base leading-[normal]">
                TAC Hydro Consultancy Pvt. Ltd. is a leading engineering consultancy based in Nepal,
                specializing in hydropower and infrastructure development (...)
              </p>
            </div>
          </div>

          <div
            className="absolute bottom-[4.58%] left-1/2 -translate-x-1/2 flex items-center gap-2"
            aria-hidden="true"
          >
            {dots.map((_, index) => (
              <div
                key={`dot-${index}`}
                className={`w-2 h-2 rounded-full transition-colors ${index === activeDot ? "bg-white" : "bg-white/40"
                  }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
