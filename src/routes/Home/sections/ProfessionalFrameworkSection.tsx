import { frameworkItems } from "../../../data/frameworkItems";

export const ProfessionalFrameworkSection = () => {
  return (
    <section
      id="professional-framework"
      className="flex-1 bg-white flex items-center justify-center"
    >
      <div className="w-full max-w-[1400px] px-6 sm:px-10 lg:px-20 py-8">
        <div className="mb-20 text-center max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-bold leading-tight text-slate-900 mb-6">
            Our Professional Framework
          </h1>
        </div>
        <div className="flex gap-4 py-2 justify-between flex-nowrap">
          {frameworkItems.map((item, idx) => (
            <div
              key={idx}
              className="group flex flex-1 basis-0 flex-col items-center text-center text-slate-900 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative mb-3 flex items-center justify-center">
                <div className="absolute inset-0 scale-125 rounded-full border border-slate-100 group-hover:border-blue-100 transition-colors duration-300" />
                <div
                  className={`w-12 h-12 rounded-full ${item.color} flex items-center justify-center text-white shadow-lg transition-transform duration-700 group-hover:rotate-[360deg]`}
                >
                  <item.icon className="w-6 h-6" />
                </div>
              </div>

              <p className="text-sm font-semibold leading-snug whitespace-normal break-words">
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
