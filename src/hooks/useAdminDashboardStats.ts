import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "../lib/api";

export interface AdminDashboardStats {
  team_members_count: number;
  projects_count: number;
  projects_by_scope: Record<string, number>;
  service_sectors_count: number;
  expertise_categories_count: number;
  news_count: number;
  partners_count: number;
}

export function useAdminDashboardStats() {
  return useQuery<AdminDashboardStats>({
    queryKey: ["admin-dashboard-stats"],
    queryFn: () => apiFetch<AdminDashboardStats>("/api/home/admin-stats/", { requireAuth: true }),
    staleTime: 60 * 1000,
  });
}
