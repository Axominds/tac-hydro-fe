import type { FC } from "react";

interface Props {
  imageUrl: string | null | undefined;
}

export const OrganizationChartSection: FC<Props> = ({ imageUrl }) => {
  return (
    <section
      className="w-full min-h-screen flex flex-col justify-center py-4 px-4 md:px-8 bg-[#f8f9fa]"
      id="organization-chart"
    >
      <div className="w-full mx-auto flex flex-col items-center flex-1">
        <div className="w-full flex justify-center flex-1 min-h-0 overflow-hidden">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="TAC Hydro Organizational Chart"
              className="w-full h-full max-h-[90vh] object-contain rounded-lg shadow-lg border border-gray-100 transition-transform duration-500 hover:scale-105 cursor-zoom-in"
              loading="lazy"
              decoding="async"
            />
          ) : (
            <div className="w-full h-96 flex items-center justify-center bg-slate-200 rounded-lg">
              <p className="text-slate-500">Organization chart not available</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
