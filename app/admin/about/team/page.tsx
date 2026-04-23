"use client";

import { useState, useEffect, useRef } from "react";
import { Plus, Edit2, Trash2, Loader2, X, Save, GripVertical, Check, Tag, Users } from "lucide-react";
import { Montserrat } from "next/font/google";
import { useAdminTheme, getThemedClasses } from "../../../../src/hooks/useAdminTheme";
import { useModalContext } from "../../layout";
import { useTeamMembers, useTeamCategories, useTeamMemberCategories } from "../../../../src/hooks/useTeam";
import { useTeamMemberMutations, useTeamCategoryMutations, useTeamMemberCategoryMutations } from "../../../../src/hooks/useAdminMutations";
import { useQueryClient } from "@tanstack/react-query";
import { TeamMember, TeamCategory, TeamMemberCategory, apiFetch } from "../../../../src/lib/api";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["600", "700"] });

export default function TeamPage() {
  const { theme, colors, mounted } = useAdminTheme();
  const { setIsModalOpen: setContextModalOpen } = useModalContext();
  const queryClient = useQueryClient();
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
  const [isAddToCategoryModalOpen, setIsAddToCategoryModalOpen] = useState(false);
  const [addingToCategoryId, setAddingToCategoryId] = useState<number | null>(null);
  const [selectedMemberId, setSelectedMemberId] = useState<number | null>(null);
  const [addMemberRole, setAddMemberRole] = useState("");
  const [addMemberExpertise, setAddMemberExpertise] = useState("");
  const [isSavingAddMember, setIsSavingAddMember] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [memberFormData, setMemberFormData] = useState({
    name: "",
    education: "",
profile: "",
    is_active: true,
    role: "",
    technical_expertise: "",
  });
  const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null);
  const [selectedProfilePhoto, setSelectedProfilePhoto] = useState<File | null>(null);
  const [isSavingMember, setIsSavingMember] = useState(false);

  const [orderedCategories, setOrderedCategories] = useState<TeamCategory[]>([]);
  const [reordering, setReordering] = useState(false);
  const [dragOverId, setDragOverId] = useState<number | null>(null);
  const dragItemId = useRef<number | null>(null);

  // For grouping members by category
  const [membersByCategory, setMembersByCategory] = useState<Record<number, { member: TeamMember; order: number; memberCatId: number; role: string; technical_expertise: string }[]>>({});
  const [uncategorizedMembers, setUncategorizedMembers] = useState<TeamMember[]>([]);
  const [dragOverMemberId, setDragOverMemberId] = useState<number | null>(null);
  const dragMemberItem = useRef<{ memberId: number; categoryId: number } | null>(null);

  const [memberCategoryMap, setMemberCategoryMap] = useState<Record<number, number[]>>({});

  const setIsCategoryModal = (open: boolean) => {
    setIsCategoryModalOpen(open);
    setContextModalOpen(open);
  };

  const setIsMemberModal = (open: boolean) => {
    setIsMemberModalOpen(open);
    setContextModalOpen(open);
  };

  const setIsAddToCategoryModal = (open: boolean) => {
    setIsAddToCategoryModalOpen(open);
    setContextModalOpen(open);
  };

  const handleAddMemberToCategory = async () => {
    if (!selectedMemberId || !addingToCategoryId) return;
    setIsSavingAddMember(true);
    try {
      await apiFetch("/api/about-us/team-member-categories/", {
        method: "POST",
        body: {
          team_member_id: selectedMemberId,
          category_id: addingToCategoryId,
          role: addMemberRole,
          technical_expertise: addMemberExpertise,
          order: (membersByCategory[addingToCategoryId]?.length || 0) + 1,
        },
      });
      queryClient.invalidateQueries({ queryKey: ["team-member-categories"] });
      setIsAddToCategoryModalOpen(false);
    } catch (e) {
      console.error(e);
    } finally {
      setIsSavingAddMember(false);
    }
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

      // Build members grouped by category with order and role/expertise
      const byCategory: Record<number, { member: TeamMember; order: number; memberCatId: number; role: string; technical_expertise: string }[]> = {};
      memberCategories.forEach((mc) => {
        if (!byCategory[mc.category_id]) {
          byCategory[mc.category_id] = [];
        }
        const member = members?.find(m => m.id === mc.team_member_id);
        if (member) {
          byCategory[mc.category_id].push({ member, order: mc.order, memberCatId: mc.id, role: mc.role || "", technical_expertise: mc.technical_expertise || "" });
        }
      });
      // Sort each category's members by order
      Object.keys(byCategory).forEach((catId) => {
        byCategory[parseInt(catId)].sort((a, b) => a.order - b.order);
      });
      setMembersByCategory(byCategory);

      // Find members without any category
      const memberIdsWithCategory = new Set(memberCategories.map(mc => mc.team_member_id));
      const uncategorized = members?.filter(m => !memberIdsWithCategory.has(m.id)) || [];
      setUncategorizedMembers(uncategorized);
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

  // Member drag handlers
  const handleMemberDragStart = (memberId: number, categoryId: number) => {
    dragMemberItem.current = { memberId, categoryId };
  };

  const handleMemberDragOver = (e: React.DragEvent, memberId: number) => {
    e.preventDefault();
    setDragOverMemberId(memberId);
  };

  const handleMemberDrop = async (targetMemberId: number, categoryId: number) => {
    const source = dragMemberItem.current;
    if (!source || source.categoryId !== categoryId) {
      setDragOverMemberId(null);
      dragMemberItem.current = null;
      return;
    }

    const currentMembers = membersByCategory[categoryId] || [];
    const newOrder = [...currentMembers];
    const fromIdx = newOrder.findIndex(m => m.member.id === source.memberId);
    const toIdx = newOrder.findIndex(m => m.member.id === targetMemberId);
    
    if (fromIdx === -1 || toIdx === -1) {
      setDragOverMemberId(null);
      dragMemberItem.current = null;
      return;
    }

    const [moved] = newOrder.splice(fromIdx, 1);
    newOrder.splice(toIdx, 0, moved);

    setMembersByCategory(prev => ({ ...prev, [categoryId]: newOrder }));
    dragMemberItem.current = null;
    setDragOverMemberId(null);

    try {
      await Promise.all(
        newOrder.map((m, idx) =>
          apiFetch(`/api/about-us/team-member-categories/${m.memberCatId}/`, { 
            method: "PATCH", 
            body: { order: idx + 1 } 
          })
        )
      );
    } catch (e) {
      console.error(e);
    }
  };

  // Member handlers
  const openMemberModal = (member?: TeamMember) => {
    if (member) {
      setEditingMember(member);
      const firstCat = memberCategories?.find(mc => mc.team_member_id === member.id);
      setMemberFormData({
        name: member.name,
        education: member.education || "",
        profile: member.profile || "",
        is_active: member.is_active,
        role: firstCat?.role || "",
        technical_expertise: firstCat?.technical_expertise || "",
      });
    } else {
      setEditingMember(null);
      setMemberFormData({ name: "", education: "", profile: "", is_active: true, role: "", technical_expertise: "" });
    }
    setSelectedPhoto(null);
    setSelectedProfilePhoto(null);
    setIsMemberModal(true);
  };

  const handleMemberSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!memberFormData.name.trim()) return;
    setIsSavingMember(true);
    try {
      if (editingMember) {
        const data: { name: string; education: string; profile: string; is_active: boolean; photo?: File; profile_photo?: File } = {
          name: memberFormData.name,
          education: memberFormData.education,
          profile: memberFormData.profile,
          is_active: memberFormData.is_active,
        };
        if (selectedPhoto) data.photo = selectedPhoto;
        if (selectedProfilePhoto) data.profile_photo = selectedProfilePhoto;
        await updateTeamMember.mutateAsync({ id: editingMember.id, data });
        const existingCat = memberCategories?.find(mc => mc.team_member_id === editingMember.id);
        if (existingCat) {
          await apiFetch(`/api/about-us/team-member-categories/${existingCat.id}/`, {
            method: "PATCH",
            body: { role: memberFormData.role || "", technical_expertise: memberFormData.technical_expertise || "" },
          });
        }
      } else {
        const data: { name: string; education: string; profile: string; is_active: boolean; photo?: File; profile_photo?: File } = {
          name: memberFormData.name,
          education: memberFormData.education,
          profile: memberFormData.profile,
          is_active: memberFormData.is_active,
        };
        if (selectedPhoto) data.photo = selectedPhoto;
        if (selectedProfilePhoto) data.profile_photo = selectedProfilePhoto;
        await createTeamMember.mutateAsync(data);
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

      {/* Members by Category */}
      {orderedCategories.length === 0 && uncategorizedMembers.length === 0 ? (
        <div className="text-center py-12" style={classes.text.muted}>
          <Users className="h-12 w-12 mx-auto mb-4 opacity-30" />
          <p>No team members added yet.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Uncategorized section */}
          {uncategorizedMembers.length > 0 && (
            <div>
              <h2 className={`${montserrat.className} text-lg font-semibold mb-3`} style={classes.text.primary}>
                Uncategorized
                <span className="text-sm font-normal ml-2" style={classes.text.muted}>
                  ({uncategorizedMembers.length})
                </span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {uncategorizedMembers.map((member) => (
                  <div key={member.id} className="rounded-2xl p-4" style={classes.card.default}>
                    <div className="flex gap-3">
                      {member.profile_photo ? (
                        <img src={member.profile_photo} alt={member.name} className="w-16 h-16 object-cover rounded-xl" />
                      ) : member.photo ? (
                        <img src={member.photo} alt={member.name} className="w-16 h-16 object-cover rounded-xl" />
                      ) : (
                        <div className="w-16 h-16 rounded-xl bg-blue-500/20 flex items-center justify-center">
                          <Users className="h-6 w-6 text-blue-500" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold truncate" style={classes.text.primary}>{member.name}</h3>
                        {member.education && <p className="text-sm truncate" style={classes.text.secondary}>{member.education}</p>}
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <button onClick={() => openMemberModal(member)} className="p-2.5 rounded-lg transition-all" style={{ backgroundColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)" }}>
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button onClick={() => handleMemberDelete(member.id)} className="p-2.5 rounded-lg transition-all" style={{ backgroundColor: "rgba(239,68,68,0.1)" }}>
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Categories */}
          {orderedCategories.map((category) => {
            const categoryMembers = membersByCategory[category.id] || [];
            if (categoryMembers.length === 0) return null;
            return (
              <div key={category.id}>
                <div className="flex items-center justify-between mb-3">
                  <h2 className={`${montserrat.className} text-lg font-semibold`} style={classes.text.primary}>
                    {category.name}
                    <span className="text-sm font-normal ml-2" style={classes.text.muted}>({categoryMembers.length})</span>
                  </h2>
                  <button
                    onClick={() => { setAddingToCategoryId(category.id); setSelectedMemberId(null); setAddMemberRole(""); setAddMemberExpertise(""); setIsAddToCategoryModalOpen(true); }}
                    className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1.5 transition-all"
                  >
                    <Plus className="h-3.5 w-3.5" /> Add
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categoryMembers.map(({ member, memberCatId, role, technical_expertise }) => (
                    <div key={member.id} draggable onDragStart={() => handleMemberDragStart(member.id, category.id)} onDragOver={(e) => handleMemberDragOver(e, member.id)} onDrop={() => handleMemberDrop(member.id, category.id)} className="rounded-2xl p-4 transition-all cursor-grab" style={{ ...classes.card.default, backgroundColor: dragOverMemberId === member.id ? "rgba(59,130,246,0.15)" : classes.card.default.backgroundColor }}>
                      <div className="flex gap-4">
                        {member.profile_photo || member.photo ? (
                          <img src={member.profile_photo || member.photo || ""} alt={member.name} className="w-20 h-20 object-cover rounded-xl" />
                        ) : (
                          <div className="w-20 h-20 rounded-xl bg-blue-500/20 flex items-center justify-center">
                            <Users className="h-8 w-8 text-blue-500" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold truncate" style={classes.text.primary}>{member.name}</h3>
                          {member.education && <p className="text-sm truncate" style={classes.text.secondary}>{member.education}</p>}
                          {role && <span className="inline-block mt-1 text-xs px-2 py-0.5 rounded bg-blue-500/20 text-blue-500">{role}</span>}
                          {technical_expertise && <p className="text-xs mt-1" style={{ color: colors.textMuted }}>{technical_expertise}</p>}
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <button onClick={() => openMemberModal(member)} className="p-2.5 rounded-lg transition-all" style={{ backgroundColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)" }}>
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button onClick={() => handleMemberDelete(member.id)} className="p-2.5 rounded-lg transition-all" style={{ backgroundColor: "rgba(239,68,68,0.1)" }}>
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
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
                  value={memberFormData.profile}
                  onChange={(e) => setMemberFormData({ ...memberFormData, profile: e.target.value })}
                  className="w-full rounded-lg px-3 py-2 text-sm"
                  style={classes.input.bg}
                  placeholder="Short profile"
                  rows={3}
                />
              </div>
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={memberFormData.is_active}
                    onChange={(e) => setMemberFormData({ ...memberFormData, is_active: e.target.checked })}
                    className="w-4 h-4 rounded"
                  />
                  <span style={{ color: colors.text }}>Active</span>
                </label>
              </div>
              <div>
                <label className="block text-sm mb-1" style={{ color: colors.textMuted }}>Photo</label>
                <div className="flex items-center gap-4">
                  {(selectedPhoto || editingMember?.photo) && (
                    <img
                      src={selectedPhoto ? URL.createObjectURL(selectedPhoto) : editingMember?.photo || ""}
                      alt="Current"
                      className="h-20 w-20 object-cover rounded-lg"
                    />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => e.target.files?.[0] && setSelectedPhoto(e.target.files[0])}
                    className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-500/10 file:text-blue-500 hover:file:bg-blue-500/20 transition-all cursor-pointer rounded-lg"
                    style={classes.input.bg}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm mb-1" style={{ color: colors.textMuted }}>Profile Photo</label>
                <div className="flex items-center gap-4">
                  {(selectedProfilePhoto || editingMember?.profile_photo) && (
                    <img
                      src={selectedProfilePhoto ? URL.createObjectURL(selectedProfilePhoto) : editingMember?.profile_photo || ""}
                      alt="Current"
                      className="h-20 w-20 object-cover rounded-lg"
                    />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => e.target.files?.[0] && setSelectedProfilePhoto(e.target.files[0])}
                    className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-500/10 file:text-blue-500 hover:file:bg-blue-500/20 transition-all cursor-pointer rounded-lg"
                    style={classes.input.bg}
                  />
                </div>
              </div>
              {editingMember && memberCategories?.some(mc => mc.team_member_id === editingMember.id) && (
                <>
                  <div>
                    <label className="block text-sm mb-1" style={{ color: colors.textMuted }}>Role</label>
                    <input
                      value={memberFormData.role}
                      onChange={(e) => setMemberFormData({ ...memberFormData, role: e.target.value })}
                      className="w-full rounded-lg px-3 py-2 text-sm"
                      style={classes.input.bg}
                      placeholder="e.g. Chairman, CEO, Director"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1" style={{ color: colors.textMuted }}>Technical Expertise</label>
                    <input
                      value={memberFormData.technical_expertise}
                      onChange={(e) => setMemberFormData({ ...memberFormData, technical_expertise: e.target.value })}
                      className="w-full rounded-lg px-3 py-2 text-sm"
                      style={classes.input.bg}
                      placeholder="e.g. Hydropower, Water Resources"
                    />
                  </div>
                </>
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

      {/* AddToCategory Modal */}
      {isAddToCategoryModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 overflow-hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsAddToCategoryModalOpen(false)} />
          <div
            className="relative z-10 w-full max-w-md rounded-3xl overflow-hidden flex flex-col max-h-[80vh]"
            style={{ backgroundColor: colors.modalBg, border: `1px solid ${colors.border}` }}
          >
            <div className="p-6 flex items-center justify-between" style={{ borderBottom: `1px solid ${colors.border}` }}>
              <h2 className={`${montserrat.className} text-xl font-bold`} style={{ color: colors.text }}>
                Add Member to {orderedCategories.find(c => c.id === addingToCategoryId)?.name}
              </h2>
              <button onClick={() => setIsAddToCategoryModalOpen(false)}>
                <X className="h-5 w-5" style={{ color: colors.textMuted }} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <div>
                <label className="block text-sm mb-1" style={{ color: colors.textMuted }}>Select Member</label>
                <select
                  value={selectedMemberId || ""}
                  onChange={(e) => setSelectedMemberId(Number(e.target.value) || null)}
                  className="w-full rounded-lg px-3 py-2 text-sm"
                  style={classes.input.bg}
                >
                  <option value="">Choose a member...</option>
                  {members
                    ?.filter(m => {
                      const inThisCategory = membersByCategory[addingToCategoryId || 0]?.some(cm => cm.member.id === m.id);
                      return !inThisCategory;
                    })
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((m) => (
                      <option key={m.id} value={m.id}>{m.name}</option>
                    ))}
                </select>
              </div>
              <div>
                <label className="block text-sm mb-1" style={{ color: colors.textMuted }}>Role</label>
                <input
                  value={addMemberRole}
                  onChange={(e) => setAddMemberRole(e.target.value)}
                  className="w-full rounded-lg px-3 py-2 text-sm"
                  style={classes.input.bg}
                  placeholder="e.g. Chairman, CEO, Director"
                />
              </div>
              <div>
                <label className="block text-sm mb-1" style={{ color: colors.textMuted }}>Technical Expertise</label>
                <input
                  value={addMemberExpertise}
                  onChange={(e) => setAddMemberExpertise(e.target.value)}
                  className="w-full rounded-lg px-3 py-2 text-sm"
                  style={classes.input.bg}
                  placeholder="e.g. Hydropower, Water Resources"
                />
              </div>
            </div>
            <div className="p-6 flex justify-end gap-3">
              <button
                onClick={() => setIsAddToCategoryModalOpen(false)}
                className="px-4 py-2 rounded-lg text-sm font-medium"
                style={{ color: colors.textMuted }}
              >
                Cancel
              </button>
              <button
                onClick={handleAddMemberToCategory}
                disabled={!selectedMemberId || isSavingAddMember}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold flex items-center gap-2 disabled:opacity-50"
              >
                {isSavingAddMember && <Loader2 className="h-4 w-4 animate-spin" />}
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