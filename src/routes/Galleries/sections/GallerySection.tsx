import { useState } from "react";
import { cn } from "../../../lib/utils";
import { ImageViewer } from "../../../components/ui/ImageViewer";
import { ZoomIn } from "lucide-react";

// Define the asset paths directly since we don't have a dynamic loader
// Based on the file listing provided
const ourProjectsImages = [
    "IMG_20251115_213646.jpg",
    "WhatsApp Image 2025-10-19 at 09.28.50.jpeg",
    "WhatsApp Image 2025-10-19 at 09.28.51.jpeg",
    "WhatsApp Image 2025-10-19 at 09.28.55.jpeg",
    "WhatsApp Image 2025-10-19 at 09.29.03.jpeg",
    "WhatsApp Image 2025-10-19 at 09.29.06.jpeg",
    "WhatsApp Image 2025-10-19 at 09.29.07 (1).jpeg",
    "WhatsApp Image 2025-10-19 at 09.29.08 (1).jpeg",
    "WhatsApp Image 2025-10-19 at 09.29.11.jpeg",
    "WhatsApp Image 2025-10-19 at 09.31.03 (2).jpeg",
    "WhatsApp Image 2025-10-19 at 09.31.05.jpeg",
    "WhatsApp Image 2025-10-19 at 09.31.06 (2).jpeg",
    "WhatsApp Image 2025-10-19 at 09.31.16.jpeg",
    "WhatsApp Image 2025-10-19 at 09.47.20.jpeg",
    "WhatsApp Image 2025-10-19 at 09.47.31.jpeg",
    "WhatsApp Image 2025-10-19 at 09.47.37.jpeg",
    "WhatsApp Image 2025-10-19 at 09.47.41.jpeg",
    "WhatsApp Image 2025-10-19 at 09.47.42.jpeg",
    "WhatsApp Image 2025-10-19 at 09.47.47.jpeg",
    "WhatsApp Image 2025-10-19 at 09.48.44.jpeg",
    "WhatsApp Image 2025-10-19 at 09.49.31.jpeg",
    "WhatsApp Image 2025-10-19 at 09.49.33 (1).jpeg",
    "WhatsApp Image 2025-10-19 at 09.50.21.jpeg",
    "WhatsApp Image 2025-10-19 at 09.50.23.jpeg",
    "WhatsApp Image 2025-10-19 at 09.52.04.jpeg",
    "WhatsApp Image 2025-10-19 at 09.52.08 (1).jpeg",
    "WhatsApp Image 2025-10-19 at 09.52.08.jpeg",
    "WhatsApp Image 2025-10-19 at 09.52.10.jpeg",
    "WhatsApp Image 2025-10-19 at 09.52.13.jpeg",
    "WhatsApp Image 2025-10-19 at 09.52.30.jpeg",
    "WhatsApp Image 2025-10-19 at 09.52.41.jpeg",
    "WhatsApp Image 2025-10-19 at 09.52.46.jpeg",
    "WhatsApp Image 2025-10-19 at 09.52.49.jpeg",
    "WhatsApp Image 2025-10-19 at 09.53.18.jpeg",
    "WhatsApp Image 2025-10-19 at 09.53.22.jpeg",
    "WhatsApp Image 2025-10-19 at 09.53.23.jpeg",
    "WhatsApp Image 2025-10-19 at 09.53.25.jpeg",
    "WhatsApp Image 2025-10-19 at 09.53.29 (1).jpeg",
    "WhatsApp Image 2025-10-19 at 09.53.29.jpeg",
    "WhatsApp Image 2025-10-19 at 09.53.37.jpeg",
    "WhatsApp Image 2025-10-19 at 10.16.54.jpeg",
    "WhatsApp Image 2025-10-19 at 10.16.56.jpeg",
    "WhatsApp Image 2025-10-19 at 10.17.04.jpeg",
    "WhatsApp Image 2025-10-19 at 18.38.00.jpeg",
    "WhatsApp Image 2025-10-19 at 18.38.22.jpeg",
    "WhatsApp Image 2025-10-19 at 18.41.39.jpeg",
    "WhatsApp Image 2025-10-19 at 18.41.46 (1).jpeg",
    "WhatsApp Image 2025-10-19 at 18.41.46.jpeg",
    "WhatsApp Image 2025-10-19 at 18.41.47 (1).jpeg",
    "WhatsApp Image 2025-10-19 at 18.41.47.jpeg",
    "WhatsApp Image 2025-10-19 at 18.41.48.jpeg",
    "WhatsApp Image 2025-10-19 at 18.41.52.jpeg",
    "WhatsApp Image 2025-10-19 at 18.41.57 (1).jpeg",
    "WhatsApp Image 2025-10-19 at 18.41.59.jpeg",
    "WhatsApp Image 2025-10-19 at 18.42.03 (1).jpeg",
    "WhatsApp Image 2025-10-19 at 18.43.25 (1).jpeg",
    "WhatsApp Image 2025-10-19 at 18.43.25.jpeg",
    "WhatsApp Image 2025-10-19 at 18.43.27.jpeg",
    "WhatsApp Image 2025-11-27 at 11.32.14_0291da1b.jpg"
].map(name => `/our_projects/${name}`);

const teamCultureImages = [
    "1.jpeg",
    "4.jpeg",
    "5.jpeg",
    "6.jpeg",
    "8.png",
    "DJI_0125.JPG",
    "WhatsApp Image 2025-10-19 at 09.28.52 (2).jpeg",
    "WhatsApp Image 2025-10-19 at 09.28.53 (1).jpeg",
    "WhatsApp Image 2025-10-19 at 09.28.57.jpeg",
    "WhatsApp Image 2025-10-19 at 09.31.02 (1).jpeg",
    "WhatsApp Image 2025-10-19 at 09.31.03 (1).jpeg",
    "WhatsApp Image 2025-12-24 at 10.37.26 AM.jpeg",
    // "WhatsApp Image 2026-01-01 at 4.56.29 PM.jpeg", // Skipping spaces in names for safety or usage if encoding handles it. Browsers should handle spaces as %20.
    "WhatsApp Image 2026-01-01 at 4.56.29 PM.jpeg",
    "WhatsApp Image 2026-01-01 at 4.56.31 PM.jpeg"
].map(name => `/team_culture/${name}`);

type FilterType = "All" | "Our Projects" | "Team Culture";

export const GallerySection = () => {
    const [activeFilter, setActiveFilter] = useState<FilterType>("All");
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

    const getImages = () => {
        switch (activeFilter) {
            case "Our Projects":
                return ourProjectsImages;
            case "Team Culture":
                return teamCultureImages;
            case "All":
            default:
                return [...ourProjectsImages, ...teamCultureImages];
        }
    };

    const images = getImages();

    return (
        <section id="gallery-section" className="py-20 px-4 sm:px-8 lg:px-20 bg-[#f8f9fa]">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col items-center mb-12">
                    <div className="flex flex-wrap justify-center gap-4">
                        {(["All", "Our Projects", "Team Culture"] as FilterType[]).map((filter) => (
                            <button
                                key={filter}
                                onClick={() => setActiveFilter(filter)}
                                className={cn(
                                    "px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300",
                                    activeFilter === filter
                                        ? "bg-blue-600 text-white shadow-lg transform scale-105"
                                        : "bg-white text-gray-600 hover:bg-gray-100 hover:text-gray-900 border border-gray-200"
                                )}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {images.map((src, index) => (
                        <div
                            key={`${src}-${index}`}
                            onClick={() => setSelectedImageIndex(index)}
                            className="group relative overflow-hidden rounded-xl shadow-md cursor-pointer hover:shadow-xl transition-all duration-300 bg-white aspect-[4/3] border border-gray-100"
                        >
                            <img
                                src={src}
                                alt={`Gallery image ${index + 1}`}
                                loading="lazy"
                                className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                                <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-300 w-8 h-8" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <ImageViewer
                images={images}
                initialIndex={selectedImageIndex ?? 0}
                isOpen={selectedImageIndex !== null}
                onClose={() => setSelectedImageIndex(null)}
            />
        </section>
    );
};
