import { useQuery } from "@tanstack/react-query";
import { apiFetch, ProjectScope } from "../lib/api";

export function useProjectScopes() {
  return useQuery<ProjectScope[]>({
    queryKey: ["project-scopes"],
    queryFn: () => apiFetch<ProjectScope[]>("/api/projects/scopes/"),
  });
}
