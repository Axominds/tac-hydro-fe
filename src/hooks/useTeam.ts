import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiFetch, TeamMember, TeamMemberCategory, TeamCategory } from "../lib/api";

export function useTeamMembers() {
  return useQuery<TeamMember[]>({
    queryKey: ["team-members"],
    queryFn: () => apiFetch<TeamMember[]>("/api/about-us/team-members/"),
  });
}

export function useTeamMemberCategories() {
  return useQuery<TeamMemberCategory[]>({
    queryKey: ["team-member-categories"],
    queryFn: () => apiFetch<TeamMemberCategory[]>("/api/about-us/team-member-categories/"),
  });
}

export function useTeamCategories() {
  return useQuery<TeamCategory[]>({
    queryKey: ["team-categories"],
    queryFn: () => apiFetch<TeamCategory[]>("/api/about-us/team-categories/"),
  });
}

export interface TeamMemberWithCategories extends TeamMember {
  categories: {
    categoryId: number;
    categoryName: string;
    technical_expertise: string;
    role: string;
    order: number;
    categoryOrder: number;
  }[];
}

export function useTeamMembersWithCategories() {
  const { data: members, ...rest } = useTeamMembers();
  const { data: memberCategories } = useTeamMemberCategories();
  const { data: teamCategories } = useTeamCategories();

  const membersWithCategories = useMemo(() => {
    if (!members || !memberCategories || !teamCategories) return [];

    const categoryMap: Record<number, string> = {};
    teamCategories.forEach((c) => {
      categoryMap[c.id] = c.name;
    });

    const categoryOrderMap: Record<number, number> = {};
    teamCategories.forEach((c, idx) => {
      categoryOrderMap[c.id] = idx;
    });

    const memberCategoryMap: Record<number, TeamMemberCategory[]> = {};
    memberCategories.forEach((mc) => {
      if (!memberCategoryMap[mc.team_member_id]) {
        memberCategoryMap[mc.team_member_id] = [];
      }
      memberCategoryMap[mc.team_member_id].push(mc);
    });

    return members
      .filter((m) => m.is_active)
      .map((member) => {
        const cats = memberCategoryMap[member.id] || [];
        return {
          ...member,
          categories: cats
            .map((mc) => ({
              categoryId: mc.category_id,
              categoryName: categoryMap[mc.category_id] || "Unknown",
              technical_expertise: mc.technical_expertise,
              role: mc.role,
              order: mc.order,
              categoryOrder: categoryOrderMap[mc.category_id] ?? 0,
            }))
            .sort((a, b) => a.categoryOrder - b.categoryOrder || a.order - b.order),
        };
      });
  }, [members, memberCategories, teamCategories]);

  const groupedMembers = useMemo(() => {
    if (!membersWithCategories.length) return {};

    const grouped: Record<string, TeamMemberWithCategories[]> = {};
    membersWithCategories.forEach((member) => {
      if (member.categories.length > 0) {
        member.categories.forEach((cat) => {
          const categoryName = cat.categoryName;
          if (!grouped[categoryName]) {
            grouped[categoryName] = [];
          }
          if (!grouped[categoryName].find((m) => m.id === member.id)) {
            grouped[categoryName].push(member);
          }
        });
      }
    });
    return grouped;
  }, [membersWithCategories]);

  return {
    data: membersWithCategories,
    grouped: groupedMembers,
    ...rest,
  };
}
