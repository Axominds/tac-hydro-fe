import { useQuery } from "@tanstack/react-query";
import { apiFetch, NewsDetail, NewsCategory, NewsListResponse } from "../lib/api";

export interface NewsCounts {
  all: number;
  published: number;
  drafts: number;
  by_category: Record<number, number>;
}

export function useNewsCategories() {
  return useQuery<NewsCategory[]>({
    queryKey: ["news-categories"],
    queryFn: () => apiFetch<NewsCategory[]>("/api/home/news-categories/"),
  });
}

export function useNewsItems(
  categoryId?: number | null,
  page: number = 1,
  pageSize: number = 100,
  isPublished?: boolean | null
) {
  return useQuery<NewsListResponse>({
    queryKey: ["news", { categoryId, page, pageSize, isPublished }],
    queryFn: () => {
      let url = `/api/home/news/?page=${page}&page_size=${pageSize}`;
      if (categoryId) {
        url += `&news_category_id=${categoryId}`;
      }
      if (isPublished !== null && isPublished !== undefined) {
        url += `&is_published=${isPublished}`;
      }
      return apiFetch<NewsListResponse>(url);
    },
    staleTime: 0,
    gcTime: 5 * 60 * 1000,
  });
}

export function useNewsDetail(id: number | null) {
  return useQuery<NewsDetail | null>({
    queryKey: ["news", id],
    queryFn: () => {
      if (!id) return null;
      return apiFetch<NewsDetail>(`/api/home/news/${id}/`);
    },
    enabled: !!id,
  });
}

export function useNewsCounts() {
  return useQuery<NewsCounts>({
    queryKey: ["news-counts"],
    queryFn: () => apiFetch<NewsCounts>("/api/home/news/counts/"),
    staleTime: 60 * 1000,
  });
}

export function useNewsByCategory() {
  const { data: categories } = useNewsCategories();
  const { data: items, ...rest } = useNewsItems();

  const newsByCategory = (() => {
    if (!categories || !items?.results) return [];

    return categories.map((category) => ({
      ...category,
      items: items.results
        .filter((item) => item.news_category_id === category.id)
        .sort((a, b) => new Date(b.news_date).getTime() - new Date(a.news_date).getTime()),
    }));
  })();

  return {
    data: newsByCategory,
    ...rest,
  };
}
