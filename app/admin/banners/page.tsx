"use client";

import { useState, useEffect } from "react";
import { Save, Type, AlignLeft, Loader2, CheckCircle2, AlertCircle, Layers, List } from "lucide-react";
import { Montserrat } from "next/font/google";
import { useBanners } from "../../../src/hooks/useBanner";
import { useBannerMutations } from "../../../src/hooks/useAdminMutations";
import { Banner } from "../../../src/lib/api";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["600", "700"] });

export default function BannerManagementPage() {
  const { data: banners, isLoading } = useBanners();
  const { updateBanner } = useBannerMutations();

  // There is only one banner — take the first one
  const banner = Array.isArray(banners) ? banners[0] : undefined;

  const [formData, setFormData] = useState<Partial<Banner>>({});
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "success" | "error">("idle");
  const [typewriterInput, setTypewriterInput] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Sync form data when banner loads
  useEffect(() => {
    if (banner) {
      setFormData({ ...banner });
      setTypewriterInput(banner.typewriter_words?.join(", ") || "");
    }
  }, [banner]);

  const handleSave = async () => {
    if (!banner?.id) return;

    setSaveStatus("saving");
    try {
      // Upload background image if a new file was selected
      if (selectedFile) {
        const fileData = new FormData();
        fileData.append("file", selectedFile);
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)access_token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL}/api/home/banners/${banner.id}/background_image/`, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: fileData,
        });
        setSelectedFile(null);
      }

      // Compute only changed text fields
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
          // @ts-ignore
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

  return (
    <div className="space-y-12 uppercase relative pb-40">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`${montserrat.className} text-4xl text-white mb-2`}>
            Home <span className="text-blue-500">Banner</span>
          </h1>
          <p className="text-gray-400">
            Edit the hero banner displayed on the main landing page.
          </p>
        </div>

        <div className="flex items-center gap-4">
          {saveStatus === "success" && (
            <span className="flex items-center gap-2 text-green-400 text-xs font-bold animate-in fade-in slide-in-from-right-4 lowercase">
              <CheckCircle2 className="h-4 w-4" />
              Changes saved successfully
            </span>
          )}
          {saveStatus === "error" && (
            <span className="flex items-center gap-2 text-red-400 text-xs font-bold animate-in fade-in slide-in-from-right-4 lowercase">
              <AlertCircle className="h-4 w-4" />
              Failed to save changes
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
            {saveStatus === "saving" ? "Saving..." : "Apply Changes"}
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
        </div>
      ) : !banner ? (
        <div className="flex flex-col items-center justify-center py-32 px-4 bg-white/5 rounded-3xl border border-dashed border-white/10">
          <Layers className="h-12 w-12 text-blue-500/40 mb-4" />
          <h3 className="text-lg font-bold text-white mb-2">No Banner Found</h3>
          <p className="text-gray-500 text-sm text-center max-w-sm normal-case">
            No banner record exists in the database yet. Create one via the Django admin or API.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Hero Text Card */}
          <div className="p-8 bg-white/5 border border-white/5 rounded-3xl space-y-8">
            <h2 className={`${montserrat.className} text-xl text-white flex items-center gap-2 pb-4 border-b border-white/5`}>
              <Type className="h-5 w-5 text-blue-500" />
              Hero Text
            </h2>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-500 tracking-widest uppercase px-1">
                  Headline
                </label>
                <input
                  type="text"
                  value={formData.headline || ""}
                  onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
                  placeholder="e.g. Building the Future of Energy"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-500 tracking-widest uppercase px-1">
                  Subheadline
                </label>
                <textarea
                  value={formData.subheadline || ""}
                  onChange={(e) => setFormData({ ...formData, subheadline: e.target.value })}
                  rows={4}
                  placeholder="Supporting description shown below the headline..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium resize-none normal-case text-sm"
                />
              </div>
            </div>
          </div>

          {/* Typewriter & Preview Card */}
          <div className="p-8 bg-white/5 border border-white/5 rounded-3xl space-y-8">
            <h2 className={`${montserrat.className} text-xl text-white flex items-center gap-2 pb-4 border-b border-white/5`}>
              <List className="h-5 w-5 text-blue-500" />
              Typewriter Animation
            </h2>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-500 tracking-widest uppercase px-1">
                  Typewriter Words
                  <span className="ml-2 normal-case text-gray-600 font-normal">
                    (comma separated)
                  </span>
                </label>
                <textarea
                  value={typewriterInput}
                  onChange={(e) => setTypewriterInput(e.target.value)}
                  rows={3}
                  placeholder="Sustainable, Reliable, Innovative"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium resize-none normal-case text-sm"
                />
                <p className="text-[10px] text-gray-600 px-1 normal-case">
                  Each word cycles in the animated typewriter effect on the banner.
                </p>
              </div>

              {/* Live preview of typewriter words */}
              {typewriterInput && (
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 tracking-widest uppercase px-1">
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
          </div>

          {/* Background Image Card */}
          <div className="lg:col-span-2 p-8 bg-white/5 border border-white/5 rounded-3xl space-y-4">
            <h2 className={`${montserrat.className} text-xl text-white flex items-center gap-2 pb-4 border-b border-white/5`}>
              <AlignLeft className="h-5 w-5 text-blue-500" />
              Background Image
            </h2>
            <div className="flex flex-col gap-4">
              {(selectedFile || formData.background_image) && (
                <div className="h-56 w-full rounded-2xl overflow-hidden border border-white/10 bg-white/5">
                  <img
                    src={selectedFile ? URL.createObjectURL(selectedFile) : formData.background_image!}
                    alt="Banner background"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer flex-1">
                  <span className="text-[10px] font-bold text-gray-500 tracking-widest uppercase">
                    {selectedFile ? "New file selected" : "Choose image"}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => e.target.files && setSelectedFile(e.target.files[0])}
                    className="block w-full text-sm text-gray-400 file:mr-4 file:py-2.5 file:px-5 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-blue-500/10 file:text-blue-500 hover:file:bg-blue-500/20 transition-all cursor-pointer bg-white/5 border border-white/10 rounded-xl"
                  />
                </label>
                {selectedFile && (
                  <button
                    type="button"
                    onClick={() => setSelectedFile(null)}
                    className="text-xs text-red-400 hover:text-red-300 font-bold border border-red-500/20 bg-red-500/10 px-3 py-2 rounded-lg transition-all normal-case"
                  >
                    Clear
                  </button>
                )}
              </div>
              <p className="text-[10px] text-gray-600 normal-case px-1">
                Upload a new background image for the hero banner. The image will be saved when you click <strong className="text-gray-500">Apply Changes</strong>.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
