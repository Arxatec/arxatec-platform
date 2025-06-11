export interface Category {
  id: number;
  value: string;
  name: string;
}
export interface ApiCategory {
  id: number;
  name: string;
  description: string;
}
export interface ArticleForm {
  title: string;
  category: Category | null;
  banner: File | string | null;
  content: string;
}
export interface ArticleFormErrors {
  title?: string;
  category?: string;
  banner?: string;
  content?: string;
}
export interface ArticleFormTouched {
  title?: boolean;
  category?: boolean;
  banner?: boolean;
  content?: boolean;
}
export interface ArticleData {
  title: string;
  category_id: number;
  banner: string;
  content?: string;
}
export interface RouteParams {
  id: string;
  content: string;
}
