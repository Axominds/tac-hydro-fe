import { Navigation, MapPin } from "lucide-react";
const mapImage = "/Nepal_grey.svg";

type ProjectScope =
    | "Feasibility Study"
    | "Detailed Engineering Design"
    | "Hydromechanical Design"
    | "Construction Supervision"
    | "Due Diligence Appraisal"
    | "Project Monitoring and Bill Verification";

interface MapLocation {
    x: number;
    y: number;
    title: string;
    scope: ProjectScope;
}

const scopeColors: Record<ProjectScope, { pin: string; bg: string; border: string }> = {
    "Feasibility Study": { pin: "#3b82f6", bg: "bg-blue-500", border: "border-blue-200" },
    "Detailed Engineering Design": { pin: "#10b981", bg: "bg-emerald-500", border: "border-emerald-200" },
    "Hydromechanical Design": { pin: "#f59e0b", bg: "bg-amber-500", border: "border-amber-200" },
    "Construction Supervision": { pin: "#ef4444", bg: "bg-red-500", border: "border-red-200" },
    "Due Diligence Appraisal": { pin: "#6366f1", bg: "bg-indigo-500", border: "border-indigo-200" },
    "Project Monitoring and Bill Verification": { pin: "#a855f7", bg: "bg-purple-500", border: "border-purple-200" },
};

const mapLocations: MapLocation[] = [
    { x: 14, y: 26, title: "West Seti", scope: "Feasibility Study" },
    { x: 20, y: 32, title: "Upper Karnali", scope: "Detailed Engineering Design" },
    { x: 30, y: 44, title: "Bheri Babai", scope: "Hydromechanical Design" },
    { x: 42, y: 50, title: "Upper Tamakoshi", scope: "Construction Supervision" },
    { x: 54, y: 56, title: "Dudh Koshi", scope: "Due Diligence Appraisal" },
    { x: 62, y: 62, title: "Arun III", scope: "Project Monitoring and Bill Verification" },
    { x: 70, y: 60, title: "Lower Arun", scope: "Feasibility Study" },
    { x: 78, y: 66, title: "Upper Marsyangdi", scope: "Detailed Engineering Design" },
    { x: 84, y: 70, title: "Tamur", scope: "Hydromechanical Design" },
    { x: 88, y: 76, title: "Kabeli A", scope: "Construction Supervision" },
];

export const MapSection = () => {
    return (
        <section id="map-section" className="relative w-full bg-[#f8f9fa] min-h-screen flex items-center justify-center py-8 overflow-hidden">
            {/* Background Aesthetic Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-100/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

            <div className="relative mx-auto max-w-[1300px] px-6">
                <div className="mb-6 text-center">
                    <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight mb-4">
                        Project Footprint Across Nepal
                    </h2>
                    <p className="text-slate-500 max-w-2xl mx-auto">
                        Our engineering expertise reaches every corner of the nation, delivering sustainable energy solutions through various project scopes.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 items-start">
                    {/* Map Container */}
                    <div className="relative bg-white rounded-[40px] p-6 shadow-xl shadow-slate-200/50 border border-slate-100">
                        {/* North Indicator */}
                        <div className="absolute top-10 right-10 flex flex-col items-center gap-1 z-20">
                            <Navigation className="w-8 h-8 text-slate-400 rotate-0" fill="currentColor" />
                            <span className="text-[10px] font-bold text-slate-400 tracking-widest">NORTH</span>
                        </div>

                        <div className="relative">
                            <img
                                className="w-full h-auto object-contain opacity-80 mix-blend-multiply grayscale contrast-125"
                                alt="Project coverage map"
                                src={mapImage}
                            />

                            {/* Pins Layer */}
                            <div className="absolute inset-0">
                                {mapLocations.map((location, index) => {
                                    const colors = scopeColors[location.scope];
                                    return (
                                        <div
                                            key={`pin-${index}`}
                                            className="group absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
                                            style={{ left: `${location.x}%`, top: `${location.y}%` }}
                                        >
                                            {/* Interactive Pin */}
                                            <div className="relative">
                                                <MapPin
                                                    className="w-6 h-6 drop-shadow-lg transition-transform duration-300 group-hover:scale-125"
                                                    style={{ color: colors.pin }}
                                                    fill="currentColor"
                                                />
                                                <div className={`absolute inset-0 w-full h-full rounded-full ${colors.bg} opacity-20 animate-ping`} />
                                            </div>

                                            {/* Tooltip */}
                                            <div className="pointer-events-none absolute left-1/2 bottom-full mb-3 w-48 -translate-x-1/2 opacity-0 transition-all duration-300 group-hover:opacity-100 scale-95 group-hover:scale-100 transform translate-y-2 group-hover:translate-y-0">
                                                <div className="rounded-xl border border-slate-100 bg-white/95 backdrop-blur-sm px-4 py-2 text-center shadow-xl">
                                                    <span className="text-xs font-bold leading-tight uppercase tracking-wider" style={{ color: colors.pin }}>
                                                        {location.scope}
                                                    </span>
                                                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-2 h-2 border-l border-t border-slate-100 bg-white rotate-[225deg]" />
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Legend / Index Container */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold text-slate-900 border-b border-slate-200 pb-4">
                            Project Scopes
                        </h3>
                        <div className="flex flex-col gap-4">
                            {(Object.keys(scopeColors) as ProjectScope[]).map((scope) => {
                                const colors = scopeColors[scope];
                                return (
                                    <div key={scope} className="flex items-center gap-4 group">
                                        <div className={`w-3 h-3 rounded-full ${colors.bg} ring-4 ring-offset-2 ring-transparent group-hover:ring-${colors.bg.split('-')[1]}-100 transition-all`} />
                                        <span className="text-sm font-medium text-slate-600 leading-tight">
                                            {scope}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="mt-8 p-6 bg-blue-600 rounded-3xl text-white shadow-lg shadow-blue-200">
                            <p className="text-xs font-bold uppercase tracking-widest mb-2 opacity-80">Statistics</p>
                            <div className="text-3xl font-bold mb-1">120+</div>
                            <p className="text-white/80 text-sm">Successfully completed projects across the country.</p>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    );
};
