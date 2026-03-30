import { useQuery } from "@tanstack/react-query";
import { apiFetch, SiteSettings, SiteSettingsList } from "../lib/api";

export function useSiteSettings() {
  return useQuery<SiteSettings | null>({
    queryKey: ["site-settings"],
    queryFn: async () => {
      const settings = await apiFetch<SiteSettingsList>("/api/home/settings/");
      return settings[0] ?? null;
    },
  });
}
