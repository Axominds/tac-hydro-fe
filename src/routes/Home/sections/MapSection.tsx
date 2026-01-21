import { Navigation } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
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

type ProjectScope =
    | "Feasibility Study"
    | "Detailed Engineering Design"
    | "Hydromechanical Design"
    | "Construction Supervision"
    | "Due Diligence Appraisal"
    | "Project Monitoring and Bill Verification";

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
    "Hydromechanical Design": { pin: "#795548", bg: "bg-amber-800", border: "border-amber-900" },
    "Construction Supervision": { pin: "#03A9F4", bg: "bg-sky-500", border: "border-sky-200" },
    "Due Diligence Appraisal": { pin: "#F44336", bg: "bg-red-500", border: "border-red-200" },
    "Project Monitoring and Bill Verification": { pin: "#1A237E", bg: "bg-indigo-900", border: "border-indigo-800" },
};

const mapLocations: MapLocation[] = [
    // Sudurpashchim (Far West)
    { id: "west-seti", coords: [29.4117, 80.8611], title: "West Seti", scope: "Feasibility Study" },
    { id: "chameliya", coords: [29.7439, 80.5833], title: "Chameliya", scope: "Detailed Engineering Design" },
    { id: "seti-river-3", coords: [29.5500, 81.0500], title: "Seti River-3", scope: "Hydromechanical Design" },

    // Karnali & Mid-West
    { id: "upper-karnali", coords: [28.8993, 81.4875], title: "Upper Karnali", scope: "Detailed Engineering Design" },
    { id: "bheri-babai", coords: [28.4500, 81.6500], title: "Bheri Babai", scope: "Hydromechanical Design" },
    { id: "tila-1", coords: [29.1500, 81.8500], title: "Tila-1", scope: "Feasibility Study" },
    { id: "mugu-karnali", coords: [29.6500, 82.2500], title: "Mugu Karnali", scope: "Detailed Engineering Design" },

    // Gandaki & Lumbini
    { id: "upper-marsyangdi", coords: [28.2500, 84.4500], title: "Upper Marsyangdi", scope: "Detailed Engineering Design" },
    { id: "modi-khola", coords: [28.2720, 83.7411], title: "Modi Khola", scope: "Hydromechanical Design" },
    { id: "kaligandaki-a", coords: [27.9250, 83.6000], title: "Kaligandaki A", scope: "Project Monitoring and Bill Verification" },
    { id: "setu-khola", coords: [28.2000, 83.9500], title: "Setu Khola", scope: "Feasibility Study" },
    { id: "jhimruk", coords: [28.1000, 82.8500], title: "Jhimruk", scope: "Construction Supervision" },
    { id: "dordi-khola", coords: [28.2500, 84.5500], title: "Dordi Khola", scope: "Detailed Engineering Design" },

    // Bagmati & Central
    { id: "upper-tamakoshi", coords: [27.8439, 86.2181], title: "Upper Tamakoshi", scope: "Construction Supervision" },
    { id: "khimti-1", coords: [27.6000, 86.1500], title: "Khimti-1", scope: "Due Diligence Appraisal" },
    { id: "trishuli", coords: [27.9212, 85.1462], title: "Trishuli", scope: "Project Monitoring and Bill Verification" },
    { id: "sunkoshi", coords: [27.7806, 85.9170], title: "Sunkoshi", scope: "Hydromechanical Design" },
    { id: "balephi-a", coords: [27.8500, 85.8500], title: "Balephi-A", scope: "Detailed Engineering Design" },
    { id: "likhu-4", coords: [27.5500, 86.3500], title: "Likhu-4", scope: "Feasibility Study" },
    { id: "devighat", coords: [27.8800, 85.1000], title: "Devighat", scope: "Project Monitoring and Bill Verification" },
    { id: "khempalung", coords: [27.7000, 86.9500], title: "Khempalung", scope: "Detailed Engineering Design" },

    // Koshi & East
    { id: "arun-iii", coords: [27.5100, 87.1931], title: "Arun III", scope: "Project Monitoring and Bill Verification" },
    { id: "lower-arun", coords: [27.3500, 87.1500], title: "Lower Arun", scope: "Feasibility Study" },
    { id: "tamur", coords: [27.1500, 87.7500], title: "Tamur", scope: "Hydromechanical Design" },
    { id: "kabeli-a", coords: [27.2500, 87.8500], title: "Kabeli A", scope: "Construction Supervision" },
    { id: "dudh-koshi-pr", coords: [27.2000, 86.7000], title: "Dudh Koshi", scope: "Due Diligence Appraisal" },
    { id: "mai-khola", coords: [26.9500, 87.9500], title: "Mai Khola", scope: "Due Diligence Appraisal" },
    { id: "puwa-khola", coords: [27.0500, 88.0200], title: "Puwa Khola", scope: "Feasibility Study" },
    { id: "hewa-khola", coords: [27.1800, 87.7200], title: "Hewa Khola", scope: "Hydromechanical Design" },
    { id: "upper-arun", coords: [27.7500, 87.4500], title: "Upper Arun", scope: "Detailed Engineering Design" },
    { id: "solu-khola", coords: [27.4500, 86.7500], title: "Solu Khola", scope: "Construction Supervision" },
    { id: "ingwa-khola", coords: [27.3000, 87.9000], title: "Ingwa Khola", scope: "Feasibility Study" },
];

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
    return (
        <section id="map-section" className="relative w-full bg-[#f8f9fa] min-h-screen flex items-center justify-center py-6 sm:py-10 overflow-hidden">
            {/* Background Aesthetic Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-100/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

            <div className="relative mx-auto max-w-[1340px] px-6 w-full">
                <div className="mb-6 text-center">
                    <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight mb-4">
                        Project Footprint Across Nepal
                    </h2>
                    <p className="text-slate-500 max-w-2xl mx-auto">
                        Our engineering expertise reaches every corner of the nation, delivering sustainable energy solutions through various project scopes.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 items-stretch">
                    {/* Map Container */}
                    <div className="relative bg-white rounded-[40px] p-2 shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden h-[450px] lg:h-[550px]">
                        {/* North Indicator */}
                        <div className="absolute top-6 right-6 flex flex-col items-center gap-1 z-[1000] bg-white/80 backdrop-blur-sm p-3 rounded-2xl shadow-sm border border-slate-100">
                            <Navigation className="w-6 h-6 text-slate-400 -rotate-45" fill="currentColor" />
                            <span className="text-[10px] font-bold text-slate-400 tracking-widest">NORTH</span>
                        </div>

                        <MapContainer
                            center={[28.3949, 84.1240]} // Center of Nepal
                            zoom={7}
                            style={{ height: "100%", width: "100%", borderRadius: "32px" }}
                            scrollWheelZoom={false}
                            className="z-10"
                        >
                            <TileLayer
                                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                            />
                            {mapLocations.map((location) => {
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
                    <div className="flex flex-col gap-6 bg-white rounded-[40px] p-8 shadow-xl border border-slate-100">
                        <h3 className="text-xl font-bold text-slate-900 border-b border-slate-200 pb-4">
                            Project Scopes
                        </h3>
                        <div className="flex flex-col gap-4 flex-grow">
                            {(Object.keys(scopeColors) as ProjectScope[]).map((scope) => {
                                const colors = scopeColors[scope];
                                return (
                                    <div key={scope} className="flex items-center gap-4 group">
                                        <div className={`w-3 h-3 rounded-full ${colors.bg} ring-4 ring-offset-2 ring-transparent group-hover:ring-blue-100 transition-all`} style={{ backgroundColor: colors.pin }} />
                                        <span className="text-sm font-medium text-slate-600 leading-tight">
                                            {scope}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="mt-auto pt-6 border-t border-slate-100">
                            <div className="p-6 bg-blue-600 rounded-3xl text-white shadow-lg shadow-blue-200">
                                <p className="text-xs font-bold uppercase tracking-widest mb-2 opacity-80">Total Statistics</p>
                                <div className="text-3xl font-bold mb-1">120+</div>
                                <p className="text-white/80 text-sm">Successfully completed engineering projects across Nepal.</p>
                            </div>
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
