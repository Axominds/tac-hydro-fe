import { useQuery } from "@tanstack/react-query";
import { apiFetch, ExpertiseItem } from "../lib/api";

export function useExpertiseItems() {
  return useQuery<ExpertiseItem[]>({
    queryKey: ["expertise-items"],
    queryFn: () => apiFetch<ExpertiseItem[]>("/api/services/expertise-items/"),
  });
}
