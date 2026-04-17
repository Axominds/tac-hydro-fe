"use client";

import { useState, useEffect } from "react";
import { Briefcase, Plus, Edit2, Trash2, Loader2, GripVertical, X } from "lucide-react";
import { useExpertiseItems } from "../../../src/hooks/useExpertiseCategories";
import { useProjectScopes } from "../../../src/hooks/useProjectScopes";
import { useExpertiseItemMutations } from "../../../src/hooks/useAdminMutations";
import { useAdminTheme } from "../../../src/hooks/useAdminTheme";

const colorStylesMap: Record<string, { bg: string; text: string }> = {
  blue: { bg: "bg-blue-600/10", text: "text-blue-500" },
  emerald: { bg: "bg-emerald-600/10", text: "text-emerald-500" },
  amber: { bg: "bg-amber-600/10", text: "text-amber-500" },
  purple: { bg: "bg-purple-600/10", text: "text-purple-500" },
};

interface CategoryData {
  id?: number;
  title: string;
  icon_key: string;
  theme_color: string;
}

interface ExpertiseCategoryModalProps {
  category?: CategoryData;
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<CategoryData>) => Promise<void>;
  onDelete?: (id: number) => Promise<void>;
}

export function ExpertiseCategoryModal({
  category,
  isOpen,
  onClose,
  onSave,
  onDelete,
}: ExpertiseCategoryModalProps) {
  const { theme, colors, mounted } = useAdminTheme();
  const [title, setTitle] = useState(category?.title || "");
  const [iconKey, setIconKey] = useState(category?.icon_key || "briefcase");
  const [themeColor, setThemeColor] = useState(category?.theme_color || "blue");
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [newItemTitle, setNewItemTitle] = useState("");
  const [newItemScopeId, setNewItemScopeId] = useState<number | "">("");
  const [editingItemId, setEditingItemId] = useState<number | null>(null);
  const [editingItemTitle, setEditingItemTitle] = useState("");
  const [editingItemScopeId, setEditingItemScopeId] = useState<number | "">("");
  const [draggedItemId, setDraggedItemId] = useState<number | null>(null);
  const [dragOverItemId, setDragOverItemId] = useState<number | null>(null);

  const { data: items, refetch: refetchItems } = useExpertiseItems(
    isOpen && category?.id ? category.id : undefined,
  );
  const { data: projectScopes } = useProjectScopes();
  const { createItem, updateItem, deleteItem, reorderItems } = useExpertiseItemMutations();

  const categoryItems = items || [];
  const isEditing = !!category?.id;

  useEffect(() => {
    if (isOpen) {
      setTitle(category?.title || "");
      setIconKey(category?.icon_key || "briefcase");
      setThemeColor(category?.theme_color || "blue");
      setEditingItemId(null);
      setNewItemTitle("");
      setNewItemScopeId("");
    }
  }, [isOpen, category]);

  if (!isOpen || !mounted) return null;

  const isDark = theme === "dark";

  const handleSave = async () => {
    if (!title.trim()) return;
    setIsSaving(true);
    await onSave({ title: title.trim(), icon_key: iconKey, theme_color: themeColor });
    setIsSaving(false);
  };

  const handleDelete = async () => {
    if (!category?.id || !onDelete) return;
    if (window.confirm("Delete this category and all its items?")) {
      setIsDeleting(true);
      await onDelete(category.id);
      setIsDeleting(false);
      onClose();
    }
  };

  const handleAddItem = async () => {
    if (!newItemTitle.trim() || !category?.id) return;
    await createItem.mutateAsync({
      categoryId: category.id,
      data: {
        title: newItemTitle.trim(),
        project_scope_id: newItemScopeId || null,
        order: categoryItems.length + 1,
      },
    });
    setNewItemTitle("");
    setNewItemScopeId("");
    refetchItems();
  };

  const handleUpdateItem = async (itemId: number) => {
    if (!editingItemTitle.trim()) return;
    await updateItem.mutateAsync({
      categoryId: category!.id,
      id: itemId,
      data: { title: editingItemTitle.trim(), project_scope_id: editingItemScopeId || null },
    });
    setEditingItemId(null);
    setEditingItemTitle("");
    setEditingItemScopeId("");
    refetchItems();
  };

  const handleDeleteItem = async (itemId: number) => {
    if (window.confirm("Delete this item?")) {
      await deleteItem.mutateAsync({ categoryId: category!.id, id: itemId });
      refetchItems();
    }
  };

  const handleDragStart = (e: React.DragEvent, itemId: number) => {
    setDraggedItemId(itemId);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent, itemId: number) => {
    e.preventDefault();
    if (draggedItemId !== itemId) {
      setDragOverItemId(itemId);
    }
  };

  const handleDrop = async (e: React.DragEvent, targetItemId: number) => {
    e.preventDefault();
    if (!draggedItemId || draggedItemId === targetItemId) {
      setDraggedItemId(null);
      setDragOverItemId(null);
      return;
    }

    const sortedItems = [...categoryItems].sort((a, b) => a.order - b.order);
    const fromIdx = sortedItems.findIndex((i) => i.id === draggedItemId);
    const toIdx = sortedItems.findIndex((i) => i.id === targetItemId);

    const [movedItem] = sortedItems.splice(fromIdx, 1);
    sortedItems.splice(toIdx, 0, movedItem);

    const reorderedItems = sortedItems.map((item, idx) => ({
      id: item.id,
      order: idx + 1,
    }));

    await reorderItems.mutateAsync({ categoryId: category!.id, items: reorderedItems });
    setDraggedItemId(null);
    setDragOverItemId(null);
    refetchItems();
  };

  const handleDragEnd = () => {
    setDraggedItemId(null);
    setDragOverItemId(null);
  };

  const inputStyle = {
    backgroundColor: isDark ? "rgba(0,0,0,0.3)" : "#f1f5f9",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: isDark ? "rgba(255,255,255,0.15)" : "#cbd5e1",
    color: isDark ? "#ffffff" : "#1e293b",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div
        className="relative w-full max-w-2xl max-h-[90vh] rounded-2xl overflow-hidden flex flex-col"
        style={{
          backgroundColor: isDark ? "#0a0a0a" : "#ffffff",
          border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "#e2e8f0"}`,
        }}
      >
        <div
          className="p-6 flex items-center justify-between"
          style={{ borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "#e2e8f0"}` }}
        >
          <h2 className="text-xl font-bold" style={{ color: colors.text as string }}>
            {isEditing ? "Edit Category" : "Add Category"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg transition-all"
            style={{ backgroundColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)" }}
          >
            <X className="h-5 w-5" style={{ color: colors.textMuted as string }} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-1" style={{ color: colors.textMuted as string }}>
                Title
              </label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                style={inputStyle}
              />
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm mb-1" style={{ color: colors.textMuted as string }}>
                  Icon
                </label>
                <select
                  value={iconKey}
                  onChange={(e) => setIconKey(e.target.value)}
                  className="w-full rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  style={inputStyle}
                >
                  <option value="briefcase">Briefcase</option>
                  <option value="settings">Settings</option>
                  <option value="users">Users</option>
                  <option value="lightbulb">Lightbulb</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-sm mb-1" style={{ color: colors.textMuted as string }}>
                  Color
                </label>
                <select
                  value={themeColor}
                  onChange={(e) => setThemeColor(e.target.value)}
                  className="w-full rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  style={inputStyle}
                >
                  <option value="blue">Blue</option>
                  <option value="emerald">Emerald</option>
                  <option value="amber">Amber</option>
                  <option value="purple">Purple</option>
                </select>
              </div>
            </div>
          </div>

          {isEditing && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold" style={{ color: colors.text as string }}>
                  Items
                </h3>
                <span className="text-xs" style={{ color: colors.textMuted as string }}>
                  {categoryItems.length} items
                </span>
              </div>

              <div className="space-y-2">
                {categoryItems.length === 0 ? (
                  <div
                    className="text-sm text-center py-4"
                    style={{ color: colors.textMuted as string }}
                  >
                    No items yet
                  </div>
                ) : (
                  categoryItems
                    .sort((a: any, b: any) => a.order - b.order)
                    .map((item: any) => (
                      <div
                        key={item.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, item.id)}
                        onDragOver={(e) => handleDragOver(e, item.id)}
                        onDrop={(e) => handleDrop(e, item.id)}
                        onDragEnd={handleDragEnd}
                        className="flex items-center gap-2 rounded-lg p-2 transition-all"
                        style={{
                          backgroundColor: isDark ? "rgba(255,255,255,0.03)" : "#ffffff",
                          borderWidth: "1px",
                          borderStyle: "solid",
                          borderColor:
                            dragOverItemId === item.id
                              ? "#3b82f6"
                              : isDark
                                ? "rgba(255,255,255,0.08)"
                                : "#e2e8f0",
                          opacity: draggedItemId === item.id ? 0.5 : 1,
                        }}
                      >
                        <GripVertical
                          className="h-4 w-4 cursor-grab shrink-0"
                          style={{ color: isDark ? "#555" : "#94a3b8" }}
                        />
                        {editingItemId === item.id ? (
                          <>
                            <input
                              value={editingItemTitle}
                              onChange={(e) => setEditingItemTitle(e.target.value)}
                              onKeyDown={(e) => e.key === "Enter" && handleUpdateItem(item.id)}
                              className="flex-1 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                              style={inputStyle}
                              autoFocus
                            />
                            <select
                              value={editingItemScopeId === null ? "" : editingItemScopeId}
                              onChange={(e) => {
                                const newScopeId =
                                  e.target.value === "" ? null : Number(e.target.value);
                                setEditingItemScopeId(newScopeId);
                              }}
                              className="rounded px-2 py-1 text-xs max-w-[120px] focus:outline-none focus:ring-1 focus:ring-blue-500"
                              style={inputStyle}
                            >
                              <option value="">No Scope</option>
                              {projectScopes?.map((scope) => (
                                <option key={scope.id} value={scope.id}>
                                  {scope.name}
                                </option>
                              ))}
                            </select>
                            <button
                              onClick={() => handleUpdateItem(item.id)}
                              className="p-1 rounded transition-all"
                              style={{ backgroundColor: "rgba(34,197,94,0.1)" }}
                            >
                              <Edit2 className="h-3 w-3 text-green-500" />
                            </button>
                            <button
                              onClick={() => {
                                setEditingItemId(null);
                                setEditingItemTitle("");
                                setEditingItemScopeId("");
                              }}
                              className="p-1 rounded transition-all"
                              style={{
                                backgroundColor: isDark
                                  ? "rgba(255,255,255,0.05)"
                                  : "rgba(0,0,0,0.05)",
                              }}
                            >
                              <X
                                className="h-3 w-3"
                                style={{ color: colors.textMuted as string }}
                              />
                            </button>
                          </>
                        ) : (
                          <>
                            <span
                              className="text-xs font-mono w-6"
                              style={{ color: colors.textMuted as string }}
                            >
                              {item.order}
                            </span>
                            <span
                              className="flex-1 text-sm"
                              style={{ color: colors.text as string }}
                            >
                              {item.title}
                            </span>
                            {item.project_scope_id && (
                              <span className="text-xs text-blue-400 bg-blue-400/10 px-2 py-0.5 rounded">
                                {projectScopes?.find((s) => s.id === item.project_scope_id)?.name ||
                                  `Scope #${item.project_scope_id}`}
                              </span>
                            )}
                            <button
                              onClick={() => {
                                setEditingItemId(item.id);
                                setEditingItemTitle(item.title);
                                setEditingItemScopeId(item.project_scope_id || "");
                              }}
                              className="p-1 rounded transition-all"
                              style={{
                                backgroundColor: isDark
                                  ? "rgba(255,255,255,0.05)"
                                  : "rgba(0,0,0,0.05)",
                              }}
                            >
                              <Edit2
                                className="h-3 w-3"
                                style={{ color: colors.textMuted as string }}
                              />
                            </button>
                            <button
                              onClick={() => handleDeleteItem(item.id)}
                              className="p-1 rounded transition-all"
                              style={{ backgroundColor: "rgba(239,68,68,0.1)" }}
                            >
                              <Trash2 className="h-3 w-3 text-red-500" />
                            </button>
                          </>
                        )}
                      </div>
                    ))
                )}

                <div className="flex items-center gap-2">
                  <input
                    value={newItemTitle}
                    onChange={(e) => setNewItemTitle(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAddItem()}
                    placeholder="Add new item..."
                    className="flex-1 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    style={inputStyle}
                  />
                  <select
                    value={newItemScopeId}
                    onChange={(e) =>
                      setNewItemScopeId(e.target.value === "" ? "" : Number(e.target.value))
                    }
                    className="rounded-lg px-2 py-2 text-xs max-w-[100px] focus:outline-none focus:ring-1 focus:ring-blue-500"
                    style={inputStyle}
                  >
                    <option value="">Scope</option>
                    {projectScopes?.map((scope) => (
                      <option key={scope.id} value={scope.id}>
                        {scope.name}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={handleAddItem}
                    disabled={!newItemTitle.trim()}
                    className="p-2 bg-blue-600 hover:bg-blue-500 rounded-lg disabled:opacity-50"
                  >
                    <Plus className="h-4 w-4 text-white" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div
          className="p-6 flex items-center justify-between"
          style={{ borderTop: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "#e2e8f0"}` }}
        >
          {isEditing && onDelete && (
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="px-4 py-2 rounded-lg text-sm flex items-center gap-2"
              style={{ backgroundColor: "rgba(239,68,68,0.1)", color: "#ef4444" }}
            >
              {isDeleting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Trash2 className="h-4 w-4" />
              )}
              Delete
            </button>
          )}
          {!isEditing && <div />}
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-sm"
              style={{
                backgroundColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
                color: colors.textSecondary as string,
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm flex items-center gap-2"
            >
              {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
