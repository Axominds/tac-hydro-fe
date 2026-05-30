"use client";

import { useState, useEffect, useRef } from "react";
import {
  Loader2,
  Trash2,
  FileText,
  Check,
  Edit2,
  Upload,
} from "lucide-react";
import { Attachment, apiFetch } from "../../lib/api";
import { useAdminTheme } from "../../hooks/useAdminTheme";
import { useToast } from "../ui/toast";
import { ConfirmDialog } from "../ui/confirm-dialog";

interface NewsAttachmentManagerProps {
  newsId: number;
}

export function NewsAttachmentManager({ newsId }: NewsAttachmentManagerProps) {
  const { theme, colors } = useAdminTheme();
  const { showToast } = useToast();
  const isDark = theme === "dark";

  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [newFile, setNewFile] = useState<File | null>(null);
  const [newTitle, setNewTitle] = useState("");
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const showToastRef = useRef(showToast);
  showToastRef.current = showToast;

  useEffect(() => {
    if (!newsId) return;
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        const res = await apiFetch<Attachment[] | { results?: Attachment[] }>(
          `/api/home/news-attachments/?news_id=${newsId}`
        );
        const data = Array.isArray(res) ? res : (res.results ?? []);
        if (!cancelled) setAttachments(data);
      } catch {
        if (!cancelled) showToastRef.current("Failed to load attachments", "error");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [newsId]);

  const handleAdd = async () => {
    if (!newFile || !newTitle.trim()) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("news_id", String(newsId));
      formData.append("file", newFile);
      formData.append("title", newTitle.trim());
      const created = await apiFetch<Attachment>("/api/home/news-attachments/", {
        method: "POST",
        body: formData,
      });
      setAttachments((prev) => [...prev, created]);
      setNewFile(null);
      setNewTitle("");
      if (fileInputRef.current) fileInputRef.current.value = "";
      showToast("Attachment added", "success");
    } catch {
      showToast("Failed to add attachment", "error");
    } finally {
      setUploading(false);
    }
  };

  const confirmDelete = async () => {
    if (deleteConfirmId === null) return;
    try {
      await apiFetch(`/api/home/news-attachments/${deleteConfirmId}/`, { method: "DELETE" });
      setAttachments((prev) => prev.filter((a) => a.id !== deleteConfirmId));
      showToast("Attachment deleted", "success");
    } catch {
      showToast("Failed to delete attachment", "error");
    } finally {
      setDeleteConfirmId(null);
    }
  };

  const handleSaveTitle = async (id: number) => {
    try {
      await apiFetch(`/api/home/news-attachments/${id}/`, {
        method: "PATCH",
        body: { title: editTitle },
      });
      setAttachments((prev) =>
        prev.map((a) => (a.id === id ? { ...a, title: editTitle } : a))
      );
      setEditingId(null);
      showToast("Title updated", "success");
    } catch {
      showToast("Failed to update title", "error");
    }
  };

  const inputStyle = {
    backgroundColor: isDark ? "rgba(255,255,255,0.05)" : "#f8fafc",
    border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "#e2e8f0"}`,
    color: colors.text as string,
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-6 w-6 text-blue-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div
        className="text-[10px] font-bold tracking-widest uppercase ml-1"
        style={{ color: colors.textMuted as string }}
      >
        Attachments ({attachments.length})
      </div>

      {attachments.length > 0 && (
        <div className="space-y-2">
          {attachments.map((att) => (
            <div
              key={att.id}
              className="flex items-center gap-3 rounded-xl px-4 py-3"
              style={{
                backgroundColor: isDark ? "rgba(255,255,255,0.03)" : "#f8fafc",
                border: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "#e2e8f0"}`,
              }}
            >
              <FileText className="h-5 w-5 shrink-0 text-blue-500" />
              {editingId === att.id ? (
                <input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="flex-1 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  style={inputStyle}
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSaveTitle(att.id);
                    if (e.key === "Escape") setEditingId(null);
                  }}
                />
              ) : (
                <span
                  className="flex-1 text-sm truncate"
                  style={{ color: colors.text as string }}
                >
                  {att.title || att.file.split("/").pop()}
                </span>
              )}
              {editingId === att.id ? (
                <button
                  type="button"
                  onClick={() => handleSaveTitle(att.id)}
                  className="p-1.5 rounded-lg transition-all shrink-0"
                  style={{
                    backgroundColor: "rgba(59,130,246,0.1)",
                    color: "#60a5fa",
                  }}
                >
                  <Check className="h-3.5 w-3.5" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(att.id);
                    setEditTitle(att.title);
                  }}
                  className="p-1.5 rounded-lg transition-all shrink-0"
                  style={{
                    backgroundColor: isDark
                      ? "rgba(255,255,255,0.05)"
                      : "rgba(0,0,0,0.05)",
                    color: isDark ? "#888" : "#64748b",
                  }}
                >
                  <Edit2 className="h-3.5 w-3.5" />
                </button>
              )}
              <button
                type="button"
                onClick={() => setDeleteConfirmId(att.id)}
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

      <div
        className="flex items-center gap-3 rounded-xl px-4 py-3"
        style={{
          border: `1px dashed ${isDark ? "rgba(255,255,255,0.15)" : "#cbd5e1"}`,
        }}
      >
        <input
          ref={fileInputRef}
          type="file"
          onChange={(e) => setNewFile(e.target.files?.[0] ?? null)}
          className="flex-1 text-sm file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-500/10 file:text-blue-500 hover:file:bg-blue-500/20 transition-all cursor-pointer"
          style={{ color: colors.text as string }}
        />
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Title"
          className="flex-1 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          style={inputStyle}
        />
        <button
          type="button"
          onClick={handleAdd}
          disabled={!newFile || !newTitle.trim() || uploading}
          className="bg-blue-600 hover:bg-blue-500 disabled:bg-gray-400 text-white font-bold p-2 rounded-lg transition-all shrink-0 disabled:cursor-not-allowed"
        >
          {uploading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Upload className="h-4 w-4" />
          )}
        </button>
      </div>
      <ConfirmDialog
        open={deleteConfirmId !== null}
        onOpenChange={(open) => { if (!open) setDeleteConfirmId(null); }}
        onConfirm={confirmDelete}
        title="Confirm Delete"
        description="Are you sure you want to delete this attachment? This action cannot be undone."
        confirmText="Yes"
        cancelText="No"
      />
    </div>
  );
}
