import { useMemo, useState } from "react";
import { Navigation } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { projectData, type ProjectScope } from "../data/projectData";

// Fix for leaflet default icon missing in build
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

const scopeColors: Record<ProjectScope, { pin: string; bg: string; border: string }> = {
    "Detailed Feasibility Study": { pin: "#F7DF1E", bg: "bg-yellow-400", border: "border-yellow-200" }, // Yellow
    "Detailed Engineering Design": { pin: "#4CAF50", bg: "bg-green-500", border: "border-green-200" }, // Green
    "Construction Supervision": { pin: "#03A9F4", bg: "bg-sky-500", border: "border-sky-200" }, // Sky Blue
    "Due Diligence Appraisal": { pin: "#F44336", bg: "bg-red-500", border: "border-red-200" }, // Red
    "Progress Monitoring and Bill Vetting": { pin: "#9C27B0", bg: "bg-purple-500", border: "border-purple-200" }, // Purple
};

const createCustomIcon = (color: string) => {
    return L.divIcon({
        html: `<div style="position: relative; width: 24px; height: 24px;">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="${color}" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3" fill="white"></circle>
                </svg>
                <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border-radius: 50%; background-color: ${color}; opacity: 0.3; animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
              </div>`,
        className: "custom-map-pin",
        iconSize: [24, 24],
        iconAnchor: [12, 24],
        popupAnchor: [0, -24],
    });
};

interface ProjectMapProps {
    onProjectSelect?: (projectId: string) => void;
}

export const ProjectMap = ({ onProjectSelect }: ProjectMapProps) => {
    // Only filtering by scopes present in projectData.ts
    const [activeScope, setActiveScope] = useState<ProjectScope | "All">("All");

    const filteredProjects = useMemo(() => {
        if (activeScope === "All") {
            return projectData;
        }
        return projectData.filter((project) => project.scope === activeScope);
    }, [activeScope]);

    return (
        <div className="relative w-full h-[600px] lg:h-[700px] rounded-[32px] overflow-hidden shadow-xl border border-slate-100">
            {/* North Indicator */}
            <div className="absolute top-6 right-6 flex flex-col items-center gap-1 z-[400] bg-white/80 backdrop-blur-sm p-3 rounded-2xl shadow-sm border border-slate-100 pointer-events-none">
                <Navigation className="w-6 h-6 text-slate-400 -rotate-45" fill="currentColor" />
                <span className="text-[10px] font-bold text-slate-400 tracking-widest">NORTH</span>
            </div>

            <MapContainer
                center={[28.3949, 84.1240]}
                zoom={7}
                style={{ height: "100%", width: "100%" }}
                scrollWheelZoom={false}
                className="z-10"
                zoomControl={false}
            >
                <ZoomControl position="topright" />
                <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                />
                {filteredProjects.map((project) => {
                    const colors = scopeColors[project.scope];
                    return (
                        <Marker
                            key={project.id}
                            position={project.location}
                            icon={createCustomIcon(colors.pin)}
                            eventHandlers={{
                                click: () => {
                                    if (onProjectSelect) onProjectSelect(project.id);
                                },
                            }}
                        >
                            <Popup className="custom-popup">
                                <div className="p-1 cursor-pointer" onClick={() => onProjectSelect && onProjectSelect(project.id)}>
                                    <h4 className="font-bold text-slate-900 mb-1">{project.title}</h4>
                                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full" style={{ color: colors.pin, backgroundColor: `${colors.pin}15` }}>
                                        {project.scope}
                                    </span>
                                </div>
                            </Popup>
                        </Marker>
                    );
                })}
            </MapContainer>

            {/* Legend / Filter */}
            <div className="absolute left-6 top-6 z-[400] flex flex-col gap-4 bg-white/95 backdrop-blur-sm rounded-[24px] p-5 shadow-lg border border-slate-100 max-w-[280px] w-full">
                <h3 className="text-sm font-bold text-slate-900 border-b border-slate-200 pb-2">
                    Project Scopes
                </h3>
                <div className="flex flex-col gap-3">
                    <button
                        type="button"
                        onClick={() => setActiveScope("All")}
                        className={`flex items-center gap-3 text-left group ${activeScope === "All" ? "opacity-100" : "opacity-70 hover:opacity-100"}`}
                    >
                        <div className="w-2.5 h-2.5 rounded-full bg-slate-400 ring-4 ring-offset-2 ring-transparent group-hover:ring-slate-200 transition-all" />
                        <span className="text-xs font-semibold text-slate-700">All Projects</span>
                    </button>
                    {(Object.keys(scopeColors) as ProjectScope[]).map((scope) => {
                        const colors = scopeColors[scope];
                        return (
                            <button
                                key={scope}
                                type="button"
                                onClick={() => setActiveScope(scope)}
                                className={`flex items-center gap-3 text-left group ${activeScope === scope ? "opacity-100" : "opacity-70 hover:opacity-100"}`}
                            >
                                <div className={`w-2.5 h-2.5 rounded-full ${colors.bg} ring-4 ring-offset-2 ring-transparent group-hover:ring-blue-100 transition-all`} style={{ backgroundColor: colors.pin }} />
                                <span className="text-xs font-medium text-slate-600">
                                    {scope}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>

            <style>{`
                .leaflet-container {
                    background: #f8f9fa !important;
                    font-family: inherit;
                }
                .custom-popup .leaflet-popup-content-wrapper {
                    border-radius: 12px;
                    padding: 0;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
                }
                .custom-popup .leaflet-popup-content {
                    margin: 8px 12px;
                }
                .leaflet-top {
                    z-index: 400;
                }
                @keyframes ping {
                    75%, 100% {
                        transform: scale(2);
                        opacity: 0;
                    }
                }
            `}</style>
        </div>
    );
};
