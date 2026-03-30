import { useQuery } from "@tanstack/react-query";
import { apiFetch, AboutPageSection } from "../lib/api";

export function useAboutSections() {
  return useQuery<AboutPageSection[]>({
    queryKey: ["about-sections"],
    queryFn: () => apiFetch<AboutPageSection[]>("/api/about-us/sections/"),
  });
}
