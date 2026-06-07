import Cookies from "js-cookie";

export const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL;

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

export async function validateToken(): Promise<boolean> {
  const token = Cookies.get("access_token");
  if (!token) {
    return false;
  }

  try {
    const response = await fetch(`${BASE_URL}/api/auth/validate/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return false;
    }

    const data = await response.json();
    return data.is_valid === true;
  } catch {
    return false;
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
    let bodyData: any = null;
    try {
      const text = await res.text();
      try {
        bodyData = JSON.parse(text);
      } catch {
        bodyData = text;
      }
    } catch {
      // Ignore body parsing errors
    }
    const error = new Error(`${path} → ${res.status}`) as any;
    error.status = res.status;
    error.body = bodyData;
    throw error;
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

export async function downloadFile(url: string, filename: string) {
  const response = await fetch(url);
  const blob = await response.blob();
  const objectUrl = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = objectUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(objectUrl);
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
  video: string | null;
  youtube_url: string | null;
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

export interface ProjectListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Project[];
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

export interface Attachment {
  id: number;
  news_id: number;
  file: string;
  title: string;
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
  attachments: Attachment[];
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
  type: string;
  location: string | null;
  description: string | null;
  responsibilities: string[] | null;
  qualifications: string[] | null;
  is_open: boolean;
  published_at: string | null;
}

export interface JobPostingListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: JobPosting[];
}

export interface JobApplication {
  id: number;
  job_id: number;
  first_name: string;
  middle_name: string | null;
  last_name: string;
  gender: string | null;
  phone: string | null;
  email: string | null;
  degree: string | null;
  grade: string | null;
  year_completed: string | null;
  specialization: string | null;
  college: string | null;
  abilities: string | null;
  software_proficiency: string | null;
  employment_status: string | null;
  experience_sector: string | null;
  years_experience: string | null;
  joining_date: string | null;
  expected_salary: string | null;
  cv_file: string | null;
  cover_letter_file: string | null;
  submitted_at: string;
}

export interface JobApplicationListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: JobApplication[];
}

export interface TeamMember {
  id: number;
  name: string;
  education: string | null;
  profile: string | null;
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

export function extractFieldErrors(error: any): Record<string, string> {
  const body = error?.body;
  if (body && typeof body === "object" && !Array.isArray(body)) {
    const result: Record<string, string> = {};
    for (const [field, err] of Object.entries(body)) {
      result[field] = Array.isArray(err) ? err[0] : String(err);
    }
    return result;
  }
  return {};
}

export function extractValidationError(error: any): string {
  const body = error?.body;
  if (body && typeof body === "object" && !Array.isArray(body)) {
    const messages: string[] = [];
    for (const [field, errs] of Object.entries(body)) {
      const msgs = Array.isArray(errs) ? errs : [String(errs)];
      for (const m of msgs) {
        const label = field.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
        messages.push(`${label}: ${m}`);
      }
    }
    return messages.join("\n");
  }
  if (typeof body === "string") return body;
  return "Submission failed. Please try again.";
}