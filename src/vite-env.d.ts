declare module "*.css";
declare module "*.scss";
declare module "*.sass";
declare module "*.less";
declare module "*.styl";
declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.gif";
declare module "*.svg";
declare module "*.webp";
declare module "*.webm";

/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BACKEND_API_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
