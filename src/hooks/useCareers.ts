import { useMutation, useQuery } from "@tanstack/react-query";
import { apiFetch, JobPosting, JobPostingListResponse } from "../lib/api";

interface JobPostingFilters {
  is_open?: boolean;
  type?: string;
  search?: string;
  page?: number;
  page_size?: number;
}

export function useJobPostings(filters?: JobPostingFilters) {
  const hasPagination = filters?.page !== undefined;

  return useQuery<JobPosting[] | JobPostingListResponse>({
    queryKey: ["jobs", filters],
    queryFn: () => {
      const params = new URLSearchParams();
      if (filters?.is_open !== undefined) {
        params.set("is_open", String(filters.is_open));
      }
      if (filters?.type) {
        params.set("type", filters.type);
      }
      if (filters?.search) {
        params.set("search", filters.search);
      }
      if (filters?.page !== undefined) {
        params.set("page", String(filters.page));
      }
      if (filters?.page_size !== undefined) {
        params.set("page_size", String(filters.page_size));
      }
      const qs = params.toString();
      const url = `/api/contact-us/jobs/${qs ? `?${qs}` : ""}`;
      if (hasPagination) {
        return apiFetch<JobPostingListResponse>(url);
      }
      return apiFetch<JobPosting[]>(url);
    },
  });
}

export function useSubmitJobApplication() {
  return useMutation({
    mutationFn: (formData: FormData) =>
      apiFetch("/api/contact-us/job-applications/", {
        method: "POST",
        body: formData,
      }),
  });
}
