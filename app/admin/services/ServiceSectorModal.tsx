"use client";

import { useState, useEffect, useRef } from "react";
import { Plus, Edit2, Trash2, Loader2, X } from "lucide-react";

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
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      if (sector) {
        setTitle(sector.title);
        setDescription(sector.description || "");
        setImagePreview(sector.image || null);
      } else {
        setTitle("");
        setDescription("");
        setImagePreview(null);
      }
      setImage(null);
    }
  }, [isOpen, sector]);

  if (!isOpen) return null;

  const handleSave = async () => {
    if (!title.trim()) return;
    setIsSaving(true);
    const formData = new FormData();
    formData.append("title", title.trim());
    formData.append("description", description.trim());
    if (image) {
      formData.append("image", image);
    }
    await onSave(formData);
    setIsSaving(false);
    onClose();
  };

  const handleDelete = async () => {
    if (!sector || !onDelete) return;
    if (window.confirm("Delete this sector?")) {
      setIsDeleting(true);
      await onDelete(sector.id);
      setIsDeleting(false);
      onClose();
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg max-h-[90vh] bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden flex flex-col">
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">
            {sector ? "Edit Sector" : "Add Sector"}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg">
            <X className="h-5 w-5 text-gray-400" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Sector title..."
              className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description..."
              rows={4}
              className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-white text-sm resize-none focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Image</label>
            <div className="flex items-center gap-4">
              <div className="w-24 h-24 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-gray-500 text-xs">No image</span>
                )}
              </div>
              <div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-1.5 bg-white/10 text-white text-sm rounded-lg hover:bg-white/20"
                >
                  Choose Image
                </button>
                {imagePreview && (
                  <button
                    onClick={() => { setImage(null); setImagePreview(null); }}
                    className="ml-2 px-3 py-1.5 text-red-400 text-sm hover:text-red-300"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-white/10 flex items-center justify-between">
          {sector && onDelete ? (
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="px-4 py-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg text-sm flex items-center gap-2"
            >
              {isDeleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
              Delete
            </button>
          ) : (
            <div />
          )}
          <div className="flex gap-2">
            <button onClick={onClose} className="px-4 py-2 bg-white/5 text-gray-400 hover:text-white rounded-lg text-sm">
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving || !title.trim()}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm flex items-center gap-2 disabled:opacity-50"
            >
              {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
