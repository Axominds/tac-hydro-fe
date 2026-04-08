import { useQuery } from "@tanstack/react-query";
import { apiFetch, getImageUrl, GalleryCategory } from "../lib/api";

export function useGalleryCategories() {
  return useQuery<GalleryCategory[]>({
    queryKey: ["gallery-categories"],
    queryFn: () => apiFetch<GalleryCategory[]>("/api/galleries/categories/"),
  });
}

export function useGallerySubcategories(categoryId: number) {
  return useQuery({
    queryKey: ["gallery-subcategories", categoryId],
    queryFn: () => apiFetch<any[]>(`/api/galleries/categories/${categoryId}/subcategories/`),
    enabled: !!categoryId,
  });
}

export function useGalleryImages(categoryId: number, subcategoryId: number) {
  return useQuery({
    queryKey: ["gallery-images", categoryId, subcategoryId],
    queryFn: () => apiFetch<any[]>(`/api/galleries/categories/${categoryId}/subcategories/${subcategoryId}/images/`),
    enabled: !!categoryId && !!subcategoryId,
  });
}

export function useAllGalleryImages(categories: GalleryCategory[] | undefined) {
  return useQuery({
    queryKey: ["gallery-all-images", categories?.map(c => c.id).join(",")],
    queryFn: async () => {
      if (!categories || categories.length === 0) return [];
      
      const fetchedImages: string[] = [];
      
      for (const cat of categories) {
        const subs = await apiFetch<any[]>(`/api/galleries/categories/${cat.id}/subcategories/`);
        for (const sub of subs) {
          const imgs = await apiFetch<any[]>(`/api/galleries/categories/${cat.id}/subcategories/${sub.id}/images/`);
          for (const img of imgs) {
            if (img.image) fetchedImages.push(img.image);
          }
        }
      }
      
      return fetchedImages;
    },
    enabled: !!categories && categories.length > 0,
  });
}

export function useCategoryAllImages(categoryId: number, subcategories: any[] | undefined) {
  return useQuery({
    queryKey: ["gallery-category-all-images", categoryId, subcategories?.map(s => s.id).join(",")],
    queryFn: async () => {
      if (!subcategories || subcategories.length === 0) return [];
      
      const fetchedImages: string[] = [];
      
      for (const sub of subcategories) {
        const imgs = await apiFetch<any[]>(`/api/galleries/categories/${categoryId}/subcategories/${sub.id}/images/`);
        for (const img of imgs) {
          if (img.image) fetchedImages.push(img.image);
        }
      }
      
      return fetchedImages;
    },
    enabled: !!categoryId && !!subcategories && subcategories.length > 0,
  });
}