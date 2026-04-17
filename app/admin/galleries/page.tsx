"use client";

import { useState, useEffect } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  Loader2,
  Image as ImageIcon,
  Layers,
  List,
  GripVertical,
  Check,
  Upload,
  Pencil,
} from "lucide-react";
import { Montserrat } from "next/font/google";
import {
  useGalleryCategories,
  useGallerySubcategories,
  useGalleryImages,
} from "../../../src/hooks/useGalleries";
import {
  useGalleryCategoryMutations,
  useGallerySubcategoryMutations,
  useGalleryImageMutations,
} from "../../../src/hooks/useAdminMutations";
import { useAdminTheme } from "../../../src/hooks/useAdminTheme";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["600", "700"] });

function EditableRow({
  id,
  initialName,
  onSave,
  onDelete,
  isActive,
  onSelect,
  isDragOver = false,
  onDragStart,
  onDragOver,
  onDrop,
  theme,
}: {
  id: number;
  initialName: string;
  onSave: (id: number, name: string) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
  isActive: boolean;
  onSelect: () => void;
  isDragOver?: boolean;
  onDragStart?: () => void;
  onDragOver?: (e: React.DragEvent) => void;
  onDrop?: () => void;
  theme: "light" | "dark";
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(initialName);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (name.trim() === initialName) return setIsEditing(false);
    setIsSaving(true);
    await onSave(id, name.trim());
    setIsSaving(false);
    setIsEditing(false);
  };

  const isDark = theme === "dark";

  return (
    <div
      draggable={!!onDragStart}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
      className="group flex items-center gap-2 p-2 rounded-xl border transition-all cursor-pointer"
      style={{
        backgroundColor: isActive ? "#3b82f6" : isDark ? "rgba(255,255,255,0.03)" : "#ffffff",
        borderColor: isDragOver
          ? "#3b82f6"
          : isActive
            ? "#3b82f6"
            : isDark
              ? "rgba(255,255,255,0.08)"
              : "#e2e8f0",
        color: isActive ? "#ffffff" : isDark ? "#888" : "#64748b",
        borderStyle: isDragOver ? "dashed" : "solid",
      }}
      onClick={() => !isEditing && onSelect()}
    >
      <GripVertical
        className="h-4 w-4 shrink-0 cursor-grab active:cursor-grabbing"
        style={{ color: isActive ? "rgba(255,255,255,0.7)" : isDark ? "#555" : "#94a3b8" }}
      />

      {isEditing ? (
        <input
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSave();
            if (e.key === "Escape") setIsEditing(false);
          }}
          onClick={(e) => e.stopPropagation()}
          className="flex-1 rounded px-2 py-0.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          style={{
            backgroundColor: isDark ? "rgba(0,0,0,0.3)" : "#f1f5f9",
            border: `1px solid ${isDark ? "rgba(255,255,255,0.2)" : "#cbd5e1"}`,
            color: isDark ? "#ffffff" : "#1e293b",
          }}
        />
      ) : (
        <span
          className="flex-1 text-sm font-semibold truncate"
          style={{ color: isActive ? "#ffffff" : isDark ? "#ffffff" : "#1e293b" }}
        >
          {initialName}
        </span>
      )}

      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all shrink-0">
        {isEditing ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleSave();
            }}
            disabled={isSaving}
            className="p-1 rounded transition-all"
            style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
          >
            {isSaving ? (
              <Loader2 className="h-3 w-3 animate-spin" />
            ) : (
              <Check className="h-3 w-3" />
            )}
          </button>
        ) : (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsEditing(true);
            }}
            className="p-1 rounded transition-all"
            style={{ backgroundColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)" }}
          >
            <Pencil
              className="h-3 w-3"
              style={{ color: isActive ? "#ffffff" : isDark ? "#888" : "#64748b" }}
            />
          </button>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            window.confirm("Delete this item?") && onDelete(id);
          }}
          className="p-1 rounded transition-all"
          style={{ backgroundColor: "rgba(239,68,68,0.1)" }}
        >
          <Trash2 className="h-3 w-3" style={{ color: "#ef4444" }} />
        </button>
      </div>
    </div>
  );
}

export default function GalleriesManagementPage() {
  const { theme, colors, mounted } = useAdminTheme();
  const [selectedCatId, setSelectedCatId] = useState<number | null>(null);
  const [selectedSubCatId, setSelectedSubCatId] = useState<number | null>(null);

  const { data: categories, isLoading: catLoading } = useGalleryCategories();
  const {
    data: subcategories,
    isLoading: subLoading,
    refetch: refetchSubcategories,
  } = useGallerySubcategories(selectedCatId || 0);
  const {
    data: images,
    isLoading: imgLoading,
    refetch: refetchImages,
  } = useGalleryImages(selectedCatId || 0, selectedSubCatId || 0);

  const { createCategory, updateCategory, reorderCategories, deleteCategory } =
    useGalleryCategoryMutations();
  const { createSubcategory, updateSubcategory, reorderSubcategories, deleteSubcategory } =
    useGallerySubcategoryMutations();
  const { uploadImage, reorderImages, deleteImage } = useGalleryImageMutations();

  const [newCatName, setNewCatName] = useState("");
  const [newSubCatName, setNewSubCatName] = useState("");
  const [draggedId, setDraggedId] = useState<number | null>(null);
  const [dragOverId, setDragOverId] = useState<number | null>(null);

  const currentCategory = categories?.find((c) => c.id === selectedCatId) || null;

  useEffect(() => {
    if (categories && categories.length > 0 && !selectedCatId) {
      setSelectedCatId(categories[0].id);
    }
  }, [categories, selectedCatId]);

  useEffect(() => {
    if (subcategories && subcategories.length > 0 && !selectedSubCatId) {
      setSelectedSubCatId(subcategories[0].id);
    }
  }, [subcategories, selectedSubCatId]);

  const activeSubcategories = subcategories?.sort((a: any, b: any) => a.order - b.order) || [];
  const activeImages = images?.sort((a: any, b: any) => a.order - b.order) || [];

  const handleAddCategory = async () => {
    if (!newCatName.trim()) return;
    await createCategory.mutateAsync({
      name: newCatName.trim(),
      order: (categories?.length || 0) + 1,
    });
    setNewCatName("");
  };

  const handleAddSubcategory = async () => {
    if (!newSubCatName.trim() || !selectedCatId) return;
    await createSubcategory.mutateAsync({
      categoryId: selectedCatId,
      data: {
        name: newSubCatName.trim(),
        order: (activeSubcategories.length || 0) + 1,
      },
    });
    setNewSubCatName("");
    refetchSubcategories();
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || !selectedCatId || !selectedSubCatId) return;

    for (let i = 0; i < files.length; i++) {
      await uploadImage.mutateAsync({
        categoryId: selectedCatId,
        subcategoryId: selectedSubCatId,
        file: files[i],
        order: activeImages.length + i + 1,
      });
    }
    refetchImages();
  };

  const onDropReorder = async (targetId: number, type: "cat" | "sub" | "img") => {
    if (draggedId === null || draggedId === targetId) return;

    let itemsToUpdate: { id: number; order: number }[] = [];

    if (type === "cat") {
      const list = [...(categories || [])].sort((a, b) => a.order - b.order);
      const fromIdx = list.findIndex((i) => i.id === draggedId);
      const toIdx = list.findIndex((i) => i.id === targetId);
      const [moved] = list.splice(fromIdx, 1);
      list.splice(toIdx, 0, moved);
      itemsToUpdate = list.map((item, index) => ({ id: item.id, order: index + 1 }));
      await reorderCategories.mutateAsync(itemsToUpdate);
    } else if (type === "sub" && selectedCatId) {
      const list = [...activeSubcategories];
      const fromIdx = list.findIndex((i: any) => i.id === draggedId);
      const toIdx = list.findIndex((i: any) => i.id === targetId);
      const [moved] = list.splice(fromIdx, 1);
      list.splice(toIdx, 0, moved);
      itemsToUpdate = list.map((item: any, index: number) => ({ id: item.id, order: index + 1 }));
      await reorderSubcategories.mutateAsync({ categoryId: selectedCatId, items: itemsToUpdate });
    } else if (type === "img" && selectedCatId && selectedSubCatId) {
      const list = [...activeImages];
      const fromIdx = list.findIndex((i: any) => i.id === draggedId);
      const toIdx = list.findIndex((i: any) => i.id === targetId);
      const [moved] = list.splice(fromIdx, 1);
      list.splice(toIdx, 0, moved);
      itemsToUpdate = list.map((item: any, index: number) => ({ id: item.id, order: index + 1 }));
      await reorderImages.mutateAsync({
        categoryId: selectedCatId,
        subcategoryId: selectedSubCatId,
        items: itemsToUpdate,
      });
    }

    setDraggedId(null);
    setDragOverId(null);
  };

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
    <div className="space-y-10 uppercase relative h-[calc(100vh-140px)] flex flex-col">
      <div className="flex items-center justify-between shrink-0">
        <div>
          <h1
            className={`${montserrat.className} text-4xl mb-2`}
            style={{ color: colors.text as string }}
          >
            Media <span className="text-blue-500">Galleries</span>
          </h1>
          <p style={{ color: colors.textSecondary as string }}>
            Manage Categories, Sub-categories, and site imagery.
          </p>
        </div>
      </div>

      <div className="flex-1 flex gap-8 min-h-0">
        {/* LEFT: Categories Sidebar */}
        <div className="w-72 rounded-3xl p-6 flex flex-col min-h-0" style={cardStyle}>
          <div
            className="flex items-center gap-2 mb-6 font-bold tracking-widest text-xs uppercase"
            style={{ color: colors.text as string }}
          >
            <Layers className="h-4 w-4 text-blue-500" />
            Categories
          </div>

          <div className="flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
            {catLoading ? (
              <div className="flex justify-center py-10">
                <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
              </div>
            ) : (
              categories?.map((cat) => (
                <EditableRow
                  key={cat.id}
                  id={cat.id}
                  initialName={cat.name}
                  isActive={selectedCatId === cat.id}
                  onSelect={() => {
                    setSelectedCatId(cat.id);
                    setSelectedSubCatId(null);
                  }}
                  onSave={async (id, name) => {
                    await updateCategory.mutateAsync({ id, data: { name } });
                  }}
                  onDelete={async (id) => {
                    await deleteCategory.mutateAsync(id);
                    setSelectedCatId(null);
                  }}
                  onDragStart={() => setDraggedId(cat.id)}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragOverId(cat.id);
                  }}
                  onDrop={() => onDropReorder(cat.id, "cat")}
                  isDragOver={dragOverId === cat.id}
                  theme={theme}
                />
              ))
            )}
          </div>

          <div
            className="pt-6 mt-6"
            style={{ borderTop: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "#e2e8f0"}` }}
          >
            <div className="flex items-center gap-2">
              <input
                placeholder="New Category..."
                value={newCatName}
                onChange={(e) => setNewCatName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddCategory()}
                className="flex-1 rounded-xl px-3 py-2 text-xs normal-case outline-none focus:ring-1 focus:ring-blue-500"
                style={inputStyle}
              />
              <button
                onClick={handleAddCategory}
                className="p-2 bg-blue-600 hover:bg-blue-500 rounded-xl text-white transition-all shadow-lg shadow-blue-600/10"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* CENTER: Subcategories & Images */}
        <div className="flex-1 flex flex-col min-w-0 rounded-3xl overflow-hidden" style={cardStyle}>
          {/* Subcategories Horizontal Bar */}
          <div
            className="p-6 shrink-0"
            style={{
              borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "#e2e8f0"}`,
              backgroundColor: isDark ? "rgba(255,255,255,0.02)" : "#f8fafc",
            }}
          >
            <div
              className="flex items-center gap-2 mb-4 font-bold tracking-widest text-xs uppercase"
              style={{ color: colors.text as string }}
            >
              <List className="h-4 w-4 text-blue-500" />
              Subcategories in {currentCategory?.name || "..."}
            </div>

            <div className="flex items-center gap-3 overflow-x-auto pb-2 pr-4 custom-scrollbar-h">
              {subLoading ? (
                <div className="py-2">
                  <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
                </div>
              ) : selectedCatId ? (
                activeSubcategories.map((sub: any) => (
                  <div key={sub.id} className="relative shrink-0">
                    <EditableRow
                      id={sub.id}
                      initialName={sub.name}
                      isActive={selectedSubCatId === sub.id}
                      onSelect={() => setSelectedSubCatId(sub.id)}
                      onSave={async (id, name) => {
                        if (selectedCatId) {
                          await updateSubcategory.mutateAsync({
                            categoryId: selectedCatId,
                            id,
                            data: { name },
                          });
                          refetchSubcategories();
                        }
                      }}
                      onDelete={async (id) => {
                        if (selectedCatId) {
                          await deleteSubcategory.mutateAsync({ categoryId: selectedCatId, id });
                          setSelectedSubCatId(null);
                          refetchSubcategories();
                        }
                      }}
                      onDragStart={() => setDraggedId(sub.id)}
                      onDragOver={(e) => {
                        e.preventDefault();
                        setDragOverId(sub.id);
                      }}
                      onDrop={() => onDropReorder(sub.id, "sub")}
                      isDragOver={dragOverId === sub.id}
                      theme={theme}
                    />
                  </div>
                ))
              ) : null}

              {selectedCatId && (
                <div
                  className="flex items-center gap-2 shrink-0"
                  style={{
                    marginLeft: "8px",
                    paddingLeft: "12px",
                    borderLeft: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "#e2e8f0"}`,
                  }}
                >
                  <input
                    placeholder="New Subcategory..."
                    value={newSubCatName}
                    onChange={(e) => setNewSubCatName(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAddSubcategory()}
                    className="w-40 rounded-xl px-3 py-2 text-xs normal-case outline-none focus:ring-1 focus:ring-blue-500"
                    style={inputStyle}
                  />
                  <button
                    onClick={handleAddSubcategory}
                    className="p-2 bg-blue-600 hover:bg-blue-500 rounded-xl text-white transition-all shadow-lg shadow-blue-600/10"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Images Grid Area */}
          <div className="flex-1 overflow-y-auto p-8 pr-6 custom-scrollbar">
            {!selectedSubCatId ? (
              <div
                className="h-full flex flex-col items-center justify-center"
                style={{ color: colors.textMuted as string }}
              >
                <ImageIcon className="h-12 w-12 opacity-20 mb-4" />
                <p className="text-sm font-semibold tracking-widest uppercase">
                  Select a subcategory to view images
                </p>
              </div>
            ) : (
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <h3
                    className="font-bold tracking-widest text-xs uppercase flex items-center gap-2"
                    style={{ color: colors.text as string }}
                  >
                    <ImageIcon className="h-4 w-4 text-blue-500" />
                    Images ({activeImages.length})
                  </h3>
                  <label className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl flex items-center gap-2 font-bold text-xs transition-all cursor-pointer shadow-lg shadow-blue-600/20 active:scale-95">
                    <Upload className="h-4 w-4" />
                    Upload Media
                    <input
                      type="file"
                      multiple
                      className="hidden"
                      onChange={handleFileUpload}
                      accept="image/*"
                    />
                  </label>
                </div>

                {imgLoading ? (
                  <div className="flex justify-center py-20">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                  </div>
                ) : activeImages.length === 0 ? (
                  <div
                    className="py-20 border-dashed rounded-3xl flex flex-col items-center justify-center"
                    style={{
                      borderColor: isDark ? "rgba(255,255,255,0.1)" : "#e2e8f0",
                      backgroundColor: isDark ? "rgba(255,255,255,0.02)" : "#f8fafc",
                    }}
                  >
                    <Upload
                      className="h-8 w-8 opacity-20 mb-4"
                      style={{ color: colors.textMuted as string }}
                    />
                    <p
                      className="text-xs uppercase tracking-widest font-bold"
                      style={{ color: colors.textMuted as string }}
                    >
                      No images in this subcategory
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {activeImages.map((img: any) => (
                      <div
                        key={img.id}
                        draggable
                        onDragStart={() => setDraggedId(img.id)}
                        onDragOver={(e) => {
                          e.preventDefault();
                          setDragOverId(img.id);
                        }}
                        onDrop={() => onDropReorder(img.id, "img")}
                        className="group relative aspect-square rounded-2xl overflow-hidden border transition-all"
                        style={{
                          backgroundColor: isDark ? "#111" : "#f1f5f9",
                          borderColor:
                            dragOverId === img.id
                              ? "#3b82f6"
                              : isDark
                                ? "rgba(255,255,255,0.08)"
                                : "#e2e8f0",
                          transform: dragOverId === img.id ? "scale(0.95)" : "scale(1)",
                          boxShadow:
                            dragOverId === img.id
                              ? "0 25px 50px -12px rgba(59, 130, 246, 0.25)"
                              : "none",
                        }}
                      >
                        <img
                          src={img.image}
                          alt="Gallery"
                          className="w-full h-full object-cover transition-transform group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          <button
                            onClick={async () => {
                              if (selectedCatId && selectedSubCatId) {
                                await deleteImage.mutateAsync({
                                  categoryId: selectedCatId,
                                  subcategoryId: selectedSubCatId,
                                  id: img.id,
                                });
                                refetchImages();
                              }
                            }}
                            className="p-2 bg-red-600 hover:bg-red-500 rounded-xl text-white shadow-xl transition-all active:scale-90"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <div
                          className="absolute top-2 left-2 p-1 rounded-lg text-[10px] font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity"
                          style={{
                            backgroundColor: "rgba(0,0,0,0.5)",
                            backdropFilter: "blur(4px)",
                          }}
                        >
                          #{img.order}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: ${isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"};
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: ${isDark ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)"};
        }

        .custom-scrollbar-h::-webkit-scrollbar {
          height: 4px;
        }
        .custom-scrollbar-h::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar-h::-webkit-scrollbar-thumb {
          background: rgba(37, 99, 235, 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar-h::-webkit-scrollbar-thumb:hover {
          background: rgba(37, 99, 235, 0.4);
        }
      `}</style>
    </div>
  );
}
