"use client";

import { useState, useEffect, useRef } from "react";
import { Plus, Edit2, Trash2, Loader2, X, Save } from "lucide-react";
import { useAdminTheme } from "../../../src/hooks/useAdminTheme";
import { ConfirmDialog } from "../../../src/components/ui/confirm-dialog";
import { Toast, useToast } from "../../../src/components/ui/toast";

interface SectorData {
  id: number;
  title: string;
  description: string;
  image?: string;
}

interface ServiceSectorModalProps {
  sector?: SectorData;
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: FormData) => Promise<void>;
  onDelete?: (id: number) => Promise<void>;
}

export function ServiceSectorModal({
  sector,
  isOpen,
  onClose,
  onSave,
  onDelete,
}: ServiceSectorModalProps) {
  const { theme, colors, mounted } = useAdminTheme();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageRemoved, setImageRemoved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast, showToast, hideToast } = useToast();

  useEffect(() => {
    if (isOpen) {
      if (sector) {
        setTitle(sector.title);
        setDescription(sector.description || "");
        setImagePreview(sector.image || null);
        setImageRemoved(false);
      } else {
        setTitle("");
        setDescription("");
        setImagePreview(null);
        setImageRemoved(false);
      }
      setImage(null);
    }
  }, [isOpen, sector]);

  if (!isOpen || !mounted) return null;

  const isDark = theme === "dark";

  const handleSave = async () => {
    if (!title.trim()) return;
    setIsSaving(true);
    const formData = new FormData();
    formData.append("title", title.trim());
    formData.append("description", description.trim());
    if (image) {
      formData.append("image", image);
    }
    if (imageRemoved) {
      formData.append("image", "");
    }
    await onSave(formData);
    setImageRemoved(false);
    setIsSaving(false);
    onClose();
  };

  const handleDelete = async () => {
    if (!sector || !onDelete) return;
    setIsDeleting(true);
    await onDelete(sector.id);
    setIsDeleting(false);
    onClose();
  };

  const handleDeleteClick = () => {
    setDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    await handleDelete();
    setDeleteConfirmOpen(false);
    showToast("Sector deleted successfully!", "error");
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const inputStyle = {
    backgroundColor: isDark ? "rgba(0,0,0,0.3)" : "#f1f5f9",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: isDark ? "rgba(255,255,255,0.15)" : "#cbd5e1",
    color: isDark ? "#ffffff" : "#1e293b",
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm w-screen h-screen"
        onClick={onClose}
      />
      <div
        className="relative z-10 w-full max-w-lg max-h-[90vh] rounded-2xl overflow-hidden flex flex-col"
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
            {sector ? "Edit Sector" : "Add Sector"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg transition-all"
            style={{ backgroundColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)" }}
          >
            <X className="h-5 w-5" style={{ color: colors.textMuted as string }} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <div>
            <label className="block text-sm mb-1" style={{ color: colors.textMuted as string }}>
              Title
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Sector title..."
              className="w-full rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              style={inputStyle}
            />
          </div>

          <div>
            <label className="block text-sm mb-1" style={{ color: colors.textMuted as string }}>
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description..."
              rows={4}
              className="w-full rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-blue-500"
              style={inputStyle}
            />
          </div>

          <div>
            <label className="block text-sm mb-1" style={{ color: colors.textMuted as string }}>
              Image
            </label>
            <div className="flex items-center gap-4">
              <div
                className="w-24 h-24 rounded-lg flex items-center justify-center overflow-hidden"
                style={{
                  backgroundColor: isDark ? "rgba(255,255,255,0.05)" : "#f1f5f9",
                  border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "#e2e8f0"}`,
                }}
              >
                {image ? (
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-xs" style={{ color: colors.textMuted as string }}>
                    No image
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-3">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-500/10 file:text-blue-500 hover:file:bg-blue-500/20 transition-all cursor-pointer rounded-lg"
                  style={inputStyle}
                />
                {image && <p className="text-xs mt-1 text-blue-500">New file selected</p>}
              </div>
            </div>
          </div>
        </div>

        <div
          className="p-6 flex items-center justify-between"
          style={{ borderTop: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "#e2e8f0"}` }}
        >
          {sector && onDelete ? (
            <button
              onClick={handleDeleteClick}
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
          ) : (
            <div />
          )}
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
              disabled={isSaving || !title.trim()}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm flex items-center gap-2 disabled:opacity-50"
            >
              {isSaving ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              Save
            </button>
          </div>
        </div>
      </div>
      <ConfirmDialog
        open={deleteConfirmOpen}
        onOpenChange={setDeleteConfirmOpen}
        onConfirm={handleConfirmDelete}
        title="Confirm Delete"
        description="Are you sure you want to delete this sector?"
        confirmText="Yes"
        cancelText="No"
      />
      {toast && <Toast message={toast.message} type={toast.type} onClose={hideToast} />}
    </div>
  );
}
