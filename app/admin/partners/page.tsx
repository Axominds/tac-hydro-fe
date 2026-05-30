"use client";

import { useState, useEffect } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  Loader2,
  X,
  Handshake,
  CheckCircle2,
  AlertCircle,
  Save,
  GripVertical,
} from "lucide-react";
import { Montserrat } from "next/font/google";
import { useValuedPartners } from "../../../src/hooks/useValuedPartners";
import { useValuedPartnerMutations } from "../../../src/hooks/useAdminMutations";
import { ValuedPartner, apiFetch } from "../../../src/lib/api";
import { useAdminTheme } from "../../../src/hooks/useAdminTheme";
import { Toast, useToast } from "../../../src/components/ui/toast";
import { ConfirmDialog } from "../../../src/components/ui/confirm-dialog";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["600", "700"] });

function PartnerCard({
  partner,
  onEdit,
  onDelete,
  onDragStart,
  onDragOver,
  onDrop,
  isDragging,
  isDragOver,
}: {
  partner: ValuedPartner;
  onEdit: (partner: ValuedPartner) => void;
  onDelete: (id: number) => void;
  onDragStart: (e: React.DragEvent, id: number) => void;
  onDragOver: (e: React.DragEvent, id: number) => void;
  onDrop: (e: React.DragEvent, id: number) => void;
  isDragging: boolean;
  isDragOver: boolean;
}) {
  const { theme, colors, mounted } = useAdminTheme();

  if (!mounted) return null;

  const isDark = theme === "dark";
  const cardStyle = {
    backgroundColor: isDark ? "rgba(255,255,255,0.03)" : "#ffffff",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: isDragOver
      ? "#3b82f6"
      : isDark
        ? "rgba(255,255,255,0.08)"
        : "#e2e8f0",
  };

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, partner.id)}
      onDragOver={(e) => onDragOver(e, partner.id)}
      onDrop={(e) => onDrop(e, partner.id)}
      className={`relative rounded-2xl overflow-hidden group transition-all cursor-pointer ${
        isDragging ? "opacity-50" : ""
      }`}
      style={cardStyle}
    >
      <div className="absolute top-2 left-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
        <div
          className="p-1.5 rounded-lg cursor-move"
          style={{
            backgroundColor: isDark ? "rgba(255,255,255,0.1)" : "#f1f5f9",
          }}
        >
          <GripVertical className="h-4 w-4" style={{ color: colors.text as string }} />
        </div>
      </div>

      <div className="absolute top-2 right-2 z-10 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => onEdit(partner)}
          className="p-1.5 rounded-lg transition-all"
          style={{
            backgroundColor: isDark ? "rgba(255,255,255,0.1)" : "#f1f5f9",
            color: colors.text as string,
          }}
        >
          <Edit2 className="h-3.5 w-3.5" />
        </button>
        <button
          onClick={() => onDelete(partner.id)}
          className="p-1.5 rounded-lg transition-all"
          style={{ backgroundColor: "rgba(239, 68, 68, 0.1)" }}
        >
          <Trash2 className="h-3.5 w-3.5 text-red-500" />
        </button>
      </div>

      <div className="p-4 flex flex-col items-center gap-3">
        <div className="w-24 h-24 rounded-xl overflow-hidden bg-white dark:bg-gray-800 flex items-center justify-center">
          {partner.logo ? (
            <img
              src={partner.logo}
              alt={partner.name}
              className="w-full h-full object-contain"
            />
          ) : (
            <Handshake className="h-8 w-8 text-gray-400" />
          )}
        </div>
        <p
          className="text-sm font-medium text-center truncate w-full"
          style={{ color: colors.text as string }}
        >
          {partner.name}
        </p>
      </div>
    </div>
  );
}

function PartnerModal({
  partner,
  isOpen,
  onClose,
  onSave,
  onDelete,
}: {
  partner?: ValuedPartner | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string, logoFile?: File) => Promise<void>;
  onDelete?: (id: number) => Promise<void>;
}) {
  const { theme, colors, mounted } = useAdminTheme();
  const [name, setName] = useState(partner?.name || "");
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(partner?.logo || null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setName(partner?.name || "");
      setLogoPreview(partner?.logo || null);
      setLogoFile(null);
      setValidationErrors({});
    }
  }, [isOpen, partner?.id]);

  const inputStyle = {
    backgroundColor: theme === "dark" ? "rgba(255,255,255,0.05)" : "#f1f5f9",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: theme === "dark" ? "rgba(255,255,255,0.1)" : "#cbd5e1",
    color: theme === "dark" ? "#ffffff" : "#1e293b",
  };

  const handleSave = async () => {
    const errors: Record<string, string> = {};
    if (!name.trim()) {
      errors.name = "Partner name is required.";
    } else if (name.length > 255) {
      errors.name = "Partner name cannot exceed 255 characters.";
    }
    if (!partner?.id && !logoFile) {
      errors.logo = "Logo is required.";
    }
    setValidationErrors(errors);
    if (Object.keys(errors).length > 0) return;
    try {
      await onSave(name, logoFile || undefined);
    } catch (error: any) {
      if (error?.body) {
        const serverErrors: Record<string, string> = {};
        for (const [key, messages] of Object.entries(error.body)) {
          serverErrors[key] = Array.isArray(messages) ? messages[0] : String(messages);
        }
        setValidationErrors(serverErrors);
      }
    }
  };

  const handleDelete = async () => {
    if (!partner?.id || !onDelete) return;
    setDeleteConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (!partner?.id || !onDelete) return;
    setDeleteConfirmOpen(false);
    setIsDeleting(true);
    try {
      await onDelete(partner.id);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  if (!isOpen || !mounted) return null;

  const isEditing = !!partner?.id;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div
        className="relative w-full max-w-md mx-4 p-6 rounded-2xl"
        style={{
          backgroundColor: theme === "dark" ? "#1a1a1a" : "#ffffff",
          borderWidth: "1px",
          borderStyle: "solid",
          borderColor: theme === "dark" ? "rgba(255,255,255,0.1)" : "#e2e8f0",
        }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2
            className={`${montserrat.className} text-xl`}
            style={{ color: colors.text as string }}
          >
            {isEditing ? "Edit Partner" : "Add New Partner"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg transition-all"
            style={{
              backgroundColor: theme === "dark" ? "rgba(255,255,255,0.05)" : "#f1f5f9",
              color: colors.text as string,
            }}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label
              className="text-[10px] font-bold tracking-widest uppercase px-1"
              style={{ color: colors.textMuted as string }}
            >
              Partner Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setValidationErrors((prev) => ({ ...prev, name: "" }));
              }}
              placeholder="e.g. World Bank"
              className="w-full rounded-xl py-3.5 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium"
              style={inputStyle}
            />
            {validationErrors.name && (
              <p className="text-xs text-red-500 mt-1 px-1 flex items-center gap-1">
                <AlertCircle className="h-3 w-3 shrink-0" />
                {validationErrors.name}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label
              className="text-[10px] font-bold tracking-widest uppercase px-1"
              style={{ color: colors.textMuted as string }}
            >
              Logo <span className="text-red-500">*</span>
            </label>
            {(logoPreview || partner?.logo) && (
              <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800">
                <img
                  src={logoPreview || partner?.logo || ""}
                  alt="Logo preview"
                  className="w-full h-full object-contain"
                />
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                handleFileChange(e);
                setValidationErrors((prev) => ({ ...prev, logo: "" }));
              }}
              className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-500/10 file:text-blue-500 hover:file:bg-blue-500/20 transition-all cursor-pointer rounded-lg"
              style={inputStyle}
            />
            {validationErrors.logo && (
              <p className="text-xs text-red-500 mt-1 px-1 flex items-center gap-1">
                <AlertCircle className="h-3 w-3 shrink-0" />
                {validationErrors.logo}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-between gap-3 mt-6 pt-4" style={{ borderTop: `1px solid ${theme === "dark" ? "rgba(255,255,255,0.1)" : "#e2e8f0"}` }}>
          {isEditing && onDelete ? (
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="text-red-500 hover:text-red-600 text-sm font-medium disabled:opacity-50"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
          ) : (
            <div />
          )}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
              style={{ color: colors.text as string }}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving || !name.trim() || (!isEditing && !logoFile)}
              className="bg-blue-600 hover:bg-blue-500 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg flex items-center gap-2 font-medium transition-all"
            >
              {isSaving ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              {isSaving ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </div>
      <ConfirmDialog
        open={deleteConfirmOpen}
        onOpenChange={setDeleteConfirmOpen}
        onConfirm={confirmDelete}
        title="Confirm Delete"
        description="Are you sure you want to delete this partner?"
        confirmText="Yes"
        cancelText="No"
      />
    </div>
  );
}

export default function ValuedPartnersPage() {
  const { theme, colors, mounted } = useAdminTheme();
  const { data: partners, isLoading, refetch } = useValuedPartners();
  const { createPartner, updatePartner, deletePartner, reorderPartners } = useValuedPartnerMutations();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPartner, setEditingPartner] = useState<ValuedPartner | null>(null);
  const [draggedId, setDraggedId] = useState<number | null>(null);
  const [dragOverId, setDragOverId] = useState<number | null>(null);
  const { toast, showToast, hideToast } = useToast();

  const partnersList = (partners || []) as ValuedPartner[];

  if (!mounted) return null;

  const isDark = theme === "dark";
  const cardStyle = {
    backgroundColor: isDark ? "rgba(255,255,255,0.03)" : "#ffffff",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: isDark ? "rgba(255,255,255,0.08)" : "#e2e8f0",
  };

  const handleAdd = () => {
    setEditingPartner(null);
    setIsModalOpen(true);
  };

  const handleEdit = (partner: ValuedPartner) => {
    setEditingPartner(partner);
    setIsModalOpen(true);
  };

  const handleSave = async (name: string, logoFile?: File) => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      if (editingPartner?.id) {
        if (logoFile) {
          formData.append("logo", logoFile);
        }
        await apiFetch(`/api/home/valued-partners/${editingPartner.id}/`, {
          method: "PATCH",
          body: formData,
        });
      } else {
        formData.append("order", String(partnersList.length));
        if (logoFile) {
          formData.append("logo", logoFile);
        }
        await apiFetch(`/api/home/valued-partners/`, {
          method: "POST",
          body: formData,
        });
      }
      showToast(editingPartner ? "Partner updated successfully!" : "Partner added successfully!");
      setIsModalOpen(false);
      refetch();
    } catch (error: any) {
      if (!error?.body) {
        showToast("Failed to save partner", "error");
      }
      throw error;
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deletePartner.mutateAsync(id);
      showToast("Partner deleted successfully!", "error");
      setIsModalOpen(false);
      refetch();
    } catch (error) {
      showToast("Failed to delete partner", "error");
    }
  };

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

    const sorted = [...partnersList].sort((a, b) => a.order - b.order);
    const fromIdx = sorted.findIndex((p) => p.id === draggedId);
    const toIdx = sorted.findIndex((p) => p.id === targetId);

    const [moved] = sorted.splice(fromIdx, 1);
    sorted.splice(toIdx, 0, moved);

    const reordered = sorted.map((p, idx) => ({
      id: p.id,
      order: idx,
    }));

    try {
      await reorderPartners.mutateAsync(reordered);
      refetch();
    } catch (error) {
      console.error("Failed to reorder:", error);
    }

    setDraggedId(null);
    setDragOverId(null);
  };

  return (
    <div className="space-y-15 relative pb-40">
      <div className="flex items-center justify-between">
        <div>
          <h1
            className={`${montserrat.className} text-4xl font-bold mb-2`}
            style={{ color: colors.text as string }}
          >
            Valued <span className="text-blue-500">Partners</span>
          </h1>
          <p style={{ color: colors.textSecondary as string }}>
            Add partners to display on the homepage.
          </p>
        </div>
        <button
          onClick={handleAdd}
          className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl flex items-center gap-2 font-bold transition-all shadow-xl shadow-blue-500/20 active:scale-95"
        >
          <Plus className="h-5 w-5" />
          Add
        </button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
        </div>
      ) : partnersList.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center py-32 px-4 border-dashed rounded-3xl"
          style={cardStyle}
        >
          <Handshake className="h-12 w-12 text-blue-500/40 mb-4" />
          <h3 className="text-lg font-bold mb-2" style={{ color: colors.text as string }}>
            No Partners Yet
          </h3>
          <p className="text-sm text-center max-w-sm" style={{ color: colors.textMuted as string }}>
            Add your first valued partner to display on the homepage.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {partnersList.map((partner) => (
            <PartnerCard
              key={partner.id}
              partner={partner}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              isDragging={draggedId === partner.id}
              isDragOver={dragOverId === partner.id}
            />
          ))}
        </div>
      )}

      <div className="flex justify-end pt-4">
      </div>

      <PartnerModal
        partner={editingPartner}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        onDelete={handleDelete}
      />
      {toast && <Toast message={toast.message} type={toast.type} onClose={hideToast} />}
    </div>
  );
}