"use client";

import { useState, useRef, useEffect } from "react";
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
  FileText,
  AlertCircle,
} from "lucide-react";
import { Montserrat } from "next/font/google";
import { useQueryClient } from "@tanstack/react-query";
import { useNewsItems, useNewsCategories, useNewsCounts } from "../../../src/hooks/useNews";
import { useModalContext } from "../layout";
import { useNewsMutations, useNewsCategoryMutations } from "../../../src/hooks/useAdminMutations";
import { NewsItem, NewsCategory, apiFetch, NewsDetail } from "../../../src/lib/api";
import { useAdminTheme } from "../../../src/hooks/useAdminTheme";
import { QuillEditor } from "../../../src/components/admin/QuillEditor";
import { NewsAttachmentManager } from "../../../src/components/admin/NewsAttachmentManager";
import { ConfirmDialog } from "../../../src/components/ui/confirm-dialog";
import { Toast, useToast } from "../../../src/components/ui/toast";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["600", "700"] });

function CategoryRow({
  category,
  onUpdate,
  onDeleteClick,
  isDragOver,
  onDragStart,
  onDragOver,
  onDrop,
  theme,
}: {
  category: NewsCategory;
  onUpdate: (id: number, name: string) => Promise<void>;
  onDeleteClick: (id: number) => void;
  isDragOver: boolean;
  onDragStart: () => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: () => void;
  theme: "light" | "dark";
}) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(category.name);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!editing) {
      setName(category.name);
    }
  }, [category.name, editing]);

  const handleSave = async () => {
    if (name.trim() === category.name) {
      setEditing(false);
      return;
    }
    setSaving(true);
    await onUpdate(category.id, name.trim());
    category.name = name.trim();
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
            <Edit2 className="h-4 w-4" />
          </button>
        )}
        <button
          onClick={() => onDeleteClick(category.id)}
          className="p-1.5 rounded-lg transition-all"
          style={{ backgroundColor: "rgba(239,68,68,0.1)", color: "#ef4444" }}
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export default function NewsManagementPage() {
  const queryClient = useQueryClient();
  const { theme, colors, mounted } = useAdminTheme();
  const { data: categories, isLoading: catsLoading } = useNewsCategories();
  const { createNews, updateNews, deleteNews } = useNewsMutations();
  const { createCategory, updateCategory, reorderCategories, deleteCategory } =
    useNewsCategoryMutations();
  const { setIsModalOpen: setContextModalOpen } = useModalContext();
  const { toast, showToast, hideToast } = useToast();

  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [isModalOpen, setIsModalOpenLocal] = useState(false);
  const setIsModalOpen = (open: boolean) => {
    setIsModalOpenLocal(open);
    setContextModalOpen(open);
  };
  const [editingItem, setEditingItem] = useState<NewsItem | null>(null);
  const [formData, setFormData] = useState<Partial<NewsItem>>({});
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [createdNewsId, setCreatedNewsId] = useState<number | null>(null);
  const [pendingAttachments, setPendingAttachments] = useState<{ file: File; title: string }[]>([]);
  const pendingAttachmentsRef = useRef(pendingAttachments);
  pendingAttachmentsRef.current = pendingAttachments;
  const [attachmentTitle, setAttachmentTitle] = useState("");
  const attachmentFileRef = useRef<HTMLInputElement>(null);

  const titleFromFilename = (name: string): string => {
    return name
      .replace(/\.[^.]+$/, "")
      .replace(/[-_]+/g, " ")
      .replace(/\s+/g, " ")
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join(" ")
      .trim();
  };

  const [isCatModalOpen, setIsCatModalOpenLocal] = useState(false);
  const setIsCatModalOpen = (open: boolean) => {
    setIsCatModalOpenLocal(open);
    setContextModalOpen(open);
  };
  const isFormValid = formData && formData.title?.trim() && formData.content_html?.trim();
  const activeNewsId = editingItem?.id ?? createdNewsId;

  const [newCatName, setNewCatName] = useState("");
  const [addingCat, setAddingCat] = useState(false);

  const [orderedCategories, setOrderedCategories] = useState<NewsCategory[]>([]);
  const [dragOverId, setDragOverId] = useState<number | null>(null);
  const dragItemId = useRef<number | null>(null);
  const [reordering, setReordering] = useState(false);
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft">("all");
  const [categoryFilter, setCategoryFilter] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleteType, setDeleteType] = useState<"article" | "category" | null>(null);

  const statusFilterValue = statusFilter === "all" ? null : statusFilter === "published";

  const { data: newsData, isLoading: itemsLoading } = useNewsItems(
    categoryFilter,
    currentPage,
    4,
    statusFilterValue,
  );
  const { data: counts } = useNewsCounts();

  const totalPages = newsData?.count ? Math.ceil(newsData.count / 4) : 1;

  const syncedRef = useRef(false);
  if (categories && (!syncedRef.current || orderedCategories.length !== categories.length)) {
    const sorted = [...categories].sort((a, b) => a.order - b.order);
    setOrderedCategories(sorted);
    syncedRef.current = true;
  }

  const newsItems = newsData?.results || [];

  const openCreateModal = () => {
    setEditingItem(null);
    setCreatedNewsId(null);
    setFormData({
      title: "",
      news_date: new Date().toISOString().split("T")[0],
      news_category_id: categories?.[0]?.id,
      summary: "",
      content_html: "",
      is_published: false,
      published_at: null,
    });
    setSelectedImage(null);
    setPendingAttachments([]);
    setAttachmentTitle("");
    setIsModalOpen(true);
  };

  const openEditModal = async (item: NewsItem) => {
    setEditingItem(item);
    setCreatedNewsId(null);
    setFormData({});
    setSelectedImage(null);
    setIsModalOpen(true);
    setIsLoadingDetail(true);
    const detail = await apiFetch<NewsDetail>(`/api/home/news/${item.id}/`);
    setFormData(detail);
    setIsLoadingDetail(false);
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.title?.trim()) {
      errors.title = "News title is required.";
    } else if (formData.title.length > 255) {
      errors.title = "News title cannot exceed 255 characters.";
    }
    if (!formData.news_date) {
      errors.news_date = "News date is required.";
    }
    if (!formData.content_html?.trim()) {
      errors.content_html = "Content is required.";
    }
    return errors;
  };

  const fieldError = (field: string) => {
    const error = validationErrors[field];
    if (!error) return null;
    return (
      <p className="text-xs text-red-500 mt-1 px-1 flex items-center gap-1">
        <AlertCircle className="h-3 w-3 shrink-0" />
        {error}
      </p>
    );
  };

  const addPendingAttachment = () => {
    const file = attachmentFileRef.current?.files?.[0];
    if (!file || !attachmentTitle.trim()) return;
    setPendingAttachments((prev) => [...prev, { file, title: attachmentTitle.trim() }]);
    setAttachmentTitle("");
    if (attachmentFileRef.current) attachmentFileRef.current.value = "";
  };

  const removePendingAttachment = (index: number) => {
    setPendingAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors = validateForm();
    setValidationErrors(errors);
    if (Object.keys(errors).length > 0) return;

    const cleanedContent = (formData.content_html || "").replace(/&nbsp;/g, " ");
    const cleanedFormData = { ...formData, content_html: cleanedContent };

    let newsId = editingItem?.id;

    try {
      if (editingItem) {
        if (selectedImage) {
          const formDataToSend = new FormData();
          formDataToSend.append("title", cleanedFormData.title || "");
          formDataToSend.append("news_category_id", String(cleanedFormData.news_category_id || ""));
          formDataToSend.append("news_date", cleanedFormData.news_date || "");
          formDataToSend.append("summary", cleanedFormData.summary || "");
          formDataToSend.append("content_html", cleanedFormData.content_html || "");
          formDataToSend.append("is_published", String(cleanedFormData.is_published || false));
          formDataToSend.append("image", selectedImage);
          const res = await apiFetch<NewsItem>(`/api/home/news/${editingItem.id}/`, {
            method: "PATCH",
            body: formDataToSend,
          });
          newsId = res.id;
          queryClient.invalidateQueries({ queryKey: ["news-counts"] });
          showToast("News saved successfully", "success");
        } else {
          const changedData: Partial<NewsItem> = {};
          Object.keys(cleanedFormData).forEach((k) => {
            const key = k as keyof NewsItem;
            if (cleanedFormData[key] !== editingItem[key]) {
              changedData[key] = cleanedFormData[key];
            }
          });
          if (Object.keys(changedData).length > 0) {
            const res = await updateNews.mutateAsync({ id: editingItem.id, data: changedData });
            newsId = res.id;
            queryClient.invalidateQueries({ queryKey: ["news-counts"] });
          }
          showToast("News saved successfully", "success");
        }
      } else {
        if (selectedImage) {
          const formDataToSend = new FormData();
          formDataToSend.append("title", cleanedFormData.title || "");
          formDataToSend.append("news_category_id", String(cleanedFormData.news_category_id || ""));
          formDataToSend.append("news_date", cleanedFormData.news_date || "");
          formDataToSend.append("summary", cleanedFormData.summary || "");
          formDataToSend.append("content_html", cleanedFormData.content_html || "");
          formDataToSend.append("is_published", String(cleanedFormData.is_published || false));
          formDataToSend.append("image", selectedImage);
          const res = await apiFetch<NewsItem>("/api/home/news/", {
            method: "POST",
            body: formDataToSend,
          });
          newsId = res.id;
        } else {
          const res = await createNews.mutateAsync(cleanedFormData);
          newsId = res.id;
        }
        let flushFailed = false;
        if (newsId && pendingAttachmentsRef.current.length > 0) {
          const results = await Promise.allSettled(
            pendingAttachmentsRef.current.map(async (att) => {
              const attachFormData = new FormData();
              attachFormData.append("file", att.file);
              attachFormData.append("title", att.title);
              attachFormData.append("news_id", String(newsId));
              return apiFetch("/api/home/news-attachments/", {
                method: "POST",
                body: attachFormData,
              });
            })
          );
          flushFailed = results.some((r) => r.status === "rejected");
        }
        queryClient.invalidateQueries({ queryKey: ["news"] });
        queryClient.invalidateQueries({ queryKey: ["news-counts"] });
        showToast(flushFailed ? "Failed to upload some attachments" : "News added successfully", flushFailed ? "error" : "success");
        closeModal();
      }
      if (newsId) setCreatedNewsId(newsId);
    } catch (error: any) {
      if (error?.body) {
        const serverErrors: Record<string, string> = {};
        for (const [key, messages] of Object.entries(error.body)) {
          serverErrors[key] = Array.isArray(messages) ? messages[0] : String(messages);
        }
        setValidationErrors((prev) => ({ ...prev, ...serverErrors }));
      } else {
        showToast("Failed to save news.", "error");
      }
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    setCreatedNewsId(null);
    setFormData({});
    setSelectedImage(null);
    setPendingAttachments([]);
    setAttachmentTitle("");
  };

  const handleDelete = (id: number) => {
    setDeleteId(id);
    setDeleteType("article");
    setDeleteConfirmOpen(true);
  };

  const handleDeleteCategory = (id: number) => {
    setDeleteId(id);
    setDeleteType("category");
    setDeleteConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (deleteType === "article" && deleteId) {
      await deleteNews.mutateAsync(deleteId);
      queryClient.invalidateQueries({ queryKey: ["news-counts"] });
      showToast("News deleted successfully", "success");
    } else if (deleteType === "category" && deleteId) {
      const categoryCount = counts?.by_category?.[deleteId] ?? 0;
      if (categoryCount > 0) {
        showToast("Category is in use, cannot be deleted!", "error");
        setDeleteId(null);
        setDeleteType(null);
        return;
      }
      await deleteCategory.mutateAsync(deleteId);
      setOrderedCategories((prev) => prev.filter((c) => c.id !== deleteId));
      showToast("Category deleted successfully", "success");
    }
    setDeleteId(null);
    setDeleteType(null);
  };

  const handleAddCategory = async () => {
    if (!newCatName.trim()) return;
    setAddingCat(true);
    await createCategory.mutateAsync({ name: newCatName.trim() });
    queryClient.invalidateQueries({ queryKey: ["news-categories"] });
    setNewCatName("");
    setAddingCat(false);
  };

  const handleUpdateCategory = async (id: number, name: string) => {
    await updateCategory.mutateAsync({ id, data: { name } });
    setOrderedCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, name } : c))
    );
    queryClient.invalidateQueries({ queryKey: ["news-categories"] });
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
    <div className="space-y-15 relative">
      <div className="flex items-center justify-between">
        <div>
          <h1
            className={`${montserrat.className} text-4xl font-bold mb-2`}
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
            Add
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
              {newsItems.length} Article{newsItems.length !== 1 ? "s" : ""}
              {categoryFilter && categories && (
                <span className="ml-2 text-blue-500">
                  in {categories.find((c) => c.id === categoryFilter)?.name}
                </span>
              )}
            </p>
          </div>

          {itemsLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
            </div>
          ) : newsItems.length === 0 ? (
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
            <>
              <div className="grid grid-cols-1 gap-4">
                {newsItems.map((item: NewsItem) => (
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

              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-8">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg transition-all"
                    style={{
                      backgroundColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
                      color: colors.textSecondary as string,
                      opacity: currentPage === 1 ? 0.3 : 1,
                    }}
                  >
                    <ChevronRight className="h-4 w-4 rotate-180" />
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-semibold transition-all"
                      style={
                        currentPage === page
                          ? { backgroundColor: "#3b82f6", color: "#ffffff" }
                          : {
                              color: colors.textSecondary as string,
                              backgroundColor: isDark
                                ? "rgba(255,255,255,0.05)"
                                : "rgba(0,0,0,0.05)",
                            }
                      }
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg transition-all"
                    style={{
                      backgroundColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
                      color: colors.textSecondary as string,
                      opacity: currentPage === totalPages ? 0.3 : 1,
                    }}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              )}
            </>
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
                { id: "draft", label: "Drafts", icon: FileText },
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
                      ? counts?.all
                      : status.id === "published"
                        ? counts?.published
                        : counts?.drafts}
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
              <div className="space-y-2 overflow-y-auto" style={{ maxHeight: "calc(100vh - 320px)" }}>
                <button
                  onClick={() => setCategoryFilter(null)}
                  className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all"
                  style={
                    categoryFilter === null
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
                    {counts?.all}
                  </span>
                </button>

                {categories?.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setCategoryFilter(categoryFilter === cat.id ? null : cat.id)}
                    className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all"
                    style={
                      categoryFilter === cat.id
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
                      {counts?.by_category?.[cat.id] ?? 0}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 overflow-hidden">
          <div
            className="absolute inset-0 z-0 bg-black/60 backdrop-blur-sm w-screen h-screen"
            onClick={() => closeModal()}
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
                {editingItem ? "Edit" : "New"}{" "}
                <span className="text-blue-500">News and Events</span>
              </h2>
              <button onClick={() => closeModal()} style={{ color: colors.textMuted as string }}>
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6 overflow-y-auto">
              {isLoadingDetail ? (
                <div className="flex items-center justify-center py-20">
                  <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2 col-span-2">
                      <label
                        className="text-[10px] font-bold tracking-widest uppercase ml-1"
                        style={{ color: colors.textMuted as string }}
                      >
                        News Title <span className="text-red-500">*</span>
                      </label>
                      <input
                        required
                        value={formData.title || ""}
                        onChange={(e) => {
                          setFormData({ ...formData, title: e.target.value });
                          setValidationErrors((prev) => ({ ...prev, title: "" }));
                        }}
                        className="w-full rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                        style={inputStyle}
                        placeholder="Headline goes here..."
                      />
                      {fieldError("title")}
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
                        News Date <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.news_date || ""}
                        onChange={(e) => {
                          setFormData({ ...formData, news_date: e.target.value });
                          setValidationErrors((prev) => ({ ...prev, news_date: "" }));
                        }}
                        className="w-full rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                        style={inputStyle}
                      />
                      {fieldError("news_date")}
                    </div>

                    <div className="space-y-2">
                      <label
                        className="text-[10px] font-bold tracking-widest uppercase ml-1"
                        style={{ color: colors.textMuted as string }}
                      >
                        Featured Image
                      </label>
                      <div className="flex flex-col gap-3">
                        {(selectedImage || formData.image) && (
                          <div
                            className="h-48 w-full rounded-xl overflow-hidden"
                            style={{
                              backgroundColor:
                                theme === "dark" ? "rgba(255,255,255,0.05)" : "#f1f5f9",
                              border: `1px solid ${theme === "dark" ? "rgba(255,255,255,0.08)" : "#e2e8f0"}`,
                            }}
                          >
                            <img
                              src={
                                selectedImage
                                  ? URL.createObjectURL(selectedImage)
                                  : formData.image || ""
                              }
                              alt="News"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) =>
                            e.target.files?.[0] && setSelectedImage(e.target.files[0])
                          }
                          className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-500/10 file:text-blue-500 hover:file:bg-blue-500/20 transition-all cursor-pointer rounded-lg"
                          style={inputStyle}
                        />
                      </div>
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
                        Content <span className="text-red-500">*</span>
                      </label>
                      <QuillEditor
                        key={editingItem?.id}
                        value={formData.content_html || ""}
                        onChange={(value) => {
                          setFormData({ ...formData, content_html: value });
                          setValidationErrors((prev) => ({ ...prev, content_html: "" }));
                        }}
                        isDark={isDark}
                        placeholder="Enter article content..."
                      />
                      {fieldError("content_html")}
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
                          Publish to live site
                        </span>
                      </label>
                    </div>
                  </div>

                  {editingItem && activeNewsId && (
                    <>
                      <div
                        className="border-t pt-6"
                        style={{
                          borderColor: isDark
                            ? "rgba(255,255,255,0.08)"
                            : "#e2e8f0",
                        }}
                      >
                        <NewsAttachmentManager newsId={activeNewsId} />
                      </div>
                    </>
                  )}

                  {!editingItem && (
                    <div
                      className="border-t pt-6"
                      style={{
                        borderColor: isDark
                          ? "rgba(255,255,255,0.08)"
                          : "#e2e8f0",
                      }}
                    >
                      <div className="space-y-3">
                        <label
                          className="text-[10px] font-bold tracking-widest uppercase ml-1"
                          style={{ color: colors.textMuted as string }}
                        >
                          Attachments ({pendingAttachments.length})
                        </label>

                        {pendingAttachments.length > 0 && (
                          <div className="space-y-2">
                            {pendingAttachments.map((att, index) => (
                              <div
                                key={index}
                                className="flex items-center gap-3 rounded-xl px-4 py-3"
                                style={{
                                  backgroundColor: isDark ? "rgba(255,255,255,0.03)" : "#f8fafc",
                                  border: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "#e2e8f0"}`,
                                }}
                              >
                                <FileText className="h-5 w-5 shrink-0 text-blue-500" />
                                <span
                                  className="flex-1 text-sm truncate"
                                  style={{ color: colors.text as string }}
                                >
                                  {att.title}
                                </span>
                                <span className="text-xs shrink-0" style={{ color: colors.textMuted as string }}>
                                  {att.file.name}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => removePendingAttachment(index)}
                                  className="p-1.5 rounded-lg transition-all shrink-0"
                                  style={{
                                    backgroundColor: "rgba(239,68,68,0.1)",
                                    color: "#ef4444",
                                  }}
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}

                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <input
                              ref={attachmentFileRef}
                              type="file"
                              className="flex-1 text-sm file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-500/10 file:text-blue-500 hover:file:bg-blue-500/20 transition-all cursor-pointer"
                              style={{ color: colors.text as string }}
                            />
                            <input
                              value={attachmentTitle}
                              onChange={(e) => setAttachmentTitle(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  e.preventDefault();
                                  addPendingAttachment();
                                }
                              }}
                              placeholder="Title"
                              className="flex-1 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                              style={inputStyle}
                            />
                          </div>
                          <button
                            type="button"
                            onClick={addPendingAttachment}
                            disabled={!attachmentTitle.trim() || !attachmentFileRef.current?.files?.[0]}
                            className="bg-blue-600 hover:bg-blue-500 disabled:bg-gray-400 text-white font-bold py-2 px-6 rounded-lg transition-all active:scale-95 disabled:cursor-not-allowed w-full"
                          >
                            Add Attachment
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="pt-4 flex gap-4 shrink-0 justify-end">
                    <button
                      type="button"
                      onClick={() => closeModal()}
                      className="px-8 font-bold rounded-2xl transition-all"
                      style={{
                        border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "#e2e8f0"}`,
                        color: colors.textSecondary as string,
                        backgroundColor: "transparent",
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={!isFormValid}
                      className="bg-blue-600 hover:bg-blue-500 disabled:bg-gray-400 text-white font-bold py-4 px-8 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-xl shadow-blue-600/10 active:scale-95 disabled:cursor-not-allowed disabled:text-gray-600"
                    >
                      <Save className="h-5 w-5" />
                      Save
                    </button>
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
      )}

      {isCatModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 overflow-hidden">
          <div
            className="absolute inset-0 z-0 bg-black/60 backdrop-blur-sm w-screen h-screen"
            onClick={() => setIsCatModalOpen(false)}
          />
          <div
            className="relative z-10 w-full max-w-xl rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[80vh]"
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

            <div className="p-8 space-y-6">
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

                <div className="space-y-2 overflow-y-auto" style={{ maxHeight: "200px" }}>
                  {orderedCategories.map((cat) => (
                    <CategoryRow
                      key={cat.id}
                      category={cat}
                      onUpdate={handleUpdateCategory}
                      onDeleteClick={handleDeleteCategory}
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
          </div>
        </div>
      )}
      <ConfirmDialog
        open={deleteConfirmOpen}
        onOpenChange={setDeleteConfirmOpen}
        onConfirm={confirmDelete}
        title="Confirm Delete"
        description={
          deleteType === "category"
            ? "Are you sure you want to delete this category? All articles in this category will be uncategorized."
            : "Are you sure you want to delete this article permanently?"
        }
        confirmText="Yes"
        cancelText="No"
      />
      {toast && <Toast message={toast.message} type={toast.type} onClose={hideToast} />}
    </div>
  );
}
