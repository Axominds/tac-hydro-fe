import { useQuery } from "@tanstack/react-query";
import { apiFetch, Project, ProjectScopeMembership, ProjectScope, ProjectScopeImage } from "../lib/api";
import { useProjectScopes } from "./useProjectScopes";

export function useProjects() {
  return useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: () => apiFetch<Project[]>("/api/projects/"),
  });
}

export function useProjectScopeMemberships() {
  return useQuery<ProjectScopeMembership[]>({
    queryKey: ["project-scope-memberships"],
    queryFn: () => apiFetch<ProjectScopeMembership[]>("/api/projects/scope-memberships/"),
  });
}

export function useProjectScopeImages() {
  return useQuery<ProjectScopeImage[]>({
    queryKey: ["project-scope-images"],
    queryFn: () => apiFetch<ProjectScopeImage[]>("/api/projects/scope-images/"),
  });
}

export function useProjectDetail(projectId: number | null) {
  return useQuery<Project | null>({
    queryKey: ["project", projectId],
    queryFn: () => (projectId ? apiFetch<Project>(`/api/projects/${projectId}/`) : null),
    enabled: !!projectId,
  });
}

export function useProjectsWithScopes() {
  const { data: projects, isLoading: projectsLoading, ...projectsRest } = useProjects();
  const { data: memberships, isLoading: membershipsLoading } = useProjectScopeMemberships();
  const { data: scopes } = useProjectScopes();

  const projectsWithScopes = (() => {
    if (!projects || !memberships || !scopes) return [];

    return projects.map((project) => {
      const projectMemberships = memberships.filter((m) => m.project_id === project.id);
      const projectScopes = projectMemberships
        .map((m) => scopes.find((s) => s.id === m.project_scope_id))
        .filter((s): s is ProjectScope => s !== undefined)
        .sort((a, b) => a.order - b.order);

      const primaryScope = projectScopes[0]?.name || null;
      const primaryRole = projectMemberships[0]?.role || null;
      const primaryImageUrls = projectMemberships[0]?.image_urls ?? [];

      return {
        ...project,
        scopes: projectScopes,
        scope: primaryScope,
        role: primaryRole,
        image_urls: primaryImageUrls,
      };
    });
  })();

  return {
    data: projectsWithScopes,
    isLoading: projectsLoading || membershipsLoading,
    ...projectsRest,
  };
}
