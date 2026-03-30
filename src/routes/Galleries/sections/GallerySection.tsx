import { useEffect, useState } from "react";
import { cn } from "../../../lib/utils";
import { ImageViewer } from "../../../components/ui/ImageViewer";
import { ZoomIn, Layers } from "lucide-react";
import { useGalleryData, GalleryCategoryWithSubcategories } from "../../../hooks/useGalleries";

// ─── Skeleton loader ─────────────────────────────────────────────────────────
const GallerySkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {Array.from({ length: 12 }).map((_, i) => (
      <div
        key={i}
        className="rounded-xl bg-gray-200 animate-pulse aspect-[4/3]"
      />
    ))}
  </div>
);

// ─── Component ───────────────────────────────────────────────────────────────
export const GallerySection = () => {
  const { tree, isLoading } = useGalleryData();

  // "all" means no category filter
  const [activeCategoryId, setActiveCategoryId] = useState<number | "all">("all");
  // "all" means no subcategory filter
  const [activeSubcategoryId, setActiveSubcategoryId] = useState<number | "all">("all");
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  // Reset subcategory when category changes
  useEffect(() => {
    setActiveSubcategoryId("all");
  }, [activeCategoryId]);

  // ── Derive the active category object ──
  const activeCategory: GalleryCategoryWithSubcategories | undefined =
    activeCategoryId === "all" ? undefined : tree.find((c) => c.id === activeCategoryId);

  // ── Subcategories for the filter bar ──
  // Only shown when a specific category is active.
  const subcategories = activeCategory?.subcategories ?? [];

  // ── Build the flat list of images to display ──
  const visibleImages: string[] = (() => {
    if (activeCategoryId === "all") {
      if (activeSubcategoryId === "all") {
        // everything
        return tree.flatMap((cat) => cat.subcategories.flatMap((sub) => sub.images));
      }
      // filter by subcategory name (matching across all categories)
      const subName = subcategories.find((s) => s.id === activeSubcategoryId)?.name;
      return tree.flatMap((cat) =>
        cat.subcategories
          .filter((sub) => sub.name === subName)
          .flatMap((sub) => sub.images)
      );
    }
    if (!activeCategory) return [];
    if (activeSubcategoryId === "all") {
      return activeCategory.subcategories.flatMap((sub) => sub.images);
    }
    return activeCategory.subcategories.find((s) => s.id === activeSubcategoryId)?.images ?? [];
  })();

  return (
    <section id="gallery-section" className="py-20 px-4 sm:px-8 lg:px-20 bg-[#f8f9fa]">
      <div className="max-w-7xl mx-auto">

        {/* ── Category filter pills ── */}
        <div className="flex flex-col items-center mb-4 gap-3">
          <div className="flex flex-wrap justify-center gap-3">
            {/* "All" pill */}
            <button
              onClick={() => setActiveCategoryId("all")}
              className={cn(
                "px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300",
                activeCategoryId === "all"
                  ? "bg-blue-600 text-white shadow-lg scale-105"
                  : "bg-white text-gray-600 hover:bg-gray-100 hover:text-gray-900 border border-gray-200",
              )}
            >
              All
            </button>

            {tree.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategoryId(cat.id)}
                className={cn(
                  "px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300",
                  activeCategoryId === cat.id
                    ? "bg-blue-600 text-white shadow-lg scale-105"
                    : "bg-white text-gray-600 hover:bg-gray-100 hover:text-gray-900 border border-gray-200",
                )}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* ── Subcategory filter tabs — only when a specific category is selected ── */}
          {!isLoading && activeCategoryId !== "all" && subcategories.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 mt-1">
              <span className="flex items-center gap-1 text-xs text-gray-400 mr-1">
                <Layers className="w-3.5 h-3.5" /> Sub-category:
              </span>

              <button
                onClick={() => setActiveSubcategoryId("all")}
                className={cn(
                  "px-4 py-1 rounded-full text-xs font-medium transition-all duration-200 border",
                  activeSubcategoryId === "all"
                    ? "bg-blue-100 text-blue-700 border-blue-300"
                    : "bg-white text-gray-500 hover:bg-gray-50 border-gray-200",
                )}
              >
                All
              </button>

              {subcategories.map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => setActiveSubcategoryId(sub.id)}
                  className={cn(
                    "px-4 py-1 rounded-full text-xs font-medium transition-all duration-200 border",
                    activeSubcategoryId === sub.id
                      ? "bg-blue-100 text-blue-700 border-blue-300"
                      : "bg-white text-gray-500 hover:bg-gray-50 border-gray-200",
                  )}
                >
                  {sub.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ── Image count badge ── */}
        {!isLoading && (
          <p className="text-center text-xs text-gray-400 mb-8">
            {visibleImages.length} {visibleImages.length === 1 ? "image" : "images"}
          </p>
        )}

        {/* ── Grid ── */}
        {isLoading ? (
          <GallerySkeleton />
        ) : visibleImages.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-gray-400 gap-3">
            <Layers className="w-12 h-12 opacity-30" />
            <p className="text-lg font-medium">No images yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {visibleImages.map((src, index) => (
              <div
                key={`${src}-${index}`}
                onClick={() => setSelectedImageIndex(index)}
                className="group relative overflow-hidden rounded-xl shadow-md cursor-pointer hover:shadow-xl transition-all duration-300 bg-white aspect-[4/3] border border-gray-100"
              >
                <img
                  src={src}
                  alt={`Gallery image ${index + 1}`}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                  <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-300 w-8 h-8" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Image viewer modal ── */}
      <ImageViewer
        images={visibleImages}
        initialIndex={selectedImageIndex ?? 0}
        isOpen={selectedImageIndex !== null}
        onClose={() => setSelectedImageIndex(null)}
      />
    </section>
  );
};
