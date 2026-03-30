import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "../lib/api";

export interface Stats {
  mw_capacity: number;
  projects_count: number;
  clients_count: number;
  team_members_count: number;
  years: number;
}

export function useStats() {
  return useQuery<Stats>({
    queryKey: ["stats"],
    queryFn: () => apiFetch<Stats>("/api/home/stats/"),
    refetchOnMount: true,
    retry: 3,
    staleTime: Infinity,
  });
}
