
import { FC } from "react";

export const OrganizationChartSection: FC = () => {
    return (
        <section className="w-full min-h-screen flex flex-col justify-center py-4 px-4 md:px-8 bg-[#f8f9fa]" id="organization-chart">
            <div className="w-full mx-auto flex flex-col items-center flex-1">
                <h2 className="text-3xl md:text-4xl font-bold text-[#0b1522] mb-4 text-center">
                    Our Organizational Structure
                </h2>
                <div className="w-full flex justify-center flex-1 min-h-0 overflow-hidden">
                    <img
                        src="/organization_chart.png"
                        alt="TAC Hydro Organizational Chart"
                        className="w-full h-full max-h-[90vh] object-contain rounded-lg shadow-lg border border-gray-100 transition-transform duration-500 hover:scale-105 cursor-zoom-in"
                    />
                </div>
            </div>
        </section>
    );
};
