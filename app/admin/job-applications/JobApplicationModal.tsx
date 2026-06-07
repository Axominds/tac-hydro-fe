"use client";

import { useState, useEffect, useCallback } from "react";
import { X, Save, Loader2, Download } from "lucide-react";
import { Montserrat } from "next/font/google";
import { useAdminTheme } from "../../../src/hooks/useAdminTheme";
import { downloadFile, getImageUrl, extractFieldErrors } from "../../../src/lib/api";
import type { JobApplication } from "../../../src/lib/api";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["600", "700"] });

interface JobApplicationModalProps {
  application: JobApplication | null;
  isLoading?: boolean;
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<JobApplication>) => Promise<void>;
  jobType?: string;
}

export function JobApplicationModal({ application, isLoading, isOpen, onClose, onSave, jobType }: JobApplicationModalProps) {
  const { theme, colors, mounted } = useAdminTheme();

  const [isSaving, setIsSaving] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isOpen && application) {
      setFieldErrors({});
      setFormData({
        first_name: application.first_name || "",
        middle_name: application.middle_name || "",
        last_name: application.last_name || "",
        gender: application.gender || "",
        phone: application.phone || "",
        email: application.email || "",
        degree: application.degree || "",
        grade: application.grade || "",
        year_completed: application.year_completed || "",
        specialization: application.specialization || "",
        college: application.college || "",
        abilities: application.abilities || "",
        software_proficiency: application.software_proficiency || "",
        employment_status: application.employment_status || "",
        experience_sector: application.experience_sector || "",
        years_experience: application.years_experience || "",
        joining_date: application.joining_date || "",
        expected_salary: application.expected_salary || "",
      });
    }
  }, [isOpen, application]);

  const isDark = theme === "dark";

  const inputStyle = {
    backgroundColor: isDark ? "rgba(255,255,255,0.05)" : "#f1f5f9",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: isDark ? "rgba(255,255,255,0.1)" : "#cbd5e1",
    color: isDark ? "#ffffff" : "#1e293b",
  };

  const handleUpdate = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));

  const handleDownloadCv = useCallback(async () => {
    if (!application?.cv_file) return;
    const url = getImageUrl(application.cv_file);
    if (!url) return;
    const filename = url.split("/").pop() || "cv.pdf";
    await downloadFile(url, filename);
  }, [application?.cv_file]);

  const handleDownloadCoverLetter = useCallback(async () => {
    if (!application?.cover_letter_file) return;
    const url = getImageUrl(application.cover_letter_file);
    if (!url) return;
    const filename = url.split("/").pop() || "cover_letter.pdf";
    await downloadFile(url, filename);
  }, [application?.cover_letter_file]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setFieldErrors({});
    setIsSaving(true);
    try {
      const payload = { ...formData };
      if (jobType === "Independent Consultant") {
        delete payload.abilities;
        delete payload.software_proficiency;
        delete payload.employment_status;
        delete payload.joining_date;
        delete payload.expected_salary;
      }
      await onSave(payload);
      setIsSaving(false);
      onClose();
    } catch (error) {
      setIsSaving(false);
      setFieldErrors(extractFieldErrors(error));
    }
  };

  if (!isOpen || !mounted || !application) return null;

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
        <div className="absolute inset-0 z-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
        <div
          className="relative z-10 w-full max-w-3xl max-h-[90vh] rounded-3xl overflow-hidden shadow-2xl flex items-center justify-center p-20"
          style={{
            backgroundColor: isDark ? "#0a0a0a" : "#ffffff",
            border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "#e2e8f0"}`,
          }}
        >
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 overflow-hidden">
      <div
        className="absolute inset-0 z-0 bg-black/60 backdrop-blur-sm w-screen h-screen"
        onClick={onClose}
      />
      <div
        className="relative z-10 w-full max-w-3xl max-h-[90vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col"
        style={{
          backgroundColor: isDark ? "#0a0a0a" : "#ffffff",
          border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "#e2e8f0"}`,
        }}
      >
        <div
          className="p-8 flex items-center justify-between shrink-0"
          style={{ borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "#e2e8f0"}` }}
        >
          <div>
            <h2 className={`${montserrat.className} text-2xl`} style={{ color: colors.text as string }}>
              Edit Job <span className="text-blue-500">Application</span>
            </h2>
            <p className="text-sm mt-1" style={{ color: colors.textMuted as string }}>
              Submitted on {new Date(application.submitted_at).toLocaleDateString()}
            </p>
          </div>
          <button onClick={onClose} style={{ color: colors.textMuted as string }}>
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSave} className="p-8 space-y-6 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="space-y-2">
              <label
                className="text-[10px] font-bold tracking-widest uppercase ml-1"
                style={{ color: colors.textMuted as string }}
              >
                First Name
              </label>
              <input
                value={formData.first_name || ""}
                onChange={handleUpdate("first_name")}
                className="w-full rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                style={inputStyle}
              />
              {fieldErrors.first_name && (
                <p className="text-red-500 text-xs mt-1">{fieldErrors.first_name}</p>
              )}
            </div>
            <div className="space-y-2">
              <label
                className="text-[10px] font-bold tracking-widest uppercase ml-1"
                style={{ color: colors.textMuted as string }}
              >
                Middle Name
              </label>
              <input
                value={formData.middle_name || ""}
                onChange={handleUpdate("middle_name")}
                className="w-full rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                style={inputStyle}
              />
              {fieldErrors.middle_name && (
                <p className="text-red-500 text-xs mt-1">{fieldErrors.middle_name}</p>
              )}
            </div>
            <div className="space-y-2">
              <label
                className="text-[10px] font-bold tracking-widest uppercase ml-1"
                style={{ color: colors.textMuted as string }}
              >
                Last Name
              </label>
              <input
                value={formData.last_name || ""}
                onChange={handleUpdate("last_name")}
                className="w-full rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                style={inputStyle}
              />
              {fieldErrors.last_name && (
                <p className="text-red-500 text-xs mt-1">{fieldErrors.last_name}</p>
              )}
            </div>

            <div className="space-y-2">
              <label
                className="text-[10px] font-bold tracking-widest uppercase ml-1"
                style={{ color: colors.textMuted as string }}
              >
                Email Address
              </label>
              <input
                value={formData.email || ""}
                onChange={handleUpdate("email")}
                className="w-full rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                style={inputStyle}
              />
              {fieldErrors.email && (
                <p className="text-red-500 text-xs mt-1">{fieldErrors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <label
                className="text-[10px] font-bold tracking-widest uppercase ml-1"
                style={{ color: colors.textMuted as string }}
              >
                Phone Number
              </label>
              <input
                value={formData.phone || ""}
                onChange={handleUpdate("phone")}
                className="w-full rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                style={inputStyle}
              />
              {fieldErrors.phone && (
                <p className="text-red-500 text-xs mt-1">{fieldErrors.phone}</p>
              )}
            </div>

            <div className="space-y-2">
              <label
                className="text-[10px] font-bold tracking-widest uppercase ml-1"
                style={{ color: colors.textMuted as string }}
              >
                Degree
              </label>
              <input
                value={formData.degree || ""}
                onChange={handleUpdate("degree")}
                className="w-full rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                style={inputStyle}
              />
              {fieldErrors.degree && (
                <p className="text-red-500 text-xs mt-1">{fieldErrors.degree}</p>
              )}
            </div>

            <div className="space-y-2">
              <label
                className="text-[10px] font-bold tracking-widest uppercase ml-1"
                style={{ color: colors.textMuted as string }}
              >
                College
              </label>
              <input
                value={formData.college || ""}
                onChange={handleUpdate("college")}
                className="w-full rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                style={inputStyle}
              />
              {fieldErrors.college && (
                <p className="text-red-500 text-xs mt-1">{fieldErrors.college}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <label
                className="text-[10px] font-bold tracking-widest uppercase ml-1"
                style={{ color: colors.textMuted as string }}
              >
                Gender
              </label>
              <input
                value={formData.gender || ""}
                onChange={handleUpdate("gender")}
                className="w-full rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                style={inputStyle}
              />
              {fieldErrors.gender && (
                <p className="text-red-500 text-xs mt-1">{fieldErrors.gender}</p>
              )}
            </div>

            <div className="space-y-2">
              <label
                className="text-[10px] font-bold tracking-widest uppercase ml-1"
                style={{ color: colors.textMuted as string }}
              >
                Grade / CGPA
              </label>
              <input
                value={formData.grade || ""}
                onChange={handleUpdate("grade")}
                className="w-full rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                style={inputStyle}
              />
              {fieldErrors.grade && (
                <p className="text-red-500 text-xs mt-1">{fieldErrors.grade}</p>
              )}
            </div>

            <div className="space-y-2">
              <label
                className="text-[10px] font-bold tracking-widest uppercase ml-1"
                style={{ color: colors.textMuted as string }}
              >
                Year Completed
              </label>
              <input
                value={formData.year_completed || ""}
                onChange={handleUpdate("year_completed")}
                className="w-full rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                style={inputStyle}
              />
              {fieldErrors.year_completed && (
                <p className="text-red-500 text-xs mt-1">{fieldErrors.year_completed}</p>
              )}
            </div>

            <div className="space-y-2">
              <label
                className="text-[10px] font-bold tracking-widest uppercase ml-1"
                style={{ color: colors.textMuted as string }}
              >
                Specialization
              </label>
              <input
                value={formData.specialization || ""}
                onChange={handleUpdate("specialization")}
                className="w-full rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                style={inputStyle}
              />
              {fieldErrors.specialization && (
                <p className="text-red-500 text-xs mt-1">{fieldErrors.specialization}</p>
              )}
            </div>

            <div className="space-y-2">
              <label
                className="text-[10px] font-bold tracking-widest uppercase ml-1"
                style={{ color: colors.textMuted as string }}
              >
                Years of Experience
              </label>
              <input
                value={formData.years_experience || ""}
                onChange={handleUpdate("years_experience")}
                className="w-full rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                style={inputStyle}
              />
              {fieldErrors.years_experience && (
                <p className="text-red-500 text-xs mt-1">{fieldErrors.years_experience}</p>
              )}
            </div>

            <div className="space-y-2">
              <label
                className="text-[10px] font-bold tracking-widest uppercase ml-1"
                style={{ color: colors.textMuted as string }}
              >
                Experience Sector
              </label>
              <input
                value={formData.experience_sector || ""}
                onChange={handleUpdate("experience_sector")}
                className="w-full rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                style={inputStyle}
              />
              {fieldErrors.experience_sector && (
                <p className="text-red-500 text-xs mt-1">{fieldErrors.experience_sector}</p>
              )}
            </div>

            {jobType !== "Independent Consultant" && (
              <div className="space-y-2">
                <label
                  className="text-[10px] font-bold tracking-widest uppercase ml-1"
                  style={{ color: colors.textMuted as string }}
                >
                  Employment Status
                </label>
                <input
                  value={formData.employment_status || ""}
                  onChange={handleUpdate("employment_status")}
                  className="w-full rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                  style={inputStyle}
                />
                {fieldErrors.employment_status && (
                  <p className="text-red-500 text-xs mt-1">{fieldErrors.employment_status}</p>
                )}
              </div>
            )}

            {jobType !== "Independent Consultant" && (
              <div className="space-y-2">
                <label
                  className="text-[10px] font-bold tracking-widest uppercase ml-1"
                  style={{ color: colors.textMuted as string }}
                >
                  Software Proficiency
                </label>
                <input
                  value={formData.software_proficiency || ""}
                  onChange={handleUpdate("software_proficiency")}
                  className="w-full rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                  style={inputStyle}
                />
                {fieldErrors.software_proficiency && (
                  <p className="text-red-500 text-xs mt-1">{fieldErrors.software_proficiency}</p>
                )}
              </div>
            )}

            {jobType !== "Independent Consultant" && (
              <div className="space-y-2">
                <label
                  className="text-[10px] font-bold tracking-widest uppercase ml-1"
                  style={{ color: colors.textMuted as string }}
                >
                  Joining Date
                </label>
                <input
                  value={formData.joining_date || ""}
                  onChange={handleUpdate("joining_date")}
                  className="w-full rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                  style={inputStyle}
                />
                {fieldErrors.joining_date && (
                  <p className="text-red-500 text-xs mt-1">{fieldErrors.joining_date}</p>
                )}
              </div>
            )}

            {jobType !== "Independent Consultant" && (
              <div className="space-y-2 col-span-2">
                <label
                  className="text-[10px] font-bold tracking-widest uppercase ml-1"
                  style={{ color: colors.textMuted as string }}
                >
                  Abilities
                </label>
                <textarea
                  value={formData.abilities || ""}
                  onChange={handleUpdate("abilities")}
                  rows={3}
                  className="w-full rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all resize-none"
                  style={inputStyle}
                />
                {fieldErrors.abilities && (
                  <p className="text-red-500 text-xs mt-1">{fieldErrors.abilities}</p>
                )}
              </div>
            )}

            {jobType !== "Independent Consultant" && (
              <div className="space-y-2">
                <label
                  className="text-[10px] font-bold tracking-widest uppercase ml-1"
                  style={{ color: colors.textMuted as string }}
                >
                  Expected Salary
                </label>
                <input
                  value={formData.expected_salary || ""}
                  onChange={handleUpdate("expected_salary")}
                  className="w-full rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                  style={inputStyle}
                />
                {fieldErrors.expected_salary && (
                  <p className="text-red-500 text-xs mt-1">{fieldErrors.expected_salary}</p>
                )}
              </div>
            )}

            <div className="space-y-2 col-span-2">
              <label
                className="text-[10px] font-bold tracking-widest uppercase ml-1"
                style={{ color: colors.textMuted as string }}
              >
                Attachments
              </label>
              <div className="flex gap-4">
                {application.cv_file ? (
                  <button
                    type="button"
                    onClick={handleDownloadCv}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600/10 text-blue-500 hover:bg-blue-600/20 rounded-xl transition-all font-medium text-sm"
                  >
                    <Download className="h-4 w-4" />
                    Download CV
                  </button>
                ) : (
                  <span className="text-sm text-gray-500 italic">No CV Attached</span>
                )}

                {application.cover_letter_file ? (
                  <button
                    type="button"
                    onClick={handleDownloadCoverLetter}
                    className="flex items-center gap-2 px-4 py-2 bg-purple-600/10 text-purple-500 hover:bg-purple-600/20 rounded-xl transition-all font-medium text-sm"
                  >
                    <Download className="h-4 w-4" />
                    Download Cover Letter
                  </button>
                ) : (
                  <span className="text-sm text-gray-500 italic">No Cover Letter Attached</span>
                )}
              </div>
            </div>

          </div>

          {fieldErrors.cv_file && (
            <p className="text-red-500 text-xs mt-1">{fieldErrors.cv_file}</p>
          )}
          {fieldErrors.cover_letter_file && (
            <p className="text-red-500 text-xs mt-1">{fieldErrors.cover_letter_file}</p>
          )}

          <div className="pt-4 flex gap-4 shrink-0 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-8 font-bold rounded-2xl transition-all"
              style={{
                border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "#e2e8f0"}`,
                color: colors.textSecondary as string,
                backgroundColor: "transparent",
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="bg-blue-600 hover:bg-blue-500 disabled:bg-gray-400 text-white font-bold py-4 px-8 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-xl shadow-blue-600/10 active:scale-95 disabled:cursor-not-allowed disabled:text-gray-600"
            >
              {isSaving ? <Loader2 className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />}
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
