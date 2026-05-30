"use client";

import { useState, useRef, useEffect } from "react";
import {
  BarChart3,
  Plus,
  Edit2,
  Trash2,
  Loader2,
  X,
  Save,
  Tag,
  Check,
  GripVertical,
  Pencil,
  Image as ImageIcon,
  Search,
  AlertCircle,
} from "lucide-react";
import { Montserrat } from "next/font/google";
import {
  useProjectsWithScopes,
  useProjectScopeMemberships,
  useProjectScopeImages,
} from "../../../src/hooks/useProjects";
import { useProjectScopes } from "../../../src/hooks/useProjectScopes";
import {
  useProjectMutations,
  useProjectScopeMutations,
  useProjectScopeMembershipMutations,
  useProjectScopeImageMutations,
} from "../../../src/hooks/useAdminMutations";
import {
  Project,
  ProjectScope,
  ProjectScopeMembership,
  ProjectScopeImage,
  apiFetch,
} from "../../../src/lib/api";
import { useAdminTheme, getThemedClasses } from "../../../src/hooks/useAdminTheme";
import { useModalContext } from "../layout";
import { ConfirmDialog } from "../../../src/components/ui/confirm-dialog";
import { Toast, useToast } from "../../../src/components/ui/toast";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["600", "700"] });

const TECHNICAL_HIGHLIGHT_FIELDS = [
  "Project Boundary",
  "Project Location",
  "Installed Capacity",
  "Design Discharge",
  "Gross Head",
  "Design Flood",
  "Diversion Type",
  "Headrace Pipe Length/Diameter",
  "Thickness of Headrace Pipe",
  "Connecting Pipe Length/Diameter",
  "Thickness of Connecting Pipe",
  "Penstock Pipe Length/Diameter",
  "Thickness of Penstock Pipe",
  "Unit Capacity",
] as const;

export default function ProjectsManagementPage() {
  const { theme, colors, mounted } = useAdminTheme();
  const { setIsModalOpen: setContextModalOpen } = useModalContext();
  const classes = getThemedClasses(theme);
  const { data: projects, isLoading } = useProjectsWithScopes();
  const { data: scopeMemberships } = useProjectScopeMemberships();
  const { data: scopeImages } = useProjectScopeImages();
  const { createProject, updateProject, deleteProject } = useProjectMutations();
  const { data: scopes } = useProjectScopes();
  const { createScope, updateScope, reorderScopes, deleteScope } = useProjectScopeMutations();
  const { createMembership, updateMembership, deleteMembership } =
    useProjectScopeMembershipMutations();
  const { createScopeImage, deleteScopeImage, reorderScopeImages } =
    useProjectScopeImageMutations();
  const { toast, showToast, hideToast } = useToast();

  const [isModalOpen, setIsModalOpenLocal] = useState(false);
  const [isMembershipModalOpen, setIsMembershipModalOpen] = useState(false);
  const [isScopeModalOpen, setIsScopeModalOpenLocal] = useState(false);
  const setIsScopeModalOpen = (open: boolean) => {
    setIsScopeModalOpenLocal(open);
    setContextModalOpen(open);
  };
  const [orderedScopes, setOrderedScopes] = useState<ProjectScope[]>([]);
  const [dragOverId, setDragOverId] = useState<number | null>(null);
  const dragItemId = useRef<number | null>(null);
  const [reordering, setReordering] = useState(false);
  const [dragOverImageId, setDragOverImageId] = useState<number | null>(null);
  const imageDragItemId = useRef<number | null>(null);
  const [imageReordering, setImageReordering] = useState(false);
  const [newScopeName, setNewScopeName] = useState("");
  const [addingScope, setAddingScope] = useState(false);
  const [editingScopeId, setEditingScopeId] = useState<number | null>(null);
  const [editingScopeName, setEditingScopeName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const syncedRef = useRef(false);
  const addingScopeRef = useRef(false);
  const updatingScopeRef = useRef(false);

  const setIsModalOpen = (open: boolean) => {
    setIsModalOpenLocal(open);
    setContextModalOpen(open);
  };
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState<Partial<Project>>({});
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [membershipScopeId, setMembershipScopeId] = useState<number | null>(null);
  const [membershipRole, setMembershipRole] = useState("");
  const [roleDrafts, setRoleDrafts] = useState<Record<number, string>>({});
  const [isSavingMembership, setIsSavingMembership] = useState(false);
  const [uploadingMembershipId, setUploadingMembershipId] = useState<number | null>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleteType, setDeleteType] = useState<"project" | "scope" | "membership" | null>(null);

  useEffect(() => {
    if (isModalOpen || isScopeModalOpen || isMembershipModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen, isScopeModalOpen, isMembershipModalOpen]);

  useEffect(() => {
    const drafts: Record<number, string> = {};
    (scopeMemberships || [])
      .filter((membership) => membership.project_id === editingProject?.id)
      .forEach((membership) => {
        drafts[membership.id] = membership.role || "";
      });
    setRoleDrafts(drafts);
  }, [scopeMemberships, editingProject?.id]);

  const filteredProjects = projects?.filter((project) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    const matchesTitle = project.title.toLowerCase().includes(query);
    const matchesCapacity = project.installed_capacity.toString().includes(query);
    return matchesTitle || matchesCapacity;
  });

  if (!mounted) return null;

  const openCreateModal = () => {
    setEditingProject(null);
    setFormData({
      title: "",
      status: "Ongoing",
      installed_capacity: 0,
      installed_capacity_unit: "MW",
      latitude: 27.7,
      longitude: 85.3,
      description: "",
      technical_highlights: {},
    });
    setIsModalOpen(true);
  };

  const openEditModal = async (project: Project) => {
    setEditingProject(project);
    setFormData({});
    setIsModalOpen(true);
    setIsLoadingDetail(true);
    const detail = await apiFetch<Project>(`/api/projects/${project.id}/`);
    setFormData(detail);
    setIsLoadingDetail(false);
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.title?.trim()) {
      errors.title = "Project title is required.";
    } else if (formData.title.length > 255) {
      errors.title = "Project title cannot exceed 255 characters.";
    }
    if (formData.installed_capacity == null || formData.installed_capacity <= 0) {
      errors.installed_capacity = "Installed capacity must be a positive number.";
    }
    if (formData.latitude == null || formData.latitude < -90 || formData.latitude > 90) {
      errors.latitude = "Latitude must be between -90 and 90.";
    }
    if (formData.longitude == null || formData.longitude < -180 || formData.longitude > 180) {
      errors.longitude = "Longitude must be between -180 and 180.";
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateForm();
    setValidationErrors(errors);
    if (Object.keys(errors).length > 0) return;
    try {
      if (editingProject) {
        const changedData: Partial<Project> = {};
        Object.keys(formData).forEach((k) => {
          const key = k as keyof Project;
          if (JSON.stringify(formData[key]) !== JSON.stringify(editingProject[key])) {
            // @ts-ignore
            changedData[key] = formData[key];
          }
        });
        if (Object.keys(changedData).length > 0) {
          await updateProject.mutateAsync({ id: editingProject.id, data: changedData });
          showToast("Project saved successfully!");
        }
      } else {
        await createProject.mutateAsync(formData);
        showToast("Project added successfully!");
      }
      setIsModalOpen(false);
    } catch (error: any) {
      if (error?.body) {
        const serverErrors: Record<string, string> = {};
        for (const [key, messages] of Object.entries(error.body)) {
          serverErrors[key] = Array.isArray(messages) ? messages[0] : String(messages);
        }
        setValidationErrors((prev) => ({ ...prev, ...serverErrors }));
      } else {
        showToast("Failed to save project.", "error");
      }
    }
  };

  const handleDelete = (id: number) => {
    setDeleteId(id);
    setDeleteType("project");
    setDeleteConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (deleteType === "project" && deleteId) {
      await deleteProject.mutateAsync(deleteId);
      showToast("Project deleted successfully!", "success");
    } else if (deleteType === "scope" && deleteId) {
      const isInUse = (scopeMemberships || []).some(
        (membership) => membership.project_scope_id === deleteId,
      );
      if (isInUse) {
        showToast("Scope in use, cannot be deleted", "error");
        setDeleteId(null);
        setDeleteType(null);
        return;
      }
      await deleteScope.mutateAsync(deleteId);
      setOrderedScopes((prev) => prev.filter((s) => s.id !== deleteId));
      showToast("Scope deleted successfully!", "success");
    } else if (deleteType === "membership" && deleteId) {
      await deleteMembership.mutateAsync(deleteId);
      showToast("Membership deleted successfully!", "success");
    }
    setDeleteId(null);
    setDeleteType(null);
  };

  if (scopes && (!syncedRef.current || orderedScopes.length !== scopes.length) && !addingScopeRef.current && !updatingScopeRef.current) {
    const sorted = [...scopes].sort((a, b) => a.order - b.order);
    setOrderedScopes(sorted);
    syncedRef.current = true;
  }

  const handleAddScope = async () => {
    if (!newScopeName.trim()) return;
    addingScopeRef.current = true;
    syncedRef.current = false;
    setAddingScope(true);
    const newScope = await createScope.mutateAsync({ name: newScopeName.trim() });
    setOrderedScopes((prev) => [...prev, { ...newScope, order: prev.length + 1 }]);
    setNewScopeName("");
    setAddingScope(false);
    addingScopeRef.current = false;
    showToast("Scope added successfully!", "success");
  };

  const handleUpdateScope = async (id: number, name: string) => {
    if (!id || id === undefined) return;
    updatingScopeRef.current = true;
    await updateScope.mutateAsync({ id, data: { name } });
    setOrderedScopes((prev) => prev.map((s) => (s.id === id ? { ...s, name } : s)));
    setEditingScopeId(null);
    setEditingScopeName("");
    updatingScopeRef.current = false;
    showToast("Scope updated successfully!", "success");
  };

  const handleDeleteScope = (id: number) => {
    setDeleteId(id);
    setDeleteType("scope");
    setDeleteConfirmOpen(true);
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

    const newOrder = [...orderedScopes];
    const fromIdx = newOrder.findIndex((s) => s.id === sourceId);
    const toIdx = newOrder.findIndex((s) => s.id === targetId);
    const [moved] = newOrder.splice(fromIdx, 1);
    newOrder.splice(toIdx, 0, moved);

    setOrderedScopes(newOrder);
    dragItemId.current = null;

    setReordering(true);
    try {
      await reorderScopes.mutateAsync(
        newOrder.map((scope, idx) => ({ id: scope.id, order: idx + 1 })),
      );
    } finally {
      setReordering(false);
    }
  };

  const handleImageDragStart = (id: number) => {
    imageDragItemId.current = id;
  };

  const handleImageDragOver = (e: React.DragEvent, id: number) => {
    e.preventDefault();
    setDragOverImageId(id);
  };

  const handleImageDrop = async (targetId: number, membershipId: number) => {
    setDragOverImageId(null);
    const sourceId = imageDragItemId.current;
    if (!sourceId || sourceId === targetId) return;

    const currentImages = getMembershipImages(membershipId);
    const newOrder = [...currentImages];
    const fromIdx = newOrder.findIndex((img) => img.id === sourceId);
    const toIdx = newOrder.findIndex((img) => img.id === targetId);
    const [moved] = newOrder.splice(fromIdx, 1);
    newOrder.splice(toIdx, 0, moved);

    imageDragItemId.current = null;

    setImageReordering(true);
    try {
      await reorderScopeImages.mutateAsync(
        newOrder.map((img, idx) => ({ id: img.id, order: idx })),
      );
    } finally {
      setImageReordering(false);
    }
  };

  const getTechnicalHighlightValue = (field: string) => {
    const highlights = formData.technical_highlights as Record<string, string> | null | undefined;
    if (!highlights) return "";
    return highlights[field] || "";
  };

  const setTechnicalHighlightValue = (field: string, value: string) => {
    const highlights = { ...((formData.technical_highlights as Record<string, string>) || {}) };
    if (value.trim()) {
      highlights[field] = value;
    } else {
      delete highlights[field];
    }
    setFormData({ ...formData, technical_highlights: highlights });
  };

  const projectMemberships = (scopeMemberships || []).filter(
    (membership) => membership.project_id === editingProject?.id,
  );

  const availableScopeOptions = (scopes || []).filter(
    (scope) => !projectMemberships.some((membership) => membership.project_scope_id === scope.id),
  );

  const getScopeName = (scopeId: number) =>
    scopes?.find((scope) => scope.id === scopeId)?.name || "Unknown Scope";

  const getMembershipImages = (membershipId: number) =>
    (scopeImages || [])
      .filter((image) => image.project_scope_membership_id === membershipId)
      .sort((a, b) => a.order - b.order);

  const handleAddMembership = async () => {
    if (!editingProject?.id || !membershipScopeId) return;
    setIsSavingMembership(true);
    try {
      await createMembership.mutateAsync({
        project_id: editingProject.id,
        project_scope_id: membershipScopeId,
        role: membershipRole.trim() || null,
      });
      showToast("Membership added successfully!", "success");
      setMembershipScopeId(null);
      setMembershipRole("");
    } finally {
      setIsSavingMembership(false);
    }
  };

  const handleUpdateMembershipRole = async (membershipId: number) => {
    await updateMembership.mutateAsync({
      id: membershipId,
      data: { role: (roleDrafts[membershipId] || "").trim() || null },
    });
    showToast("Role saved successfully!", "success");
  };

  const handleDeleteMembership = (membershipId: number) => {
    setDeleteId(membershipId);
    setDeleteType("membership");
    setDeleteConfirmOpen(true);
  };

  const handleUploadScopeImages = async (membershipId: number, files: FileList | null) => {
    if (!files || files.length === 0) return;
    const existingImages = getMembershipImages(membershipId);
    const remaining = Math.max(0, 4 - existingImages.length);
    if (remaining === 0) {
      alert("Maximum 4 images allowed for each scope membership.");
      return;
    }

    const selected = Array.from(files).slice(0, remaining);
    setUploadingMembershipId(membershipId);
    try {
      await Promise.all(
        selected.map((file, idx) =>
          createScopeImage.mutateAsync({
            project_scope_membership_id: membershipId,
            image: file,
            alt_text: "",
            order: existingImages.length + idx,
          }),
        ),
      );
    } finally {
      setUploadingMembershipId(null);
    }
  };

  return (
    <div className="space-y-15 relative">
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`${montserrat.className} text-4xl font-bold mb-2`} style={classes.text.primary}>
            Hydro <span className="text-blue-500">Projects</span>
          </h1>
          <p style={classes.text.secondary}>
            View and edit project descriptions, scopes, and images.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsScopeModalOpen(true)}
            className="bg-blue-600/10 hover:bg-blue-600/20 text-blue-500 px-4 py-2.5 rounded-xl flex items-center gap-2 font-semibold transition-all border border-blue-500/20"
          >
            <Tag className="h-4 w-4" />
            Manage Scopes
          </button>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by project or MW..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2.5 w-64 rounded-xl border border-gray-200 bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>
<button
            onClick={openCreateModal}
            className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 font-semibold transition-all shadow-lg shadow-blue-600/20 active:scale-95"
          >
            <Plus className="h-5 w-5" />
            Add
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 pb-40">
          {filteredProjects?.length === 0 && searchQuery ? (
            <div className="text-center py-20">
              <p style={classes.text.secondary}>No projects found matching "{searchQuery}"</p>
            </div>
          ) : (
            filteredProjects?.map((project) => (
              <div
                key={project.id}
                className="flex items-center gap-6 p-6 rounded-2xl group transition-all"
                style={{
                  ...classes.card.base,
                  borderWidth: "1px",
                  borderStyle: "solid",
                }}
              >
                <div className="w-24 h-16 bg-blue-600/10 rounded-xl relative overflow-hidden flex-shrink-0">
                  {project.image_urls && project.image_urls[0] ? (
                    <img
                      src={project.image_urls[0]}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center opacity-30">
                      <BarChart3 className="h-8 w-8 text-blue-500" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg leading-tight mb-1" style={classes.text.primary}>
                    {project.title}
                  </h3>
                  <div className="flex gap-4">
                    <span
                      className="text-xs font-medium px-2 py-1 rounded-full uppercase tracking-widest"
                      style={{ color: "#60a5fa", backgroundColor: "rgba(96, 165, 250, 0.1)" }}
                    >
                      {project.status || "Active"}
                    </span>
                    <span className="text-xs font-medium" style={classes.text.muted}>
                      {project.installed_capacity} {project.installed_capacity_unit} Capacity
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-all">
                  <button
                    onClick={() => openEditModal(project)}
                    className="p-2.5 rounded-lg transition-all"
                    style={classes.card.hover}
                  >
                    <Edit2 className="h-4 w-4" style={{ color: colors.textSecondary }} />
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="p-2.5 rounded-lg transition-all"
                    style={{ backgroundColor: "rgba(239, 68, 68, 0.1)" }}
                  >
                    <Trash2 className="h-4 w-4 text-red-400" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* CRUD Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div
            className="w-full max-w-2xl max-h-[90vh] rounded-3xl overflow-hidden shadow-2xl relative flex flex-col"
            style={{
              backgroundColor: colors.modalBg,
              borderWidth: "1px",
              borderStyle: "solid",
              borderColor: colors.border,
            }}
          >
            <div
              className="p-8 flex items-center justify-between shrink-0"
              style={{ borderBottom: `1px solid ${colors.border}` }}
            >
              <div>
                <h2 className={`${montserrat.className} text-2xl`} style={classes.text.primary}>
                  {editingProject ? "Edit" : "Create"}{" "}
                  <span className="text-blue-500">Project</span>
                </h2>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="transition-colors"
                style={classes.text.secondary}
              >
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
                        style={classes.text.muted}
                      >
                        Project Title <span className="text-red-500">*</span>
                      </label>
                      <input
                        required
                        value={formData.title}
                        onChange={(e) => {
                          setFormData({ ...formData, title: e.target.value });
                          setValidationErrors((prev) => ({ ...prev, title: "" }));
                        }}
                        className="w-full rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                        style={{
                          ...classes.input.bg,
                          borderWidth: "1px",
                          borderStyle: "solid",
                        }}
                        placeholder="e.g. Maduwa Hydropower"
                      />
                      {fieldError("title")}
                    </div>

                    <div className="space-y-2">
                      <label
                        className="text-[10px] font-bold tracking-widest uppercase ml-1"
                        style={classes.text.muted}
                      >
                        Status
                      </label>
                      <select
                        value={formData.status || "Ongoing"}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        className="w-full rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                        style={{
                          ...classes.input.bg,
                          borderWidth: "1px",
                          borderStyle: "solid",
                        }}
                      >
                        <option value="Ongoing">Ongoing</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label
                        className="text-[10px] font-bold tracking-widest uppercase ml-1"
                        style={classes.text.muted}
                      >
                        Capacity (MW) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        required
                        value={formData.installed_capacity}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            installed_capacity: parseFloat(e.target.value),
                          });
                          setValidationErrors((prev) => ({ ...prev, installed_capacity: "" }));
                        }}
                        className="w-full rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                        style={{
                          ...classes.input.bg,
                          borderWidth: "1px",
                          borderStyle: "solid",
                        }}
                      />
                      {fieldError("installed_capacity")}
                    </div>

                    <div className="space-y-2">
                      <label
                        className="text-[10px] font-bold tracking-widest uppercase ml-1"
                        style={classes.text.muted}
                      >
                        Capacity Unit
                      </label>
                      <select
                        value={formData.installed_capacity_unit || "MW"}
                        onChange={(e) =>
                          setFormData({ ...formData, installed_capacity_unit: e.target.value })
                        }
                        className="w-full rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                        style={{
                          ...classes.input.bg,
                          borderWidth: "1px",
                          borderStyle: "solid",
                        }}
                      >
                        <option value="MW">MW</option>
                        <option value="kW">kW</option>
                        <option value="GW">GW</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label
                        className="text-[10px] font-bold tracking-widest uppercase ml-1"
                        style={classes.text.muted}
                      >
                        Latitude <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        step="0.0001"
                        required
                        value={formData.latitude}
                        onChange={(e) => {
                          setFormData({ ...formData, latitude: parseFloat(e.target.value) });
                          setValidationErrors((prev) => ({ ...prev, latitude: "" }));
                        }}
                        className="w-full rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                        style={{
                          ...classes.input.bg,
                          borderWidth: "1px",
                          borderStyle: "solid",
                        }}
                      />
                      {fieldError("latitude")}
                    </div>

                    <div className="space-y-2">
                      <label
                        className="text-[10px] font-bold tracking-widest uppercase ml-1"
                        style={classes.text.muted}
                      >
                        Longitude <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        step="0.0001"
                        required
                        value={formData.longitude}
                        onChange={(e) => {
                          setFormData({ ...formData, longitude: parseFloat(e.target.value) });
                          setValidationErrors((prev) => ({ ...prev, longitude: "" }));
                        }}
                        className="w-full rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                        style={{
                          ...classes.input.bg,
                          borderWidth: "1px",
                          borderStyle: "solid",
                        }}
                      />
                      {fieldError("longitude")}
                    </div>

                    <div className="space-y-2 col-span-2">
                      <label
                        className="text-[10px] font-bold tracking-widest uppercase ml-1"
                        style={classes.text.muted}
                      >
                        Description
                      </label>
                      <textarea
                        value={formData.description || ""}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        rows={4}
                        className="w-full rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all resize-none"
                        style={{
                          ...classes.input.bg,
                          borderWidth: "1px",
                          borderStyle: "solid",
                        }}
                        placeholder="Project technical details..."
                      />
                    </div>

                    <div className="space-y-2 col-span-2">
                      <label
                        className="text-[10px] font-bold tracking-widest uppercase ml-1"
                        style={classes.text.muted}
                      >
                        Technical Highlights
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {TECHNICAL_HIGHLIGHT_FIELDS.map((field) => (
                          <div key={field} className="space-y-1">
                            <label
                              className="text-[10px] font-bold tracking-widest uppercase ml-1"
                              style={classes.text.muted}
                            >
                              {field}
                            </label>
                            <input
                              value={getTechnicalHighlightValue(field)}
                              onChange={(e) => setTechnicalHighlightValue(field, e.target.value)}
                              className="w-full rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all normal-case"
                              style={{
                                ...classes.input.bg,
                                borderWidth: "1px",
                                borderStyle: "solid",
                              }}
                              placeholder={`Enter ${field.toLowerCase()}...`}
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3 col-span-2">
                      <div className="flex items-center justify-between">
                        <label
                          className="text-[10px] font-bold tracking-widest uppercase ml-1"
                          style={classes.text.muted}
                        >
                          Scope Memberships
                        </label>
                        <button
                          type="button"
                          onClick={() => setIsMembershipModalOpen(true)}
                          disabled={!editingProject?.id}
                          className="bg-blue-600/10 hover:bg-blue-600/20 disabled:opacity-50 text-blue-500 px-3 py-2 rounded-lg flex items-center gap-2 font-semibold transition-all border border-blue-500/20 text-xs"
                        >
                          <Tag className="h-3.5 w-3.5" />
                          Manage Memberships
                        </button>
                      </div>
                      <div className="text-xs normal-case" style={classes.text.secondary}>
                        {editingProject
                          ? `${projectMemberships.length} scope membership${projectMemberships.length === 1 ? "" : "s"} assigned`
                          : "Save project first, then add scope memberships and images."}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 flex gap-4 justify-end">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="px-6 py-2.5 font-bold rounded-2xl transition-all"
                      style={{
                        borderWidth: "1px",
                        borderStyle: "solid",
                        borderColor: colors.border,
                        color: colors.textSecondary,
                        backgroundColor: "transparent",
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={!formData.title?.trim()}
                      className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 px-6 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-xl shadow-blue-600/10 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Save className="h-4 w-4" />
                      {editingProject ? "Save" : "Add"}
                    </button>
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
      )}

      {isScopeModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 overflow-hidden">
          <div
            className="absolute inset-0 z-0 bg-black/60 backdrop-blur-sm w-screen h-screen"
            onClick={() => setIsScopeModalOpen(false)}
          />
          <div
            className="relative z-10 w-full max-w-xl rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[80vh]"
            style={{
              backgroundColor: theme === "dark" ? "#0a0a0a" : "#ffffff",
              border: `1px solid ${theme === "dark" ? "rgba(255,255,255,0.1)" : "#e2e8f0"}`,
            }}
          >
            <div
              className="p-8 flex items-center justify-between shrink-0"
              style={{
                borderBottom: `1px solid ${theme === "dark" ? "rgba(255,255,255,0.08)" : "#e2e8f0"}`,
              }}
            >
              <div className="flex items-center gap-3">
                <Tag className="h-6 w-6 text-blue-500" />
                <h2 className={`${montserrat.className} text-2xl`} style={classes.text.primary}>
                  Manage <span className="text-blue-500">Scopes</span>
                </h2>
              </div>
              <button onClick={() => setIsScopeModalOpen(false)} style={classes.text.muted}>
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="p-8 space-y-6 overflow-y-auto">
              <div className="space-y-4">
                <div className="flex items-center justify-between px-1">
                  <p
                    className="text-[10px] font-bold tracking-widest uppercase"
                    style={classes.text.muted}
                  >
                    Drag to Reorder
                  </p>
                  {reordering && <Loader2 className="h-3.5 w-3.5 text-blue-500 animate-spin" />}
                </div>

                <div className="space-y-2 max-h-80 overflow-y-auto pr-2 -mr-2">
                  {orderedScopes.map((scope, index) => (
                    <div
                      key={`${scope.id}-${index}`}
                      draggable
                      onDragStart={() => handleDragStart(scope.id)}
                      onDragOver={(e) => handleDragOver(e, scope.id)}
                      onDrop={() => handleDrop(scope.id)}
                      className="flex items-center gap-3 p-3 rounded-xl transition-all"
                      style={{
                        backgroundColor:
                          dragOverId === scope.id
                            ? "rgba(59,130,246,0.2)"
                            : theme === "dark"
                              ? "rgba(255,255,255,0.05)"
                              : "rgba(0,0,0,0.03)",
                        border: `1px solid ${dragOverId === scope.id ? "rgba(59,130,246,0.5)" : "transparent"}`,
                      }}
                    >
                      <GripVertical className="h-4 w-4 text-gray-400 cursor-grab" />
                      {editingScopeId === scope.id ? (
                        <>
                          <input
                            value={editingScopeName}
                            onChange={(e) => setEditingScopeName(e.target.value)}
                            onKeyDown={(e) =>
                              e.key === "Enter" && handleUpdateScope(scope.id, editingScopeName)
                            }
                            className="flex-1 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                            style={classes.input.bg}
                            autoFocus
                          />
                          <button onClick={() => handleUpdateScope(scope.id, editingScopeName)}>
                            <Check className="h-4 w-4 text-green-500" />
                          </button>
                        </>
                      ) : (
                        <>
                          <span className="flex-1 font-semibold" style={classes.text.primary}>
                            {scope.name}
                          </span>
                          <button
                            onClick={() => {
                              setEditingScopeId(scope.id);
                              setEditingScopeName(scope.name);
                            }}
                          >
                            <Pencil className="h-4 w-4 text-gray-400 hover:text-blue-500" />
                          </button>
                          <button onClick={() => handleDeleteScope(scope.id)}>
                            <Trash2 className="h-4 w-4 text-gray-400 hover:text-red-500" />
                          </button>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div
                className="pt-6"
                style={{
                  borderTop: `1px solid ${theme === "dark" ? "rgba(255,255,255,0.08)" : "#e2e8f0"}`,
                }}
              >
                <p
                  className="text-[10px] font-bold tracking-widest uppercase mb-4 ml-1"
                  style={classes.text.muted}
                >
                  Add New Scope
                </p>
                <div className="flex items-center gap-3">
                  <input
                    value={newScopeName}
                    onChange={(e) => setNewScopeName(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAddScope()}
                    placeholder="e.g. Solar Installation"
                    className="flex-1 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-gray-400 normal-case"
                    style={classes.input.bg}
                  />
                  <button
                    onClick={handleAddScope}
                    disabled={!newScopeName.trim() || addingScope}
                    className="bg-blue-600 hover:bg-blue-500 disabled:bg-blue-900 text-white p-3 rounded-xl transition-all active:scale-95 shadow-lg shadow-blue-600/20"
                  >
                    {addingScope ? (
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

      {isMembershipModalOpen && editingProject && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-6 overflow-hidden">
          <div
            className="absolute inset-0 z-0 bg-black/60 backdrop-blur-sm w-screen h-screen"
            onClick={() => setIsMembershipModalOpen(false)}
          />
          <div
            className="relative z-10 w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh]"
            style={{
              backgroundColor: theme === "dark" ? "#0a0a0a" : "#ffffff",
              border: `1px solid ${theme === "dark" ? "rgba(255,255,255,0.1)" : "#e2e8f0"}`,
            }}
          >
            <div
              className="p-8 flex items-center justify-between shrink-0"
              style={{
                borderBottom: `1px solid ${theme === "dark" ? "rgba(255,255,255,0.08)" : "#e2e8f0"}`,
              }}
            >
              <div className="flex items-center gap-3">
                <Tag className="h-6 w-6 text-blue-500" />
                <h2 className={`${montserrat.className} text-2xl`} style={classes.text.primary}>
                  Project Scope <span className="text-blue-500">Memberships</span>
                </h2>
              </div>
              <button onClick={() => setIsMembershipModalOpen(false)} style={classes.text.muted}>
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="p-8 space-y-6 overflow-y-auto">
              <div className="space-y-3">
                <p
                  className="text-[10px] font-bold tracking-widest uppercase"
                  style={classes.text.muted}
                >
                  Add Scope Membership
                </p>
                {availableScopeOptions.length === 0 ? (
                  <p className="text-sm" style={classes.text.secondary}>
                    No scope available.
                  </p>
                ) : (
                  <div className="flex flex-col md:flex-row gap-3 items-start md:items-center">
                    <select
                      value={membershipScopeId || ""}
                      onChange={(e) =>
                        setMembershipScopeId(e.target.value ? Number(e.target.value) : null)
                      }
                      className="rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                      style={classes.input.bg}
                    >
                      <option value="">Select scope</option>
                      {availableScopeOptions.map((scope) => (
                        <option key={scope.id} value={scope.id}>
                          {scope.name}
                        </option>
                      ))}
                    </select>
                  <div className="flex-1 w-full">
                    <textarea
                      value={membershipRole}
                      onChange={(e) => setMembershipRole(e.target.value)}
                      placeholder="Role for this scope"
                      className="w-full rounded-lg px-3 py-2 text-sm"
                      style={classes.input.bg}
                      rows={3}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleAddMembership}
                    disabled={!membershipScopeId || !membershipRole.trim() || isSavingMembership}
                    className="bg-blue-600 hover:bg-blue-500 disabled:bg-gray-400 text-white px-4 py-3 rounded-xl transition-all text-sm font-semibold"
                  >
                    {isSavingMembership ? "Adding..." : "Add Membership"}
                  </button>
                </div>
                )}
              </div>

              <div className="space-y-4">
                <p
                  className="text-[10px] font-bold tracking-widest uppercase"
                  style={classes.text.muted}
                >
                  Assigned Memberships
                </p>
                {projectMemberships.length === 0 ? (
                  <div className="text-sm normal-case" style={classes.text.secondary}>
                    No scope memberships assigned yet.
                  </div>
                ) : (
                  projectMemberships.map((membership) => {
                    const membershipImages = getMembershipImages(membership.id);
                    const canUploadMore = membershipImages.length < 4;

                    return (
                      <div
                        key={membership.id}
                        className="p-4 rounded-2xl space-y-3"
                        style={{
                          backgroundColor:
                            theme === "dark" ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.02)",
                          border: `1px solid ${theme === "dark" ? "rgba(255,255,255,0.08)" : "#e2e8f0"}`,
                        }}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <div className="text-sm font-semibold" style={classes.text.primary}>
                              {getScopeName(membership.project_scope_id)}
                            </div>
                            <div className="text-xs" style={classes.text.secondary}>
                              Membership ID: {membership.id}
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleDeleteMembership(membership.id)}
                            className="p-2 rounded-lg transition-all"
                            style={{ backgroundColor: "rgba(239,68,68,0.12)", color: "#f87171" }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>

                        <div className="flex items-center gap-3">
                          <textarea
                            value={roleDrafts[membership.id] ?? ""}
                            onChange={(e) =>
                              setRoleDrafts((prev) => ({
                                ...prev,
                                [membership.id]: e.target.value,
                              }))
                            }
                            placeholder="Role for this scope"
                            className="w-full rounded-lg px-3 py-2 text-sm"
                            style={classes.input.bg}
                            rows={3}
                          />
                          <button
                            type="button"
                            onClick={() => handleUpdateMembershipRole(membership.id)}
                            className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2"
                          >
                            <Save className="h-4 w-4" />
                            Save Role
                          </button>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <p
                              className="text-[10px] font-bold tracking-widest uppercase"
                              style={classes.text.muted}
                            >
                              Scope Images ({membershipImages.length}/4)
                            </p>
                            {canUploadMore && (
                              <label className="cursor-pointer text-xs font-semibold text-blue-500 flex items-center gap-1">
                                <ImageIcon className="h-3.5 w-3.5" />
                                Add Images
                                <input
                                  type="file"
                                  accept="image/*"
                                  multiple
                                  className="hidden"
                                  onChange={(e) =>
                                    handleUploadScopeImages(membership.id, e.target.files).finally(
                                      () => {
                                        e.currentTarget.value = "";
                                      },
                                    )
                                  }
                                />
                              </label>
                            )}
                          </div>

                          {membershipImages.length === 0 ? (
                            <div className="text-xs normal-case" style={classes.text.secondary}>
                              No images uploaded.
                            </div>
                          ) : (
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                              {membershipImages.map((image) => (
                                <div
                                  key={image.id}
                                  draggable
                                  onDragStart={() => handleImageDragStart(image.id)}
                                  onDragOver={(e) => handleImageDragOver(e, image.id)}
                                  onDrop={() => handleImageDrop(image.id, membership.id)}
                                  className="relative rounded-lg overflow-hidden border cursor-move transition-all"
                                  style={{
                                    borderColor:
                                      dragOverImageId === image.id
                                        ? "#3b82f6"
                                        : theme === "dark"
                                          ? "rgba(255,255,255,0.12)"
                                          : "#e2e8f0",
                                    transform:
                                      dragOverImageId === image.id ? "scale(1.02)" : "scale(1)",
                                    boxShadow:
                                      dragOverImageId === image.id ? "0 0 0 2px #3b82f6" : "none",
                                  }}
                                >
                                  {image.image && (
                                    <img
                                      src={image.image}
                                      alt="Scope"
                                      className="h-24 w-full object-cover pointer-events-none"
                                    />
                                  )}
                                  <div className="absolute top-1 right-1 flex gap-1">
                                    <button
                                      type="button"
                                      onClick={() => deleteScopeImage.mutateAsync(image.id)}
                                      className="p-1 rounded bg-black/60 text-white"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}

                          {uploadingMembershipId === membership.id && (
                            <div className="text-xs text-blue-500">Uploading images...</div>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
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
          deleteType === "project"
            ? "Are you sure you want to delete this project? This action cannot be undone."
            : deleteType === "membership"
              ? "Are you sure you want to delete this scope membership?"
              : "Are you sure you want to delete this scope?"
        }
        confirmText="Yes"
        cancelText="No"
      />
      {toast && <Toast message={toast.message} type={toast.type} onClose={hideToast} />}
    </div>
  );
}
