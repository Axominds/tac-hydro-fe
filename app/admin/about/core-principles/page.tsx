"use client";

import { useState, useEffect, useRef } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  Loader2,
  X,
  Save,
  GripVertical,
  Check,
  Briefcase,
  Settings,
  Users,
  Lightbulb,
  Scale,
  Leaf,
  Cpu,
  Target,
  ShieldCheck,
  DollarSign,
  Trophy,
} from "lucide-react";
import { Montserrat } from "next/font/google";
import { useAdminTheme, getThemedClasses } from "../../../../src/hooks/useAdminTheme";
import { useModalContext } from "../../layout";
import { useCorePrinciples, useCorePrinciplesIntro } from "../../../../src/hooks/useCorePrinciples";
import {
  useCorePrinciplesIntroMutations,
  useCorePrinciplesMutations,
} from "../../../../src/hooks/useAdminMutations";
import { CorePrinciple, CorePrinciplesIntro, apiFetch } from "../../../../src/lib/api";
import { QuillEditor } from "../../../../src/components/admin/QuillEditor";
import { Toast, useToast } from "../../../../src/components/ui/toast";
import { ConfirmDialog } from "../../../../src/components/ui/confirm-dialog";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["600", "700"] });

const ICON_OPTIONS = [
  { value: "briefcase", icon: Briefcase },
  { value: "settings", icon: Settings },
  { value: "users", icon: Users },
  { value: "lightbulb", icon: Lightbulb },
  { value: "scale", icon: Scale },
  { value: "leaf", icon: Leaf },
  { value: "cpu", icon: Cpu },
  { value: "target", icon: Target },
  { value: "shield-check", icon: ShieldCheck },
  { value: "dollar-sign", icon: DollarSign },
  { value: "trophy", icon: Trophy },
] as const;

const getColorBgClass = (color: string) => {
  const colorMap: Record<string, string> = {
    blue: "bg-blue-500",
    emerald: "bg-emerald-500",
    amber: "bg-amber-500",
    purple: "bg-purple-500",
    red: "bg-red-500",
    yellow: "bg-yellow-500",
    indigo: "bg-indigo-500",
    slate: "bg-slate-700",
    green: "bg-green-500",
    orange: "bg-orange-500",
    cyan: "bg-cyan-500",
    pink: "bg-pink-500",
  };
  return colorMap[color] || "bg-blue-500";
};

const COLOR_OPTIONS = [
  { value: "blue", bg: "bg-blue-500", text: "text-blue-500" },
  { value: "emerald", bg: "bg-emerald-500", text: "text-emerald-500" },
  { value: "amber", bg: "bg-amber-500", text: "text-amber-500" },
  { value: "purple", bg: "bg-purple-500", text: "text-purple-500" },
  { value: "red", bg: "bg-red-500", text: "text-red-500" },
  { value: "yellow", bg: "bg-yellow-500", text: "text-yellow-500" },
  { value: "indigo", bg: "bg-indigo-500", text: "text-indigo-500" },
  { value: "slate", bg: "bg-slate-700", text: "text-slate-700" },
  { value: "green", bg: "bg-green-500", text: "text-green-500" },
  { value: "orange", bg: "bg-orange-500", text: "text-orange-500" },
  { value: "cyan", bg: "bg-cyan-500", text: "text-cyan-500" },
  { value: "pink", bg: "bg-pink-500", text: "text-pink-500" },
] as const;

export default function CorePrinciplesPage() {
  const { theme, colors, mounted } = useAdminTheme();
  const { setIsModalOpen: setContextModalOpen } = useModalContext();
  const classes = getThemedClasses(theme);

  const { data: corePrinciples, isLoading: loadingPrinciples } = useCorePrinciples();
  const { data: intro, isLoading: loadingIntro } = useCorePrinciplesIntro();

  const { updateIntro, uploadImage, deleteIntro } = useCorePrinciplesIntroMutations();
  const { createCorePrinciple, updateCorePrinciple, deleteCorePrinciple, reorderCorePrinciples } =
    useCorePrinciplesMutations();

  const [isIntroModalOpen, setIsIntroModalOpen] = useState(false);
  const [introFormData, setIntroFormData] = useState<Partial<CorePrinciplesIntro>>({});
  const [selectedIntroFile, setSelectedIntroFile] = useState<File | null>(null);
  const [isSavingIntro, setIsSavingIntro] = useState(false);

  const [isPrincipleModalOpen, setIsPrincipleModalOpen] = useState(false);
  const [editingPrinciple, setEditingPrinciple] = useState<CorePrinciple | null>(null);
  const [principleFormData, setPrincipleFormData] = useState({
    title: "",
    description: "",
    icon_key: "briefcase",
    color_class: "blue",
  });
  const [isSavingPrinciple, setIsSavingPrinciple] = useState(false);
  const { toast, showToast, hideToast } = useToast();
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleteType, setDeleteType] = useState<"principle" | "intro" | null>(null);

  const [orderedPrinciples, setOrderedPrinciples] = useState<CorePrinciple[]>([]);
  const [reordering, setReordering] = useState(false);
  const [dragOverId, setDragOverId] = useState<number | null>(null);
  const dragItemId = useRef<number | null>(null);

  const setIsIntroModal = (open: boolean) => {
    setIsIntroModalOpen(open);
    setContextModalOpen(open);
  };

  const setIsPrincipleModal = (open: boolean) => {
    setIsPrincipleModalOpen(open);
    setContextModalOpen(open);
  };

  useEffect(() => {
    if (corePrinciples) {
      const sorted = [...corePrinciples].sort((a, b) => a.order - b.order);
      if (JSON.stringify(sorted) !== JSON.stringify(orderedPrinciples)) {
        setOrderedPrinciples(sorted);
      }
    }
  }, [corePrinciples]);

  if (!mounted || loadingPrinciples || loadingIntro) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  const isDark = theme === "dark";

  const getIconComponent = (iconKey: string | undefined) => {
    if (!iconKey || iconKey === "") {
      return Briefcase;
    }
    const normalized = iconKey.toLowerCase().replace(/\s+/g, "-").replace(/_/g, "-") || "";
    const iconOption = ICON_OPTIONS.find((i) => i.value === normalized || i.value === iconKey);
    return iconOption?.icon || Briefcase;
  };

  const getColorStyles = (colorClass: string | undefined) => {
    if (!colorClass || colorClass === "") {
      return { bg: "bg-blue-500", text: "text-blue-500" };
    }
    const colorMap: Record<string, { bg: string; text: string }> = {
      blue: { bg: "bg-blue-500", text: "text-blue-500" },
      emerald: { bg: "bg-emerald-500", text: "text-emerald-500" },
      amber: { bg: "bg-amber-500", text: "text-amber-500" },
      purple: { bg: "bg-purple-500", text: "text-purple-500" },
      red: { bg: "bg-red-500", text: "text-red-500" },
      yellow: { bg: "bg-yellow-500", text: "text-yellow-500" },
      indigo: { bg: "bg-indigo-500", text: "text-indigo-500" },
      slate: { bg: "bg-slate-700", text: "text-slate-700" },
      green: { bg: "bg-green-500", text: "text-green-500" },
      orange: { bg: "bg-orange-500", text: "text-orange-500" },
      cyan: { bg: "bg-cyan-500", text: "text-cyan-500" },
      pink: { bg: "bg-pink-500", text: "text-pink-500" },
    };
    return colorMap[colorClass] || { bg: "bg-blue-500", text: "text-blue-500" };
  };

  const handleIntroSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!intro) return;
    const cleanedContent = (introFormData.content_html || "").replace(/&nbsp;/g, " ");
    const cleanedData = { ...introFormData, content_html: cleanedContent };
    setIsSavingIntro(true);
    try {
      await updateIntro.mutateAsync({ id: intro.id, data: cleanedData });
      if (selectedIntroFile) {
        await uploadImage.mutateAsync({ id: intro.id, file: selectedIntroFile });
      }
      setIsIntroModal(false);
      showToast("Changes saved successfully!");
    } finally {
      setIsSavingIntro(false);
    }
  };

  const openPrincipleModal = (principle?: CorePrinciple) => {
    if (principle) {
      setEditingPrinciple(principle);
      setPrincipleFormData({
        title: principle.title,
        description: principle.description || "",
        icon_key: principle.icon_key || "briefcase",
        color_class: principle.color_class || "blue",
      });
    } else {
      setEditingPrinciple(null);
      setPrincipleFormData({
        title: "",
        description: "",
        icon_key: "briefcase",
        color_class: "blue",
      });
    }
    setIsPrincipleModal(true);
  };

  const handlePrincipleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!principleFormData.title.trim()) return;
    setIsSavingPrinciple(true);
    try {
      if (editingPrinciple) {
        await updateCorePrinciple.mutateAsync({ id: editingPrinciple.id, data: principleFormData });
      } else {
        await createCorePrinciple.mutateAsync({
          ...principleFormData,
          order: orderedPrinciples.length,
        });
      }
      setIsPrincipleModal(false);
      showToast(
        editingPrinciple ? "Changes saved successfully!" : "Principle added successfully!"
      );
    } finally {
      setIsSavingPrinciple(false);
    }
  };

  const handlePrincipleDelete = (id: number) => {
    setDeleteId(id);
    setDeleteType("principle");
    setDeleteConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (deleteType === "principle" && deleteId) {
      await deleteCorePrinciple.mutateAsync(deleteId);
      showToast("Deleted successfully!", "error");
    } else if (deleteType === "intro" && deleteId) {
      await deleteIntro.mutateAsync(deleteId);
      showToast("Deleted successfully!", "error");
    }
    setDeleteId(null);
    setDeleteType(null);
  };

  const handleDragStart = (id: number) => {
    dragItemId.current = id;
  };

  const handleDragOver = (e: React.DragEvent, id: number) => {
    e.preventDefault();
    setDragOverId(id);
  };

  const handleDrop = async (targetId: number) => {
    const sourceId = dragItemId.current;
    if (!sourceId || sourceId === targetId) {
      setDragOverId(null);
      dragItemId.current = null;
      return;
    }

    const newOrder = [...orderedPrinciples];
    const fromIdx = newOrder.findIndex((p) => p.id === sourceId);
    const toIdx = newOrder.findIndex((p) => p.id === targetId);
    const [moved] = newOrder.splice(fromIdx, 1);
    newOrder.splice(toIdx, 0, moved);

    setOrderedPrinciples(newOrder);
    dragItemId.current = null;
    setDragOverId(null);

    setReordering(true);
    try {
      await reorderCorePrinciples.mutateAsync(
        newOrder.map((p, idx) => ({ id: p.id, order: idx + 1 })),
      );
    } finally {
      setReordering(false);
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1
          className={`${montserrat.className} text-3xl font-bold mb-2`}
          style={classes.text.primary}
        >
          Core <span className="text-blue-500">Principles</span>
        </h1>
        <p style={classes.text.secondary}>Manage core principles intro and list.</p>
      </div>

      {/* Intro Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2
            className={`${montserrat.className} text-xl font-semibold`}
            style={classes.text.primary}
          >
            Intro Section
          </h2>
        </div>

        {intro ? (
          <div className="rounded-2xl p-6 group" style={classes.card.default}>
            <div className="flex gap-6 items-start">
              {intro.image && (
                <img src={intro.image} alt="Intro" className="w-48 h-32 object-cover rounded-xl" />
              )}
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-2" style={classes.text.primary}>
                  {intro.title}
                </h3>
                <div
                  className="text-sm line-clamp-3"
                  style={classes.text.secondary}
                  dangerouslySetInnerHTML={{ __html: intro.content_html || "" }}
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setIntroFormData({
                      title: intro.title,
                      content_html: intro.content_html || "",
                      image_caption_title: intro.image_caption_title || "",
                      image_caption_subtitle: intro.image_caption_subtitle || "",
                    });
                    setSelectedIntroFile(null);
                    setIsIntroModal(true);
                  }}
                  className="p-2.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                  style={{
                    backgroundColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
                    color: colors.textSecondary as string,
                  }}
                >
                  <Edit2 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => {
                    setDeleteId(intro.id);
                    setDeleteType("intro");
                    setDeleteConfirmOpen(true);
                  }}
                  className="p-2.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                  style={{ backgroundColor: "rgba(239,68,68,0.1)", color: "#ef4444" }}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <div className="text-sm" style={classes.text.muted}>
              No intro set.
            </div>
            <button
              onClick={() => {
                setIntroFormData({
                  title: "",
                  content_html: "",
                  image_caption_title: "",
                  image_caption_subtitle: "",
                });
                setSelectedIntroFile(null);
                setIsIntroModal(true);
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold"
            >
              <Plus className="h-4 w-4" />
              Add Intro
            </button>
          </div>
        )}
      </div>

      {/* Core Principles List */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2
            className={`${montserrat.className} text-xl font-semibold`}
            style={classes.text.primary}
          >
            Core Principles
          </h2>
          <button
            onClick={() => openPrincipleModal()}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold"
          >
            <Plus className="h-4 w-4" />
            Add
          </button>
        </div>

        <div className="space-y-3">
          {orderedPrinciples.map((principle) => {
            const IconComponent = getIconComponent(principle.icon_key);
            const colorStyles = getColorStyles(principle.color_class);
            return (
              <div
                key={principle.id}
                draggable
                onDragStart={() => handleDragStart(principle.id)}
                onDragOver={(e) => handleDragOver(e, principle.id)}
                onDrop={() => handleDrop(principle.id)}
                className="flex items-center gap-4 p-4 rounded-xl transition-all group"
                style={{
                  backgroundColor:
                    dragOverId === principle.id
                      ? "rgba(59,130,246,0.15)"
                      : isDark
                        ? "rgba(255,255,255,0.05)"
                        : "#ffffff",
                  border: `1px solid ${dragOverId === principle.id ? "#3b82f6" : isDark ? "rgba(255,255,255,0.08)" : "#e2e8f0"}`,
                }}
              >
                <GripVertical className="h-5 w-5 text-gray-400 cursor-grab" />
                <div className={`p-2 rounded-lg ${colorStyles.bg}`}>
                  <IconComponent className={`h-5 w-5 text-white`} />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold" style={classes.text.primary}>
                    {principle.title}
                  </h4>
                  {principle.description && (
                    <p className="text-sm" style={classes.text.secondary}>
                      {principle.description}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => openPrincipleModal(principle)}
                  className="p-2.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                  style={{
                    backgroundColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
                    color: colors.textSecondary as string,
                  }}
                >
                  <Edit2 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handlePrincipleDelete(principle.id)}
                  className="p-2.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                  style={{ backgroundColor: "rgba(239,68,68,0.1)", color: "#ef4444" }}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Intro Modal */}
      {isIntroModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 overflow-hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsIntroModal(false)}
          />
          <div
            className="relative z-10 w-full max-w-2xl rounded-3xl overflow-hidden flex flex-col max-h-[90vh]"
            style={{ backgroundColor: colors.modalBg, border: `1px solid ${colors.border}` }}
          >
            <div
              className="p-6 flex items-center justify-between"
              style={{ borderBottom: `1px solid ${colors.border}` }}
            >
              <h2
                className={`${montserrat.className} text-xl font-bold`}
                style={{ color: colors.text }}
              >
                Edit Intro
              </h2>
              <button onClick={() => setIsIntroModal(false)}>
                <X className="h-5 w-5" style={{ color: colors.textMuted }} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <div>
                <label className="block text-sm mb-1" style={{ color: colors.textMuted }}>
                  Title
                </label>
                <input
                  value={introFormData.title || ""}
                  onChange={(e) => setIntroFormData({ ...introFormData, title: e.target.value })}
                  className="w-full rounded-lg px-3 py-2 text-sm"
                  style={classes.input.bg}
                />
              </div>
              <div>
                <label className="block text-sm mb-1" style={{ color: colors.textMuted }}>
                  Image Caption Title
                </label>
                <input
                  value={introFormData.image_caption_title || ""}
                  onChange={(e) =>
                    setIntroFormData({ ...introFormData, image_caption_title: e.target.value })
                  }
                  className="w-full rounded-lg px-3 py-2 text-sm"
                  style={classes.input.bg}
                  placeholder="e.g., Engineering Excellence"
                />
              </div>
              <div>
                <label className="block text-sm mb-1" style={{ color: colors.textMuted }}>
                  Image Caption Subtitle
                </label>
                <input
                  value={introFormData.image_caption_subtitle || ""}
                  onChange={(e) =>
                    setIntroFormData({ ...introFormData, image_caption_subtitle: e.target.value })
                  }
                  className="w-full rounded-lg px-3 py-2 text-sm"
                  style={classes.input.bg}
                />
              </div>
              <div>
                <label className="block text-sm mb-1" style={{ color: colors.textMuted }}>
                  Image
                </label>
                <div className="flex flex-col gap-3">
                  {(selectedIntroFile || introFormData.image || intro?.image) && (
                    <img
                      src={
                        selectedIntroFile
                          ? URL.createObjectURL(selectedIntroFile)
                          : introFormData.image || intro?.image || ""
                      }
                      alt="Preview"
                      className="h-24 w-32 object-cover rounded-lg"
                    />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => e.target.files?.[0] && setSelectedIntroFile(e.target.files[0])}
                    className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-500/10 file:text-blue-500 hover:file:bg-blue-500/20 transition-all cursor-pointer rounded-lg"
                    style={classes.input.bg}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm mb-1" style={{ color: colors.textMuted }}>
                  Content
                </label>
                <QuillEditor
                  value={introFormData.content_html || ""}
                  onChange={(content) =>
                    setIntroFormData({ ...introFormData, content_html: content })
                  }
                  theme={theme}
                />
              </div>
            </div>
            <div className="p-6 flex justify-end gap-3">
              <button
                onClick={() => setIsIntroModal(false)}
                className="px-4 py-2 rounded-lg text-sm font-medium"
                style={{ color: colors.textMuted }}
              >
                Cancel
              </button>
              <button
                onClick={handleIntroSave}
                disabled={isSavingIntro}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold flex items-center gap-2 disabled:opacity-50"
              >
                {isSavingIntro && <Loader2 className="h-4 w-4 animate-spin" />}
                <Save className="h-4 w-4" />
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Principle Modal */}
      {isPrincipleModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 overflow-hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsPrincipleModal(false)}
          />
          <div
            className="relative z-10 w-full max-w-lg rounded-3xl overflow-hidden flex flex-col max-h-[90vh]"
            style={{ backgroundColor: colors.modalBg, border: `1px solid ${colors.border}` }}
          >
            <div
              className="p-6 flex items-center justify-between"
              style={{ borderBottom: `1px solid ${colors.border}` }}
            >
              <h2
                className={`${montserrat.className} text-xl font-bold`}
                style={{ color: colors.text }}
              >
                {editingPrinciple ? "Edit" : "Add"} Principle
              </h2>
              <button onClick={() => setIsPrincipleModal(false)}>
                <X className="h-5 w-5" style={{ color: colors.textMuted }} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <div>
                <label className="block text-sm mb-1" style={{ color: colors.textMuted }}>
                  Title
                </label>
                <input
                  value={principleFormData.title}
                  onChange={(e) =>
                    setPrincipleFormData({ ...principleFormData, title: e.target.value })
                  }
                  className="w-full rounded-lg px-3 py-2 text-sm"
                  style={classes.input.bg}
                  placeholder="Core principle title"
                />
              </div>
              <div>
                <label className="block text-sm mb-1" style={{ color: colors.textMuted }}>
                  Description
                </label>
                <textarea
                  value={principleFormData.description}
                  onChange={(e) =>
                    setPrincipleFormData({ ...principleFormData, description: e.target.value })
                  }
                  className="w-full rounded-lg px-3 py-2 text-sm"
                  style={classes.input.bg}
                  placeholder="Brief description"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm mb-2" style={{ color: colors.textMuted }}>
                  Icon
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {ICON_OPTIONS.map((icon) => {
                    const IconComp = icon.icon;
                    const selectedColor = principleFormData.color_class || "blue";
                    return (
                      <button
                        key={icon.value}
                        type="button"
                        onClick={() =>
                          setPrincipleFormData({ ...principleFormData, icon_key: icon.value })
                        }
                        className={`p-3 rounded-xl transition-all ${
                          principleFormData.icon_key === icon.value
                            ? `${getColorBgClass(selectedColor)} text-white ring-2 ring-offset-2 ring-${selectedColor}-500`
                            : isDark
                              ? "bg-white/5"
                              : "bg-black/5"
                        }`}
                      >
                        <IconComp className="h-5 w-5" />
                      </button>
                    );
                  })}
                </div>
              </div>
              <div>
                <label className="block text-sm mb-2" style={{ color: colors.textMuted }}>
                  Color
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {COLOR_OPTIONS.map((color) => (
                    <button
                      key={color.value}
                      type="button"
                      onClick={() =>
                        setPrincipleFormData({ ...principleFormData, color_class: color.value })
                      }
                      className={`w-8 h-8 rounded-full ${color.bg} transition-all ${
                        (principleFormData.color_class || "blue") === color.value
                          ? `ring-2 ring-offset-2 ring-${color.value}-400 scale-110`
                          : "opacity-70 hover:opacity-100"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="p-6 flex justify-end gap-3">
              <button
                onClick={() => setIsPrincipleModal(false)}
                className="px-4 py-2 rounded-lg text-sm font-medium"
                style={{ color: colors.textMuted }}
              >
                Cancel
              </button>
              <button
                onClick={handlePrincipleSave}
                disabled={isSavingPrinciple}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold flex items-center gap-2 disabled:opacity-50"
              >
                {isSavingPrinciple && <Loader2 className="h-4 w-4 animate-spin" />}
                <Save className="h-4 w-4" />
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      <ConfirmDialog
        open={deleteConfirmOpen}
        onOpenChange={setDeleteConfirmOpen}
        onConfirm={confirmDelete}
        title="Confirm Delete"
        description={
          deleteType === "principle"
            ? "Are you sure you want to delete this core principle?"
            : "Are you sure you want to delete this intro?"
        }
        confirmText="Yes"
        cancelText="No"
      />
      {toast && <Toast message={toast.message} type={toast.type} onClose={hideToast} />}
    </div>
  );
}
