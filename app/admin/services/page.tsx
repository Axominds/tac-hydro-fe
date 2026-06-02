"use client";

import { useState } from "react";
import {
  Briefcase,
  Plus,
  Edit2,
  Trash2,
  Save,
  Loader2,
  Upload,
  Settings,
  Users,
  Lightbulb,
  GripVertical,
} from "lucide-react";
import { Montserrat } from "next/font/google";
import { useExpertiseCategories } from "../../../src/hooks/useExpertiseCategories";
import { useServiceSectors } from "../../../src/hooks/useServiceSectors";
import {
  useExpertiseCategoryMutations,
  useServiceSectorMutations,
} from "../../../src/hooks/useAdminMutations";
import { ExpertiseCategoryModal } from "./ExpertiseCategoryModal";
import { ServiceSectorModal } from "./ServiceSectorModal";
import { useAdminTheme, getThemedClasses } from "../../../src/hooks/useAdminTheme";
import { useModalContext } from "../layout";
import { ConfirmDialog } from "../../../src/components/ui/confirm-dialog";
import { Toast, useToast } from "../../../src/components/ui/toast";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["600", "700"] });

const SUPPORTED_ICONS = [
  { value: "briefcase", label: "Briefcase", icon: Briefcase },
  { value: "settings", label: "Settings", icon: Settings },
  { value: "users", label: "Users", icon: Users },
  { value: "lightbulb", label: "Lightbulb", icon: Lightbulb },
];

const SUPPORTED_COLORS = [
  { value: "blue", label: "Blue", class: "bg-blue-500" },
  { value: "emerald", label: "Emerald", class: "bg-emerald-500" },
  { value: "amber", label: "Amber", class: "bg-amber-500" },
  { value: "purple", label: "Purple", class: "bg-purple-500" },
];

const colorStylesMap: Record<string, { bg: string; text: string }> = {
  blue: { bg: "bg-blue-600/10", text: "text-blue-500" },
  emerald: { bg: "bg-emerald-600/10", text: "text-emerald-500" },
  amber: { bg: "bg-amber-600/10", text: "text-amber-500" },
  purple: { bg: "bg-purple-600/10", text: "text-purple-500" },
};

interface CategoryWithItems {
  id: number;
  title: string;
  icon_key: string;
  theme_color: string;
  items?: any[];
}

function ExpertiseCategoryCard({
  category,
  onEdit,
  onDeleteClick,
  onDragStart,
  onDragOver,
  onDrop,
  isDragging,
  isDragOver,
  theme,
  colors,
}: {
  category: CategoryWithItems;
  onEdit: (category: CategoryWithItems) => void;
  onDeleteClick: (id: number) => void;
  onDragStart: (e: React.DragEvent, id: number) => void;
  onDragOver: (e: React.DragEvent, id: number) => void;
  onDrop: (e: React.DragEvent, id: number) => void;
  isDragging: boolean;
  isDragOver: boolean;
  theme: "light" | "dark";
  colors: ReturnType<typeof getThemedClasses>;
}) {
  const CurrentIcon = SUPPORTED_ICONS.find((i) => i.value === category.icon_key)?.icon || Briefcase;
  const categoryColors = colorStylesMap[category.theme_color] || colorStylesMap.blue;

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, category.id)}
      onDragOver={(e) => onDragOver(e, category.id)}
      onDrop={(e) => onDrop(e, category.id)}
      className="rounded-2xl overflow-hidden group transition-all"
      style={{
        backgroundColor: theme === "dark" ? "rgba(255,255,255,0.03)" : "#ffffff",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: isDragOver
          ? "#3b82f6"
          : theme === "dark"
            ? "rgba(255,255,255,0.08)"
            : "#e2e8f0",
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      <div className="p-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <GripVertical
            className="h-4 w-4 cursor-grab shrink-0"
            style={{ color: theme === "dark" ? "#555" : "#94a3b8" }}
          />
          <div className={`p-2 rounded-xl ${categoryColors.bg}`}>
            <CurrentIcon className={`h-5 w-5 ${categoryColors.text}`} />
          </div>

          <div className="flex items-center gap-2">
            <h3 className="font-bold" style={colors.text.primary}>
              {category.title}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(category)}
            className="p-2.5 rounded-lg transition-all"
            style={{
              backgroundColor: theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)",
            }}
          >
            <Edit2 className="h-4 w-4" style={{ color: colors.text.secondary as string }} />
          </button>
          <button
            onClick={() => onDeleteClick(category.id)}
            className="p-2.5 rounded-lg transition-all"
            style={{ backgroundColor: "rgba(239, 68, 68, 0.1)" }}
          >
            <Trash2 className="h-4 w-4 text-red-500" />
          </button>
        </div>
      </div>
    </div>
  );
}

// Service Sector Card (simplified)
function EditableServiceSectorCard({
  id,
  title,
  description,
  onUpdate,
  onDeleteClick,
  theme,
  colors,
}: {
  id: number;
  title: string;
  description?: string;
  onUpdate: (id: number, data: any) => Promise<void>;
  onDeleteClick: (id: number) => void;
  theme: "light" | "dark";
  colors: ReturnType<typeof getThemedClasses>;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editDesc, setEditDesc] = useState(description || "");
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    await onUpdate(id, { title: editTitle.trim(), description: editDesc.trim() });
    setIsSaving(false);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div
        className="rounded-2xl p-4 space-y-3"
        style={{
          backgroundColor: theme === "dark" ? "rgba(255,255,255,0.03)" : "#ffffff",
          borderWidth: "1px",
          borderStyle: "solid",
          borderColor: theme === "dark" ? "rgba(255,255,255,0.15)" : "#e2e8f0",
        }}
      >
        <input
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          className="w-full rounded-lg px-3 py-2 font-bold focus:outline-none"
          style={{
            backgroundColor: theme === "dark" ? "rgba(0,0,0,0.3)" : "#f1f5f9",
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor: theme === "dark" ? "rgba(255,255,255,0.15)" : "#cbd5e1",
            color: theme === "dark" ? "#ffffff" : "#1e293b",
          }}
        />
        <textarea
          value={editDesc}
          onChange={(e) => setEditDesc(e.target.value)}
          rows={2}
          className="w-full rounded-lg px-3 py-2 text-sm resize-none focus:outline-none"
          style={{
            backgroundColor: theme === "dark" ? "rgba(0,0,0,0.3)" : "#f1f5f9",
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor: theme === "dark" ? "rgba(255,255,255,0.15)" : "#cbd5e1",
            color: theme === "dark" ? "#ffffff" : "#1e293b",
          }}
        />
        <div className="flex gap-2">
          <button
            onClick={handleSave}
            disabled={isSaving || !editTitle?.trim()}
            className="flex-1 bg-blue-600 hover:bg-blue-500 disabled:bg-gray-400 text-white py-2 rounded-lg text-sm flex items-center justify-center gap-2 disabled:cursor-not-allowed"
          >
            {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Save
          </button>
          <button
            onClick={() => {
              setEditTitle(title);
              setEditDesc(description || "");
              setIsEditing(false);
            }}
            className="px-4 py-2 rounded-lg text-sm transition-all"
            style={{
              backgroundColor: theme === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
              color: colors.text.secondary,
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={() => setIsEditing(true)}
      className="rounded-2xl p-6 cursor-pointer group transition-all"
      style={{
        backgroundColor: theme === "dark" ? "rgba(255,255,255,0.03)" : "#ffffff",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: theme === "dark" ? "rgba(255,255,255,0.08)" : "#e2e8f0",
      }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="p-3 rounded-xl bg-blue-600/10">
          <Upload className="h-6 w-6 text-blue-500" />
        </div>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsEditing(true);
            }}
            className="p-2.5 rounded-lg transition-all"
            style={{
              backgroundColor: theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)",
            }}
          >
            <Edit2 className="h-4 w-4" style={{ color: colors.text.secondary }} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDeleteClick(id);
            }}
            className="p-2.5 rounded-lg transition-all"
            style={{ backgroundColor: "rgba(239, 68, 68, 0.1)" }}
          >
            <Trash2 className="h-4 w-4 text-red-500" />
          </button>
        </div>
      </div>
      <h3 className="font-bold text-lg mb-2" style={colors.text.primary}>
        {title}
      </h3>
      {description && (
        <p className="text-sm line-clamp-2" style={colors.text.muted}>
          {description}
        </p>
      )}
    </div>
  );
}

export default function ServicesManagementPage() {
  const { theme, colors, mounted } = useAdminTheme();
  const { setIsModalOpen } = useModalContext();
  const {
    data: categories,
    isLoading: catLoading,
    refetch: refetchCategories,
  } = useExpertiseCategories();
  const { data: sectors, isLoading: sectorLoading } = useServiceSectors();

  const { createCategory, updateCategory, deleteCategory, reorderCategories } =
    useExpertiseCategoryMutations();
  const { createSector, updateSector, deleteSector, reorderSectors } = useServiceSectorMutations();

  const [editingCategory, setEditingCategoryLocal] = useState<any>(null);
  const setEditingCategory = (cat: any) => {
    setEditingCategoryLocal(cat);
    setIsModalOpen(!!cat);
  };
  const [draggedId, setDraggedId] = useState<number | null>(null);
  const [dragOverId, setDragOverId] = useState<number | null>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleteType, setDeleteType] = useState<"category" | "sector" | null>(null);
  const { toast, showToast, hideToast } = useToast();

  const sortedCategories = [...(categories || [])].sort((a: any, b: any) => a.order - b.order);

  const handleDragStart = (e: React.DragEvent, id: number) => {
    setDraggedId(id);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent, id: number) => {
    e.preventDefault();
    if (draggedId !== id) {
      setDragOverId(id);
    }
  };

  const handleDrop = async (e: React.DragEvent, targetId: number) => {
    e.preventDefault();
    if (!draggedId || draggedId === targetId) {
      setDraggedId(null);
      setDragOverId(null);
      return;
    }

    const fromIdx = sortedCategories.findIndex((c: any) => c.id === draggedId);
    const toIdx = sortedCategories.findIndex((c: any) => c.id === targetId);

    const [moved] = sortedCategories.splice(fromIdx, 1);
    sortedCategories.splice(toIdx, 0, moved);

    const reordered = sortedCategories.map((c: any, idx: number) => ({
      id: c.id,
      order: idx + 1,
    }));

    await reorderCategories.mutateAsync(reordered);
    setDraggedId(null);
    setDragOverId(null);
  };

  const [sectorDraggedId, setSectorDraggedId] = useState<number | null>(null);
  const [sectorDragOverId, setSectorDragOverId] = useState<number | null>(null);
  const [editingSector, setEditingSectorLocal] = useState<any>(null);
  const setEditingSector = (sector: any) => {
    setEditingSectorLocal(sector);
    setIsModalOpen(!!sector);
  };
  const [isAddingSector, setIsAddingSectorLocal] = useState(false);
  const setIsAddingSector = (open: boolean) => {
    setIsAddingSectorLocal(open);
    setIsModalOpen(open);
  };

  const sortedSectors = [...(sectors || [])].sort((a: any, b: any) => a.order - b.order);

  const handleSectorDragStart = (e: React.DragEvent, id: number) => {
    setSectorDraggedId(id);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleSectorDragOver = (e: React.DragEvent, id: number) => {
    e.preventDefault();
    if (sectorDraggedId !== id) {
      setSectorDragOverId(id);
    }
  };

  const handleSectorDrop = async (e: React.DragEvent, targetId: number) => {
    e.preventDefault();
    if (!sectorDraggedId || sectorDraggedId === targetId) {
      setSectorDraggedId(null);
      setSectorDragOverId(null);
      return;
    }

    const fromIdx = sortedSectors.findIndex((s: any) => s.id === sectorDraggedId);
    const toIdx = sortedSectors.findIndex((s: any) => s.id === targetId);

    const [moved] = sortedSectors.splice(fromIdx, 1);
    sortedSectors.splice(toIdx, 0, moved);

    const reordered = sortedSectors.map((s: any, idx: number) => ({
      id: s.id,
      order: idx + 1,
    }));

    await reorderSectors.mutateAsync(reordered);
    setSectorDraggedId(null);
    setSectorDragOverId(null);
  };

  const isLoading = catLoading || sectorLoading;

  const handleDeleteConfirm = async () => {
    if (deleteType === "category" && deleteId) {
      await deleteCategory.mutateAsync(deleteId);
      refetchCategories();
      showToast("Category deleted successfully!", "error");
    } else if (deleteType === "sector" && deleteId) {
      await deleteSector.mutateAsync(deleteId);
      showToast("Sector deleted successfully!", "error");
    }
    setDeleteId(null);
    setDeleteType(null);
  };

  if (!mounted) return null;

  return (
    <div className="space-y-15">
      <div>
        <h1 className={`${montserrat.className} text-4xl font-bold mb-2`} style={colors.text.primary}>
          Our <span className="text-blue-500">Services</span>
        </h1>
        <p style={colors.text.secondary}>
          Manage expertise categories, items, and service sectors.
        </p>
      </div>

      {/* Expertise Categories */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className={`${montserrat.className} font-bold text-xl flex items-center gap-2`} style={colors.text.primary}>
            <Briefcase className="h-5 w-5 text-blue-500" />
            Expertise Categories
          </h2>
          <button
            onClick={() =>
              setEditingCategory({ title: "", icon_key: "briefcase", theme_color: "blue" } as any)
            }
            className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-sm rounded-lg"
          >
            <Plus className="h-4 w-4" />
            Add
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {isLoading ? (
            <div className="col-span-full flex justify-center py-10">
              <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            </div>
          ) : (
            sortedCategories.map((cat: any) => (
              <ExpertiseCategoryCard
                key={cat.id}
                category={cat}
                onEdit={(cat) => setEditingCategory(cat)}
                onDeleteClick={(id) => {
                  setDeleteId(id);
                  setDeleteType("category");
                  setDeleteConfirmOpen(true);
                }}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                isDragging={draggedId === cat.id}
                isDragOver={dragOverId === cat.id}
                theme={theme}
                colors={colors}
              />
            ))
          )}
        </div>
      </div>

      {/* Service Sectors */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className={`${montserrat.className} font-bold text-xl flex items-center gap-2`} style={colors.text.primary}>
            <Upload className="h-5 w-5 text-blue-500" />
            Service Sectors
          </h2>
          <button
            onClick={() => setIsAddingSector(true)}
            className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-sm rounded-lg"
          >
            <Plus className="h-4 w-4" />
            Add
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            <div className="col-span-full flex justify-center py-10">
              <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            </div>
          ) : (
            sortedSectors.map((sector: any) => (
              <div
                key={sector.id}
                draggable
                onDragStart={(e) => handleSectorDragStart(e, sector.id)}
                onDragOver={(e) => handleSectorDragOver(e, sector.id)}
                onDrop={(e) => handleSectorDrop(e, sector.id)}
                onClick={() => setEditingSector(sector)}
                className="rounded-2xl p-6 cursor-pointer transition-all"
                style={{
                  backgroundColor: theme === "dark" ? "rgba(255,255,255,0.03)" : "#ffffff",
                  borderWidth: "1px",
                  borderStyle: "solid",
                  borderColor:
                    sectorDragOverId === sector.id
                      ? "#3b82f6"
                      : theme === "dark"
                        ? "rgba(255,255,255,0.08)"
                        : "#e2e8f0",
                  opacity: sectorDraggedId === sector.id ? 0.5 : 1,
                }}
              >
                <div className="flex items-start justify-end mb-3">
                  <GripVertical
                    className="h-4 w-4 cursor-grab"
                    style={{ color: theme === "dark" ? "#555" : "#94a3b8" }}
                  />
                </div>
                <h3 className="font-bold text-lg mb-2" style={colors.text.primary}>
                  {sector.title}
                </h3>
                {sector.description && (
                  <p className="text-sm line-clamp-2" style={colors.text.muted}>
                    {sector.description}
                  </p>
                )}
                {sector.image && (
                  <img
                    src={sector.image}
                    alt={sector.title}
                    className="mt-3 w-full h-32 object-cover rounded-lg"
                  />
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {editingCategory && (
        <ExpertiseCategoryModal
          category={editingCategory}
          isOpen={!!editingCategory}
          onClose={() => setEditingCategory(null)}
          onSave={async (data) => {
            if (editingCategory.id) {
              await updateCategory.mutateAsync({ id: editingCategory.id, data });
              showToast("Category updated successfully!", "success");
            } else {
              await createCategory.mutateAsync({ ...data, order: (categories?.length || 0) + 1 });
              showToast("Category added successfully!", "success");
            }
            refetchCategories();
          }}
          onDelete={
            editingCategory.id
              ? async (id) => {
                  await deleteCategory.mutateAsync(id);
                  refetchCategories();
                  showToast("Category deleted successfully!", "error");
                }
              : undefined
          }
        />
      )}

      {(editingSector || isAddingSector) && (
        <ServiceSectorModal
          sector={editingSector}
          isOpen={!!editingSector || isAddingSector}
          onClose={() => {
            setEditingSector(null);
            setIsAddingSector(false);
          }}
          onSave={async (formData) => {
            if (editingSector) {
              await updateSector.mutateAsync({ id: editingSector.id, data: formData });
              showToast("Sector updated successfully!", "success");
            } else {
              const data = new FormData();
              formData.forEach((value, key) => data.append(key, value));
              data.append("order", String((sectors?.length || 0) + 1));
              await createSector.mutateAsync(data);
              showToast("Sector added successfully!", "success");
            }
          }}
          onDelete={
            editingSector
              ? async (id) => {
                  await deleteSector.mutateAsync(id);
                  showToast("Sector deleted successfully!", "error");
                }
              : undefined
          }
        />
      )}
      <ConfirmDialog
        open={deleteConfirmOpen}
        onOpenChange={setDeleteConfirmOpen}
        onConfirm={handleDeleteConfirm}
        title="Confirm Delete"
        description="Are you sure you want to delete this category?"
        confirmText="Yes"
        cancelText="No"
      />
      {toast && <Toast message={toast.message} type={toast.type} onClose={hideToast} />}
    </div>
  );
}
