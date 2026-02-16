import { useMemo, useState } from "react";
import { Navigation } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

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

import { projectData, ProjectDivision } from "../../Projects/data/projectData";

// ... entries ...

type ProjectScope = ProjectDivision;

interface MapLocation {
    id: string;
    coords: [number, number];
    title: string;
    scope: ProjectScope;
    capacity?: string;
}

const scopeColors: Record<ProjectScope, { pin: string; bg: string; border: string }> = {
    "Feasibility Study": { pin: "#F7DF1E", bg: "bg-yellow-400", border: "border-yellow-200" },
    "Detailed Engineering Design": { pin: "#4CAF50", bg: "bg-green-500", border: "border-green-200" },
    "Construction Supervision": { pin: "#03A9F4", bg: "bg-sky-500", border: "border-sky-200" },
    "Due Diligence Appraisal": { pin: "#F44336", bg: "bg-red-500", border: "border-red-200" },
};

const mapLocations: MapLocation[] = projectData.map(project => ({
    id: project.id,
    coords: project.location,
    title: project.title,
    scope: project.division,
    capacity: project.technicalHighlights["Capacity"]
}));

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

export const MapSection = () => {
    const [activeScope, setActiveScope] = useState<ProjectScope | "All">("All");

    const filteredLocations = useMemo(() => {
        if (activeScope === "All") {
            return mapLocations;
        }
        return mapLocations.filter((location) => location.scope === activeScope);
    }, [activeScope]);

    return (
        <section id="map-section" className="relative w-full bg-[#f8f9fa] h-screen overflow-hidden">
            <div className="relative w-full h-full">
                <div className="relative h-full">
                    {/* Map Container */}
                    <div className="relative bg-white overflow-hidden h-full">
                        {/* North Indicator */}
                        <div className="absolute top-6 right-6 flex flex-col items-center gap-1 z-40 bg-white/80 backdrop-blur-sm p-3 rounded-2xl shadow-sm border border-slate-100">
                            <Navigation className="w-6 h-6 text-slate-400 -rotate-45" fill="currentColor" />
                            <span className="text-[10px] font-bold text-slate-400 tracking-widest">NORTH</span>
                        </div>

                        <MapContainer
                            center={[28.3949, 83.1]} // Stronger west shift so Nepal sits more to the right
                            zoom={7}
                            style={{ height: "100%", width: "100%" }}
                            scrollWheelZoom={false}
                            className="z-10 map-with-controls"
                            zoomControl={false}
                        >
                            <ZoomControl position="bottomright" />
                            <TileLayer
                                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                            />
                            {filteredLocations.map((location) => {
                                const colors = scopeColors[location.scope];
                                return (
                                    <Marker
                                        key={location.id}
                                        position={location.coords}
                                        icon={createCustomIcon(colors.pin)}
                                    >
                                        <Popup className="custom-popup">
                                            <div className="p-1">
                                                <h4 className="font-bold text-slate-900 mb-1">{location.title}</h4>
                                                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full" style={{ color: colors.pin, backgroundColor: `${colors.pin}15` }}>
                                                    {location.scope}
                                                </span>
                                            </div>
                                        </Popup>
                                    </Marker>
                                );
                            })}
                        </MapContainer>
                    </div>

                    {/* Legend / Index Container */}
                    <div className="absolute left-6 top-6 z-40 flex flex-col gap-6 bg-white/95 backdrop-blur-sm rounded-[32px] p-6 shadow-xl border border-slate-100 max-w-[320px] w-full">
                        <h3 className="text-lg font-bold text-slate-900 border-b border-slate-200 pb-3">
                            Scope Color Key
                        </h3>
                        <div className="flex flex-col gap-4">
                            <button
                                type="button"
                                onClick={() => setActiveScope("All")}
                                className={`flex items-center gap-4 text-left group ${activeScope === "All" ? "opacity-100" : "opacity-70 hover:opacity-100"}`}
                                aria-pressed={activeScope === "All"}
                            >
                                <div className="w-3 h-3 rounded-full bg-slate-400 ring-4 ring-offset-2 ring-transparent group-hover:ring-slate-200 transition-all" />
                                <span className="text-sm font-semibold text-slate-700 leading-tight">All Scopes</span>
                            </button>
                            {(Object.keys(scopeColors) as ProjectScope[]).map((scope) => {
                                const colors = scopeColors[scope];
                                return (
                                    <button
                                        key={scope}
                                        type="button"
                                        onClick={() => setActiveScope(scope)}
                                        className={`flex items-center gap-4 text-left group ${activeScope === scope ? "opacity-100" : "opacity-70 hover:opacity-100"}`}
                                        aria-pressed={activeScope === scope}
                                    >
                                        <div className={`w-3 h-3 rounded-full ${colors.bg} ring-4 ring-offset-2 ring-transparent group-hover:ring-blue-100 transition-all`} style={{ backgroundColor: colors.pin }} />
                                        <span className="text-sm font-medium text-slate-600 leading-tight">
                                            {scope}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .leaflet-container {
                    background: #f8f9fa !important;
                }
                .custom-popup .leaflet-popup-content-wrapper {
                    border-radius: 12px;
                    padding: 0;
                }
                .custom-popup .leaflet-popup-content {
                    margin: 8px 12px;
                }
                .map-with-controls .leaflet-top,
                .map-with-controls .leaflet-bottom {
                    z-index: 1000 !important;
                }

                @keyframes ping {
                    75%, 100% {
                        transform: scale(2);
                        opacity: 0;
                    }
                }
            `}</style>
        </section>
    );
};
