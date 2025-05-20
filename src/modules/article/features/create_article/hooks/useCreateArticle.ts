import { useState, useCallback } from "react";

export interface Category {
  id: number;
  value: string;
  name: string;
}

interface CreateArticleFormData {
  title: string;
  coverImage: File | null;
  content: string;
  category: Category;
}

interface UseCreateArticleReturn {
  formData: CreateArticleFormData;
  handleTitleChange: (title: string) => void;
  handleCoverImageChange: (file: File | null) => void;
  handleContentChange: (content: string) => void;
  handleCategoryChange: (category: Category) => void;
  handleSubmit: () => FormData;
  resetForm: () => void;
}

const DEFAULT_CATEGORY: Category = {
  id: 9,
  value: "otros",
  name: "Otros",
};

export const CATEGORIES: Category[] = [
  { id: 1, value: "derechos-laborales", name: "Derechos Laborales" },
  { id: 2, value: "salud", name: "Salud" },
  { id: 3, value: "educacion", name: "Educación" },
  { id: 4, value: "vivienda", name: "Vivienda" },
  { id: 5, value: "seguridad-social", name: "Seguridad Social" },
  { id: 6, value: "discapacidad", name: "Discapacidad" },
  { id: 7, value: "inmigracion", name: "Inmigración" },
  { id: 8, value: "violencia", name: "Violencia" },
  { id: 9, value: "otros", name: "Otros" },
];

export const useCreateArticle = (): UseCreateArticleReturn => {
  const [formData, setFormData] = useState<CreateArticleFormData>({
    title: "",
    coverImage: null,
    content: "",
    category: DEFAULT_CATEGORY,
  });

  const handleTitleChange = useCallback((title: string) => {
    setFormData((prev) => ({ ...prev, title }));
  }, []);

  const handleCoverImageChange = useCallback((file: File | null) => {
    setFormData((prev) => ({ ...prev, coverImage: file }));
  }, []);

  const handleContentChange = useCallback((content: string) => {
    setFormData((prev) => ({ ...prev, content }));
  }, []);

  const handleCategoryChange = useCallback((category: Category) => {
    setFormData((prev) => ({ ...prev, category }));
  }, []);

  const handleSubmit = useCallback(() => {
    const formDataToSend = new FormData();

    if (formData.title) {
      formDataToSend.append("title", formData.title);
    }

    if (formData.coverImage) {
      formDataToSend.append("banner", formData.coverImage);
    }

    if (formData.content) {
      const contentBlob = new Blob([formData.content], { type: "text/html" });
      formDataToSend.append("content", contentBlob, "index.html");
    }

    if (formData.category) {
      formDataToSend.append("categoryId", String(formData.category.id));
    }

    return formDataToSend;
  }, [formData]);

  const resetForm = useCallback(() => {
    setFormData({
      title: "",
      coverImage: null,
      content: "",
      category: DEFAULT_CATEGORY,
    });
  }, []);

  return {
    formData,
    handleTitleChange,
    handleCoverImageChange,
    handleContentChange,
    handleCategoryChange,
    handleSubmit,
    resetForm,
  };
};
