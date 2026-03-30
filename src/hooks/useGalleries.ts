import { useQuery } from "@tanstack/react-query";
import { apiFetch, getImageUrl, GalleryCategory, GallerySubcategory, GalleryImage } from "../lib/api";

export function useGalleryCategories() {
  return useQuery<GalleryCategory[]>({
    queryKey: ["gallery-categories"],
    queryFn: () => apiFetch<GalleryCategory[]>("/api/galleries/categories/"),
  });
}

export function useGallerySubcategories() {
  return useQuery<GallerySubcategory[]>({
    queryKey: ["gallery-subcategories"],
    queryFn: () => apiFetch<GallerySubcategory[]>("/api/galleries/subcategories/"),
  });
}

export function useGalleryImages() {
  return useQuery<GalleryImage[]>({
    queryKey: ["gallery-images"],
    queryFn: () => apiFetch<GalleryImage[]>("/api/galleries/images/"),
  });
}

export interface GallerySubcategoryWithImages {
  id: number;
  name: string;
  order: number;
  images: string[]; // resolved absolute URLs
}

export interface GalleryCategoryWithSubcategories {
  id: number;
  name: string;
  order: number;
  subcategories: GallerySubcategoryWithImages[];
}

/** Combines all three queries into a fully-resolved tree. */
export function useGalleryData() {
  const { data: categories, isLoading: catLoading } = useGalleryCategories();
  const { data: subcategories, isLoading: subLoading } = useGallerySubcategories();
  const { data: images, isLoading: imgLoading } = useGalleryImages();

  const isLoading = catLoading || subLoading || imgLoading;

  const tree: GalleryCategoryWithSubcategories[] = (() => {
    if (!categories || !subcategories || !images) return [];

    return categories
      .slice()
      .sort((a, b) => a.order - b.order)
      .map((cat) => {
        const catSubcategories = subcategories
          .filter((sub) => sub.category_id === cat.id)
          .sort((a, b) => a.order - b.order)
          .map((sub) => ({
            id: sub.id,
            name: sub.name,
            order: sub.order,
            images: images
              .filter((img) => img.gallery_subcategory_id === sub.id)
              .sort((a, b) => a.order - b.order)
              .map((img) => getImageUrl(img.image) ?? ""),
          }));

        return {
          id: cat.id,
          name: cat.name,
          order: cat.order,
          subcategories: catSubcategories,
        };
      });
  })();

  return { tree, isLoading };
}
