import { useEffect, useRef } from "react";
import type { ArticleData, ArticleForm, Category } from "../../models";

export const useArticleFormData = (
  isCreate: boolean,
  articleContent: string | undefined,
  categories: Category[],
  setForm: (updater: (prev: ArticleForm) => ArticleForm) => void
) => {
  const hasLoadedDataRef = useRef(false);

  useEffect(() => {
    // Solo cargar datos si no es modo creación y tenemos todos los datos necesarios
    if (
      isCreate ||
      !articleContent ||
      !categories.length ||
      !window.history.state ||
      hasLoadedDataRef.current // Prevenir carga múltiple
    ) {
      return;
    }

    const articleData: ArticleData = window.history.state;
    const selectedCategory = categories.find(
      (cat) => cat.id === articleData.category_id
    );

    setForm((prevForm) => ({
      ...prevForm,
      title: articleData.title || "",
      category: selectedCategory || null,
      banner: articleData.banner,
      content: articleContent,
    }));

    // Marcar como cargado para prevenir futuras cargas
    hasLoadedDataRef.current = true;
  }, [isCreate, articleContent, categories.length]); // Removí setForm de las dependencias

  // Reset del flag cuando se cambia el modo de creación/edición
  useEffect(() => {
    if (isCreate) {
      hasLoadedDataRef.current = false;
    }
  }, [isCreate]);
};
