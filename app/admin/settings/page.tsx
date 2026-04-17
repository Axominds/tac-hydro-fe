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
} from "lucide-react";
import { Montserrat } from "next/font/google";
import { useSiteSettings } from "../../../src/hooks/useSiteSettings";
import { useSettingsMutation } from "../../../src/hooks/useAdminMutations";
import { SiteSettings } from "../../../src/lib/api";
import { useAdminTheme, getThemedClasses } from "../../../src/hooks/useAdminTheme";

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

  useEffect(() => {
    if (settings) {
      setFormData({ ...settings });
    }
  }, [settings]);

  const handleSave = async () => {
    if (!settings?.id) return;

    setSaveStatus("saving");
    try {
      if (selectedFile) {
        const fileData = new FormData();
        fileData.append("organization_chart_image", selectedFile);

        await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL}/api/home/settings/${settings.id}/organization_chart_image/`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${document.cookie.replace(/(?:(?:^|.*;\s*)access_token\s*\=\s*([^;]*).*$)|^.*$/, "$1")}`,
            },
            body: fileData,
          },
        );
      }

      const changedData: Partial<SiteSettings> = {};
      Object.keys(formData).forEach((k) => {
        const key = k as keyof SiteSettings;
        if (formData[key] !== settings[key]) {
          // @ts-ignore
          changedData[key] = formData[key];
        }
      });

      if (Object.keys(changedData).length > 0) {
        await updateSettings.mutateAsync({ id: settings.id, data: changedData });
      }

      setSaveStatus("success");
      setTimeout(() => setSaveStatus("idle"), 3000);
      setSelectedFile(null);
    } catch (error) {
      setSaveStatus("error");
      setTimeout(() => setSaveStatus("idle"), 5000);
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

  return (
    <div className="space-y-12 uppercase relative pb-40">
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

        <div className="flex items-center gap-4">
          {saveStatus === "success" && (
            <span className="flex items-center gap-2 text-green-500 text-xs font-bold animate-in fade-in slide-in-from-right-4 lowercase">
              <CheckCircle2 className="h-4 w-4" />
              Changes saved successfully
            </span>
          )}
          {saveStatus === "error" && (
            <span className="flex items-center gap-2 text-red-500 text-xs font-bold animate-in fade-in slide-in-from-right-4 lowercase">
              <AlertCircle className="h-4 w-4" />
              Failed to save changes
            </span>
          )}
          <button
            onClick={handleSave}
            disabled={saveStatus === "saving" || isLoading}
            className="bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-white px-6 py-3 rounded-xl flex items-center gap-2 font-bold transition-all shadow-xl shadow-blue-500/20 active:scale-95"
          >
            {saveStatus === "saving" ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Save className="h-5 w-5" />
            )}
            {saveStatus === "saving" ? "Saving..." : "Apply Changes"}
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-20">
          {/* Contact Info Card */}
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
                  Company Name
                </label>
                <input
                  type="text"
                  value={formData.company_name || ""}
                  onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                  className="w-full rounded-xl py-3.5 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium"
                  style={inputStyle}
                />
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
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  rows={2}
                  className="w-full rounded-xl py-3.5 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium resize-none text-sm normal-case"
                  style={inputStyle}
                />
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
                    onChange={(e) => setFormData({ ...formData, contact_email: e.target.value })}
                    className="w-full rounded-xl py-3.5 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium lowercase"
                    style={inputStyle}
                  />
                </div>
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
                    onChange={(e) =>
                      setFormData({ ...formData, collaboration_email: e.target.value })
                    }
                    className="w-full rounded-xl py-3.5 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium lowercase"
                    style={inputStyle}
                  />
                </div>
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
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full rounded-xl py-3.5 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium"
                    style={inputStyle}
                  />
                </div>
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
                    onChange={(e) => setFormData({ ...formData, business_hours: e.target.value })}
                    className="w-full rounded-xl py-3.5 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium"
                    style={inputStyle}
                  />
                </div>
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
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full rounded-xl py-3.5 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium"
                    style={inputStyle}
                  />
                </div>
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
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      founded_year: parseInt(e.target.value) || undefined,
                    })
                  }
                  className="w-full rounded-xl py-3.5 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium"
                  style={inputStyle}
                />
              </div>
            </div>
          </div>

          {/* Social Presence Card */}
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
            <div className="space-y-6">
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
                    onChange={(e) => setFormData({ ...formData, map_embed_url: e.target.value })}
                    placeholder="https://www.google.com/maps/embed?pb=..."
                    className="w-full rounded-xl py-3.5 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium"
                    style={inputStyle}
                  />
                </div>
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
                  onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
                  placeholder="https://linkedin.com/company/tachydro"
                  className="w-full rounded-xl py-3.5 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium"
                  style={inputStyle}
                />
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
                  onChange={(e) => setFormData({ ...formData, facebook_url: e.target.value })}
                  placeholder="https://facebook.com/tachydro"
                  className="w-full rounded-xl py-3.5 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium"
                  style={inputStyle}
                />
              </div>
            </div>
          </div>

          {/* Organization Chart Card */}
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
                  onChange={(e) => e.target.files && setSelectedFile(e.target.files[0])}
                  className="block w-full text-sm file:mr-4 file:py-2.5 file:px-5 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-blue-500/10 file:text-blue-500 hover:file:bg-blue-500/20 transition-all cursor-pointer rounded-xl"
                  style={inputStyle}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
