import { useQuery } from "@tanstack/react-query";
import { apiFetch, CorePrinciple } from "../lib/api";

export function useCorePrinciples() {
  return useQuery<CorePrinciple[]>({
    queryKey: ["core-principles"],
    queryFn: () => apiFetch<CorePrinciple[]>("/api/about-us/core-principles/"),
  });
}
