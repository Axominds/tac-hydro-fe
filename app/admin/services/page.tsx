"use client";

import { useState } from "react";
import { Briefcase, Plus, Edit2, Trash2, Loader2, Upload, Settings, Users, Lightbulb, GripVertical } from "lucide-react";
import { Montserrat } from "next/font/google";
import { useExpertiseCategories } from "../../../src/hooks/useExpertiseCategories";
import { useServiceSectors } from "../../../src/hooks/useServiceSectors";
import { useExpertiseCategoryMutations, useServiceSectorMutations } from "../../../src/hooks/useAdminMutations";
import { ExpertiseCategoryModal } from "./ExpertiseCategoryModal";
import { ServiceSectorModal } from "./ServiceSectorModal";

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
  onDelete,
  onDragStart,
  onDragOver,
  onDrop,
  isDragging,
  isDragOver
}: { 
  category: CategoryWithItems;
  onEdit: (category: CategoryWithItems) => void;
  onDelete: (id: number) => Promise<void>;
  onDragStart: (e: React.DragEvent, id: number) => void;
  onDragOver: (e: React.DragEvent, id: number) => void;
  onDrop: (e: React.DragEvent, id: number) => void;
  isDragging: boolean;
  isDragOver: boolean;
}) {
  const CurrentIcon = SUPPORTED_ICONS.find(i => i.value === category.icon_key)?.icon || Briefcase;
  const colors = colorStylesMap[category.theme_color] || colorStylesMap.blue;

  return (
    <div 
      draggable
      onDragStart={(e) => onDragStart(e, category.id)}
      onDragOver={(e) => onDragOver(e, category.id)}
      onDrop={(e) => onDrop(e, category.id)}
      className={`bg-white/5 border border-white/5 rounded-2xl overflow-hidden group transition-all ${
        isDragOver ? "border-2 border-blue-500 bg-blue-500/10" : ""
      } ${isDragging ? "opacity-50" : ""}`}
    >
      <div className="p-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <GripVertical className="h-4 w-4 text-gray-600 cursor-grab shrink-0" />
          <div className={`p-2 rounded-xl ${colors.bg}`}>
            <CurrentIcon className={`h-5 w-5 ${colors.text}`} />
          </div>
          
          <div className="flex items-center gap-2">
            <h3 className="text-white font-bold">{category.title}</h3>
          </div>
        </div>
        
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={() => onEdit(category)}
            className="p-1 hover:bg-white/10 rounded"
          >
            <Edit2 className="h-3 w-3 text-gray-400" />
          </button>
          <button 
            onClick={() => window.confirm("Delete this category?") && onDelete(category.id)}
            className="p-1 hover:bg-white/10 rounded"
          >
            <Trash2 className="h-3 w-3 text-red-400" />
          </button>
        </div>
      </div>
    </div>
  );
}

function AddNewCategoryCard({ onAdd }: { onAdd: (data: any) => Promise<void> }) {
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState("");
  const [iconKey, setIconKey] = useState("briefcase");
  const [themeColor, setThemeColor] = useState("blue");
  const [isSaving, setIsSaving] = useState(false);

  const handleAdd = async () => {
    if (!title.trim()) return;
    setIsSaving(true);
    await onAdd({ title: title.trim(), icon_key: iconKey, theme_color: themeColor });
    setIsSaving(false);
    setTitle("");
    setIsAdding(false);
  };

  if (isAdding) {
    return (
      <div className="bg-white/5 border border-white/10 border-dashed rounded-2xl p-4 space-y-3">
        <input
          autoFocus
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Category title..."
          className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-white font-bold focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <div className="flex gap-2">
          <select
            value={iconKey}
            onChange={(e) => setIconKey(e.target.value)}
            className="flex-1 bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
          >
            {SUPPORTED_ICONS.map(icon => (
              <option key={icon.value} value={icon.value}>{icon.label}</option>
            ))}
          </select>
          <select
            value={themeColor}
            onChange={(e) => setThemeColor(e.target.value)}
            className="flex-1 bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
          >
            {SUPPORTED_COLORS.map(color => (
              <option key={color.value} value={color.value}>{color.label}</option>
            ))}
          </select>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleAdd}
            disabled={isSaving || !title.trim()}
            className="flex-1 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold text-sm disabled:opacity-50"
          >
            {isSaving ? <Loader2 className="h-4 w-4 animate-spin mx-auto" /> : "Add"}
          </button>
          <button
            onClick={() => setIsAdding(false)}
            className="px-4 py-2 bg-white/5 text-gray-400 hover:text-white rounded-lg text-sm"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={() => setIsAdding(true)}
      className="bg-white/5 border border-white/5 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center gap-3 hover:bg-white/10 transition-all"
    >
      <div className="p-3 rounded-xl bg-white/5">
        <Plus className="h-6 w-6 text-gray-500" />
      </div>
      <span className="text-gray-500 text-sm font-medium">Add Expertise Category</span>
    </button>
  );
}

// Service Sector Card (simplified)
function EditableServiceSectorCard({ 
  id, 
  title, 
  description,
  onUpdate, 
  onDelete 
}: { 
  id: number;
  title: string;
  description?: string;
  onUpdate: (id: number, data: any) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
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
      <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-3">
        <input
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-white font-bold focus:outline-none"
        />
        <textarea
          value={editDesc}
          onChange={(e) => setEditDesc(e.target.value)}
          rows={2}
          className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-gray-300 text-sm resize-none focus:outline-none"
        />
        <div className="flex gap-2">
          <button onClick={handleSave} disabled={isSaving} className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm">
            {isSaving ? <Loader2 className="h-4 w-4 mx-auto animate-spin" /> : "Save"}
          </button>
          <button onClick={() => { setEditTitle(title); setEditDesc(description || ""); setIsEditing(false); }} className="px-4 py-2 bg-white/5 text-gray-400 rounded-lg text-sm">
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      onClick={() => setIsEditing(true)}
      className="bg-white/5 border border-white/5 rounded-2xl p-6 hover:bg-white/10 cursor-pointer group"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="p-3 rounded-xl bg-blue-600/10">
          <Upload className="h-6 w-6 text-blue-500" />
        </div>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100">
          <button onClick={(e) => { e.stopPropagation(); setIsEditing(true); }} className="p-2 hover:bg-white/10 rounded">
            <Edit2 className="h-4 w-4 text-gray-400" />
          </button>
          <button onClick={(e) => { e.stopPropagation(); window.confirm("Delete?") && onDelete(id); }} className="p-2 hover:bg-red-500/20 rounded">
            <Trash2 className="h-4 w-4 text-red-400" />
          </button>
        </div>
      </div>
      <h3 className="text-white font-bold text-lg mb-2">{title}</h3>
      {description && <p className="text-gray-500 text-sm line-clamp-2">{description}</p>}
    </div>
  );
}

function AddNewSectorCard({ onAdd }: { onAdd: (data: any) => Promise<void> }) {
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleAdd = async () => {
    if (!title.trim()) return;
    setIsSaving(true);
    await onAdd({ title: title.trim(), description: description.trim() });
    setIsSaving(false);
    setTitle("");
    setDescription("");
    setIsAdding(false);
  };

  if (isAdding) {
    return (
      <div className="bg-white/5 border border-white/10 border-dashed rounded-2xl p-4 space-y-3">
        <input
          autoFocus
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Sector title..."
          className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-white font-bold focus:outline-none"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={2}
          placeholder="Description..."
          className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-gray-300 text-sm resize-none focus:outline-none"
        />
        <div className="flex gap-2">
          <button onClick={handleAdd} disabled={isSaving} className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm">
            {isSaving ? <Loader2 className="h-4 w-4 mx-auto animate-spin" /> : "Add"}
          </button>
          <button onClick={() => setIsAdding(false)} className="px-4 py-2 bg-white/5 text-gray-400 rounded-lg text-sm">Cancel</button>
        </div>
      </div>
    );
  }

  return (
    <button onClick={() => setIsAdding(true)} className="bg-white/5 border border-white/5 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center gap-3 hover:bg-white/10">
      <Plus className="h-6 w-6 text-gray-500" />
      <span className="text-gray-500 text-sm">Add Service Sector</span>
    </button>
  );
}

export default function ServicesManagementPage() {
  const { data: categories, isLoading: catLoading, refetch: refetchCategories } = useExpertiseCategories();
  const { data: sectors, isLoading: sectorLoading } = useServiceSectors();
  
  const { createCategory, updateCategory, deleteCategory, reorderCategories } = useExpertiseCategoryMutations();
  const { createSector, updateSector, deleteSector, reorderSectors } = useServiceSectorMutations();

  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [draggedId, setDraggedId] = useState<number | null>(null);
  const [dragOverId, setDragOverId] = useState<number | null>(null);

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
      order: idx + 1
    }));

    await reorderCategories.mutateAsync(reordered);
    setDraggedId(null);
    setDragOverId(null);
  };

  const handleDragEnd = () => {
    setDraggedId(null);
    setDragOverId(null);
  };

  const [sectorDraggedId, setSectorDraggedId] = useState<number | null>(null);
  const [sectorDragOverId, setSectorDragOverId] = useState<number | null>(null);
  const [editingSector, setEditingSector] = useState<any>(null);
  const [isAddingSector, setIsAddingSector] = useState(false);

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
      order: idx + 1
    }));

    await reorderSectors.mutateAsync(reordered);
    setSectorDraggedId(null);
    setSectorDragOverId(null);
  };

  const isLoading = catLoading || sectorLoading;

  return (
    <div className="space-y-12">
      <div>
        <h1 className={`${montserrat.className} text-4xl text-white mb-2`}>
          Our <span className="text-blue-500">Services</span>
        </h1>
        <p className="text-gray-400">Manage expertise categories, items, and service sectors.</p>
      </div>

      {/* Expertise Categories */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white font-bold text-xl flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-blue-500" />
            Expertise Categories
          </h2>
          <button
            onClick={() => setEditingCategory({ title: "", icon_key: "briefcase", theme_color: "blue" } as any)}
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
            <>
              {sortedCategories.map((cat: any) => (
                <ExpertiseCategoryCard
                  key={cat.id}
                  category={cat}
                  onEdit={(cat) => setEditingCategory(cat)}
                  onDelete={async (id) => {
                    await deleteCategory.mutateAsync(id);
                    refetchCategories();
                  }}
                  onDragStart={handleDragStart}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  isDragging={draggedId === cat.id}
                  isDragOver={dragOverId === cat.id}
                />
              ))}
            </>
          )}
        </div>
      </div>

      {/* Service Sectors */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white font-bold text-xl flex items-center gap-2">
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
            <>
              {sortedSectors.map((sector: any) => (
                <div
                  key={sector.id}
                  draggable
                  onDragStart={(e) => handleSectorDragStart(e, sector.id)}
                  onDragOver={(e) => handleSectorDragOver(e, sector.id)}
                  onDrop={(e) => handleSectorDrop(e, sector.id)}
                  onClick={() => setEditingSector(sector)}
                  className={`bg-white/5 border border-white/5 rounded-2xl p-6 cursor-pointer hover:bg-white/10 transition-all ${
                    sectorDragOverId === sector.id ? "border-2 border-blue-500 bg-blue-500/10" : ""
                  } ${sectorDraggedId === sector.id ? "opacity-50" : ""}`}
                >
                  <div className="flex items-start justify-end mb-3">
                    <GripVertical className="h-4 w-4 text-gray-600 cursor-grab" />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">{sector.title}</h3>
                  {sector.description && <p className="text-gray-500 text-sm line-clamp-2">{sector.description}</p>}
                  {sector.image && (
                    <img src={sector.image} alt={sector.title} className="mt-3 w-full h-32 object-cover rounded-lg" />
                  )}
                </div>
              ))}
            </>
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
            } else {
              await createCategory.mutateAsync({ ...data, order: (categories?.length || 0) + 1 });
            }
            refetchCategories();
          }}
          onDelete={editingCategory.id ? async (id) => {
            await deleteCategory.mutateAsync(id);
            refetchCategories();
          } : undefined}
        />
      )}

      {(editingSector || isAddingSector) && (
        <ServiceSectorModal
          sector={editingSector}
          isOpen={!!editingSector || isAddingSector}
          onClose={() => { setEditingSector(null); setIsAddingSector(false); }}
          onSave={async (formData) => {
            if (editingSector) {
              await updateSector.mutateAsync({ id: editingSector.id, data: formData });
            } else {
              const data = new FormData();
              formData.forEach((value, key) => data.append(key, value));
              data.append("order", String((sectors?.length || 0) + 1));
              await createSector.mutateAsync(data);
            }
          }}
          onDelete={editingSector ? async (id) => {
            await deleteSector.mutateAsync(id);
          } : undefined}
        />
      )}
    </div>
  );
}