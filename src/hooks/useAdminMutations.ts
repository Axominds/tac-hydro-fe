import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch, Project, NewsItem, Banner, SiteSettings, GalleryCategory, GallerySubcategory, GalleryImage, ExpertiseCategory, ServiceSector } from "../lib/api";

// --- PROJECTS ---
// ... (omitting projects for brevity in replacement, but I will target the right lines)

export function useProjectMutations() {
  const queryClient = useQueryClient();

  const createProject = useMutation({
    mutationFn: (data: Partial<Project>) => 
      apiFetch<Project>("/api/projects/", { method: "POST", body: data }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["projects"] }),
  });

  const updateProject = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Project> }) => 
      apiFetch<Project>(`/api/projects/${id}/`, { method: "PATCH", body: data }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["projects"] }),
  });

  const deleteProject = useMutation({
    mutationFn: (id: number) => 
      apiFetch(`/api/projects/${id}/`, { method: "DELETE" }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["projects"] }),
  });

  return { createProject, updateProject, deleteProject };
}

// --- NEWS ---

export function useNewsMutations() {
  const queryClient = useQueryClient();

  const createNews = useMutation({
    mutationFn: (data: Partial<NewsItem>) => 
      apiFetch<NewsItem>("/api/home/news/", { method: "POST", body: data }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["news"] }),
  });

  const updateNews = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<NewsItem> }) => 
      apiFetch<NewsItem>(`/api/home/news/${id}/`, { method: "PATCH", body: data }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["news"] }),
  });

  const deleteNews = useMutation({
    mutationFn: (id: number) => 
      apiFetch(`/api/home/news/${id}/`, { method: "DELETE" }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["news"] }),
  });

  return { createNews, updateNews, deleteNews };
}

// --- NEWS CATEGORIES ---

export function useNewsCategoryMutations() {
  const queryClient = useQueryClient();

  const createCategory = useMutation({
    mutationFn: (data: { name: string; order?: number }) =>
      apiFetch<{ id: number; name: string; order: number }>("/api/home/news-categories/", { method: "POST", body: data }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["news-categories"] }),
  });

  const updateCategory = useMutation({
    mutationFn: ({ id, data }: { id: number; data: { name?: string; order?: number } }) =>
      apiFetch<{ id: number; name: string; order: number }>(`/api/home/news-categories/${id}/`, { method: "PATCH", body: data }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["news-categories"] }),
  });

  // Reorder: sends all PATCH requests in parallel, invalidates cache only once
  const reorderCategories = useMutation({
    mutationFn: (items: { id: number; order: number }[]) =>
      Promise.all(
        items.map((item) =>
          apiFetch(`/api/home/news-categories/${item.id}/`, { method: "PATCH", body: { order: item.order } })
        )
      ),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["news-categories"] }),
  });

  const deleteCategory = useMutation({
    mutationFn: (id: number) =>
      apiFetch(`/api/home/news-categories/${id}/`, { method: "DELETE" }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["news-categories"] }),
  });

  return { createCategory, updateCategory, reorderCategories, deleteCategory };
}

// --- BANNERS ---

export function useBannerMutations() {
  const queryClient = useQueryClient();

  const createBanner = useMutation({
    mutationFn: (data: Partial<Banner>) => 
      apiFetch<Banner>("/api/home/banners/", { method: "POST", body: data }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["banners"] }),
  });

  const updateBanner = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Banner> }) => 
      apiFetch<Banner>(`/api/home/banners/${id}/`, { method: "PATCH", body: data }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["banners"] }),
  });

  const deleteBanner = useMutation({
    mutationFn: (id: number) => 
      apiFetch(`/api/home/banners/${id}/`, { method: "DELETE" }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["banners"] }),
  });

  return { createBanner, updateBanner, deleteBanner };
}

// --- SETTINGS ---

export function useSettingsMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<SiteSettings> }) => 
      apiFetch<SiteSettings>(`/api/home/settings/${id}/`, { method: "PATCH", body: data }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["site-settings"] }),
  });
}

// --- GALLERIES ---

export function useGalleryCategoryMutations() {
  const queryClient = useQueryClient();

  const createCategory = useMutation({
    mutationFn: (data: Partial<GalleryCategory>) =>
      apiFetch<GalleryCategory>("/api/galleries/categories/", { method: "POST", body: data }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["gallery-categories"] }),
  });

  const updateCategory = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<GalleryCategory> }) =>
      apiFetch<GalleryCategory>(`/api/galleries/categories/${id}/`, { method: "PATCH", body: data }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["gallery-categories"] }),
  });

  const reorderCategories = useMutation({
    mutationFn: (items: { id: number; order: number }[]) =>
      Promise.all(
        items.map((item) =>
          apiFetch(`/api/galleries/categories/${item.id}/`, { method: "PATCH", body: { order: item.order } })
        )
      ),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["gallery-categories"] }),
  });

  const deleteCategory = useMutation({
    mutationFn: (id: number) =>
      apiFetch(`/api/galleries/categories/${id}/`, { method: "DELETE" }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["gallery-categories"] }),
  });

  return { createCategory, updateCategory, reorderCategories, deleteCategory };
}

export function useGallerySubcategoryMutations() {
  const queryClient = useQueryClient();

  const createSubcategory = useMutation({
    mutationFn: ({ categoryId, data }: { categoryId: number; data: Partial<GallerySubcategory> }) =>
      apiFetch<GallerySubcategory>(`/api/galleries/categories/${categoryId}/subcategories/`, { method: "POST", body: data }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["gallery-subcategories"] }),
  });

  const updateSubcategory = useMutation({
    mutationFn: ({ categoryId, id, data }: { categoryId: number; id: number; data: Partial<GallerySubcategory> }) =>
      apiFetch<GallerySubcategory>(`/api/galleries/categories/${categoryId}/subcategories/${id}/`, { method: "PATCH", body: data }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["gallery-subcategories"] }),
  });

  const reorderSubcategories = useMutation({
    mutationFn: ({ categoryId, items }: { categoryId: number; items: { id: number; order: number }[] }) =>
      Promise.all(
        items.map((item) =>
          apiFetch(`/api/galleries/categories/${categoryId}/subcategories/${item.id}/`, { method: "PATCH", body: { order: item.order } })
        )
      ),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["gallery-subcategories"] }),
  });

  const deleteSubcategory = useMutation({
    mutationFn: ({ categoryId, id }: { categoryId: number; id: number }) =>
      apiFetch(`/api/galleries/categories/${categoryId}/subcategories/${id}/`, { method: "DELETE" }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["gallery-subcategories"] }),
  });

  return { createSubcategory, updateSubcategory, reorderSubcategories, deleteSubcategory };
}

export function useGalleryImageMutations() {
  const queryClient = useQueryClient();

  const uploadImage = useMutation({
    mutationFn: ({ categoryId, subcategoryId, file, order }: { categoryId: number; subcategoryId: number; file: File; order: number }) => {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("order", order.toString());
      return apiFetch<GalleryImage>(`/api/galleries/categories/${categoryId}/subcategories/${subcategoryId}/images/`, {
        method: "POST",
        body: formData,
      });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["gallery-images"] }),
  });

  const reorderImages = useMutation({
    mutationFn: ({ categoryId, subcategoryId, items }: { categoryId: number; subcategoryId: number; items: { id: number; order: number }[] }) =>
      Promise.all(
        items.map((item) =>
          apiFetch(`/api/galleries/categories/${categoryId}/subcategories/${subcategoryId}/images/${item.id}/`, { method: "PATCH", body: { order: item.order } })
        )
      ),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["gallery-images"] }),
  });

  const deleteImage = useMutation({
    mutationFn: ({ categoryId, subcategoryId, id }: { categoryId: number; subcategoryId: number; id: number }) =>
      apiFetch(`/api/galleries/categories/${categoryId}/subcategories/${subcategoryId}/images/${id}/`, { method: "DELETE" }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["gallery-images"] }),
  });

  return { uploadImage, reorderImages, deleteImage };
}

// --- SERVICES ---

export function useExpertiseCategoryMutations() {
  const queryClient = useQueryClient();

  const createCategory = useMutation({
    mutationFn: (data: Partial<ExpertiseCategory>) =>
      apiFetch<ExpertiseCategory>("/api/services/expertise-categories/", { method: "POST", body: data }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["expertise-categories"] }),
  });

  const updateCategory = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<ExpertiseCategory> }) =>
      apiFetch<ExpertiseCategory>(`/api/services/expertise-categories/${id}/`, { method: "PATCH", body: data }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["expertise-categories"] }),
  });

  const deleteCategory = useMutation({
    mutationFn: (id: number) =>
      apiFetch(`/api/services/expertise-categories/${id}/`, { method: "DELETE" }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["expertise-categories"] }),
  });

  const reorderCategories = useMutation({
    mutationFn: (items: { id: number; order: number }[]) =>
      Promise.all(
        items.map((item) =>
          apiFetch(`/api/services/expertise-categories/${item.id}/`, { method: "PATCH", body: { order: item.order } })
        )
      ),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["expertise-categories"] }),
  });

  return { createCategory, updateCategory, deleteCategory, reorderCategories };
}

export function useExpertiseItemMutations() {
  const queryClient = useQueryClient();

  const createItem = useMutation({
    mutationFn: ({ categoryId, data }: { categoryId: number; data: any }) =>
      apiFetch<ExpertiseItem>(`/api/services/expertise-categories/${categoryId}/items/`, { method: "POST", body: data }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["expertise-items"] }),
  });

  const updateItem = useMutation({
    mutationFn: ({ categoryId, id, data }: { categoryId: number; id: number; data: any }) =>
      apiFetch<ExpertiseItem>(`/api/services/expertise-categories/${categoryId}/items/${id}/`, { method: "PATCH", body: data }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["expertise-items"] }),
  });

  const deleteItem = useMutation({
    mutationFn: ({ categoryId, id }: { categoryId: number; id: number }) =>
      apiFetch(`/api/services/expertise-categories/${categoryId}/items/${id}/`, { method: "DELETE" }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["expertise-items"] }),
  });

  const reorderItems = useMutation({
    mutationFn: ({ categoryId, items }: { categoryId: number; items: { id: number; order: number }[] }) =>
      Promise.all(
        items.map((item) =>
          apiFetch(`/api/services/expertise-categories/${categoryId}/items/${item.id}/`, { method: "PATCH", body: { order: item.order } })
        )
      ),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["expertise-items"] }),
  });

  return { createItem, updateItem, deleteItem, reorderItems };
}

export function useServiceSectorMutations() {
  const queryClient = useQueryClient();

  const createSector = useMutation({
    mutationFn: (data: Partial<ServiceSector>) =>
      apiFetch<ServiceSector>("/api/services/sectors/", { method: "POST", body: data }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["service-sectors"] }),
  });

  const updateSector = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<ServiceSector> }) =>
      apiFetch<ServiceSector>(`/api/services/sectors/${id}/`, { method: "PATCH", body: data }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["service-sectors"] }),
  });

  const deleteSector = useMutation({
    mutationFn: (id: number) =>
      apiFetch(`/api/services/sectors/${id}/`, { method: "DELETE" }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["service-sectors"] }),
  });

  const reorderSectors = useMutation({
    mutationFn: (items: { id: number; order: number }[]) =>
      Promise.all(
        items.map((item) =>
          apiFetch(`/api/services/sectors/${item.id}/`, { method: "PATCH", body: { order: item.order } })
        )
      ),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["service-sectors"] }),
  });

  return { createSector, updateSector, deleteSector, reorderSectors };
}

