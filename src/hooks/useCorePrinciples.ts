import { useQuery } from "@tanstack/react-query";
import { apiFetch, CorePrinciple, CorePrinciplesIntro } from "../lib/api";

export function useCorePrinciples() {
  return useQuery<CorePrinciple[]>({
    queryKey: ["core-principles"],
    queryFn: () => apiFetch<CorePrinciple[]>("/api/about-us/core-principles/"),
  });
}

export function useCorePrinciplesIntro() {
  return useQuery<CorePrinciplesIntro | null>({
    queryKey: ["core-principles-intro"],
    queryFn: async () => {
      const items = await apiFetch<CorePrinciplesIntro[]>("/api/about-us/core-principles-intro/");
      return items?.[0] || null;
    },
  });
}