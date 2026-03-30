import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { App } from "./App";
import { apiFetch, SiteSettingsList, Project, ProjectScopeMembership, ProjectScope, Stats } from "./lib/api";
import "./tailwind.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      gcTime: Infinity,
    },
  },
});

async function prefetchData() {
  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["site-settings"],
      queryFn: async () => {
        const settings = await apiFetch<SiteSettingsList>("/api/home/settings/");
        return settings[0] ?? null;
      },
    }),
    queryClient.prefetchQuery({
      queryKey: ["stats"],
      queryFn: async () => apiFetch<Stats>("/api/home/stats/"),
    }),
    queryClient.prefetchQuery({
      queryKey: ["project-scopes"],
      queryFn: async () => apiFetch<ProjectScope[]>("/api/projects/scopes/"),
    }),
    queryClient.prefetchQuery({
      queryKey: ["projects"],
      queryFn: async () => apiFetch<Project[]>("/api/projects/"),
    }),
    queryClient.prefetchQuery({
      queryKey: ["project-scope-memberships"],
      queryFn: async () => apiFetch<ProjectScopeMembership[]>("/api/projects/scope-memberships/"),
    }),
  ]);
}

prefetchData().then(() => {
  createRoot(document.getElementById("app") as HTMLElement).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </StrictMode>,
  );
});
