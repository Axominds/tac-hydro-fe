"use client";

import { useState, useEffect, useRef } from "react";
import { Plus, Edit2, Trash2, Loader2, X, Save, GripVertical, Check, Tag, Users } from "lucide-react";
import { Montserrat } from "next/font/google";
import { useAdminTheme, getThemedClasses } from "../../../../src/hooks/useAdminTheme";
import { useModalContext } from "../../layout";
import { useTeamMembers, useTeamCategories, useTeamMemberCategories } from "../../../../src/hooks/useTeam";
import { useTeamMemberMutations, useTeamCategoryMutations, useTeamMemberCategoryMutations } from "../../../../src/hooks/useAdminMutations";
import { TeamMember, TeamCategory, TeamMemberCategory, apiFetch } from "../../../../src/lib/api";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["600", "700"] });

export default function TeamPage() {
  const { theme, colors, mounted } = useAdminTheme();
  const { setIsModalOpen: setContextModalOpen } = useModalContext();
  const classes = getThemedClasses(theme);

  const { data: members, isLoading: loadingMembers } = useTeamMembers();
  const { data: categories, isLoading: loadingCategories } = useTeamCategories();
  const { data: memberCategories, isLoading: loadingMemberCategories } = useTeamMemberCategories();

  const { createTeamMember, updateTeamMember, deleteTeamMember } = useTeamMemberMutations();
  const { createTeamCategory, updateTeamCategory, deleteTeamCategory, reorderTeamCategories } = useTeamCategoryMutations();
  const { addMemberCategory, removeMemberCategory } = useTeamMemberCategoryMutations();

  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [addingCategory, setAddingCategory] = useState(false);
  const [editingCategoryId, setEditingCategoryId] = useState<number | null>(null);
  const [editingCategoryName, setEditingCategoryName] = useState("");

  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [memberFormData, setMemberFormData] = useState({
    name: "",
    education: "",
    bio: "",
    is_active: true,
  });
  const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null);
  const [isSavingMember, setIsSavingMember] = useState(false);

  const [orderedCategories, setOrderedCategories] = useState<TeamCategory[]>([]);
  const [reordering, setReordering] = useState(false);
  const [dragOverId, setDragOverId] = useState<number | null>(null);
  const dragItemId = useRef<number | null>(null);

  const [memberCategoryMap, setMemberCategoryMap] = useState<Record<number, number[]>>({});

  const setIsCategoryModal = (open: boolean) => {
    setIsCategoryModalOpen(open);
    setContextModalOpen(open);
  };

  const setIsMemberModal = (open: boolean) => {
    setIsMemberModalOpen(open);
    setContextModalOpen(open);
  };

  useEffect(() => {
    if (categories) {
      const sorted = [...categories].sort((a, b) => a.order - b.order);
      if (JSON.stringify(sorted) !== JSON.stringify(orderedCategories)) {
        setOrderedCategories(sorted);
      }
    }
  }, [categories]);

  useEffect(() => {
    if (members && memberCategories) {
      const map: Record<number, number[]> = {};
      memberCategories.forEach((mc) => {
        if (!map[mc.team_member_id]) {
          map[mc.team_member_id] = [];
        }
        map[mc.team_member_id].push(mc.category_id);
      });
      setMemberCategoryMap(map);
    }
  }, [members, memberCategories]);

  if (!mounted || loadingMembers || loadingCategories || loadingMemberCategories) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  const isDark = theme === "dark";

  // Category handlers
  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) return;
    setAddingCategory(true);
    await createTeamCategory.mutateAsync({ name: newCategoryName.trim() });
    setNewCategoryName("");
    setAddingCategory(false);
  };

  const handleUpdateCategory = async (id: number, name: string) => {
    await updateTeamCategory.mutateAsync({ id, data: { name } });
    setEditingCategoryId(null);
    setEditingCategoryName("");
  };

  const handleDeleteCategory = async (id: number) => {
    if (window.confirm("Delete this category?")) {
      await deleteTeamCategory.mutateAsync(id);
    }
  };

  const handleCategoryDragStart = (id: number) => {
    dragItemId.current = id;
  };

  const handleCategoryDragOver = (e: React.DragEvent, id: number) => {
    e.preventDefault();
    setDragOverId(id);
  };

  const handleCategoryDrop = async (targetId: number) => {
    const sourceId = dragItemId.current;
    if (!sourceId || sourceId === targetId) {
      setDragOverId(null);
      dragItemId.current = null;
      return;
    }

    const newOrder = [...orderedCategories];
    const fromIdx = newOrder.findIndex(c => c.id === sourceId);
    const toIdx = newOrder.findIndex(c => c.id === targetId);
    const [moved] = newOrder.splice(fromIdx, 1);
    newOrder.splice(toIdx, 0, moved);

    setOrderedCategories(newOrder);
    dragItemId.current = null;
    setDragOverId(null);

    setReordering(true);
    try {
      await reorderTeamCategories.mutateAsync(
        newOrder.map((c, idx) => ({ id: c.id, order: idx + 1 }))
      );
    } finally {
      setReordering(false);
    }
  };

  // Member handlers
  const openMemberModal = (member?: TeamMember) => {
    if (member) {
      setEditingMember(member);
      setMemberFormData({
        name: member.name,
        education: member.education || "",
        bio: member.bio || "",
        is_active: member.is_active,
      });
    } else {
      setEditingMember(null);
      setMemberFormData({ name: "", education: "", bio: "", is_active: true });
    }
    setSelectedPhoto(null);
    setIsMemberModal(true);
  };

  const handleMemberSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!memberFormData.name.trim()) return;
    setIsSavingMember(true);
    try {
      if (editingMember) {
        await updateTeamMember.mutateAsync({ id: editingMember.id, data: memberFormData });
      } else {
        await createTeamMember.mutateAsync(memberFormData);
      }
      setIsMemberModal(false);
    } finally {
      setIsSavingMember(false);
    }
  };

  const handleMemberDelete = async (id: number) => {
    if (window.confirm("Delete this team member?")) {
      await deleteTeamMember.mutateAsync(id);
    }
  };

  const getMemberCategories = (memberId: number): number[] => {
    return memberCategoryMap[memberId] || [];
  };

  const toggleMemberCategory = async (memberId: number, categoryId: number, isAdding: boolean) => {
    if (isAdding) {
      await addMemberCategory.mutateAsync({ team_member_id: memberId, category_id: categoryId });
    } else {
      const mc = memberCategories?.find(
        m => m.team_member_id === memberId && m.category_id === categoryId
      );
      if (mc) {
        await removeMemberCategory.mutateAsync(mc.id);
      }
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className={`${montserrat.className} text-3xl font-bold mb-2`} style={classes.text.primary}>
            Team <span className="text-blue-500">Members</span>
          </h1>
          <p style={classes.text.secondary}>Manage team members and their categories.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsCategoryModal(true)}
            className="bg-blue-600/10 hover:bg-blue-600/20 text-blue-500 px-4 py-2.5 rounded-xl flex items-center gap-2 font-semibold transition-all border border-blue-500/20"
          >
            <Tag className="h-4 w-4" />
            Manage Categories
          </button>
          <button
            onClick={() => openMemberModal()}
            className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 font-semibold transition-all shadow-lg shadow-blue-600/20 active:scale-95"
          >
            <Plus className="h-5 w-5" />
            Add
          </button>
        </div>
      </div>

      {/* Members Grid */}
      {members?.length === 0 ? (
        <div className="text-center py-12" style={classes.text.muted}>
          <Users className="h-12 w-12 mx-auto mb-4 opacity-30" />
          <p>No team members added yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {members?.map((member) => (
            <div
              key={member.id}
              className="rounded-2xl p-4"
              style={classes.card.default}
            >
              <div className="flex gap-4">
                {member.profile_photo || member.photo ? (
                  <img
                    src={member.profile_photo || member.photo || ""}
                    alt={member.name}
                    className="w-20 h-20 object-cover rounded-xl"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-xl bg-blue-500/20 flex items-center justify-center">
                    <Users className="h-8 w-8 text-blue-500" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold truncate" style={classes.text.primary}>{member.name}</h3>
                  {member.education && (
                    <p className="text-sm truncate" style={classes.text.secondary}>{member.education}</p>
                  )}
                  <div className="flex flex-wrap gap-1 mt-2">
                    {getMemberCategories(member.id).map((catId) => {
                      const cat = categories?.find(c => c.id === catId);
                      return cat ? (
                        <span
                          key={catId}
                          className="text-xs px-2 py-0.5 rounded bg-blue-500/20 text-blue-500"
                        >
                          {cat.name}
                        </span>
                      ) : null;
                    })}
                  </div>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => openMemberModal(member)}
                  className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm"
                  style={{ backgroundColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)" }}
                >
                  <Edit2 className="h-4 w-4" />
                  Edit
                </button>
                <button
                  onClick={() => handleMemberDelete(member.id)}
                  className="p-2 rounded-lg"
                  style={{ backgroundColor: "rgba(239,68,68,0.1)" }}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Category Modal */}
      {isCategoryModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 overflow-hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsCategoryModal(false)} />
          <div
            className="relative z-10 w-full max-w-md rounded-3xl overflow-hidden flex flex-col max-h-[80vh]"
            style={{ backgroundColor: colors.modalBg, border: `1px solid ${colors.border}` }}
          >
            <div className="p-6 flex items-center justify-between" style={{ borderBottom: `1px solid ${colors.border}` }}>
              <div className="flex items-center gap-3">
                <Tag className="h-5 w-5 text-blue-500" />
                <h2 className={`${montserrat.className} text-xl font-bold`} style={{ color: colors.text }}>
                  Manage Categories
                </h2>
              </div>
              <button onClick={() => setIsCategoryModal(false)}>
                <X className="h-5 w-5" style={{ color: colors.textMuted }} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <p className="text-xs" style={{ color: colors.textMuted }}>Drag to reorder</p>
              <div className="space-y-2">
                {orderedCategories.map((category) => (
                  <div
                    key={category.id}
                    draggable
                    onDragStart={() => handleCategoryDragStart(category.id)}
                    onDragOver={(e) => handleCategoryDragOver(e, category.id)}
                    onDrop={() => handleCategoryDrop(category.id)}
                    className="flex items-center gap-3 p-3 rounded-xl transition-all"
                    style={{
                      backgroundColor: dragOverId === category.id
                        ? "rgba(59,130,246,0.2)"
                        : isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)",
                    }}
                  >
                    <GripVertical className="h-4 w-4 text-gray-400 cursor-grab" />
                    {editingCategoryId === category.id ? (
                      <>
                        <input
                          value={editingCategoryName}
                          onChange={(e) => setEditingCategoryName(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && handleUpdateCategory(category.id, editingCategoryName)}
                          className="flex-1 rounded-lg px-3 py-2 text-sm"
                          style={classes.input.bg}
                          autoFocus
                        />
                        <button onClick={() => handleUpdateCategory(category.id, editingCategoryName)}>
                          <Check className="h-4 w-4 text-green-500" />
                        </button>
                      </>
                    ) : (
                      <>
                        <span className="flex-1 font-medium" style={{ color: colors.text }}>{category.name}</span>
                        <button
                          onClick={() => {
                            setEditingCategoryId(category.id);
                            setEditingCategoryName(category.name);
                          }}
                        >
                          <Edit2 className="h-4 w-4" style={{ color: colors.textMuted }} />
                        </button>
                        <button onClick={() => handleDeleteCategory(category.id)}>
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </button>
                      </>
                    )}
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddCategory()}
                  placeholder="New category name"
                  className="flex-1 rounded-lg px-3 py-2 text-sm"
                  style={classes.input.bg}
                />
                <button
                  onClick={handleAddCategory}
                  disabled={addingCategory || !newCategoryName.trim()}
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium disabled:opacity-50"
                >
                  {addingCategory ? <Loader2 className="h-4 w-4 animate-spin" /> : "Add"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Member Modal */}
      {isMemberModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 overflow-hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsMemberModal(false)} />
          <div
            className="relative z-10 w-full max-w-lg rounded-3xl overflow-hidden flex flex-col max-h-[90vh]"
            style={{ backgroundColor: colors.modalBg, border: `1px solid ${colors.border}` }}
          >
            <div className="p-6 flex items-center justify-between" style={{ borderBottom: `1px solid ${colors.border}` }}>
              <h2 className={`${montserrat.className} text-xl font-bold`} style={{ color: colors.text }}>
                {editingMember ? "Edit" : "Add"} Member
              </h2>
              <button onClick={() => setIsMemberModal(false)}>
                <X className="h-5 w-5" style={{ color: colors.textMuted }} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <div>
                <label className="block text-sm mb-1" style={{ color: colors.textMuted }}>Name</label>
                <input
                  value={memberFormData.name}
                  onChange={(e) => setMemberFormData({ ...memberFormData, name: e.target.value })}
                  className="w-full rounded-lg px-3 py-2 text-sm"
                  style={classes.input.bg}
                  placeholder="Member name"
                />
              </div>
              <div>
                <label className="block text-sm mb-1" style={{ color: colors.textMuted }}>Education</label>
                <input
                  value={memberFormData.education}
                  onChange={(e) => setMemberFormData({ ...memberFormData, education: e.target.value })}
                  className="w-full rounded-lg px-3 py-2 text-sm"
                  style={classes.input.bg}
                  placeholder="Education/Qualifications"
                />
              </div>
              <div>
                <label className="block text-sm mb-1" style={{ color: colors.textMuted }}>Bio</label>
                <textarea
                  value={memberFormData.bio}
                  onChange={(e) => setMemberFormData({ ...memberFormData, bio: e.target.value })}
                  className="w-full rounded-lg px-3 py-2 text-sm"
                  style={classes.input.bg}
                  placeholder="Short bio"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm mb-1" style={{ color: colors.textMuted }}>Photo</label>
                <div className="flex items-center gap-4">
                  {editingMember?.photo && !selectedPhoto && (
                    <img src={editingMember.photo} alt="Current" className="h-20 w-20 object-cover rounded-lg" />
                  )}
                  <label className="cursor-pointer">
                    <span className="text-sm font-medium text-blue-500">
                      {selectedPhoto ? "Change" : "Choose"} Photo
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => e.target.files?.[0] && setSelectedPhoto(e.target.files[0])}
                    />
                  </label>
                </div>
              </div>
              {editingMember && (
                <div>
                  <label className="block text-sm mb-2" style={{ color: colors.textMuted }}>Categories</label>
                  <div className="space-y-2">
                    {categories?.map((category) => {
                      const isAssigned = getMemberCategories(editingMember.id).includes(category.id);
                      return (
                        <label key={category.id} className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={isAssigned}
                            onChange={(e) => toggleMemberCategory(editingMember.id, category.id, e.target.checked)}
                            className="w-4 h-4 rounded"
                          />
                          <span style={{ color: colors.text }}>{category.name}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
            <div className="p-6 flex justify-end gap-3">
              <button
                onClick={() => setIsMemberModal(false)}
                className="px-4 py-2 rounded-lg text-sm font-medium"
                style={{ color: colors.textMuted }}
              >
                Cancel
              </button>
              <button
                onClick={handleMemberSave}
                disabled={isSavingMember}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold flex items-center gap-2 disabled:opacity-50"
              >
                {isSavingMember && <Loader2 className="h-4 w-4 animate-spin" />}
                <Save className="h-4 w-4" />
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}