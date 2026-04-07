"use client";

import { useState, useRef } from "react";
import {
  Newspaper, Plus, Edit2, Trash2, Calendar, Loader2, X, Save,
  Tag, ChevronRight, Pencil, Check, GripVertical,
} from "lucide-react";
import { Montserrat } from "next/font/google";
import { useNewsItems, useNewsCategories } from "../../../src/hooks/useNews";
import { useNewsMutations, useNewsCategoryMutations } from "../../../src/hooks/useAdminMutations";
import { NewsItem, NewsCategory } from "../../../src/lib/api";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["600", "700"] });

// ─── Category Inline Row ──────────────────────────────────────────────────────
function CategoryRow({
  category,
  onUpdate,
  onDelete,
  isDragOver,
  onDragStart,
  onDragOver,
  onDrop,
}: {
  category: NewsCategory;
  onUpdate: (id: number, name: string) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
  isDragOver: boolean;
  onDragStart: () => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: () => void;
}) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(category.name);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (name.trim() === category.name) { setEditing(false); return; }
    setSaving(true);
    await onUpdate(category.id, name.trim());
    setSaving(false);
    setEditing(false);
  };

  return (
    <div
      draggable
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onDragEnd={(e) => (e.currentTarget.style.opacity = "1")}
      className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border transition-all cursor-default ${
        isDragOver
          ? "border-blue-500/50 bg-blue-500/10 scale-[1.01]"
          : "border-white/5 bg-white/5 hover:bg-white/10"
      }`}
    >
      {/* Drag handle */}
      <GripVertical className="h-4 w-4 text-gray-600 cursor-grab active:cursor-grabbing shrink-0" />

      <Tag className="h-3.5 w-3.5 text-blue-500 shrink-0" />

      {editing ? (
        <input
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") handleSave(); if (e.key === "Escape") setEditing(false); }}
          className="flex-1 bg-white/10 border border-white/20 rounded-lg px-2 py-1 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
        />
      ) : (
        <span className="flex-1 text-white text-sm font-semibold truncate">{category.name}</span>
      )}

      <div className="flex items-center gap-1 shrink-0">
        {editing ? (
          <button
            onClick={handleSave}
            disabled={saving}
            className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-all"
          >
            {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Check className="h-3.5 w-3.5" />}
          </button>
        ) : (
          <button
            onClick={() => setEditing(true)}
            className="p-1.5 rounded-lg bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all"
          >
            <Pencil className="h-3 w-3" />
          </button>
        )}
        <button
          onClick={() => window.confirm(`Delete "${category.name}"?`) && onDelete(category.id)}
          className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all"
        >
          <Trash2 className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function NewsManagementPage() {
  const { data: newsData, isLoading: itemsLoading } = useNewsItems(null, 1, 100);
  const { data: categories, isLoading: catsLoading } = useNewsCategories();
  const { createNews, updateNews, deleteNews } = useNewsMutations();
  const { createCategory, updateCategory, reorderCategories, deleteCategory } = useNewsCategoryMutations();

  // News article modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<NewsItem | null>(null);
  const [formData, setFormData] = useState<Partial<NewsItem>>({});

  // Category management modal
  const [isCatModalOpen, setIsCatModalOpen] = useState(false);

  // New category inline form
  const [newCatName, setNewCatName] = useState("");
  const [addingCat, setAddingCat] = useState(false);

  // Selected category filter for articles list
  const [activeCategory, setActiveCategory] = useState<number | null>(null);

  // Drag-and-drop reorder state
  const [orderedCategories, setOrderedCategories] = useState<NewsCategory[]>([]);
  const [dragOverId, setDragOverId] = useState<number | null>(null);
  const dragItemId = useRef<number | null>(null);
  const [reordering, setReordering] = useState(false);

  // Status Filter: 'all' | 'published' | 'draft'
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');

  // Sync orderedCategories when server data arrives
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
      statusFilter === 'all' || 
      (statusFilter === 'published' ? item.is_published : !item.is_published);
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

  // ── Drag handlers ──
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

    // Optimistic UI update
    setOrderedCategories(newOrder);
    dragItemId.current = null;

    // Persist — single mutation, single cache invalidation
    setReordering(true);
    try {
      await reorderCategories.mutateAsync(
        newOrder.map((cat, idx) => ({ id: cat.id, order: idx + 1 }))
      );
    } finally {
      setReordering(false);
    }
  };

  return (
    <div className="space-y-10 uppercase relative">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`${montserrat.className} text-4xl text-white mb-2`}>
            News & <span className="text-blue-500">Events</span>
          </h1>
          <p className="text-gray-400">
            Manage categories and publish news articles and events.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsCatModalOpen(true)}
            className="border border-white/10 hover:bg-white/5 text-gray-300 hover:text-white px-5 py-2.5 rounded-xl flex items-center gap-2 font-semibold transition-all active:scale-95"
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
        {/* ── LEFT/CENTER: Articles List ── */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2">
            <p className="text-gray-500 text-xs font-bold tracking-widest">
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
            <div className="flex flex-col items-center justify-center py-32 bg-white/5 border border-dashed border-white/10 rounded-3xl">
              <Newspaper className="h-10 w-10 text-blue-500/30 mb-4" />
              <p className="text-gray-500 text-sm">No articles yet matching filters.</p>
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
                  className="bg-white/5 border border-white/5 rounded-2xl p-6 flex items-center gap-6 group hover:bg-white/10 transition-all"
                >
                  {/* Thumbnail */}
                  <div className="w-20 h-20 bg-blue-600/10 rounded-xl flex items-center justify-center shrink-0 overflow-hidden">
                    {item.image ? (
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    ) : (
                      <Newspaper className="h-7 w-7 text-blue-500/40" />
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 space-y-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      {item.news_category_id && (
                        <span className="text-[10px] font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                          {categories?.find((c) => c.id === item.news_category_id)?.name || "Uncategorized"}
                        </span>
                      )}
                      <span className="text-[10px] text-gray-600 flex items-center gap-1">
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
                    <h3 className="text-sm font-bold text-white leading-tight line-clamp-1 group-hover:text-blue-400 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-gray-600 line-clamp-1 normal-case">
                      {item.summary}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all shrink-0">
                    <button
                      onClick={() => openEditModal(item)}
                      className="p-2.5 bg-white/5 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-all border border-transparent hover:border-white/10"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-2.5 bg-red-500/10 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/20 transition-all border border-transparent hover:border-red-500/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── RIGHT: Filters Panel ── */}
        <div className="space-y-8 sticky top-6">
          {/* Status Filter */}
          <div className="bg-white/5 border border-white/5 rounded-3xl p-6 space-y-4">
            <h2 className={`${montserrat.className} text-lg text-white flex items-center gap-2 pb-4 border-b border-white/5`}>
              <Check className="h-4 w-4 text-blue-500" />
              Status
            </h2>
            <div className="space-y-2">
              {[
                { id: 'all', label: 'All Status', icon: ChevronRight },
                { id: 'published', label: 'Published', icon: Check },
                { id: 'draft', label: 'Drafts', icon: Pencil },
              ].map((status) => (
                <button
                  key={status.id}
                  onClick={() => setStatusFilter(status.id as any)}
                  className={`w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    statusFilter === status.id
                      ? "bg-blue-600 text-white"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <status.icon className="h-3.5 w-3.5" />
                  {status.label}
                  <span className="ml-auto text-[10px] bg-white/10 px-2 py-0.5 rounded-full">
                    {status.id === 'all' 
                      ? newsItems.length 
                      : newsItems.filter(n => status.id === 'published' ? n.is_published : !n.is_published).length}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Categories Panel */}
          <div className="bg-white/5 border border-white/5 rounded-3xl p-6 space-y-4">
            <h2 className={`${montserrat.className} text-lg text-white flex items-center gap-2 pb-4 border-b border-white/5`}>
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
                  className={`w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    activeCategory === null
                      ? "bg-blue-600 text-white"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <ChevronRight className="h-3.5 w-3.5" />
                  All Categories
                  <span className="ml-auto text-[10px] bg-white/10 px-2 py-0.5 rounded-full">
                    {newsItems.length}
                  </span>
                </button>

                {categories?.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
                    className={`w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                      activeCategory === cat.id
                        ? "bg-blue-600/20 text-blue-400 border border-blue-500/30"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <Tag className="h-3.5 w-3.5 shrink-0" />
                    <span className="truncate">{cat.name}</span>
                    <span className="ml-auto text-[10px] bg-white/10 px-2 py-0.5 rounded-full shrink-0">
                      {newsItems.filter((n) => n.news_category_id === cat.id).length}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Article Modal ── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-[#0a0a0a] border border-white/10 w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl relative max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="p-8 border-b border-white/5 flex items-center justify-between shrink-0">
              <h2 className={`${montserrat.className} text-2xl text-white`}>
                {editingItem ? "Edit" : "New"} <span className="text-blue-500">Article</span>
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-white transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6 overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Title */}
                <div className="space-y-2 col-span-2">
                  <label className="text-[10px] font-bold text-gray-500 tracking-widest uppercase ml-1">
                    Article Title
                  </label>
                  <input
                    required
                    value={formData.title || ""}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                    placeholder="Headline goes here..."
                  />
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 tracking-widest uppercase ml-1">
                    Category
                  </label>
                  <select
                    value={formData.news_category_id}
                    onChange={(e) => setFormData({ ...formData, news_category_id: parseInt(e.target.value) })}
                    className="w-full bg-[#0f0f0f] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                  >
                    {categories?.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 tracking-widest uppercase ml-1">
                    Publication Date
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.news_date || ""}
                    onChange={(e) => setFormData({ ...formData, news_date: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                  />
                </div>

                {/* Summary */}
                <div className="space-y-2 col-span-2">
                  <label className="text-[10px] font-bold text-gray-500 tracking-widest uppercase ml-1">
                    Short Summary
                  </label>
                  <textarea
                    value={formData.summary || ""}
                    onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                    rows={2}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all resize-none normal-case"
                    placeholder="Brief overview for the card view..."
                  />
                </div>

                {/* Content */}
                <div className="space-y-2 col-span-2">
                  <label className="text-[10px] font-bold text-gray-500 tracking-widest uppercase ml-1">
                    Content (HTML)
                  </label>
                  <textarea
                    value={formData.content_html || ""}
                    onChange={(e) => setFormData({ ...formData, content_html: e.target.value })}
                    rows={10}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all resize-none font-mono text-sm normal-case"
                    placeholder="<p>Detailed article content...</p>"
                  />
                  <p className="text-[10px] text-gray-600 ml-1 italic normal-case">
                    Basic HTML tags are supported.
                  </p>
                </div>

                {/* Publish toggle */}
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
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600" />
                    <span className="ml-3 text-sm font-semibold text-gray-300 normal-case">
                      Publish immediately to live site
                    </span>
                  </label>
                </div>
              </div>

              {/* Footer buttons */}
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
                  className="px-8 border border-white/10 hover:bg-white/5 text-gray-400 hover:text-white font-bold rounded-2xl transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Category Management Modal ── */}
      {isCatModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-[#0a0a0a] border border-white/10 w-full max-w-xl rounded-3xl overflow-hidden shadow-2xl relative flex flex-col max-h-[80vh]">
            {/* Modal Header */}
            <div className="p-8 border-b border-white/5 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <Tag className="h-6 w-6 text-blue-500" />
                <h2 className={`${montserrat.className} text-2xl text-white`}>
                  Manage <span className="text-blue-500">Categories</span>
                </h2>
              </div>
              <button
                onClick={() => setIsCatModalOpen(false)}
                className="text-gray-500 hover:text-white transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="p-8 space-y-6 overflow-y-auto">
              <div className="space-y-4">
                <div className="flex items-center justify-between px-1">
                  <p className="text-[10px] text-gray-500 font-bold tracking-widest uppercase">
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
                    />
                  ))}
                </div>
              </div>

              {/* Add New Category */}
              <div className="pt-6 border-t border-white/5">
                <p className="text-[10px] text-gray-500 font-bold tracking-widest uppercase mb-4 ml-1">
                  Add New Category
                </p>
                <div className="flex items-center gap-3">
                  <input
                    value={newCatName}
                    onChange={(e) => setNewCatName(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAddCategory()}
                    placeholder="e.g. Project Updates"
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-gray-600 normal-case"
                  />
                  <button
                    onClick={handleAddCategory}
                    disabled={!newCatName.trim() || addingCat}
                    className="bg-blue-600 hover:bg-blue-500 disabled:bg-blue-900 text-white p-3 rounded-xl transition-all active:scale-95 shadow-lg shadow-blue-600/20"
                  >
                    {addingCat ? <Loader2 className="h-5 w-5 animate-spin" /> : <Plus className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="p-8 border-t border-white/5 flex gap-4 shrink-0">
              <button
                onClick={() => setIsCatModalOpen(false)}
                className="flex-1 bg-white/5 hover:bg-white/10 text-white font-bold py-3 rounded-2xl transition-all"
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
