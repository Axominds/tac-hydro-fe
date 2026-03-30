import { useQuery } from "@tanstack/react-query";
import { apiFetch, ExpertiseCategory } from "../lib/api";

export function useExpertiseCategories() {
  return useQuery<ExpertiseCategory[]>({
    queryKey: ["expertise-categories"],
    queryFn: () => apiFetch<ExpertiseCategory[]>("/api/services/expertise-categories/"),
  });
}
