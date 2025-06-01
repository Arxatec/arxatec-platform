import { SpinnerLoader } from "~/components/atoms";
import { useArticleForm } from "../../hooks/use_article_form";
import { useEffect } from "react";
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

export default function ArticleEditorPage() {
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
  const { mutationCreate, mutationUpdate } = useArticleMutations(
    reset,
    setLocation
  );

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

  // Renderizado condicional para loading
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <SpinnerLoader color="gray" size={32} />
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

        {!categoriesPending && !categoriesError && (
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
