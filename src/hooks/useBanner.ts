import { useQuery } from "@tanstack/react-query";
import { apiFetch, Banner } from "../lib/api";

export function useBanners() {
  return useQuery<Banner[]>({
    queryKey: ["banners"],
    queryFn: () => apiFetch<Banner[]>("/api/home/banners/"),
    staleTime: 0,
    gcTime: 0,
    refetchOnMount: true,
  });
}
