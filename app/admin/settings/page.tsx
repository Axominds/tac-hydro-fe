"use client";

import { useState, useEffect } from "react";
import {
  Save,
  Globe,
  Mail,
  MapPin,
  Share2,
  Loader2,
  Phone,
  Clock,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Video,
  PlayCircle,
} from "lucide-react";
import { Montserrat } from "next/font/google";
import { useSiteSettings } from "../../../src/hooks/useSiteSettings";
import { convertToEmbedUrl } from "../../../src/lib/utils";
import { useSettingsMutation } from "../../../src/hooks/useAdminMutations";
import { SiteSettings } from "../../../src/lib/api";
import { useAdminTheme, getThemedClasses } from "../../../src/hooks/useAdminTheme";
import { Toast, useToast } from "../../../src/components/ui/toast";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["600", "700"] });

export default function SiteSettingsManagementPage() {
  const { theme, colors, mounted } = useAdminTheme();
  const { data: settingsData, isLoading } = useSiteSettings();
  const updateSettings = useSettingsMutation();

  const settings = Array.isArray(settingsData) ? settingsData[0] : settingsData;

  const [formData, setFormData] = useState<Partial<SiteSettings>>({});
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "success" | "error">("idle");
  const [showMapPreview, setShowMapPreview] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [videoMode, setVideoMode] = useState<"upload" | "youtube">("upload");
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [pendingMode, setPendingMode] = useState<"upload" | "youtube" | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const { toast, showToast, hideToast } = useToast();

  useEffect(() => {
    if (settings) {
      setFormData({ ...settings });
      if (settings.youtube_url) {
        setVideoMode("youtube");
      } else if (settings.video) {
        setVideoMode("upload");
      }
    }
  }, [settings]);

  const handleVideoModeSwitch = (targetMode: "upload" | "youtube") => {
    if (targetMode === videoMode) return;

    const hasCurrentData =
      (videoMode === "upload" && (selectedVideo || formData.video)) ||
      (videoMode === "youtube" && formData.youtube_url);

    if (hasCurrentData) {
      setPendingMode(targetMode);
      setShowConfirmDialog(true);
    } else {
      setVideoMode(targetMode);
    }
  };

  const confirmModeSwitch = () => {
    if (pendingMode === "upload") {
      setFormData({ ...formData, youtube_url: null });
    } else if (pendingMode === "youtube") {
      setFormData({ ...formData, video: null });
      setSelectedVideo(null);
    }
    setVideoMode(pendingMode!);
    setPendingMode(null);
    setShowConfirmDialog(false);
  };

  const cancelModeSwitch = () => {
    setPendingMode(null);
    setShowConfirmDialog(false);
  };

  const CURRENT_YEAR = new Date().getFullYear();

  const validateForm = (): Record<string, string> => {
    const errors: Record<string, string> = {};
    const { company_name, tagline, contact_email, collaboration_email, phone, founded_year, linkedin_url, facebook_url } = formData;

    if (!company_name?.trim()) {
      errors.company_name = "Company name is required";
    } else if (company_name.length > 255) {
      errors.company_name = "Company name must be 255 characters or less";
    }

    if (tagline && tagline.length > 255) {
      errors.tagline = "Tagline must be 255 characters or less";
    }

    if (contact_email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact_email)) {
      errors.contact_email = "Enter a valid email address";
    }

    if (collaboration_email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(collaboration_email)) {
      errors.collaboration_email = "Enter a valid email address";
    }

    if (phone && !/^[\d\s+\-()\.,]+$/.test(phone)) {
      errors.phone = "Enter a valid phone number (digits, spaces, +, -, (, ), . only)";
    }

    if (founded_year) {
      if (founded_year < 1800) {
        errors.founded_year = "Founded year must be 1800 or later";
      } else if (founded_year > CURRENT_YEAR) {
        errors.founded_year = `Founded year cannot be later than ${CURRENT_YEAR}`;
      }
    }

    if (linkedin_url && !linkedin_url.toLowerCase().includes("linkedin.com")) {
      errors.linkedin_url = "Must be a valid LinkedIn URL containing linkedin.com";
    }

    if (facebook_url && !facebook_url.toLowerCase().includes("facebook.com")) {
      errors.facebook_url = "Must be a valid Facebook URL containing facebook.com";
    }

    return errors;
  };

  const handleSave = async () => {
    if (!settings?.id) return;

    const clientErrors = validateForm();
    setValidationErrors(clientErrors);
    if (Object.keys(clientErrors).length > 0) return;

    setSaveStatus("saving");

    try {
      const changedData: Partial<SiteSettings> = {};
      Object.keys(formData).forEach((k) => {
        const key = k as keyof SiteSettings;
        if (formData[key] !== settings[key]) {
          // @ts-ignore
          changedData[key] = formData[key];
        }
      });

      const hasFiles = Boolean(selectedFile || selectedVideo);

      if (hasFiles) {
        const multipartData = new FormData();

        Object.entries(changedData).forEach(([key, value]) => {
          if (value === undefined) return;
          multipartData.append(key, value === null ? "" : String(value));
        });

        if (selectedFile) {
          multipartData.append("organization_chart_image", selectedFile);
        }

        if (selectedVideo) {
          multipartData.append("video", selectedVideo);
          multipartData.set("youtube_url", "");
        }

        await updateSettings.mutateAsync({ id: settings.id, data: multipartData });
      } else if (Object.keys(changedData).length > 0) {
        await updateSettings.mutateAsync({ id: settings.id, data: changedData });
      }

      setSaveStatus("success");
      showToast("Settings saved successfully!");
      setSelectedFile(null);
      setSelectedVideo(null);
    } catch (error: any) {
      setSaveStatus("error");
      if (error?.body && typeof error.body === "object") {
        const serverErrors: Record<string, string> = {};
        const body = error.body as Record<string, string | string[]>;
        Object.entries(body).forEach(([key, messages]) => {
          if (key === "non_field_errors") return;
          serverErrors[key] = Array.isArray(messages) ? messages[0] : messages;
        });
        if (Object.keys(serverErrors).length > 0) {
          setValidationErrors(serverErrors);
        }
        const nonField = body.non_field_errors;
        const msg = Array.isArray(nonField) ? nonField[0] : nonField;
        showToast(msg || "Failed to save settings", "error");
      } else {
        showToast("Failed to save settings", "error");
      }
    }
  };

  if (!mounted) return null;

  const cardStyle = {
    backgroundColor: theme === "dark" ? "rgba(255,255,255,0.03)" : "#ffffff",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: theme === "dark" ? "rgba(255,255,255,0.08)" : "#e2e8f0",
  };

  const inputStyle = {
    backgroundColor: theme === "dark" ? "rgba(255,255,255,0.05)" : "#f1f5f9",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: theme === "dark" ? "rgba(255,255,255,0.1)" : "#cbd5e1",
    color: colors.text,
  };

  const fieldError = (field: string) => {
    const error = validationErrors[field];
    if (!error) return null;
    return (
      <p className="text-xs text-red-500 mt-1 px-1 flex items-center gap-1">
        <AlertCircle className="h-3 w-3 shrink-0" />
        {error}
      </p>
    );
  };

  return (
    <div className="space-y-15 uppercase relative pb-40">
      <div className="flex items-center justify-between">
        <div>
          <h1
            className={`${montserrat.className} text-4xl mb-2`}
            style={{ color: colors.text as string }}
          >
            Global <span className="text-blue-500">Settings</span>
          </h1>
          <p style={{ color: colors.text.secondary as string }}>
            Configure site-wide metadata, contact information, and social links.
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={isLoading || saveStatus === "saving" || !formData.company_name?.trim()}
          className="bg-blue-600 hover:bg-blue-500 disabled:bg-gray-400 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 font-bold transition-all shadow-lg shadow-blue-500/20 active:scale-95"
        >
          <Save className="h-4 w-4" />
          {saveStatus === "saving" ? "Saving..." : "Save"}
        </button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-20">
          <div className="p-8 rounded-3xl space-y-8" style={cardStyle}>
            <h2
              className={`${montserrat.className} text-xl mb-4 flex items-center gap-2 pb-4`}
              style={{
                borderBottom: `1px solid ${theme === "dark" ? "rgba(255,255,255,0.08)" : "#e2e8f0"}`,
                color: colors.text as string,
              }}
            >
              <Globe className="h-5 w-5 text-blue-500" />
              Contact Metadata
            </h2>
            <div className="space-y-6">
              <div className="space-y-2">
                <label
                  className="text-sm font-semibold px-1 uppercase tracking-widest text-[10px]"
                  style={{ color: colors.textMuted as string }}
                >
                  Company Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.company_name || ""}
                  onChange={(e) => {
                    setFormData({ ...formData, company_name: e.target.value });
                    setValidationErrors((prev) => ({ ...prev, company_name: "" }));
                  }}
                  className="w-full rounded-xl py-3.5 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium"
                  style={inputStyle}
                />
                {fieldError("company_name")}
              </div>
              <div className="space-y-2">
                <label
                  className="text-sm font-semibold px-1 uppercase tracking-widest text-[10px]"
                  style={{ color: colors.textMuted as string }}
                >
                  Tagline
                </label>
                <textarea
                  value={formData.tagline || ""}
                  onChange={(e) => {
                    setFormData({ ...formData, tagline: e.target.value });
                    setValidationErrors((prev) => ({ ...prev, tagline: "" }));
                  }}
                  rows={2}
                  className="w-full rounded-xl py-3.5 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium resize-none text-sm normal-case"
                  style={inputStyle}
                />
                {fieldError("tagline")}
              </div>
              <div className="space-y-2">
                <label
                  className="text-sm font-semibold px-1 uppercase tracking-widest text-[10px]"
                  style={{ color: colors.textMuted as string }}
                >
                  Official Email Support
                </label>
                <div className="relative group">
                  <Mail
                    className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 group-focus-within:text-blue-500 transition-colors"
                    style={{ color: colors.text.muted as string }}
                  />
                  <input
                    type="email"
                    value={formData.contact_email || ""}
                    onChange={(e) => {
                      setFormData({ ...formData, contact_email: e.target.value });
                      setValidationErrors((prev) => ({ ...prev, contact_email: "" }));
                    }}
                    className="w-full rounded-xl py-3.5 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium lowercase"
                    style={inputStyle}
                  />
                </div>
                {fieldError("contact_email")}
              </div>
              <div className="space-y-2">
                <label
                  className="text-sm font-semibold px-1 uppercase tracking-widest text-[10px]"
                  style={{ color: colors.textMuted as string }}
                >
                  Collaboration Email
                </label>
                <div className="relative group">
                  <Mail
                    className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 group-focus-within:text-blue-500 transition-colors"
                    style={{ color: colors.text.muted as string }}
                  />
                  <input
                    type="email"
                    value={formData.collaboration_email || ""}
                    onChange={(e) => {
                      setFormData({ ...formData, collaboration_email: e.target.value });
                      setValidationErrors((prev) => ({ ...prev, collaboration_email: "" }));
                    }}
                    className="w-full rounded-xl py-3.5 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium lowercase"
                    style={inputStyle}
                  />
                </div>
                {fieldError("collaboration_email")}
              </div>
              <div className="space-y-2">
                <label
                  className="text-sm font-semibold px-1 uppercase tracking-widest text-[10px]"
                  style={{ color: colors.textMuted as string }}
                >
                  Phone Number
                </label>
                <div className="relative group">
                  <Phone
                    className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 group-focus-within:text-blue-500 transition-colors"
                    style={{ color: colors.text.muted as string }}
                  />
                  <input
                    type="text"
                    value={formData.phone || ""}
                    onChange={(e) => {
                      setFormData({ ...formData, phone: e.target.value });
                      setValidationErrors((prev) => ({ ...prev, phone: "" }));
                    }}
                    className="w-full rounded-xl py-3.5 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium"
                    style={inputStyle}
                  />
                </div>
                {fieldError("phone")}
              </div>
              <div className="space-y-2">
                <label
                  className="text-sm font-semibold px-1 uppercase tracking-widest text-[10px]"
                  style={{ color: colors.textMuted as string }}
                >
                  Business Hours
                </label>
                <div className="relative group">
                  <Clock
                    className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 group-focus-within:text-blue-500 transition-colors"
                    style={{ color: colors.text.muted as string }}
                  />
                  <input
                    type="text"
                    value={formData.business_hours || ""}
                    onChange={(e) => {
                      setFormData({ ...formData, business_hours: e.target.value });
                      setValidationErrors((prev) => ({ ...prev, business_hours: "" }));
                    }}
                    className="w-full rounded-xl py-3.5 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium"
                    style={inputStyle}
                  />
                </div>
                {fieldError("business_hours")}
              </div>
              <div className="space-y-2">
                <label
                  className="text-sm font-semibold px-1 uppercase tracking-widest text-[10px]"
                  style={{ color: colors.textMuted as string }}
                >
                  Headquarter Location
                </label>
                <div className="relative group">
                  <MapPin
                    className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 group-focus-within:text-blue-500 transition-colors"
                    style={{ color: colors.text.muted as string }}
                  />
                  <input
                    type="text"
                    value={formData.address || ""}
                    onChange={(e) => {
                      setFormData({ ...formData, address: e.target.value });
                      setValidationErrors((prev) => ({ ...prev, address: "" }));
                    }}
                    className="w-full rounded-xl py-3.5 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium"
                    style={inputStyle}
                  />
                </div>
                {fieldError("address")}
              </div>
              <div className="space-y-2">
                <label
                  className="text-sm font-semibold px-1 uppercase tracking-widest text-[10px]"
                  style={{ color: colors.textMuted as string }}
                >
                  Founded Year
                </label>
                <input
                  type="number"
                  value={formData.founded_year || ""}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      founded_year: parseInt(e.target.value) || undefined,
                    });
                    setValidationErrors((prev) => ({ ...prev, founded_year: "" }));
                  }}
                  className="w-full rounded-xl py-3.5 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium"
                  style={inputStyle}
                />
                {fieldError("founded_year")}
              </div>
            </div>
          </div>

          <div className="p-8 rounded-3xl space-y-8" style={cardStyle}>
            <h2
              className={`${montserrat.className} text-xl mb-4 flex items-center gap-2 pb-4`}
              style={{
                borderBottom: `1px solid ${theme === "dark" ? "rgba(255,255,255,0.08)" : "#e2e8f0"}`,
                color: colors.text as string,
              }}
            >
              <Share2 className="h-5 w-5 text-blue-500" />
              Social Connectivity & Maps
            </h2>
            <div className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center px-1">
                  <label
                    className="text-sm font-semibold uppercase tracking-widest text-[10px]"
                    style={{ color: colors.textMuted as string }}
                  >
                    Map Embed URL
                  </label>
                  {formData.map_embed_url && (
                    <button
                      onClick={() => setShowMapPreview(!showMapPreview)}
                      className="text-[10px] uppercase font-bold text-blue-500 hover:text-blue-400 flex items-center gap-1.5 transition-colors bg-blue-500/10 px-2 py-1 rounded border border-blue-500/20"
                      type="button"
                    >
                      {showMapPreview ? (
                        <EyeOff className="h-3 w-3" />
                      ) : (
                        <Eye className="h-3 w-3" />
                      )}
                      {showMapPreview ? "Hide Preview" : "View Map"}
                    </button>
                  )}
                </div>
                <div className="relative group">
                  <MapPin
                    className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 group-focus-within:text-blue-500 transition-colors"
                    style={{ color: colors.text.muted as string }}
                  />
                  <input
                    type="url"
                    value={formData.map_embed_url || ""}
                    onChange={(e) => {
                      setFormData({ ...formData, map_embed_url: e.target.value });
                      setValidationErrors((prev) => ({ ...prev, map_embed_url: "" }));
                    }}
                    placeholder="https://www.google.com/maps/embed?pb=..."
                    className="w-full rounded-xl py-3.5 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium"
                    style={inputStyle}
                  />
                </div>
                {fieldError("map_embed_url")}
                {showMapPreview && formData.map_embed_url && (
                  <div
                    className="w-full h-64 rounded-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 shadow-inner"
                    style={{
                      backgroundColor: theme === "dark" ? "rgba(255,255,255,0.05)" : "#f1f5f9",
                      border: `1px solid ${theme === "dark" ? "rgba(255,255,255,0.08)" : "#e2e8f0"}`,
                    }}
                  >
                    <iframe
                      src={formData.map_embed_url}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <label
                  className="text-sm font-semibold px-1 uppercase tracking-widest text-[10px]"
                  style={{ color: colors.textMuted as string }}
                >
                  LinkedIn URL
                </label>
                <input
                  type="url"
                  value={formData.linkedin_url || ""}
                  onChange={(e) => {
                    setFormData({ ...formData, linkedin_url: e.target.value });
                    setValidationErrors((prev) => ({ ...prev, linkedin_url: "" }));
                  }}
                  placeholder="https://linkedin.com/company/tachydro"
                  className="w-full rounded-xl py-3.5 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium"
                  style={inputStyle}
                />
                {fieldError("linkedin_url")}
              </div>
              <div className="space-y-2">
                <label
                  className="text-sm font-semibold px-1 uppercase tracking-widest text-[10px]"
                  style={{ color: colors.textMuted as string }}
                >
                  Facebook URL
                </label>
                <input
                  type="url"
                  value={formData.facebook_url || ""}
                  onChange={(e) => {
                    setFormData({ ...formData, facebook_url: e.target.value });
                    setValidationErrors((prev) => ({ ...prev, facebook_url: "" }));
                  }}
                  placeholder="https://facebook.com/tachydro"
                  className="w-full rounded-xl py-3.5 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium"
                  style={inputStyle}
                />
                {fieldError("facebook_url")}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 p-8 rounded-3xl space-y-8" style={cardStyle}>
            <h2
              className={`${montserrat.className} text-xl mb-4 flex items-center gap-2 pb-4`}
              style={{
                borderBottom: `1px solid ${theme === "dark" ? "rgba(255,255,255,0.08)" : "#e2e8f0"}`,
                color: colors.text as string,
              }}
            >
              <Video className="h-5 w-5 text-blue-500" />
              Video Section
            </h2>

            <div className="flex gap-2 px-1">
              <button
                type="button"
                onClick={() => handleVideoModeSwitch("upload")}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${
                  videoMode === "upload"
                    ? "bg-blue-500 text-white"
                    : "bg-transparent border border-blue-500/30 text-blue-500 hover:bg-blue-500/10"
                }`}
              >
                <Video className="h-4 w-4" />
                Upload Video
              </button>
              <button
                type="button"
                onClick={() => handleVideoModeSwitch("youtube")}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${
                  videoMode === "youtube"
                    ? "bg-red-500 text-white"
                    : "bg-transparent border border-red-500/30 text-red-500 hover:bg-red-500/10"
                }`}
              >
                <PlayCircle className="h-4 w-4" />
                YouTube URL
              </button>
            </div>

            {videoMode === "upload" && (
              <div className="space-y-4">
                <label
                  className="text-sm font-semibold px-1 uppercase tracking-widest text-[10px]"
                  style={{ color: colors.textMuted as string }}
                >
                  Video File
                </label>
                {(selectedVideo || formData.video) && (
                  <div
                    className="h-48 w-full md:w-96 rounded-xl overflow-hidden bg-black"
                    style={{
                      border: `1px solid ${theme === "dark" ? "rgba(255,255,255,0.08)" : "#e2e8f0"}`,
                    }}
                  >
                    <video controls className="w-full h-full object-contain">
                      <source
                        src={
                          selectedVideo
                            ? URL.createObjectURL(selectedVideo)
                            : formData.video!
                        }
                      />
                    </video>
                  </div>
                )}
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file && file.size > 10 * 1024 * 1024) {
                      setValidationErrors((prev) => ({ ...prev, video: "Video file must not exceed 10MB" }));
                      return;
                    }
                    setValidationErrors((prev) => ({ ...prev, video: "" }));
                    setSelectedVideo(file || null);
                  }}
                  className="block w-full text-sm file:mr-4 file:py-2.5 file:px-5 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-blue-500/10 file:text-blue-500 hover:file:bg-blue-500/20 transition-all cursor-pointer rounded-xl"
                  style={inputStyle}
                />
                {fieldError("video")}
              </div>
            )}

            {videoMode === "youtube" && (
              <div className="space-y-4">
                <label
                  className="text-sm font-semibold px-1 uppercase tracking-widest text-[10px]"
                  style={{ color: colors.textMuted as string }}
                >
                  YouTube URL
                </label>
                <input
                  type="url"
                  value={formData.youtube_url || ""}
                  onChange={(e) => setFormData({ ...formData, youtube_url: e.target.value })}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="w-full rounded-xl py-3.5 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium"
                  style={inputStyle}
                />
                {formData.youtube_url && (
                  <div
                    className="w-full h-64 rounded-xl overflow-hidden"
                    style={{
                      border: `1px solid ${theme === "dark" ? "rgba(255,255,255,0.08)" : "#e2e8f0"}`,
                    }}
                  >
                    <iframe
                      src={convertToEmbedUrl(formData.youtube_url)}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="lg:col-span-2 p-8 rounded-3xl space-y-8" style={cardStyle}>
            <h2
              className={`${montserrat.className} text-xl mb-4 flex items-center gap-2 pb-4`}
              style={{
                borderBottom: `1px solid ${theme === "dark" ? "rgba(255,255,255,0.08)" : "#e2e8f0"}`,
                color: colors.text as string,
              }}
            >
              <Globe className="h-5 w-5 text-blue-500" />
              Organization Chart
            </h2>
            <div className="space-y-4">
              <label
                className="text-sm font-semibold px-1 uppercase tracking-widest text-[10px]"
                style={{ color: colors.textMuted as string }}
              >
                Chart Image
              </label>
              <div className="flex flex-col gap-4">
                {(selectedFile || formData.organization_chart_image) && (
                  <div
                    className="h-48 w-full md:w-96 rounded-xl overflow-hidden"
                    style={{
                      backgroundColor: theme === "dark" ? "rgba(255,255,255,0.05)" : "#f1f5f9",
                      border: `1px solid ${theme === "dark" ? "rgba(255,255,255,0.08)" : "#e2e8f0"}`,
                    }}
                  >
                    <img
                      src={
                        selectedFile
                          ? URL.createObjectURL(selectedFile)
                          : formData.organization_chart_image!
                      }
                      alt="Org Chart"
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file && file.size > 10 * 1024 * 1024) {
                      setValidationErrors((prev) => ({ ...prev, organization_chart_image: "Image file must not exceed 10MB" }));
                      return;
                    }
                    setValidationErrors((prev) => ({ ...prev, organization_chart_image: "" }));
                    setSelectedFile(file || null);
                  }}
                  className="block w-full text-sm file:mr-4 file:py-2.5 file:px-5 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-blue-500/10 file:text-blue-500 hover:file:bg-blue-500/20 transition-all cursor-pointer rounded-xl"
                  style={inputStyle}
                />
                {fieldError("organization_chart_image")}
              </div>
            </div>
          </div>
        </div>
      )}

      {showConfirmDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div
            className="rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl"
            style={{
              backgroundColor: theme === "dark" ? "#1f2937" : "#ffffff",
              border: `1px solid ${theme === "dark" ? "rgba(255,255,255,0.1)" : "#e2e8f0"}`,
            }}
          >
            <h3
              className="text-lg font-bold mb-4"
              style={{ color: colors.text as string }}
            >
              Confirm Switch
            </h3>
            <p
              className="text-sm mb-6"
              style={{ color: colors.text.secondary as string }}
            >
              Switching to {pendingMode === "upload" ? "video upload" : "YouTube URL"} will clear
              your existing {videoMode === "upload" ? "video file" : "YouTube URL"}. Are you sure?
            </p>
            <div className="flex gap-3 justify-end">
              <button
                type="button"
                onClick={cancelModeSwitch}
                className="px-4 py-2 rounded-xl border transition-all"
                style={{
                  borderColor: theme === "dark" ? "rgba(255,255,255,0.2)" : "#cbd5e1",
                  color: colors.text as string,
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmModeSwitch}
                className="px-4 py-2 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition-all"
              >
                Yes, switch
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && <Toast message={toast.message} type={toast.type} onClose={hideToast} />}
    </div>
  );
}
