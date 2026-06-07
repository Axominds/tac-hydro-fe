"use client";

import { useState, useEffect, useRef } from "react";
import {
  Edit2,
  Loader2,
  FileText,
  Filter,
  Search,
  ChevronRight,
  Mail,
} from "lucide-react";
import { Montserrat } from "next/font/google";
import { useJobApplications, useJobApplicationDetail, useJobPostings } from "../../../src/hooks/useCareers";
import { useJobApplicationMutations } from "../../../src/hooks/useAdminMutations";
import { useAdminTheme } from "../../../src/hooks/useAdminTheme";
import { useModalContext } from "../layout";
import { JobApplicationModal } from "./JobApplicationModal";
import { Toast, useToast } from "../../../src/components/ui/toast";
import type { JobApplication, JobApplicationListResponse, JobPostingListResponse } from "../../../src/lib/api";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["600", "700"] });

export default function JobApplicationsManagementPage() {
  const { theme, colors, mounted } = useAdminTheme();
  const { setIsModalOpen } = useModalContext();
  const { updateJobApplication } = useJobApplicationMutations();
  const { toast, showToast, hideToast } = useToast();

  const [editingApplication, setEditingApplicationLocal] = useState<JobApplication | null>(null);
  const setEditingApplication = (app: JobApplication | null) => {
    setEditingApplicationLocal(app);
    setIsModalOpen(!!app);
  };

  const [filterJobId, setFilterJobId] = useState<number | undefined>();
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
  }, [filterJobId, debouncedSearch]);

  const filters: { job_id?: number; search?: string } = {};
  if (filterJobId !== undefined) filters.job_id = filterJobId;
  if (debouncedSearch.trim()) filters.search = debouncedSearch.trim();

  const { data: applicationsData, isLoading, refetch } = useJobApplications({
    ...(Object.keys(filters).length ? filters : {}),
    page,
    page_size: pageSize,
  });

  const { data: detailData, isLoading: isDetailLoading } = useJobApplicationDetail(editingApplication?.id ?? null);

  const { data: jobsData } = useJobPostings();
  const allJobs = jobsData && Array.isArray(jobsData) ? jobsData : (jobsData as JobPostingListResponse)?.results || [];

  const applications = applicationsData && "results" in applicationsData ? (applicationsData as JobApplicationListResponse).results : undefined;
  const totalPages = applicationsData && "count" in applicationsData ? Math.ceil((applicationsData as JobApplicationListResponse).count / pageSize) : 1;

  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <div className="space-y-15">
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`${montserrat.className} text-4xl font-bold mb-2`} style={{ color: colors.text }}>
            Job <span className="text-blue-500">Applications</span>
          </h1>
          <p style={{ color: colors.textMuted as string }}>
            Review and manage job applications submitted through the website.
          </p>
        </div>
      </div>

        <div className="flex gap-6">
          <div className="flex-1 min-w-0">
            {isLoading ? (
              <div className="flex justify-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
              </div>
            ) : !applications || applications.length === 0 ? (
              <div
                className="rounded-2xl p-12 text-center"
                style={{
                  backgroundColor: isDark ? "rgba(255,255,255,0.03)" : "#ffffff",
                  border: `1px dashed ${isDark ? "rgba(255,255,255,0.15)" : "#cbd5e1"}`,
                }}
              >
                <FileText className="h-12 w-12 mx-auto mb-4" style={{ color: colors.textMuted as string }} />
                <p className="font-medium mb-1" style={{ color: colors.text as string }}>
                  No job applications found
                </p>
                <p className="text-sm" style={{ color: colors.textMuted as string }}>
                  Adjust your filters or wait for new applications.
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
                      <th className="px-6 py-4 font-semibold">Applicant</th>
                      <th className="px-6 py-4 font-semibold">Applied Job</th>
                      <th className="px-6 py-4 font-semibold">Date</th>
                      <th className="px-6 py-4 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applications!.map((app) => {
                      const job = allJobs.find(j => j.id === app.job_id);
                      return (
                        <tr
                          key={app.id}
                          className="group transition-all"
                          style={{
                            borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "#f1f5f9"}`,
                          }}
                        >
                          <td className="px-6 py-4">
                            <div className="flex flex-col">
                              <span className="font-medium" style={{ color: colors.text as string }}>
                                {app.first_name} {app.middle_name ? app.middle_name + " " : ""}{app.last_name}
                              </span>
                              <div className="flex items-center gap-1 text-xs mt-1" style={{ color: colors.textMuted as string }}>
                                <Mail className="h-3 w-3" />
                                {app.email}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span style={{ color: colors.textSecondary as string }}>
                              {job ? job.title : `Job #${app.job_id}`}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span style={{ color: colors.textSecondary as string }}>
                              {new Date(app.submitted_at).toLocaleDateString()}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-1">
                              <button
                                onClick={() => setEditingApplication(app)}
                                className="p-2 rounded-lg transition-all"
                                style={{
                                  backgroundColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
                                }}
                              >
                                <Edit2 className="h-4 w-4" style={{ color: colors.textSecondary as string }} />
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
                  Search Applicant
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: colors.textMuted as string }} />
                  <input
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    placeholder="Search by name/email..."
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
                  Job Filter
                </label>
                <select
                  value={filterJobId || ""}
                  onChange={(e) => setFilterJobId(e.target.value ? Number(e.target.value) : undefined)}
                  className="w-full rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  style={{
                    backgroundColor: isDark ? "rgba(0,0,0,0.3)" : "#f1f5f9",
                    border: `1px solid ${isDark ? "rgba(255,255,255,0.15)" : "#cbd5e1"}`,
                    color: isDark ? "#ffffff" : "#1e293b",
                  }}
                >
                  <option value="">All Jobs</option>
                  {allJobs.map(job => (
                    <option key={job.id} value={job.id}>{job.title}</option>
                  ))}
                </select>
              </div>

            </div>
          </div>
        </div>

      {editingApplication && (
        <JobApplicationModal
          application={detailData || editingApplication}
          isLoading={isDetailLoading}
          isOpen={!!editingApplication}
          onClose={() => setEditingApplication(null)}
          onSave={async (data) => {
            await updateJobApplication.mutateAsync({ id: editingApplication.id, data });
            refetch();
            showToast("Job application saved successfully!", "success");
          }}
          jobType={allJobs.find(j => j.id === editingApplication.job_id)?.type}
        />
      )}

      {toast && <Toast message={toast.message} type={toast.type} onClose={hideToast} />}
    </div>
  );
}
