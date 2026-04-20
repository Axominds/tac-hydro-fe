import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch, Project, NewsItem, Banner, SiteSettings, GalleryCategory, GallerySubcategory, GalleryImage, ExpertiseCategory, ServiceSector, AboutPageSection, ProjectScopeMembership, ProjectScopeImage, CorePrinciple, TeamCategory, TeamMember, TeamMemberCategory, ValuedPartner } from "../lib/api";

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

// --- PROJECT SCOPES ---

export function useProjectScopeMutations() {
  const queryClient = useQueryClient();

  const createScope = useMutation({
    mutationFn: (data: { name: string; order?: number }) =>
      apiFetch<{ id: number; name: string; order: number }>("/api/projects/scopes/", { method: "POST", body: data }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["project-scopes"] }),
  });

  const updateScope = useMutation({
    mutationFn: ({ id, data }: { id: number; data: { name?: string; order?: number } }) =>
      apiFetch<{ id: number; name: string; order: number }>(`/api/projects/scopes/${id}/`, { method: "PATCH", body: data }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["project-scopes"] }),
  });

  const reorderScopes = useMutation({
    mutationFn: (items: { id: number; order: number }[]) =>
      Promise.all(
        items.map((item) =>
          apiFetch(`/api/projects/scopes/${item.id}/`, { method: "PATCH", body: { order: item.order } })
        )
      ),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["project-scopes"] }),
  });

  const deleteScope = useMutation({
    mutationFn: (id: number) =>
      apiFetch(`/api/projects/scopes/${id}/`, { method: "DELETE" }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["project-scopes"] }),
  });

  return { createScope, updateScope, reorderScopes, deleteScope };
}

export function useProjectScopeMembershipMutations() {
  const queryClient = useQueryClient();

  const createMembership = useMutation({
    mutationFn: (data: { project_id: number; project_scope_id: number; role?: string | null }) =>
      apiFetch<ProjectScopeMembership>("/api/projects/scope-memberships/", { method: "POST", body: data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["project-scope-memberships"] });
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });

  const updateMembership = useMutation({
    mutationFn: ({ id, data }: { id: number; data: { project_scope_id?: number; role?: string | null } }) =>
      apiFetch<ProjectScopeMembership>(`/api/projects/scope-memberships/${id}/`, { method: "PATCH", body: data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["project-scope-memberships"] });
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });

  const deleteMembership = useMutation({
    mutationFn: (id: number) => apiFetch(`/api/projects/scope-memberships/${id}/`, { method: "DELETE" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["project-scope-memberships"] });
      queryClient.invalidateQueries({ queryKey: ["project-scope-images"] });
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });

  return { createMembership, updateMembership, deleteMembership };
}

export function useProjectScopeImageMutations() {
  const queryClient = useQueryClient();

  const createScopeImage = useMutation({
    mutationFn: (data: {
      project_scope_membership_id: number;
      alt_text?: string;
      order: number;
      image: File;
    }) => {
      const body = new FormData();
      body.append("project_scope_membership_id", String(data.project_scope_membership_id));
      body.append("alt_text", data.alt_text || "");
      body.append("order", String(data.order));
      body.append("image", data.image);
      return apiFetch<ProjectScopeImage>("/api/projects/scope-images/", { method: "POST", body });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["project-scope-images"] });
      queryClient.invalidateQueries({ queryKey: ["project-scope-memberships"] });
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });

  const deleteScopeImage = useMutation({
    mutationFn: (id: number) => apiFetch(`/api/projects/scope-images/${id}/`, { method: "DELETE" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["project-scope-images"] });
      queryClient.invalidateQueries({ queryKey: ["project-scope-memberships"] });
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });

  const reorderScopeImages = useMutation({
    mutationFn: (items: { id: number; order: number }[]) =>
      Promise.all(
        items.map((item) =>
          apiFetch(`/api/projects/scope-images/${item.id}/`, { method: "PATCH", body: { order: item.order } })
        )
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["project-scope-images"] });
      queryClient.invalidateQueries({ queryKey: ["project-scope-memberships"] });
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });

  return { createScopeImage, deleteScopeImage, reorderScopeImages };
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

// --- VALUED PARTNERS ---

export function useValuedPartnerMutations() {
  const queryClient = useQueryClient();

  const createPartner = useMutation({
    mutationFn: (data: Partial<ValuedPartner>) =>
      apiFetch<ValuedPartner>("/api/home/valued-partners/", { method: "POST", body: data }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["valued-partners"] }),
  });

  const updatePartner = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<ValuedPartner> }) =>
      apiFetch<ValuedPartner>(`/api/home/valued-partners/${id}/`, { method: "PATCH", body: data }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["valued-partners"] }),
  });

  const deletePartner = useMutation({
    mutationFn: (id: number) =>
      apiFetch(`/api/home/valued-partners/${id}/`, { method: "DELETE" }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["valued-partners"] }),
  });

  const reorderPartners = useMutation({
    mutationFn: (items: { id: number; order: number }[]) =>
      Promise.all(
        items.map((item) =>
          apiFetch(`/api/home/valued-partners/${item.id}/`, { method: "PATCH", body: { order: item.order } })
        )
      ),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["valued-partners"] }),
  });

  return { createPartner, updatePartner, deletePartner, reorderPartners };
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

// --- ABOUT PAGE SECTIONS ---

export function useAboutSectionMutations() {
  const queryClient = useQueryClient();

  const createSection = useMutation({
    mutationFn: (data: Partial<AboutPageSection>) =>
      apiFetch<AboutPageSection>("/api/about-us/sections/", { method: "POST", body: data }),
    onSuccess: (data) => {
      queryClient.setQueryData<AboutPageSection[]>(["about-sections"], (old) => {
        if (!old) return [data];
        return [...old, data];
      });
    },
  });

  const updateSection = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<AboutPageSection> }) =>
      apiFetch<AboutPageSection>(`/api/about-us/sections/${id}/`, { method: "PATCH", body: data }),
    onSuccess: (data) => {
      queryClient.setQueryData<AboutPageSection[]>(["about-sections"], (old) => {
        if (!old) return [data];
        return old.map((item) => (item.id === data.id ? data : item));
      });
    },
  });

  const uploadImage = useMutation({
    mutationFn: ({ id, file }: { id: number; file: File }) => {
      const formData = new FormData();
      formData.append("file", file);
      return apiFetch<{ detail: string }>(`/api/about-us/sections/${id}/image/`, {
        method: "POST",
        body: formData,
      });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["about-sections"] }),
  });

  const deleteSection = useMutation({
    mutationFn: (id: number) =>
      apiFetch(`/api/about-us/sections/${id}/`, { method: "DELETE" }),
    onSuccess: (_, deletedId) => {
      queryClient.setQueryData<AboutPageSection[]>(["about-sections"], (old) => {
        if (!old) return [];
        return old.filter((item) => item.id !== deletedId);
      });
    },
  });

  return { createSection, updateSection, uploadImage, deleteSection };
}

// --- CORE PRINCIPLES INTRO ---

export function useCorePrinciplesIntroMutations() {
  const queryClient = useQueryClient();

  const updateIntro = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<AboutPageSection> }) =>
      apiFetch<AboutPageSection>(`/api/about-us/core-principles-intro/${id}/`, { method: "PATCH", body: data }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["core-principles-intro"] }),
  });

  const uploadImage = useMutation({
    mutationFn: ({ id, file }: { id: number; file: File }) => {
      const formData = new FormData();
      formData.append("file", file);
      return apiFetch<{ detail: string }>(`/api/about-us/core-principles-intro/${id}/image/`, {
        method: "POST",
        body: formData,
      });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["core-principles-intro"] }),
  });

  const deleteIntro = useMutation({
    mutationFn: (id: number) =>
      apiFetch(`/api/about-us/core-principles-intro/${id}/`, { method: "DELETE" }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["core-principles-intro"] }),
  });

  return { updateIntro, uploadImage, deleteIntro };
}

// --- CORE PRINCIPLES ---

export function useCorePrinciplesMutations() {
  const queryClient = useQueryClient();

  const createCorePrinciple = useMutation({
    mutationFn: (data: Partial<CorePrinciple>) =>
      apiFetch<CorePrinciple>("/api/about-us/core-principles/", { method: "POST", body: data }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["core-principles"] }),
  });

  const updateCorePrinciple = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<CorePrinciple> }) =>
      apiFetch<CorePrinciple>(`/api/about-us/core-principles/${id}/`, { method: "PATCH", body: data }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["core-principles"] }),
  });

  const deleteCorePrinciple = useMutation({
    mutationFn: (id: number) =>
      apiFetch(`/api/about-us/core-principles/${id}/`, { method: "DELETE" }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["core-principles"] }),
  });

  const reorderCorePrinciples = useMutation({
    mutationFn: (items: { id: number; order: number }[]) =>
      Promise.all(
        items.map((item) =>
          apiFetch(`/api/about-us/core-principles/${item.id}/`, { method: "PATCH", body: { order: item.order } })
        )
      ),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["core-principles"] }),
  });

  return { createCorePrinciple, updateCorePrinciple, deleteCorePrinciple, reorderCorePrinciples };
}

// --- TEAM CATEGORIES ---

export function useTeamCategoryMutations() {
  const queryClient = useQueryClient();

  const createTeamCategory = useMutation({
    mutationFn: (data: Partial<TeamCategory>) =>
      apiFetch<TeamCategory>("/api/about-us/team-categories/", { method: "POST", body: data }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["team-categories"] }),
  });

  const updateTeamCategory = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<TeamCategory> }) =>
      apiFetch<TeamCategory>(`/api/about-us/team-categories/${id}/`, { method: "PATCH", body: data }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["team-categories"] }),
  });

  const deleteTeamCategory = useMutation({
    mutationFn: (id: number) =>
      apiFetch(`/api/about-us/team-categories/${id}/`, { method: "DELETE" }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["team-categories"] }),
  });

  const reorderTeamCategories = useMutation({
    mutationFn: (items: { id: number; order: number }[]) =>
      Promise.all(
        items.map((item) =>
          apiFetch(`/api/about-us/team-categories/${item.id}/`, { method: "PATCH", body: { order: item.order } })
        )
      ),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["team-categories"] }),
  });

  return { createTeamCategory, updateTeamCategory, deleteTeamCategory, reorderTeamCategories };
}

// --- TEAM MEMBERS ---

export function useTeamMemberMutations() {
  const queryClient = useQueryClient();

  const createTeamMember = useMutation({
    mutationFn: (data: { name: string; education?: string; bio?: string; is_active: boolean; role?: string; technical_expertise?: string; photo?: File; profile_photo?: File }) => {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("education", data.education || "");
      formData.append("bio", data.bio || "");
      formData.append("is_active", String(data.is_active));
      if (data.photo) formData.append("photo", data.photo);
      if (data.profile_photo) formData.append("profile_photo", data.profile_photo);
      return apiFetch<TeamMember>("/api/about-us/team-members/", { method: "POST", body: formData });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["team-members"] });
      queryClient.invalidateQueries({ queryKey: ["team-member-categories"] });
    },
  });

  const updateTeamMember = useMutation({
    mutationFn: ({ id, data }: { id: number; data: { name?: string; education?: string; bio?: string; is_active?: boolean; photo?: File; profile_photo?: File } }) => {
      const formData = new FormData();
      if (data.name !== undefined) formData.append("name", data.name);
      if (data.education !== undefined) formData.append("education", data.education);
      if (data.bio !== undefined) formData.append("bio", data.bio);
      if (data.is_active !== undefined) formData.append("is_active", String(data.is_active));
      if (data.photo) formData.append("photo", data.photo);
      if (data.profile_photo) formData.append("profile_photo", data.profile_photo);
      return apiFetch<TeamMember>(`/api/about-us/team-members/${id}/`, { method: "PATCH", body: formData });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["team-members"] });
      queryClient.invalidateQueries({ queryKey: ["team-member-categories"] });
    },
  });

  const deleteTeamMember = useMutation({
    mutationFn: (id: number) =>
      apiFetch(`/api/about-us/team-members/${id}/`, { method: "DELETE" }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["team-members"] }),
  });

  return { createTeamMember, updateTeamMember, deleteTeamMember };
}

// --- TEAM MEMBER CATEGORIES ---

export function useTeamMemberCategoryMutations() {
  const queryClient = useQueryClient();

  const addMemberCategory = useMutation({
    mutationFn: (data: { team_member_id: number; category_id: number }) =>
      apiFetch<TeamMemberCategory>("/api/about-us/team-member-categories/", { method: "POST", body: data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["team-member-categories"] });
    },
  });

  const removeMemberCategory = useMutation({
    mutationFn: (id: number) =>
      apiFetch(`/api/about-us/team-member-categories/${id}/`, { method: "DELETE" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["team-member-categories"] });
    },
  });

  return { addMemberCategory, removeMemberCategory };
}
