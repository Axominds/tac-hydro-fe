import { useQuery } from "@tanstack/react-query";
import { apiFetch, ServiceSector } from "../lib/api";

export function useServiceSectors() {
  return useQuery<ServiceSector[]>({
    queryKey: ["service-sectors"],
    queryFn: () => apiFetch<ServiceSector[]>("/api/services/sectors/"),
  });
}

export function useServiceSector(sectorId: number) {
  return useQuery<ServiceSector>({
    queryKey: ["service-sector", sectorId],
    queryFn: () => apiFetch<ServiceSector>(`/api/services/sectors/${sectorId}/`),
    enabled: !!sectorId,
  });
}
