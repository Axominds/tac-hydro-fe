import { useQuery } from "@tanstack/react-query";
import { apiFetch, JobPosting, JobCategory } from "../lib/api";

export function useJobPostings() {
  return useQuery<JobPosting[]>({
    queryKey: ["jobs"],
    queryFn: () => apiFetch<JobPosting[]>("/api/contact-us/jobs/"),
  });
}

export function useJobCategories() {
  return useQuery<JobCategory[]>({
    queryKey: ["job-categories"],
    queryFn: () => apiFetch<JobCategory[]>("/api/contact-us/job-categories/"),
  });
}
