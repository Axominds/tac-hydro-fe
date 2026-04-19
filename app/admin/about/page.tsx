"use client";

import { useState } from "react";
import { Users, Plus, Edit2, Trash2, Loader2, X, Save } from "lucide-react";
import { Montserrat } from "next/font/google";
import { useAdminTheme } from "../../../src/hooks/useAdminTheme";
import { useAboutSections } from "../../../src/hooks/useAboutSections";
import { useAboutSectionMutations } from "../../../src/hooks/useAdminMutations";
import { AboutPageSection } from "../../../src/lib/api";
import { QuillEditor } from "../../../src/components/admin/QuillEditor";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["600", "700"] });

const SECTION_TYPES = [
  { key: "about_us", title: "About Us", icon: Users },
  { key: "chairman_message", title: "Chairman's Message", icon: Users },
  { key: "management_commitment", title: "Management's Commitment", icon: Users },
] as const;

export default function AboutManagementPage() {
  const { theme, colors, mounted } = useAdminTheme();
  const { data: sections, isLoading } = useAboutSections();
  const { createSection, updateSection, uploadImage, deleteSection } = useAboutSectionMutations();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSection, setEditingSection] = useState<AboutPageSection | null>(null);
  const [selectedSectionType, setSelectedSectionType] = useState<string>("");
  const [formData, setFormData] = useState<Partial<AboutPageSection>>({});
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

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

  const getSectionByType = (typeKey: string): AboutPageSection | undefined => {
    return sections?.find((s) => s.section_key === typeKey);
  };

  const openCreateModal = (sectionType: string) => {
    const existing = getSectionByType(sectionType);
    if (existing) {
      openEditModal(existing);
      return;
    }
    setSelectedSectionType(sectionType);
    setEditingSection(null);
    setFormData({
      section_key: sectionType,
      title: "",
      content_html: "",
      image: null,
    });
    setSelectedFile(null);
    setIsModalOpen(true);
  };

  const openEditModal = (section: AboutPageSection) => {
    setEditingSection(section);
    setSelectedSectionType(section.section_key);
    setFormData({ ...section });
    setSelectedFile(null);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanedContent = (formData.content_html || "").replace(/&nbsp;/g, " ");
    const dataToSave = { ...formData, content_html: cleanedContent };
    let sectionId: number;
    if (editingSection) {
      await updateSection.mutateAsync({
        id: editingSection.id,
        data: dataToSave,
      });
      sectionId = editingSection.id;
    } else {
      const created = await createSection.mutateAsync(dataToSave);
      sectionId = created.id;
    }
    if (selectedFile) {
      await uploadImage.mutateAsync({ id: sectionId, file: selectedFile });
    }
    setIsModalOpen(false);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Delete this section permanently?")) {
      await deleteSection.mutateAsync(id);
    }
  };

  return (
    <div className="space-y-15">
      <div className="flex items-center">
        <div>
          <h1
            className={`${montserrat.className} text-4xl mb-2`}
            style={{ color: colors.text as string }}
          >
            About <span className="text-blue-500">Us</span>
          </h1>
          <p style={{ color: colors.textSecondary as string }}>
            Manage company sections, team members, and core principles.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
          </div>
        ) : (
          SECTION_TYPES.map(({ key, title, icon: Icon }) => {
            const section = getSectionByType(key);
            return (
              <div
                key={key}
                className="rounded-2xl p-6 flex items-center justify-between group transition-all"
                style={cardStyle}
              >
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-blue-600/10 rounded-xl flex items-center justify-center">
                    <Icon className="h-8 w-8 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1" style={{ color: colors.text as string }}>
                      {title}
                    </h3>
                    {!section && (
                      <p className="text-sm" style={{ color: colors.textMuted as string }}>
                        <span className="text-yellow-500">Not configured</span>
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {section ? (
                    <>
                      <button
                        onClick={() => openEditModal(section)}
                        className="p-2.5 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                        style={{
                          backgroundColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
                          color: colors.textSecondary as string,
                        }}
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(section.id)}
                        className="p-2.5 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                        style={{ backgroundColor: "rgba(239,68,68,0.1)", color: "#ef4444" }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => openCreateModal(key)}
                      className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-semibold transition-all text-sm"
                    >
                      <Plus className="h-4 w-4" />
                      Add Section
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 overflow-hidden">
          <div
            className="absolute inset-0 z-0 bg-black/60 backdrop-blur-sm w-screen h-screen"
            onClick={() => setIsModalOpen(false)}
          />
          <div
            className="relative z-10 w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col"
            style={{
              backgroundColor: isDark ? "#0a0a0a" : "#ffffff",
              border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "#e2e8f0"}`,
            }}
          >
            <div
              className="p-8 flex items-center justify-between shrink-0"
              style={{ borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "#e2e8f0"}` }}
            >
              <h2
                className={`${montserrat.className} text-2xl`}
                style={{ color: colors.text as string }}
              >
                {editingSection ? "Edit" : "Add"}{" "}
                <span className="text-blue-500">
                  {SECTION_TYPES.find((s) => s.key === selectedSectionType)?.title}
                </span>
              </h2>
              <button onClick={() => setIsModalOpen(false)} style={{ color: colors.textMuted as string }}>
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6 overflow-y-auto">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label
                    className="text-[10px] font-bold tracking-widest uppercase ml-1"
                    style={{ color: colors.textMuted as string }}
                  >
                    Title
                  </label>
                  <input
                    required
                    value={formData.title || ""}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                    style={inputStyle}
                    placeholder="Section title..."
                  />
                </div>

                <div className="space-y-2">
                  <label
                    className="text-[10px] font-bold tracking-widest uppercase"
                    style={{ color: colors.textMuted as string }}
                  >
                    Image
                  </label>
                  <div className="flex flex-col gap-3">
                  {(selectedFile || formData.image) && (
                    <div className="rounded-lg overflow-hidden border border-gray-200">
                      <img src={selectedFile ? URL.createObjectURL(selectedFile) : formData.image || ""} alt="Current" className="h-20 w-32 object-contain" />
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setSelectedFile(e.target.files ? e.target.files[0] : null)}
                    className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-500/10 file:text-blue-500 hover:file:bg-blue-500/20 transition-all cursor-pointer rounded-lg"
                    style={inputStyle}
                  />
                </div>
                  <p
                    className="text-[10px] normal-case px-1"
                    style={{ color: colors.textMuted as string }}
                  >
                    Upload a new image. The image will be saved when you click{" "}
                    <strong style={{ color: colors.textSecondary as string }}>Save Section</strong>.
                  </p>
                </div>

                <div className="space-y-2">
                  <label
                    className="text-[10px] font-bold tracking-widest uppercase ml-1"
                    style={{ color: colors.textMuted as string }}
                  >
                    Content
                  </label>
                  <QuillEditor
                    value={formData.content_html || ""}
                    onChange={(value) => setFormData({ ...formData, content_html: value })}
                    isDark={isDark}
                    placeholder="Enter content..."
                  />
                </div>
              </div>

              <div className="pt-4 flex gap-4 shrink-0">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-xl shadow-blue-600/10 active:scale-95"
                  disabled={createSection.isPending || updateSection.isPending}
                >
                  {(createSection.isPending || updateSection.isPending) ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <Save className="h-5 w-5" />
                  )}
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-8 font-bold rounded-2xl transition-all"
                  style={{
                    border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "#e2e8f0"}`,
                    color: colors.textSecondary as string,
                    backgroundColor: "transparent",
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
