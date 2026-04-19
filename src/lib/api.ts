import Cookies from "js-cookie";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL;

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

function subscribeToTokenRefresh(callback: (token: string) => void) {
  refreshSubscribers.push(callback);
}

function onTokenRefreshed(token: string) {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
}

async function refreshAccessToken(): Promise<boolean> {
  const refreshToken = Cookies.get("refresh_token");
  if (!refreshToken) {
    return false;
  }

  try {
    const response = await fetch(`${BASE_URL}/api/auth/token-refresh/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh: refreshToken }),
    });

    if (!response.ok) {
      return false;
    }

    const data = await response.json();
    Cookies.set("access_token", data.access, { expires: 1, secure: true, sameSite: "strict" });
    onTokenRefreshed(data.access);
    return true;
  } catch {
    return false;
  }
}

function clearAuthAndRedirect() {
  Cookies.remove("access_token");
  Cookies.remove("refresh_token");
  if (typeof window !== "undefined") {
    window.location.href = "/admin/login";
  }
}

interface FetchOptions {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: any;
  headers?: Record<string, string>;
  requireAuth?: boolean;
  _retry?: boolean;
}

export async function apiFetch<T>(path: string, options: FetchOptions = {}): Promise<T> {
  const { method = "GET", body, headers = {}, requireAuth = false, _retry = false } = options;

  const token = Cookies.get("access_token");

  const isFormData = body instanceof FormData;

  const defaultHeaders: Record<string, string> = {};
  if (!isFormData) {
    defaultHeaders["Content-Type"] = "application/json";
  }

  if (token && (requireAuth || method !== "GET")) {
    defaultHeaders["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: { ...defaultHeaders, ...headers },
    body: isFormData ? body : (body ? JSON.stringify(body) : undefined),
  });

  if (res.status === 401 && !_retry) {
    if (isRefreshing) {
      return new Promise((resolve) => {
        subscribeToTokenRefresh((newToken) => {
          resolve(
            apiFetch(path, {
              method,
              body,
              headers,
              requireAuth,
              _retry: true,
            })
          );
        });
      });
    }

    isRefreshing = true;
    const refreshed = await refreshAccessToken();
    isRefreshing = false;

    if (refreshed) {
      return apiFetch(path, {
        method,
        body,
        headers,
        requireAuth,
        _retry: true,
      });
    }

    clearAuthAndRedirect();
    throw new Error("Session expired. Please login again.");
  }

  if (!res.ok) {
    throw new Error(`${path} → ${res.status}`);
  }

  if (method === "DELETE") {
    return {} as T;
  }

  return res.json();
}

export function getImageUrl(path: string | null | undefined): string | null {
  if (!path) return null;
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  return `${BASE_URL}/${path}`;
}

export interface AboutPageSection {
  id: number;
  section_key: string;
  title: string;
  content_html: string;
  image: string | null;
}

export interface CorePrinciplesIntro {
  id: number;
  title: string;
  content_html: string;
  image: string | null;
  image_caption_title: string | null;
  image_caption_subtitle: string | null;
}

export type CorePrinciplesIntroList = CorePrinciplesIntro[];

export interface CorePrinciple {
  id: number;
  title: string;
  description: string | null;
  icon_key: string;
  color_class: string;
  order: number;
}

export interface SiteSettings {
  id: number;
  company_name: string;
  tagline: string | null;
  address: string | null;
  phone: string | null;
  contact_email: string | null;
  collaboration_email: string | null;
  business_hours: string | null;
  facebook_url: string | null;
  linkedin_url: string | null;
  map_embed_url: string | null;
  organization_chart_image: string | null;
  founded_year?: number | null;
}

export type SiteSettingsList = SiteSettings[];

export interface ValuedPartner {
  id: number;
  name: string;
  logo: string | null;
  order: number;
}

export interface ExpertiseCategory {
  id: number;
  title: string;
  icon_key: string;
  order: number;
  theme_color: string | null;
}

export interface ExpertiseItem {
  id: number;
  category_id: number;
  title: string;
  project_scope_id: number | null;
  order: number;
}

export interface ServiceSector {
  id: number;
  title: string;
  image: string | null;
  description: string | null;
  order: number;
}

export interface ProjectScope {
  id: number;
  name: string;
  order: number;
}

export interface Project {
  id: number;
  title: string;
  status: string | null;
  installed_capacity: number;
  installed_capacity_unit: string;
  latitude: number;
  longitude: number;
  description: string | null;
  technical_highlights: Record<string, string> | null;
  image_urls?: string[];
}

export interface ProjectScopeMembership {
  id: number;
  project_id: number;
  project_scope_id: number;
  role: string | null;
  image_urls: string[];
}

export interface ProjectScopeImage {
  id: number;
  project_scope_membership_id: number;
  alt_text: string | null;
  order: number;
  image: string | null;
}

export interface NewsCategory {
  id: number;
  name: string;
  order: number;
}

export interface NewsItem {
  id: number;
  title: string;
  news_category_id: number;
  image: string | null;
  news_date: string;
  summary: string | null;
  content_html: string | null;
  is_published?: boolean;
  published_at?: string | null;
}

export interface NewsDetail {
  id: number;
  title: string;
  news_category_id: number;
  image: string | null;
  news_date: string;
  published_at: string | null;
  summary: string | null;
  content_html: string | null;
  is_published: boolean;
}

export interface NewsListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: NewsItem[];
}

export interface JobPosting {
  id: number;
  title: string;
  category: number;
  type: string;
  location: string | null;
  description: string | null;
  responsibilities: string[] | null;
  qualifications: string[] | null;
  is_open: boolean;
  published_at: string | null;
}

export interface JobCategory {
  id: number;
  name: string;
  order: number;
}

export interface TeamMember {
  id: number;
  name: string;
  education: string | null;
  bio: string | null;
  photo: string | null;
  profile_photo?: string | null;
  is_active: boolean;
}

export interface TeamMemberCategory {
  id: number;
  team_member_id: number;
  category_id: number;
  technical_expertise: string;
  role: string;
  order: number;
}

export interface TeamCategory {
  id: number;
  name: string;
  order: number;
}

export interface Banner {
  id: number;
  headline: string;
  subheadline: string | null;
  background_image: string | null;
  typewriter_words: string[] | null;
}

export interface Stats {
  mw_capacity: number;
  projects_count: number;
  clients_count: number;
  team_members_count: number;
  years: number;
}

export interface GalleryImage {
  id: number;
  gallery_subcategory_id: number;
  order: number;
  image: string;
}

export interface GallerySubcategory {
  id: number;
  category_id: number;
  name: string;
  order: number;
}

export interface GalleryCategory {
  id: number;
  name: string;
  order: number;
}