import { useArticleForm } from "../../hooks/use_article_form";
import { useEffect, useRef } from "react";
import {
  BannerUploader,
  CategorySelector,
  ContentEditor,
  Header,
  TitleInput,
} from "../molecules";

import {
  useArticleNavigation,
  useArticleSubmit,
  useArticleMutations,
  usePageTitle,
  useArticleData,
  useErrorHandling,
  useArticleFormData,
} from "../../hooks";
import { ToastManager } from "~/components/molecules/toast_manager";

export default function ArticleEditorPage() {
  const isFirstRender = useRef(true);
  // Navegación y parámetros
  const { isCreate, articleId, contentUrl, setLocation, onBack } =
    useArticleNavigation();

  // Formulario
  const {
    form,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isValid,
    reset,
    setForm,
  } = useArticleForm();

  // Datos del artículo
  const {
    categories,
    articleContent,
    fetchArticleContent,
    isLoading,
    categoriesError,
    articleContentError,
    categoriesPending,
  } = useArticleData(isCreate, contentUrl);

  // Mutaciones
  const { mutationCreate, mutationUpdate } = useArticleMutations(reset);

  // Submit
  const { onSubmit } = useArticleSubmit(
    isCreate,
    articleId,
    mutationCreate,
    mutationUpdate
  );

  // Efectos
  usePageTitle(isCreate);
  useErrorHandling(isCreate, categoriesError, articleContentError, setLocation);
  useArticleFormData(isCreate, articleContent, categories, setForm);

  // Efecto para cargar contenido del artículo (solo en modo edición)
  useEffect(() => {
    if (!isCreate) {
      fetchArticleContent();
    }
  }, [isCreate, fetchArticleContent]);

  useEffect(() => {
    if (!isFirstRender.current) return;

    if (categories.length === 0) {
      ToastManager.error(
        "No se encontraron categorías",
        "Sucedio un error al encontrar categorias no encontramos ninguna, vuelve a intentarlo o contacta al soporte."
      );
      setTimeout(() => {
        window.history.back();
      }, 2000);
    }

    isFirstRender.current = false;
  }, [categories]);

  // Renderizado condicional para loading
  if (isLoading) {
    return (
      <div className="max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 min-h-screen">
        <div className="h-[200px] w-full bg-slate-200 animate-pulse rounded-lg"></div>
        <div className="h-[400px] w-full bg-slate-200 animate-pulse rounded-lg mt-2"></div>
        <div className="h-[700px] w-full bg-slate-200 animate-pulse rounded-lg mt-2"></div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 min-h-screen">
      <Header
        onBack={onBack}
        isCreate={isCreate}
        handleSubmit={handleSubmit}
        isValid={isValid}
        onSubmit={onSubmit}
        mutationCreate={mutationCreate}
        mutationUpdate={mutationUpdate}
      />

      <div className="bg-white rounded-lg p-4 mt-2 space-y-4">
        <TitleInput
          value={form.title}
          onChange={(v) => handleChange("title", v)}
          onBlur={() => handleBlur("title")}
          error={errors.title}
          touched={touched.title}
        />

        {!categoriesPending && !categoriesError && categories.length > 0 && (
          <CategorySelector
            categories={categories}
            value={form.category}
            onChange={(v) => handleChange("category", v)}
            onBlur={() => handleBlur("category")}
            error={errors.category}
            touched={touched.category}
          />
        )}
      </div>

      <div className="bg-white rounded-lg p-4 mt-2 space-y-4">
        <BannerUploader
          value={form.banner}
          onChange={(f) => handleChange("banner", f)}
          onBlur={() => handleBlur("banner")}
          error={errors.banner}
          touched={touched.banner}
        />

        <ContentEditor
          value={form.content}
          onChange={(v) => handleChange("content", v)}
          onBlur={() => handleBlur("content")}
          error={errors.content}
          touched={touched.content}
        />
      </div>
    </div>
  );
}
