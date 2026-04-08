import { useQuery } from "@tanstack/react-query";
import { apiFetch, ExpertiseCategory, ExpertiseItem } from "../lib/api";

export function useExpertiseCategories() {
  return useQuery<ExpertiseCategory[]>({
    queryKey: ["expertise-categories"],
    queryFn: () => apiFetch<ExpertiseCategory[]>("/api/services/expertise-categories/"),
  });
}

export function useExpertiseItems(categoryId?: number) {
  if (categoryId) {
    return useQuery<ExpertiseItem[]>({
      queryKey: ["expertise-items", categoryId],
      queryFn: () => apiFetch<ExpertiseItem[]>(`/api/services/expertise-categories/${categoryId}/items/`),
    });
  }
  
  return useQuery<ExpertiseItem[]>({
    queryKey: ["expertise-items"],
    queryFn: async () => {
      const categories = await apiFetch<any[]>("/api/services/expertise-categories/");
      const allItems: ExpertiseItem[] = [];
      for (const cat of categories) {
        const items = await apiFetch<ExpertiseItem[]>(`/api/services/expertise-categories/${cat.id}/items/`);
        allItems.push(...items);
      }
      return allItems;
    },
  });
}