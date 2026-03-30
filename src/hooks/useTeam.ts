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
    position: string;
    order: number;
  }[];
}

export function useTeamMembersWithCategories() {
  const { data: members, ...rest } = useTeamMembers();
  const { data: memberCategories } = useTeamMemberCategories();
  const { data: categories } = useTeamCategories();

  const membersWithCategories: TeamMemberWithCategories[] = (() => {
    if (!members || !memberCategories || !categories) return [];

    const categoryMap: Record<number, string> = {};
    categories.forEach((c) => {
      categoryMap[c.id] = c.name;
    });

    const memberCategoryMap: Record<number, TeamMemberCategory[]> = {};
    memberCategories.forEach((mc) => {
      if (!memberCategoryMap[mc.team_member]) {
        memberCategoryMap[mc.team_member] = [];
      }
      memberCategoryMap[mc.team_member].push(mc);
    });

    return members
      .filter((m) => m.is_active)
      .map((member) => {
        const cats = memberCategoryMap[member.id] || [];
        return {
          ...member,
          categories: cats
            .map((mc) => ({
              categoryId: mc.category,
              categoryName: categoryMap[mc.category] || "Unknown",
              position: mc.position,
              order: mc.order,
            }))
            .sort((a, b) => a.order - b.order),
        };
      });
  })();

  const groupedMembers: Record<string, TeamMemberWithCategories[]> = (() => {
    if (!membersWithCategories.length) return {};

    const grouped: Record<string, TeamMemberWithCategories[]> = {};
    membersWithCategories.forEach((member) => {
      if (member.categories.length > 0) {
        const primaryCategory = member.categories[0].categoryName;
        if (!grouped[primaryCategory]) {
          grouped[primaryCategory] = [];
        }
        grouped[primaryCategory].push(member);
      }
    });
    return grouped;
  })();

  return {
    data: membersWithCategories,
    grouped: groupedMembers,
    ...rest,
  };
}
