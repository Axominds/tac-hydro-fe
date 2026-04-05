const BASE_URL = import.meta.env.VITE_BACKEND_API_BASE_URL;

export async function apiFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`);
  if (!res.ok) {
    throw new Error(`${path} → ${res.status}`);
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
  items: NewsItem[];
  total: number;
  has_next: boolean;
  has_previous: boolean;
  page: number;
  page_size: number;
  total_pages: number;
  next_page: number | null;
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

export interface GalleryCategory {
  id: number;
  name: string;
  order: number;
}

export interface GallerySubcategory {
  id: number;
  category_id: number;
  name: string;
  order: number;
}

export interface GalleryImage {
  id: number;
  gallery_subcategory_id: number;
  order: number;
  image: string;
}
