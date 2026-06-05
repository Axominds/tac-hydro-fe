"use client";

import { useState, useEffect } from "react";
import { X, Save, Loader2, AlertCircle } from "lucide-react";
import { Montserrat } from "next/font/google";
import { useAdminTheme } from "../../../src/hooks/useAdminTheme";
import type { JobPosting } from "../../../src/lib/api";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["600", "700"] });

const JOB_TYPES = [
  { value: "Full Time", label: "Full Time" },
  { value: "Internship", label: "Internship" },
  { value: "Independent Consultant", label: "Independent Consultant" },
];

interface JobPostingModalProps {
  job?: JobPosting | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<JobPosting>) => Promise<void>;
  onDelete?: (id: number) => Promise<void>;
}

export function JobPostingModal({ job, isOpen, onClose, onSave, onDelete }: JobPostingModalProps) {
  const { theme, colors, mounted } = useAdminTheme();
  const [title, setTitle] = useState(job?.title || "");
  const [type, setType] = useState(job?.type || "Full Time");
  const [location, setLocation] = useState(job?.location || "");
  const [description, setDescription] = useState(job?.description || "");
  const [responsibilities, setResponsibilities] = useState<string[]>(
    Array.isArray(job?.responsibilities) && job.responsibilities.length
      ? job.responsibilities
      : [""]
  );
  const [qualifications, setQualifications] = useState<string[]>(
    Array.isArray(job?.qualifications) && job.qualifications.length
      ? job.qualifications
      : [""]
  );
  const [isOpenChecked, setIsOpenChecked] = useState(job?.is_open ?? true);
  const [isSaving, setIsSaving] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTitle(job?.title || "");
      setType(job?.type || "Full Time");
      setLocation(job?.location || "");
      setDescription(job?.description || "");
      setResponsibilities(
        Array.isArray(job?.responsibilities) && job.responsibilities.length
          ? job.responsibilities
          : [""]
      );
      setQualifications(
        Array.isArray(job?.qualifications) && job.qualifications.length
          ? job.qualifications
          : [""]
      );
      setIsOpenChecked(job?.is_open ?? true);
      setValidationErrors({});
    }
  }, [isOpen, job]);

  if (!isOpen || !mounted) return null;

  const isDark = theme === "dark";
  const isEditing = !!job?.id;

  const inputStyle = {
    backgroundColor: isDark ? "rgba(255,255,255,0.05)" : "#f1f5f9",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: isDark ? "rgba(255,255,255,0.1)" : "#cbd5e1",
    color: isDark ? "#ffffff" : "#1e293b",
  };

  const handleSave = async () => {
    const errors: Record<string, string> = {};
    if (!title.trim()) errors.title = "Title is required.";
    if (!location.trim()) errors.location = "Location is required.";
    setValidationErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setIsSaving(true);
    try {
      await onSave({
        title: title.trim(),
        type,
        location: location.trim(),
        description: description.trim(),
        responsibilities: responsibilities
          .map((s) => s.trim())
          .filter(Boolean),
        qualifications: qualifications
          .map((s) => s.trim())
          .filter(Boolean),
        is_open: isOpenChecked,
      });
      setIsSaving(false);
      onClose();
    } catch {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!job?.id || !onDelete) return;
    await onDelete(job.id);
    onClose();
  };

  const addResponsibility = () => setResponsibilities((prev) => [...prev, ""]);
  const removeResponsibility = (index: number) =>
    setResponsibilities((prev) => prev.filter((_, i) => i !== index));
  const updateResponsibility = (index: number, value: string) =>
    setResponsibilities((prev) => prev.map((r, i) => (i === index ? value : r)));

  const addQualification = () => setQualifications((prev) => [...prev, ""]);
  const removeQualification = (index: number) =>
    setQualifications((prev) => prev.filter((_, i) => i !== index));
  const updateQualification = (index: number, value: string) =>
    setQualifications((prev) => prev.map((q, i) => (i === index ? value : q)));

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
          <h2 className={`${montserrat.className} text-2xl`} style={{ color: colors.text as string }}>
            {isEditing ? "Edit" : "New"}{" "}
            <span className="text-blue-500">Job Posting</span>
          </h2>
          <button onClick={onClose} style={{ color: colors.textMuted as string }}>
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSave} className="p-8 space-y-6 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 col-span-2">
              <label
                className="text-[10px] font-bold tracking-widest uppercase ml-1"
                style={{ color: colors.textMuted as string }}
              >
                Title <span className="text-red-500">*</span>
              </label>
              <input
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  setValidationErrors((prev) => ({ ...prev, title: "" }));
                }}
                className="w-full rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                style={inputStyle}
                placeholder="e.g. Junior Hydropower Engineer"
              />
              {validationErrors.title && (
                <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3 shrink-0" />
                  {validationErrors.title}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label
                className="text-[10px] font-bold tracking-widest uppercase ml-1"
                style={{ color: colors.textMuted as string }}
              >
                Type <span className="text-red-500">*</span>
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                style={inputStyle}
              >
                {JOB_TYPES.map((t) => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label
                className="text-[10px] font-bold tracking-widest uppercase ml-1"
                style={{ color: colors.textMuted as string }}
              >
                Location <span className="text-red-500">*</span>
              </label>
              <input
                value={location}
                onChange={(e) => {
                  setLocation(e.target.value);
                  setValidationErrors((prev) => ({ ...prev, location: "" }));
                }}
                placeholder="e.g., Kathmandu / Site"
                className="w-full rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                style={inputStyle}
              />
              {validationErrors.location && (
                <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3 shrink-0" />
                  {validationErrors.location}
                </p>
              )}
            </div>

            <div className="space-y-2 col-span-2">
              <label
                className="text-[10px] font-bold tracking-widest uppercase ml-1"
                style={{ color: colors.textMuted as string }}
              >
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={2}
                className="w-full rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all resize-none"
                style={inputStyle}
                placeholder="Brief overview of the role..."
              />
            </div>

            <div className="space-y-2 col-span-2">
              <label
                className="text-[10px] font-bold tracking-widest uppercase ml-1"
                style={{ color: colors.textMuted as string }}
              >
                Responsibilities
              </label>
              <div className="space-y-2">
                {responsibilities.map((r, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <input
                      value={r}
                      onChange={(e) => updateResponsibility(i, e.target.value)}
                      placeholder="e.g., Lead the design of..."
                      className="w-full rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                      style={inputStyle}
                    />
                    {responsibilities.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeResponsibility(i)}
                        className="p-1.5 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 text-red-500 transition-colors shrink-0"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addResponsibility}
                  className="text-sm px-3 py-1.5 rounded-lg transition-colors"
                  style={{
                    color: "#3b82f6",
                    border: `1px dashed ${isDark ? "rgba(59,130,246,0.4)" : "#93c5fd"}`,
                  }}
                >
                  + Add
                </button>
              </div>
            </div>

            <div className="space-y-2 col-span-2">
              <label
                className="text-[10px] font-bold tracking-widest uppercase ml-1"
                style={{ color: colors.textMuted as string }}
              >
                Qualifications
              </label>
              <div className="space-y-2">
                {qualifications.map((q, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <input
                      value={q}
                      onChange={(e) => updateQualification(i, e.target.value)}
                      placeholder="e.g., Bachelor's degree in..."
                      className="w-full rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                      style={inputStyle}
                    />
                    {qualifications.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeQualification(i)}
                        className="p-1.5 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 text-red-500 transition-colors shrink-0"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addQualification}
                  className="text-sm px-3 py-1.5 rounded-lg transition-colors"
                  style={{
                    color: "#3b82f6",
                    border: `1px dashed ${isDark ? "rgba(59,130,246,0.4)" : "#93c5fd"}`,
                  }}
                >
                  + Add
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3 col-span-2">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={isOpenChecked}
                  onChange={(e) => setIsOpenChecked(e.target.checked)}
                  className="sr-only peer"
                />
                <div
                  className="w-11 h-6 rounded-full peer peer-focus:outline-none peer-focus:ring-4 transition-all"
                  style={{ backgroundColor: isOpenChecked ? "#3b82f6" : "#374151" }}
                />
                <span
                  className="ml-3 text-sm font-semibold"
                  style={{ color: colors.textSecondary as string }}
                >
                  Open for applications
                </span>
              </label>
            </div>
          </div>

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
