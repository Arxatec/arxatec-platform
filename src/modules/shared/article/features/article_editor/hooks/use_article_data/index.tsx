import { useMemo } from "react";
import { useArticleContent, useCategories } from "..";
import type { ApiCategory, Category } from "../../models";

export const useArticleData = (
  isCreate: boolean,
  contentUrl: string | null
) => {
  const {
    data: categoriesResponse,
    isPending: categoriesPending,
    isError: categoriesError,
  } = useCategories();

  const {
    data: articleContent,
    refetch: fetchArticleContent,
    isPending: articleContentPending,
    isError: articleContentError,
  } = useArticleContent(contentUrl);

  const categories: Category[] = useMemo(
    () =>
      categoriesResponse?.data?.map((cat: ApiCategory) => ({
        id: cat.id,
        value: cat.name.toLowerCase().replace(/\s+/g, "-"),
        name: cat.name,
      })) || [],
    [categoriesResponse?.data]
  );

  const isLoading = useMemo(
    () => categoriesPending || (!isCreate && articleContentPending),
    [categoriesPending, isCreate, articleContentPending]
  );

  return {
    categories,
    articleContent,
    fetchArticleContent,
    isLoading,
    categoriesError,
    articleContentError,
    categoriesPending,
  };
};
