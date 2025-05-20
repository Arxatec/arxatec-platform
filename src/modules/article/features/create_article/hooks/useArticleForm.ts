import { useState } from "react";
import type { Category } from "./useCreateArticle";

export interface ArticleForm {
  title: string;
  category: Category | null;
  banner: File | null;
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

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const initialForm: ArticleForm = {
  title: "",
  category: null,
  banner: null,
  content: "",
};

export const useArticleForm = (init: Partial<ArticleForm> = {}) => {
  const [form, setForm] = useState<ArticleForm>({ ...initialForm, ...init });
  const [errors, setErrors] = useState<ArticleFormErrors>({});
  const [touched, setTouched] = useState<ArticleFormTouched>({});

  const validate = (values: ArticleForm): ArticleFormErrors => {
    const newErrors: ArticleFormErrors = {};
    if (!values.title.trim()) newErrors.title = "El título es obligatorio";
    if (!values.category) newErrors.category = "La categoría es obligatoria";
    if (!values.banner) newErrors.banner = "La portada es obligatoria";
    else if (values.banner.size > MAX_FILE_SIZE)
      newErrors.banner = "La imagen no puede superar los 5MB";
    else if (!values.banner.type.startsWith("image/"))
      newErrors.banner = "El archivo debe ser una imagen";
    if (
      !values.content ||
      values.content.replace(/<(.|\n)*?>/g, "").trim() === ""
    )
      newErrors.content = "El contenido es obligatorio";
    return newErrors;
  };

  const handleChange = (field: keyof ArticleForm, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => {
      const next = { ...prev };
      const fieldError = validate({ ...form, [field]: value })[field];
      if (fieldError) next[field] = fieldError;
      else delete next[field];
      return next;
    });
  };

  const handleBlur = (field: keyof ArticleForm) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => {
      const next = { ...prev };
      const fieldError = validate(form)[field];
      if (fieldError) next[field] = fieldError;
      else delete next[field];
      return next;
    });
  };

  const handleSubmit = (onValid: (form: ArticleForm) => void) => {
    const validation = validate(form);
    setErrors(validation);
    setTouched({ title: true, category: true, banner: true, content: true });
    if (Object.keys(validation).length === 0) {
      onValid(form);
    }
  };

  const isValid = Object.keys(validate(form)).length === 0;

  const reset = () => {
    setForm(initialForm);
    setErrors({});
    setTouched({});
  };

  return {
    form,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isValid,
    reset,
  };
};
