import { useQuery } from "@tanstack/react-query";
import { apiFetch, ExpertiseCategory, ExpertiseItem } from "../lib/api";

export function useExpertiseCategories() {
  return useQuery<ExpertiseCategory[]>({
    queryKey: ["expertise-categories"],
    queryFn: () => apiFetch<ExpertiseCategory[]>("/api/services/expertise-categories/"),
  });
}

export function useExpertiseItems(categoryId?: number) {
  const { data: categories } = useExpertiseCategories();

  return useQuery<ExpertiseItem[]>({
    queryKey: ["expertise-items", categoryId],
    queryFn: async () => {
      if (categoryId) {
        return apiFetch<ExpertiseItem[]>(`/api/services/expertise-categories/${categoryId}/items/`);
      }

      if (!categories?.length) return [];

      const allItems = await Promise.all(
        categories.map((cat) =>
          apiFetch<ExpertiseItem[]>(`/api/services/expertise-categories/${cat.id}/items/`)
        )
      );

      return allItems.flat();
    },
    enabled: !!categories || !!categoryId,
  });
}