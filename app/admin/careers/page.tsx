"use client";

import { useState, useEffect, useRef } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  Loader2,
  Briefcase,
  MapPin,
  Eye,
  EyeOff,
  Filter,
  Search,
  ChevronRight,
} from "lucide-react";
import { Montserrat } from "next/font/google";
import { useJobPostings } from "../../../src/hooks/useCareers";
import { useJobPostingMutations } from "../../../src/hooks/useAdminMutations";
import { useAdminTheme } from "../../../src/hooks/useAdminTheme";
import { useModalContext } from "../layout";
import { JobPostingModal } from "./JobPostingModal";
import { Toast, useToast } from "../../../src/components/ui/toast";
import type { JobPosting, JobPostingListResponse } from "../../../src/lib/api";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["600", "700"] });

const TYPE_COLORS: Record<string, { bg: string; text: string }> = {
  "Full Time": { bg: "bg-blue-600/10", text: "text-blue-500" },
  "Internship": { bg: "bg-emerald-600/10", text: "text-emerald-500" },
  "Independent Consultant": { bg: "bg-purple-600/10", text: "text-purple-500" },
};

export default function CareersManagementPage() {
  const { theme, colors, mounted } = useAdminTheme();
  const { setIsModalOpen } = useModalContext();
  const { createJobPosting, updateJobPosting, deleteJobPosting } = useJobPostingMutations();
  const { toast, showToast, hideToast } = useToast();

  const [editingJob, setEditingJobLocal] = useState<JobPosting | null>(null);
  const setEditingJob = (job: JobPosting | null) => {
    setEditingJobLocal(job);
    setIsModalOpen(!!job);
  };

  const [isAdding, setIsAddingLocal] = useState(false);
  const setIsAdding = (open: boolean) => {
    setIsAddingLocal(open);
    setIsModalOpen(open);
  };

  const [filterType, setFilterType] = useState("All");
  const [filterIsOpen, setFilterIsOpen] = useState("all");
  const [searchText, setSearchText] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const searchTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [page, setPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
    searchTimerRef.current = setTimeout(() => setDebouncedSearch(searchText), 300);
    return () => {
      if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
    };
  }, [searchText]);

  useEffect(() => {
    setPage(1);
  }, [filterIsOpen, filterType, debouncedSearch]);

  const filters: { is_open?: boolean; type?: string; search?: string } = {};
  if (filterIsOpen === "open") filters.is_open = true;
  if (filterIsOpen === "closed") filters.is_open = false;
  if (filterType !== "All") filters.type = filterType;
  if (debouncedSearch.trim()) filters.search = debouncedSearch.trim();

  const { data: jobsData, isLoading, refetch } = useJobPostings({
    ...(Object.keys(filters).length ? filters : {}),
    page,
    page_size: pageSize,
  });

  const jobs = jobsData && "results" in jobsData ? (jobsData as JobPostingListResponse).results : undefined;
  const totalPages = jobsData && "count" in jobsData ? Math.ceil((jobsData as JobPostingListResponse).count / pageSize) : 1;

  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <div className="space-y-15">
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`${montserrat.className} text-4xl font-bold mb-2`} style={{ color: colors.text }}>
            Job <span className="text-blue-500">Postings</span>
          </h1>
          <p style={{ color: colors.textMuted as string }}>
            Manage job postings and open positions.
          </p>
        </div>
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-sm rounded-lg"
        >
          <Plus className="h-4 w-4" />
          Add
        </button>
      </div>

        <div className="flex gap-6">
          <div className="flex-1 min-w-0">
            {isLoading ? (
              <div className="flex justify-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
              </div>
            ) : !jobs || jobs.length === 0 ? (
              <div
                className="rounded-2xl p-12 text-center"
                style={{
                  backgroundColor: isDark ? "rgba(255,255,255,0.03)" : "#ffffff",
                  border: `1px dashed ${isDark ? "rgba(255,255,255,0.15)" : "#cbd5e1"}`,
                }}
              >
                <Briefcase className="h-12 w-12 mx-auto mb-4" style={{ color: colors.textMuted as string }} />
                <p className="font-medium mb-1" style={{ color: colors.text as string }}>
                  No job postings yet
                </p>
                <p className="text-sm" style={{ color: colors.textMuted as string }}>
                  Click &ldquo;Add&rdquo; to create your first job posting.
                </p>
              </div>
            ) : (
              <div
                className="rounded-2xl overflow-hidden"
                style={{
                  backgroundColor: isDark ? "rgba(255,255,255,0.03)" : "#ffffff",
                  border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "#e2e8f0"}`,
                }}
              >
                <table className="w-full text-sm">
                  <thead>
                    <tr
                      className="text-left text-xs font-semibold uppercase tracking-wider"
                      style={{
                        color: colors.textMuted as string,
                        borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "#e2e8f0"}`,
                      }}
                    >
                      <th className="px-6 py-4 font-semibold">Title</th>
                      <th className="px-6 py-4 font-semibold">Type</th>
                      <th className="px-6 py-4 font-semibold">Location</th>
                      <th className="px-6 py-4 font-semibold">Status</th>
                      <th className="px-6 py-4 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jobs!.map((job) => {
                      const typeColor = TYPE_COLORS[job.type] || TYPE_COLORS["Full Time"];
                      return (
                        <tr
                          key={job.id}
                          className="group transition-all"
                          style={{
                            borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "#f1f5f9"}`,
                          }}
                        >
                          <td className="px-6 py-4">
                            <span className="font-medium" style={{ color: colors.text as string }}>
                              {job.title}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${typeColor.bg} ${typeColor.text}`}>
                              {job.type}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-1.5" style={{ color: colors.textMuted as string }}>
                              <MapPin className="h-3.5 w-3.5 shrink-0" />
                              {job.location || "Location TBD"}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            {job.is_open ? (
                              <span className="inline-flex items-center gap-1 text-xs font-medium text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
                                <Eye className="h-3 w-3" />
                                Open
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-xs font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                                <EyeOff className="h-3 w-3" />
                                Closed
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-1">
                              <button
                                onClick={() => setEditingJob(job)}
                                className="p-2 rounded-lg transition-all"
                                style={{
                                  backgroundColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
                                }}
                              >
                                <Edit2 className="h-4 w-4" style={{ color: colors.textSecondary as string }} />
                              </button>
                              <button
                                onClick={async () => {
                                  await deleteJobPosting.mutateAsync(job.id);
                                  refetch();
                                  showToast("Job posting deleted successfully!", "error");
                                }}
                                className="p-2 rounded-lg transition-all"
                                style={{ backgroundColor: "rgba(239, 68, 68, 0.1)" }}
                              >
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                <div className="flex items-center justify-center gap-2 mt-8 pb-4">
                    <button
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={page === 1}
                      className="p-2 rounded-lg transition-all"
                      style={{
                        backgroundColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
                        color: colors.textSecondary as string,
                        opacity: page === 1 ? 0.3 : 1,
                      }}
                    >
                      <ChevronRight className="h-4 w-4 rotate-180" />
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
                      <button
                        key={pg}
                        onClick={() => setPage(pg)}
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-semibold transition-all"
                        style={
                          page === pg
                            ? { backgroundColor: "#3b82f6", color: "#ffffff" }
                            : {
                                color: colors.textSecondary as string,
                                backgroundColor: isDark
                                  ? "rgba(255,255,255,0.05)"
                                  : "rgba(0,0,0,0.05)",
                              }
                        }
                      >
                        {pg}
                      </button>
                    ))}

                    <button
                      onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                      disabled={page === totalPages}
                      className="p-2 rounded-lg transition-all"
                      style={{
                        backgroundColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
                        color: colors.textSecondary as string,
                        opacity: page === totalPages ? 0.3 : 1,
                      }}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
              </div>
            )}
          </div>

          <div
            className="w-64 shrink-0 rounded-2xl p-5 h-fit sticky top-28"
            style={{
              backgroundColor: isDark ? "rgba(255,255,255,0.03)" : "#ffffff",
              border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "#e2e8f0"}`,
            }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Filter className="h-4 w-4" style={{ color: colors.textMuted as string }} />
              <span className="font-semibold text-sm" style={{ color: colors.text as string }}>
                Filters
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs mb-1.5" style={{ color: colors.textMuted as string }}>
                  Search
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: colors.textMuted as string }} />
                  <input
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    placeholder="Search by title..."
                    className="w-full rounded-lg pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    style={{
                      backgroundColor: isDark ? "rgba(0,0,0,0.3)" : "#f1f5f9",
                      border: `1px solid ${isDark ? "rgba(255,255,255,0.15)" : "#cbd5e1"}`,
                      color: isDark ? "#ffffff" : "#1e293b",
                    }}
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs mb-1.5" style={{ color: colors.textMuted as string }}>
                  Status
                </label>
                <select
                  value={filterIsOpen}
                  onChange={(e) => setFilterIsOpen(e.target.value)}
                  className="w-full rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  style={{
                    backgroundColor: isDark ? "rgba(0,0,0,0.3)" : "#f1f5f9",
                    border: `1px solid ${isDark ? "rgba(255,255,255,0.15)" : "#cbd5e1"}`,
                    color: isDark ? "#ffffff" : "#1e293b",
                  }}
                >
                  <option value="all">All</option>
                  <option value="open">Open</option>
                  <option value="closed">Closed</option>
                </select>
              </div>

              <div>
                <label className="block text-xs mb-1.5" style={{ color: colors.textMuted as string }}>
                  Type
                </label>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="w-full rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  style={{
                    backgroundColor: isDark ? "rgba(0,0,0,0.3)" : "#f1f5f9",
                    border: `1px solid ${isDark ? "rgba(255,255,255,0.15)" : "#cbd5e1"}`,
                    color: isDark ? "#ffffff" : "#1e293b",
                  }}
                >
                  <option value="All">All</option>
                  <option value="Full Time">Full Time</option>
                  <option value="Internship">Internship</option>
                  <option value="Independent Consultant">Independent Consultant</option>
                </select>
              </div>
            </div>
          </div>
        </div>

      {isAdding && (
        <JobPostingModal
          job={null}
          isOpen={isAdding}
          onClose={() => setIsAdding(false)}
          onSave={async (data) => {
            await createJobPosting.mutateAsync(data);
            refetch();
            showToast("Job posting added successfully!", "success");
          }}
        />
      )}

      {editingJob && (
        <JobPostingModal
          job={editingJob}
          isOpen={!!editingJob}
          onClose={() => setEditingJob(null)}
          onSave={async (data) => {
            await updateJobPosting.mutateAsync({ id: editingJob.id, data });
            refetch();
            showToast("Job posting updated successfully!", "success");
          }}
          onDelete={async (id) => {
            await deleteJobPosting.mutateAsync(id);
            refetch();
            showToast("Job posting deleted successfully!", "error");
          }}
        />
      )}

      {toast && <Toast message={toast.message} type={toast.type} onClose={hideToast} />}
    </div>
  );
}
