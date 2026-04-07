import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch, Project, NewsItem, Banner, SiteSettings, GalleryCategory, GallerySubcategory, GalleryImage } from "../lib/api";

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
    mutationFn: (data: Partial<GallerySubcategory>) =>
      apiFetch<GallerySubcategory>("/api/galleries/subcategories/", { method: "POST", body: data }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["gallery-subcategories"] }),
  });

  const updateSubcategory = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<GallerySubcategory> }) =>
      apiFetch<GallerySubcategory>(`/api/galleries/subcategories/${id}/`, { method: "PATCH", body: data }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["gallery-subcategories"] }),
  });

  const reorderSubcategories = useMutation({
    mutationFn: (items: { id: number; order: number }[]) =>
      Promise.all(
        items.map((item) =>
          apiFetch(`/api/galleries/subcategories/${item.id}/`, { method: "PATCH", body: { order: item.order } })
        )
      ),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["gallery-subcategories"] }),
  });

  const deleteSubcategory = useMutation({
    mutationFn: (id: number) =>
      apiFetch(`/api/galleries/subcategories/${id}/`, { method: "DELETE" }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["gallery-subcategories"] }),
  });

  return { createSubcategory, updateSubcategory, reorderSubcategories, deleteSubcategory };
}

export function useGalleryImageMutations() {
  const queryClient = useQueryClient();

  const uploadImage = useMutation({
    mutationFn: ({ subcategoryId, file, order }: { subcategoryId: number; file: File; order: number }) => {
      const formData = new FormData();
      formData.append("gallery_subcategory_id", subcategoryId.toString());
      formData.append("image", file);
      formData.append("order", order.toString());
      return apiFetch<GalleryImage>("/api/galleries/images/", {
        method: "POST",
        body: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["gallery-images"] }),
  });

  const reorderImages = useMutation({
    mutationFn: (items: { id: number; order: number }[]) =>
      Promise.all(
        items.map((item) =>
          apiFetch(`/api/galleries/images/${item.id}/`, { method: "PATCH", body: { order: item.order } })
        )
      ),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["gallery-images"] }),
  });

  const deleteImage = useMutation({
    mutationFn: (id: number) =>
      apiFetch(`/api/galleries/images/${id}/`, { method: "DELETE" }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["gallery-images"] }),
  });

  return { uploadImage, reorderImages, deleteImage };
}

