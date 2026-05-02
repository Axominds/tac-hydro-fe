import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const convertToEmbedUrl = (url: string): string => {
  if (!url) return "";
  const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)/;
  const youtuBeRegex = /(?:https?:\/\/)?youtu\.be\/([^?]+)/;
  let match = url.match(youtubeRegex);
  if (match) return `https://www.youtube.com/embed/${match[1]}`;
  match = url.match(youtuBeRegex);
  if (match) return `https://www.youtube.com/embed/${match[1]}`;
  return url;
};
