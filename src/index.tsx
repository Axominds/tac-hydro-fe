import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { App } from "./App";
import { apiFetch, SiteSettingsList, Project, ProjectScopeMembership, ProjectScope, Stats, TeamMember, TeamMemberCategory, TeamCategory } from "./lib/api";
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
    queryClient.prefetchQuery({
      queryKey: ["team-members"],
      queryFn: async () => apiFetch<TeamMember[]>("/api/about-us/team-members/"),
    }),
    queryClient.prefetchQuery({
      queryKey: ["team-member-categories"],
      queryFn: async () => apiFetch<TeamMemberCategory[]>("/api/about-us/team-member-categories/"),
    }),
    queryClient.prefetchQuery({
      queryKey: ["team-categories"],
      queryFn: async () => apiFetch<TeamCategory[]>("/api/about-us/team-categories/"),
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
