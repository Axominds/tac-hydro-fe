import { useEffect, useState } from "react";
import { cn } from "../../../lib/utils";
import { ImageViewer } from "../../../components/ui/ImageViewer";
import { ZoomIn, Layers } from "lucide-react";
import { useGalleryCategories, useGallerySubcategories, useGalleryImages, useAllGalleryImages, useCategoryAllImages } from "../../../hooks/useGalleries";

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

export const GallerySection = () => {
  const { data: categories, isLoading: catLoading } = useGalleryCategories();
  
  const [activeCategoryId, setActiveCategoryId] = useState<number | "all">("all");
  const [activeSubcategoryId, setActiveSubcategoryId] = useState<number | "all">("all");
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const categoryId = activeCategoryId === "all" ? 0 : activeCategoryId;
  const subcategoryId = activeSubcategoryId === "all" ? 0 : activeSubcategoryId;

  const { data: subcategories, isLoading: subLoading } = useGallerySubcategories(categoryId);
  const { data: images, isLoading: imgLoading } = useGalleryImages(categoryId, subcategoryId);
  const { data: allImages, isLoading: allImgLoading } = useAllGalleryImages(categories);
  const { data: categoryAllImages, isLoading: categoryAllImgLoading } = useCategoryAllImages(categoryId, subcategories);

  useEffect(() => {
    setActiveSubcategoryId("all");
  }, [activeCategoryId]);

  const isLoading = catLoading || subLoading || imgLoading || allImgLoading || categoryAllImgLoading;

  const visibleImages = (() => {
    if (activeCategoryId === "all" && activeSubcategoryId === "all") {
      return allImages || [];
    }
    if (activeCategoryId !== "all" && activeSubcategoryId === "all") {
      return categoryAllImages || [];
    }
    return images?.map((img: any) => img.image).filter(Boolean) || [];
  })();

  return (
    <section id="gallery-section" className="py-20 px-4 sm:px-8 lg:px-20 bg-[#f8f9fa]">
      <div className="max-w-7xl mx-auto">

        <div className="flex flex-col items-center mb-4 gap-3">
          <div className="flex flex-wrap justify-center gap-3">
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
            {categories?.map((cat) => (
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

          {activeCategoryId !== "all" && subcategories && subcategories.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2">
              <button
                onClick={() => setActiveSubcategoryId("all")}
                className={cn(
                  "px-4 py-1.5 rounded-full text-xs font-medium transition-all",
                  activeSubcategoryId === "all"
                    ? "bg-gray-800 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200",
                )}
              >
                All
              </button>
              {subcategories.map((sub: any) => (
                <button
                  key={sub.id}
                  onClick={() => setActiveSubcategoryId(sub.id)}
                  className={cn(
                    "px-4 py-1.5 rounded-full text-xs font-medium transition-all",
                    activeSubcategoryId === sub.id
                      ? "bg-gray-800 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200",
                  )}
                >
                  {sub.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {isLoading ? (
          <GallerySkeleton />
        ) : visibleImages.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <Layers className="h-12 w-12 mx-auto mb-4 opacity-30" />
            <p className="font-medium">No images found</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {visibleImages.map((src, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className="group relative rounded-xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all duration-300"
                >
                  <img
                    src={src}
                    alt={`Gallery ${idx + 1}`}
                    className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                  <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="p-2 bg-white/90 rounded-full shadow-lg">
                      <ZoomIn className="h-4 w-4 text-gray-700" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {selectedImageIndex !== null && (
              <ImageViewer
                images={visibleImages}
                initialIndex={selectedImageIndex}
                isOpen={selectedImageIndex !== null}
                onClose={() => setSelectedImageIndex(null)}
              />
            )}
          </>
        )}
      </div>
    </section>
  );
};