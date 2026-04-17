"use client";

import { useState, useEffect } from "react";
import {
  Save,
  Type,
  AlignLeft,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Layers,
  List,
} from "lucide-react";
import { Montserrat } from "next/font/google";
import { useBanners } from "../../../src/hooks/useBanner";
import { useBannerMutations } from "../../../src/hooks/useAdminMutations";
import { Banner } from "../../../src/lib/api";
import { useAdminTheme } from "../../../src/hooks/useAdminTheme";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["600", "700"] });

export default function BannerManagementPage() {
  const { theme, colors, mounted } = useAdminTheme();
  const { data: banners, isLoading } = useBanners();
  const { updateBanner } = useBannerMutations();

  const banner = Array.isArray(banners) ? banners[0] : undefined;

  const [formData, setFormData] = useState<Partial<Banner>>({});
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "success" | "error">("idle");
  const [typewriterInput, setTypewriterInput] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleSave = async () => {
    if (!banner?.id) return;

    setSaveStatus("saving");
    try {
      if (selectedFile) {
        const fileData = new FormData();
        fileData.append("file", selectedFile);
        const token = document.cookie.replace(
          /(?:(?:^|.*;\s*)access_token\s*\=\s*([^;]*).*$)|^.*$/,
          "$1",
        );
        await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL}/api/home/banners/${banner.id}/background_image/`,
          {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            body: fileData,
          },
        );
        setSelectedFile(null);
      }

      const changedData: Partial<Banner> = {};
      const currentFormData = {
        ...formData,
        typewriter_words: typewriterInput
          .split(",")
          .map((w) => w.trim())
          .filter((w) => w !== ""),
      };

      Object.keys(currentFormData).forEach((k) => {
        const key = k as keyof Banner;
        if (JSON.stringify(currentFormData[key]) !== JSON.stringify(banner[key])) {
          changedData[key] = currentFormData[key];
        }
      });

      if (Object.keys(changedData).length > 0) {
        await updateBanner.mutateAsync({ id: banner.id, data: changedData });
      }

      setSaveStatus("success");
      setTimeout(() => setSaveStatus("idle"), 3000);
    } catch (error) {
      setSaveStatus("error");
      setTimeout(() => setSaveStatus("idle"), 5000);
    }
  };

  useEffect(() => {
    if (banner) {
      setFormData({ ...banner });
      setTypewriterInput(banner.typewriter_words?.join(", ") || "");
    }
  }, [banner]);

  if (!mounted) return null;

  const isDark = theme === "dark";
  const cardStyle = {
    backgroundColor: isDark ? "rgba(255,255,255,0.03)" : "#ffffff",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: isDark ? "rgba(255,255,255,0.08)" : "#e2e8f0",
  };

  const inputStyle = {
    backgroundColor: isDark ? "rgba(255,255,255,0.05)" : "#f1f5f9",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: isDark ? "rgba(255,255,255,0.1)" : "#cbd5e1",
    color: isDark ? "#ffffff" : "#1e293b",
  };

  return (
    <div className="space-y-15 uppercase relative pb-40">
      <div>
        <h1
          className={`${montserrat.className} text-4xl mb-2`}
          style={{ color: colors.text as string }}
        >
          Home <span className="text-blue-500">Banner</span>
        </h1>
        <p style={{ color: colors.textSecondary as string }}>
          Edit the hero banner displayed on the main landing page.
        </p>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
        </div>
      ) : !banner ? (
        <div
          className="flex flex-col items-center justify-center py-32 px-4 border-dashed rounded-3xl"
          style={cardStyle}
        >
          <Layers className="h-12 w-12 text-blue-500/40 mb-4" />
          <h3 className="text-lg font-bold mb-2" style={{ color: colors.text as string }}>
            No Banner Found
          </h3>
          <p
            className="text-sm text-center max-w-sm normal-case"
            style={{ color: colors.textMuted as string }}
          >
            No banner record exists in the database yet. Create one via the Django admin or API.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="p-8 rounded-3xl space-y-8" style={cardStyle}>
            <h2
              className={`${montserrat.className} text-xl flex items-center gap-2 pb-4`}
              style={{
                color: colors.text as string,
                borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "#e2e8f0"}`,
              }}
            >
              <Type className="h-5 w-5 text-blue-500" />
              Hero Text
            </h2>

            <div className="space-y-6">
              <div className="space-y-2">
                <label
                  className="text-[10px] font-bold tracking-widest uppercase px-1"
                  style={{ color: colors.textMuted as string }}
                >
                  Headline
                </label>
                <input
                  type="text"
                  value={formData.headline || ""}
                  onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
                  placeholder="e.g. Building the Future of Energy"
                  className="w-full rounded-xl py-3.5 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium"
                  style={inputStyle}
                />
              </div>

              <div className="space-y-2">
                <label
                  className="text-[10px] font-bold tracking-widest uppercase px-1"
                  style={{ color: colors.textMuted as string }}
                >
                  Subheadline
                </label>
                <textarea
                  value={formData.subheadline || ""}
                  onChange={(e) => setFormData({ ...formData, subheadline: e.target.value })}
                  rows={4}
                  placeholder="Supporting description shown below the headline..."
                  className="w-full rounded-xl py-3.5 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium resize-none normal-case text-sm"
                  style={inputStyle}
                />
              </div>
            </div>
          </div>

          <div className="p-8 rounded-3xl space-y-8" style={cardStyle}>
            <h2
              className={`${montserrat.className} text-xl flex items-center gap-2 pb-4`}
              style={{
                color: colors.text as string,
                borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "#e2e8f0"}`,
              }}
            >
              <List className="h-5 w-5 text-blue-500" />
              Typewriter Animation
            </h2>

            <div className="space-y-6">
              <div className="space-y-2">
                <label
                  className="text-[10px] font-bold tracking-widest uppercase px-1"
                  style={{ color: colors.textMuted as string }}
                >
                  Typewriter Words
                  <span
                    className="ml-2 normal-case font-normal"
                    style={{ color: colors.textMuted as string }}
                  >
                    (comma separated)
                  </span>
                </label>
                <textarea
                  value={typewriterInput}
                  onChange={(e) => setTypewriterInput(e.target.value)}
                  rows={3}
                  placeholder="Sustainable, Reliable, Innovative"
                  className="w-full rounded-xl py-3.5 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium resize-none normal-case text-sm"
                  style={inputStyle}
                />
              </div>

              {typewriterInput && (
                <div className="space-y-2">
                  <label
                    className="text-[10px] font-bold tracking-widest uppercase px-1"
                    style={{ color: colors.textMuted as string }}
                  >
                    Word Preview
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {typewriterInput
                      .split(",")
                      .map((w) => w.trim())
                      .filter((w) => w)
                      .map((word, i) => (
                        <span
                          key={i}
                          className="px-3 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold normal-case"
                        >
                          {word}
                        </span>
                      ))}
                  </div>
                </div>
              )}
            </div>

            <h2
              className={`${montserrat.className} text-xl flex items-center gap-2 pb-4 pt-4`}
              style={{
                color: colors.text as string,
                borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "#e2e8f0"}`,
              }}
            >
              <AlignLeft className="h-5 w-5 text-blue-500" />
              Background Image
            </h2>
            <div className="flex flex-col gap-4">
              {(selectedFile || formData.background_image) && (
                <div
                  className="h-32 w-48 rounded-2xl overflow-hidden border"
                  style={{
                    backgroundColor: isDark ? "rgba(255,255,255,0.05)" : "#f1f5f9",
                    borderColor: isDark ? "rgba(255,255,255,0.08)" : "#e2e8f0",
                  }}
                >
                  <img
                    src={
                      selectedFile ? URL.createObjectURL(selectedFile) : formData.background_image!
                    }
                    alt="Banner background"
                    className="w-full h-full object-contain"
                  />
                </div>
              )}
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer flex-1">
                  <span
                    className="text-[10px] font-bold tracking-widest uppercase"
                    style={{ color: colors.textMuted as string }}
                  >
                    {selectedFile ? "New file selected" : "Choose image"}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => e.target.files && setSelectedFile(e.target.files[0])}
                    className="block w-full text-sm file:mr-4 file:py-2.5 file:px-5 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-blue-500/10 file:text-blue-500 hover:file:bg-blue-500/20 transition-all cursor-pointer rounded-xl"
                    style={inputStyle}
                  />
                </label>
                {selectedFile && (
                  <button
                    type="button"
                    onClick={() => setSelectedFile(null)}
                    className="text-xs font-bold border px-3 py-2 rounded-lg transition-all normal-case"
                    style={{
                      color: "#ef4444",
                      backgroundColor: "rgba(239,68,68,0.1)",
                      borderColor: "rgba(239,68,68,0.2)",
                    }}
                  >
                    Clear
                  </button>
                )}
              </div>
              <p
                className="text-[10px] normal-case px-1"
                style={{ color: colors.textMuted as string }}
              >
                Upload a new background image for the hero banner. The image will be saved when you
                click{" "}
                <strong style={{ color: colors.textSecondary as string }}> Save</strong>.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-end pt-8 pb-8">
        {saveStatus === "success" && (
          <span className="flex items-center gap-2 text-green-500 text-xs font-bold mr-4">
            <CheckCircle2 className="h-4 w-4" />
            Saved successfully
          </span>
        )}
        {saveStatus === "error" && (
          <span className="flex items-center gap-2 text-red-500 text-xs font-bold mr-4">
            <AlertCircle className="h-4 w-4" />
            Failed to save
          </span>
        )}
        <button
          onClick={handleSave}
          disabled={saveStatus === "saving" || isLoading || !banner}
          className="bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-white px-6 py-3 rounded-xl flex items-center gap-2 font-bold transition-all shadow-xl shadow-blue-500/20 active:scale-95"
        >
          {saveStatus === "saving" ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Save className="h-5 w-5" />
          )}
          {saveStatus === "saving" ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
}