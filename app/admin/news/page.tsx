"use client";

import { useState, useRef } from "react";
import {
  Newspaper,
  Plus,
  Edit2,
  Trash2,
  Calendar,
  Loader2,
  X,
  Save,
  Tag,
  ChevronRight,
  Pencil,
  Check,
  GripVertical,
} from "lucide-react";
import { Montserrat } from "next/font/google";
import { useNewsItems, useNewsCategories } from "../../../src/hooks/useNews";
import { useNewsMutations, useNewsCategoryMutations } from "../../../src/hooks/useAdminMutations";
import { NewsItem, NewsCategory } from "../../../src/lib/api";
import { useAdminTheme } from "../../../src/hooks/useAdminTheme";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["600", "700"] });

function CategoryRow({
  category,
  onUpdate,
  onDelete,
  isDragOver,
  onDragStart,
  onDragOver,
  onDrop,
  theme,
}: {
  category: NewsCategory;
  onUpdate: (id: number, name: string) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
  isDragOver: boolean;
  onDragStart: () => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: () => void;
  theme: "light" | "dark";
}) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(category.name);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (name.trim() === category.name) {
      setEditing(false);
      return;
    }
    setSaving(true);
    await onUpdate(category.id, name.trim());
    setSaving(false);
    setEditing(false);
  };

  const isDark = theme === "dark";

  return (
    <div
      draggable
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onDragEnd={(e) => (e.currentTarget.style.opacity = "1")}
      className="flex items-center gap-2 px-3 py-2.5 rounded-xl border transition-all cursor-default"
      style={{
        borderColor: isDragOver ? "#3b82f6" : isDark ? "rgba(255,255,255,0.08)" : "#e2e8f0",
        backgroundColor: isDragOver
          ? "rgba(59,130,246,0.1)"
          : isDark
            ? "rgba(255,255,255,0.03)"
            : "#ffffff",
        transform: isDragOver ? "scale(1.01)" : "scale(1)",
      }}
    >
      <GripVertical
        className="h-4 w-4 cursor-grab active:cursor-grabbing shrink-0"
        style={{ color: isDark ? "#555" : "#94a3b8" }}
      />

      <Tag className="h-3.5 w-3.5 text-blue-500 shrink-0" />

      {editing ? (
        <input
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSave();
            if (e.key === "Escape") setEditing(false);
          }}
          className="flex-1 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
          style={{
            backgroundColor: isDark ? "rgba(0,0,0,0.3)" : "#f1f5f9",
            border: `1px solid ${isDark ? "rgba(255,255,255,0.2)" : "#cbd5e1"}`,
            color: isDark ? "#ffffff" : "#1e293b",
          }}
        />
      ) : (
        <span
          className="flex-1 text-sm font-semibold truncate"
          style={{ color: isDark ? "#ffffff" : "#1e293b" }}
        >
          {category.name}
        </span>
      )}

      <div className="flex items-center gap-1 shrink-0">
        {editing ? (
          <button
            onClick={handleSave}
            disabled={saving}
            className="p-1.5 rounded-lg transition-all"
            style={{ backgroundColor: "rgba(59,130,246,0.1)", color: "#60a5fa" }}
          >
            {saving ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Check className="h-3.5 w-3.5" />
            )}
          </button>
        ) : (
          <button
            onClick={() => setEditing(true)}
            className="p-1.5 rounded-lg transition-all"
            style={{
              backgroundColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
              color: isDark ? "#888" : "#64748b",
            }}
          >
            <Pencil className="h-3 w-3" />
          </button>
        )}
        <button
          onClick={() => window.confirm(`Delete "${category.name}"?`) && onDelete(category.id)}
          className="p-1.5 rounded-lg transition-all"
          style={{ backgroundColor: "rgba(239,68,68,0.1)", color: "#ef4444" }}
        >
          <Trash2 className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}

export default function NewsManagementPage() {
  const { theme, colors, mounted } = useAdminTheme();
  const { data: newsData, isLoading: itemsLoading } = useNewsItems(null, 1, 100);
  const { data: categories, isLoading: catsLoading } = useNewsCategories();
  const { createNews, updateNews, deleteNews } = useNewsMutations();
  const { createCategory, updateCategory, reorderCategories, deleteCategory } =
    useNewsCategoryMutations();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<NewsItem | null>(null);
  const [formData, setFormData] = useState<Partial<NewsItem>>({});

  const [isCatModalOpen, setIsCatModalOpen] = useState(false);
  const [newCatName, setNewCatName] = useState("");
  const [addingCat, setAddingCat] = useState(false);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);

  const [orderedCategories, setOrderedCategories] = useState<NewsCategory[]>([]);
  const [dragOverId, setDragOverId] = useState<number | null>(null);
  const dragItemId = useRef<number | null>(null);
  const [reordering, setReordering] = useState(false);
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft">("all");

  const syncedRef = useRef(false);
  if (categories && (!syncedRef.current || orderedCategories.length !== categories.length)) {
    const sorted = [...categories].sort((a, b) => a.order - b.order);
    setOrderedCategories(sorted);
    syncedRef.current = true;
  }

  const newsItems = newsData?.results || [];
  const filteredItems = newsItems.filter((item) => {
    const categoryMatch = !activeCategory || item.news_category_id === activeCategory;
    const statusMatch =
      statusFilter === "all" ||
      (statusFilter === "published" ? item.is_published : !item.is_published);
    return categoryMatch && statusMatch;
  });

  const openCreateModal = () => {
    setEditingItem(null);
    setFormData({
      title: "",
      news_date: new Date().toISOString().split("T")[0],
      news_category_id: categories?.[0]?.id,
      summary: "",
      content_html: "",
      is_published: false,
      published_at: null,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (item: NewsItem) => {
    setEditingItem(item);
    setFormData({ ...item });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      const changedData: Partial<NewsItem> = {};
      Object.keys(formData).forEach((k) => {
        const key = k as keyof NewsItem;
        if (formData[key] !== editingItem[key]) {
          // @ts-ignore
          changedData[key] = formData[key];
        }
      });
      if (Object.keys(changedData).length > 0) {
        await updateNews.mutateAsync({ id: editingItem.id, data: changedData });
      }
    } else {
      await createNews.mutateAsync(formData);
    }
    setIsModalOpen(false);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Delete this article permanently?")) {
      await deleteNews.mutateAsync(id);
    }
  };

  const handleAddCategory = async () => {
    if (!newCatName.trim()) return;
    setAddingCat(true);
    await createCategory.mutateAsync({ name: newCatName.trim() });
    setNewCatName("");
    setAddingCat(false);
  };

  const handleUpdateCategory = async (id: number, name: string) => {
    await updateCategory.mutateAsync({ id, data: { name } });
  };

  const handleDeleteCategory = async (id: number) => {
    await deleteCategory.mutateAsync(id);
    setOrderedCategories((prev) => prev.filter((c) => c.id !== id));
  };

  const handleDragStart = (id: number) => {
    dragItemId.current = id;
  };

  const handleDragOver = (e: React.DragEvent, id: number) => {
    e.preventDefault();
    setDragOverId(id);
  };

  const handleDrop = async (targetId: number) => {
    setDragOverId(null);
    const sourceId = dragItemId.current;
    if (!sourceId || sourceId === targetId) return;

    const newOrder = [...orderedCategories];
    const fromIdx = newOrder.findIndex((c) => c.id === sourceId);
    const toIdx = newOrder.findIndex((c) => c.id === targetId);
    const [moved] = newOrder.splice(fromIdx, 1);
    newOrder.splice(toIdx, 0, moved);

    setOrderedCategories(newOrder);
    dragItemId.current = null;

    setReordering(true);
    try {
      await reorderCategories.mutateAsync(
        newOrder.map((cat, idx) => ({ id: cat.id, order: idx + 1 })),
      );
    } finally {
      setReordering(false);
    }
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
    <div className="space-y-10 uppercase relative">
      <div className="flex items-center justify-between">
        <div>
          <h1
            className={`${montserrat.className} text-4xl mb-2`}
            style={{ color: colors.text as string }}
          >
            News & <span className="text-blue-500">Events</span>
          </h1>
          <p style={{ color: colors.textSecondary as string }}>
            Manage categories and publish news articles and events.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsCatModalOpen(true)}
            className="px-5 py-2.5 rounded-xl flex items-center gap-2 font-semibold transition-all active:scale-95"
            style={{
              border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "#e2e8f0"}`,
              backgroundColor: isDark ? "rgba(255,255,255,0.05)" : "transparent",
              color: isDark ? "#888" : "#64748b",
            }}
          >
            <Tag className="h-4 w-4 text-blue-500" />
            Manage Categories
          </button>
          <button
            onClick={openCreateModal}
            className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 font-semibold transition-all shadow-lg shadow-blue-600/20 active:scale-95"
          >
            <Plus className="h-5 w-5" />
            Add Article
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 items-start pb-40">
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2">
            <p
              className="text-xs font-bold tracking-widest"
              style={{ color: colors.textMuted as string }}
            >
              {filteredItems.length} Article{filteredItems.length !== 1 ? "s" : ""}
              {activeCategory && categories && (
                <span className="ml-2 text-blue-500">
                  in {categories.find((c) => c.id === activeCategory)?.name}
                </span>
              )}
            </p>
          </div>

          {itemsLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
            </div>
          ) : filteredItems.length === 0 ? (
            <div
              className="flex flex-col items-center justify-center py-32 border-dashed rounded-3xl"
              style={cardStyle}
            >
              <Newspaper className="h-10 w-10 text-blue-500/30 mb-4" />
              <p className="text-sm" style={{ color: colors.textMuted as string }}>
                No articles yet matching filters.
              </p>
              <button
                onClick={openCreateModal}
                className="mt-4 text-blue-500 hover:text-blue-400 text-xs font-bold flex items-center gap-1 transition-colors"
              >
                <Plus className="h-3.5 w-3.5" /> Add the first article
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {filteredItems.map((item: NewsItem) => (
                <div
                  key={item.id}
                  className="rounded-2xl p-6 flex items-center gap-6 group transition-all"
                  style={{
                    ...cardStyle,
                    backgroundColor: isDark ? "rgba(255,255,255,0.03)" : "#ffffff",
                  }}
                >
                  <div className="w-20 h-20 bg-blue-600/10 rounded-xl flex items-center justify-center shrink-0 overflow-hidden">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Newspaper className="h-7 w-7 text-blue-500/40" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0 space-y-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      {item.news_category_id && (
                        <span className="text-[10px] font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                          {categories?.find((c) => c.id === item.news_category_id)?.name ||
                            "Uncategorized"}
                        </span>
                      )}
                      <span
                        className="text-[10px] flex items-center gap-1"
                        style={{ color: colors.textMuted as string }}
                      >
                        <Calendar className="h-3 w-3" />
                        {new Date(item.news_date).toLocaleDateString()}
                      </span>
                      {item.is_published ? (
                        <span className="text-[10px] font-bold text-green-500 bg-green-500/10 px-2 py-0.5 rounded border border-green-500/20">
                          Published
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold text-yellow-500/60 bg-yellow-500/5 px-2 py-0.5 rounded border border-yellow-500/10">
                          Draft
                        </span>
                      )}
                    </div>
                    <h3
                      className="text-sm font-bold leading-tight line-clamp-1 group-hover:text-blue-400 transition-colors"
                      style={{ color: colors.text as string }}
                    >
                      {item.title}
                    </h3>
                    <p
                      className="text-xs line-clamp-1 normal-case"
                      style={{ color: colors.textMuted as string }}
                    >
                      {item.summary}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all shrink-0">
                    <button
                      onClick={() => openEditModal(item)}
                      className="p-2.5 rounded-xl transition-all"
                      style={{
                        backgroundColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
                        color: isDark ? "#888" : "#64748b",
                      }}
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-2.5 rounded-xl transition-all"
                      style={{ backgroundColor: "rgba(239,68,68,0.1)", color: "#ef4444" }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-8 sticky top-6">
          <div className="rounded-3xl p-6 space-y-4" style={cardStyle}>
            <h2
              className={`${montserrat.className} text-lg flex items-center gap-2 pb-4`}
              style={{
                color: colors.text as string,
                borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "#e2e8f0"}`,
              }}
            >
              <Check className="h-4 w-4 text-blue-500" />
              Status
            </h2>
            <div className="space-y-2">
              {[
                { id: "all", label: "All Status", icon: ChevronRight },
                { id: "published", label: "Published", icon: Check },
                { id: "draft", label: "Drafts", icon: Pencil },
              ].map((status) => (
                <button
                  key={status.id}
                  onClick={() => setStatusFilter(status.id as any)}
                  className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all"
                  style={
                    statusFilter === status.id
                      ? { backgroundColor: "#3b82f6", color: "#ffffff" }
                      : {
                          color: colors.textSecondary as string,
                          backgroundColor: isDark ? "rgba(255,255,255,0.05)" : "transparent",
                        }
                  }
                >
                  <status.icon className="h-3.5 w-3.5" />
                  {status.label}
                  <span
                    className="ml-auto text-[10px] px-2 py-0.5 rounded-full"
                    style={{
                      backgroundColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
                    }}
                  >
                    {status.id === "all"
                      ? newsItems.length
                      : newsItems.filter((n) =>
                          status.id === "published" ? n.is_published : !n.is_published,
                        ).length}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-3xl p-6 space-y-4" style={cardStyle}>
            <h2
              className={`${montserrat.className} text-lg flex items-center gap-2 pb-4`}
              style={{
                color: colors.text as string,
                borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "#e2e8f0"}`,
              }}
            >
              <Tag className="h-4 w-4 text-blue-500" />
              Categories
            </h2>

            {catsLoading ? (
              <div className="flex justify-center py-6">
                <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />
              </div>
            ) : (
              <div className="space-y-2">
                <button
                  onClick={() => setActiveCategory(null)}
                  className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all"
                  style={
                    activeCategory === null
                      ? { backgroundColor: "#3b82f6", color: "#ffffff" }
                      : {
                          color: colors.textSecondary as string,
                          backgroundColor: isDark ? "rgba(255,255,255,0.05)" : "transparent",
                        }
                  }
                >
                  <ChevronRight className="h-3.5 w-3.5" />
                  All Categories
                  <span
                    className="ml-auto text-[10px] px-2 py-0.5 rounded-full"
                    style={{
                      backgroundColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
                    }}
                  >
                    {newsItems.length}
                  </span>
                </button>

                {categories?.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
                    className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all"
                    style={
                      activeCategory === cat.id
                        ? {
                            backgroundColor: "rgba(59,130,246,0.2)",
                            color: "#60a5fa",
                            border: "1px solid rgba(59,130,246,0.3)",
                          }
                        : {
                            color: colors.textSecondary as string,
                            backgroundColor: isDark ? "rgba(255,255,255,0.05)" : "transparent",
                          }
                    }
                  >
                    <Tag className="h-3.5 w-3.5 shrink-0" />
                    <span className="truncate">{cat.name}</span>
                    <span
                      className="ml-auto text-[10px] px-2 py-0.5 rounded-full shrink-0"
                      style={{
                        backgroundColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
                      }}
                    >
                      {newsItems.filter((n) => n.news_category_id === cat.id).length}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div
            className="w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl relative max-h-[90vh] flex flex-col"
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
                {editingItem ? "Edit" : "New"} <span className="text-blue-500">Article</span>
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                style={{ color: colors.textMuted as string }}
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6 overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 col-span-2">
                  <label
                    className="text-[10px] font-bold tracking-widest uppercase ml-1"
                    style={{ color: colors.textMuted as string }}
                  >
                    Article Title
                  </label>
                  <input
                    required
                    value={formData.title || ""}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                    style={inputStyle}
                    placeholder="Headline goes here..."
                  />
                </div>

                <div className="space-y-2">
                  <label
                    className="text-[10px] font-bold tracking-widest uppercase ml-1"
                    style={{ color: colors.textMuted as string }}
                  >
                    Category
                  </label>
                  <select
                    value={formData.news_category_id}
                    onChange={(e) =>
                      setFormData({ ...formData, news_category_id: parseInt(e.target.value) })
                    }
                    className="w-full rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                    style={inputStyle}
                  >
                    {categories?.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label
                    className="text-[10px] font-bold tracking-widest uppercase ml-1"
                    style={{ color: colors.textMuted as string }}
                  >
                    Publication Date
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.news_date || ""}
                    onChange={(e) => setFormData({ ...formData, news_date: e.target.value })}
                    className="w-full rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                    style={inputStyle}
                  />
                </div>

                <div className="space-y-2 col-span-2">
                  <label
                    className="text-[10px] font-bold tracking-widest uppercase ml-1"
                    style={{ color: colors.textMuted as string }}
                  >
                    Short Summary
                  </label>
                  <textarea
                    value={formData.summary || ""}
                    onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                    rows={2}
                    className="w-full rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all resize-none normal-case"
                    style={inputStyle}
                    placeholder="Brief overview for the card view..."
                  />
                </div>

                <div className="space-y-2 col-span-2">
                  <label
                    className="text-[10px] font-bold tracking-widest uppercase ml-1"
                    style={{ color: colors.textMuted as string }}
                  >
                    Content (HTML)
                  </label>
                  <textarea
                    value={formData.content_html || ""}
                    onChange={(e) => setFormData({ ...formData, content_html: e.target.value })}
                    rows={10}
                    className="w-full rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all resize-none font-mono text-sm normal-case"
                    style={inputStyle}
                    placeholder="<p>Detailed article content...</p>"
                  />
                  <p
                    className="text-[10px] ml-1 italic normal-case"
                    style={{ color: colors.textMuted as string }}
                  >
                    Basic HTML tags are supported.
                  </p>
                </div>

                <div className="flex items-center gap-3 col-span-2">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={!!formData.is_published}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          is_published: e.target.checked,
                          published_at: e.target.checked ? new Date().toISOString() : null,
                        })
                      }
                      className="sr-only peer"
                    />
                    <div
                      className="w-11 h-6 rounded-full peer peer-focus:outline-none peer-focus:ring-4 transition-all"
                      style={{ backgroundColor: formData.is_published ? "#3b82f6" : "#374151" }}
                    />
                    <span
                      className="ml-3 text-sm font-semibold normal-case"
                      style={{ color: colors.textSecondary as string }}
                    >
                      Publish immediately to live site
                    </span>
                  </label>
                </div>
              </div>

              <div className="pt-4 flex gap-4 shrink-0">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-xl shadow-blue-600/10 active:scale-95"
                >
                  <Save className="h-5 w-5" />
                  {editingItem ? "Update Article" : "Publish Article"}
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

      {isCatModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div
            className="w-full max-w-xl rounded-3xl overflow-hidden shadow-2xl relative flex flex-col max-h-[80vh]"
            style={{
              backgroundColor: isDark ? "#0a0a0a" : "#ffffff",
              border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "#e2e8f0"}`,
            }}
          >
            <div
              className="p-8 flex items-center justify-between shrink-0"
              style={{ borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "#e2e8f0"}` }}
            >
              <div className="flex items-center gap-3">
                <Tag className="h-6 w-6 text-blue-500" />
                <h2
                  className={`${montserrat.className} text-2xl`}
                  style={{ color: colors.text as string }}
                >
                  Manage <span className="text-blue-500">Categories</span>
                </h2>
              </div>
              <button
                onClick={() => setIsCatModalOpen(false)}
                style={{ color: colors.textMuted as string }}
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="p-8 space-y-6 overflow-y-auto">
              <div className="space-y-4">
                <div className="flex items-center justify-between px-1">
                  <p
                    className="text-[10px] font-bold tracking-widest uppercase"
                    style={{ color: colors.textMuted as string }}
                  >
                    Drag to Reorder
                  </p>
                  {reordering && <Loader2 className="h-3.5 w-3.5 text-blue-500 animate-spin" />}
                </div>

                <div className="space-y-2">
                  {orderedCategories.map((cat) => (
                    <CategoryRow
                      key={cat.id}
                      category={cat}
                      onUpdate={handleUpdateCategory}
                      onDelete={handleDeleteCategory}
                      isDragOver={dragOverId === cat.id}
                      onDragStart={() => handleDragStart(cat.id)}
                      onDragOver={(e) => handleDragOver(e, cat.id)}
                      onDrop={() => handleDrop(cat.id)}
                      theme={theme}
                    />
                  ))}
                </div>
              </div>

              <div
                className="pt-6"
                style={{ borderTop: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "#e2e8f0"}` }}
              >
                <p
                  className="text-[10px] font-bold tracking-widest uppercase mb-4 ml-1"
                  style={{ color: colors.textMuted as string }}
                >
                  Add New Category
                </p>
                <div className="flex items-center gap-3">
                  <input
                    value={newCatName}
                    onChange={(e) => setNewCatName(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAddCategory()}
                    placeholder="e.g. Project Updates"
                    className="flex-1 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-gray-400 normal-case"
                    style={inputStyle}
                  />
                  <button
                    onClick={handleAddCategory}
                    disabled={!newCatName.trim() || addingCat}
                    className="bg-blue-600 hover:bg-blue-500 disabled:bg-blue-900 text-white p-3 rounded-xl transition-all active:scale-95 shadow-lg shadow-blue-600/20"
                  >
                    {addingCat ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <Plus className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div
              className="p-8 flex gap-4 shrink-0"
              style={{ borderTop: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "#e2e8f0"}` }}
            >
              <button
                onClick={() => setIsCatModalOpen(false)}
                className="flex-1 font-bold py-3 rounded-2xl transition-all"
                style={{
                  backgroundColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
                  color: colors.text as string,
                }}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
