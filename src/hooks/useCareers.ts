import { useMutation, useQuery } from "@tanstack/react-query";
import { apiFetch, JobPosting, JobPostingListResponse, JobApplication, JobApplicationListResponse } from "../lib/api";

interface JobPostingFilters {
  is_open?: boolean;
  type?: string;
  search?: string;
  page?: number;
  page_size?: number;
}

interface JobApplicationFilters {
  job_id?: number;
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

export function useJobApplications(filters?: JobApplicationFilters) {
  const hasPagination = filters?.page !== undefined;

  return useQuery<JobApplication[] | JobApplicationListResponse>({
    queryKey: ["job-applications", filters],
    queryFn: () => {
      const params = new URLSearchParams();
      if (filters?.job_id !== undefined) {
        params.set("job_id", String(filters.job_id));
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
      const url = `/api/contact-us/job-applications/${qs ? `?${qs}` : ""}`;
      if (hasPagination) {
        return apiFetch<JobApplicationListResponse>(url, { requireAuth: true });
      }
      return apiFetch<JobApplication[]>(url, { requireAuth: true });
    },
  });
}

export function useJobApplicationDetail(id: number | null) {
  return useQuery<JobApplication>({
    queryKey: ["job-application", id],
    queryFn: () =>
      apiFetch<JobApplication>(`/api/contact-us/job-applications/${id}/`, { requireAuth: true }),
    enabled: !!id,
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
