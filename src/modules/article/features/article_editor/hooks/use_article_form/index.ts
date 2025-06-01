import { useState, useCallback } from "react";
import type {
  ArticleForm,
  ArticleFormErrors,
  ArticleFormTouched,
} from "../../models";

// Constants
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

// Types for form validation
type ValidationRule<T> = (value: T) => string | undefined;
type ValidationRules<T> = {
  [K in keyof T]?: ValidationRule<T[K]>;
};

// Validation rules
// NOTA: Estas reglas de validación podrían moverse a un archivo separado como:
// src/modules/article/features/article_editor/validation/article.validation.ts
const articleValidationRules: ValidationRules<ArticleForm> = {
  title: (value) => (!value?.trim() ? "El título es obligatorio" : undefined),
  category: (value) => (!value ? "La categoría es obligatoria" : undefined),
  banner: (value) => {
    if (!value) return "La portada es obligatoria";
    if (value instanceof File) {
      if (value.size > MAX_FILE_SIZE)
        return "La imagen no puede superar los 5MB";
      if (!value.type.startsWith("image/"))
        return "El archivo debe ser una imagen";
    }
    return undefined;
  },
  content: (value) => {
    if (!value || value.replace(/<(.|\n)*?>/g, "").trim() === "") {
      return "El contenido es obligatorio";
    }
    return undefined;
  },
};

// Initial form state
const initialForm: ArticleForm = {
  title: "",
  category: null,
  banner: null,
  content: "",
};

// Logger utility
// NOTA: Este logger podría moverse a un archivo separado como:
// src/shared/utils/form-logger.ts
const formLogger = {
  logFormUpdate: (prev: ArticleForm, next: ArticleForm) => {
    // Solo logear cambios significativos para evitar spam en consola
    const contentChanged = prev.content !== next.content;
    const titleChanged = prev.title !== next.title;
    const categoryChanged = prev.category?.id !== next.category?.id;
    const bannerChanged = prev.banner !== next.banner;

    if (contentChanged || titleChanged || categoryChanged || bannerChanged) {
      console.log("📝 Form actualizado:", {
        contentChanged,
        titleChanged,
        categoryChanged,
        bannerChanged,
        contentLength: next.content?.length || 0,
        timestamp: new Date().toISOString(),
      });
    }
  },
};

// Content protection utility
// NOTA: Esta utilidad podría moverse a un archivo separado como:
// src/modules/article/features/article_editor/utils/content-protection.ts
const contentProtection = {
  shouldBlockContentUpdate: (
    prevContent: string,
    newContent: string
  ): boolean => {
    const hasExistingContent = prevContent && prevContent.length > 50;
    const isEmptyContent =
      newContent.length === 0 ||
      newContent === "<p></p>" ||
      newContent === "<p><br></p>";

    console.log("🛡️ PROTECCIÓN ANTI-VACIADO:", {
      hasExistingContent,
      existingLength: prevContent?.length || 0,
      newLength: newContent.length,
      isEmptyContent,
      willBlock: hasExistingContent && isEmptyContent,
      existingStart: prevContent?.substring(0, 50) + "...",
      newStart: newContent.substring(0, 50) + "...",
      timestamp: new Date().toISOString(),
    });

    return hasExistingContent && isEmptyContent;
  },
};

// Hook implementation
export const useArticleForm = (init: Partial<ArticleForm> = {}) => {
  const [form, setForm] = useState<ArticleForm>({ ...initialForm, ...init });
  const [errors, setErrors] = useState<ArticleFormErrors>({});
  const [touched, setTouched] = useState<ArticleFormTouched>({});

  const validateField = <K extends keyof ArticleForm>(
    field: K,
    value: ArticleForm[K]
  ): string | undefined => {
    const rule = articleValidationRules[field];
    return rule ? rule(value) : undefined;
  };

  const validateForm = (values: ArticleForm): ArticleFormErrors => {
    const newErrors: ArticleFormErrors = {};
    (Object.keys(values) as Array<keyof ArticleForm>).forEach((field) => {
      const error = validateField(field, values[field]);
      if (error) newErrors[field] = error;
    });
    return newErrors;
  };

  const setFormWithLogging = useCallback(
    (updater: React.SetStateAction<ArticleForm>) => {
      if (typeof updater === "function") {
        setForm((prev) => {
          const next = updater(prev);
          formLogger.logFormUpdate(prev, next);
          return next;
        });
      } else {
        setForm((prev) => {
          formLogger.logFormUpdate(prev, updater);
          return updater;
        });
      }
    },
    []
  );

  const handleChange = (
    field: keyof ArticleForm,
    value: ArticleForm[keyof ArticleForm]
  ) => {
    if (field === "content" && typeof value === "string") {
      setForm((prev) => {
        if (contentProtection.shouldBlockContentUpdate(prev.content, value)) {
          console.log("🚫 BLOQUEANDO VACIADO DE CONTENIDO!");
          return prev;
        }
        return { ...prev, [field]: value };
      });
      setTouched((prev) => ({ ...prev, [field]: true }));
      return;
    }

    setForm((prev) => {
      const updatedForm = { ...prev, [field]: value };
      setErrors((prevErrors) => {
        const error = validateField(field, value);
        return error
          ? { ...prevErrors, [field]: error }
          : Object.fromEntries(
              Object.entries(prevErrors).filter(([key]) => key !== field)
            );
      });
      return updatedForm;
    });
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field: keyof ArticleForm) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const error = validateField(field, form[field]);
    setErrors((prev) =>
      error
        ? { ...prev, [field]: error }
        : Object.fromEntries(
            Object.entries(prev).filter(([key]) => key !== field)
          )
    );
  };

  const handleSubmit = (onValid: (form: ArticleForm) => void) => {
    const validation = validateForm(form);
    setErrors(validation);
    setTouched(
      Object.fromEntries(
        Object.keys(form).map((key) => [key, true])
      ) as ArticleFormTouched
    );
    if (Object.keys(validation).length === 0) {
      onValid(form);
    }
  };

  const reset = () => {
    setForm(initialForm);
    setErrors({});
    setTouched({});
  };

  return {
    form,
    setForm: setFormWithLogging,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isValid: Object.keys(validateForm(form)).length === 0,
    reset,
  };
};
