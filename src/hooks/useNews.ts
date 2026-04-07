import { useQuery } from "@tanstack/react-query";
import { apiFetch, NewsDetail, NewsCategory, NewsListResponse } from "../lib/api";

export function useNewsCategories() {
  return useQuery<NewsCategory[]>({
    queryKey: ["news-categories"],
    queryFn: () => apiFetch<NewsCategory[]>("/api/home/news-categories/"),
  });
}

export function useNewsItems(categoryId?: number | null, page: number = 1, pageSize: number = 3) {
  return useQuery<NewsListResponse>({
    queryKey: categoryId ? ["news", { categoryId, page, pageSize }] : ["news", { page, pageSize }],
    queryFn: () => {
      let url = `/api/home/news/?page=${page}&page_size=${pageSize}`;
      if (categoryId) {
        url += `&news_category_id=${categoryId}`;
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
