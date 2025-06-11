import { useLocation } from "wouter";
import { CardArticle } from "../../molecules/card_article";
import type { Article } from "../../../models";
import { useQueryClient } from "@tanstack/react-query";
import { deleteArticle } from "../../../services";
import { useToastMutation } from "~/components/molecules/toast_manager";

export const ArticleList = ({
  isLoading,
  error,
  sortedArticles,
}: {
  isLoading: boolean;
  error: boolean;
  sortedArticles: Article[];
}) => {
  const queryClient = useQueryClient();

  const deleteArticleMutation = useToastMutation({
    mutationOptions: {
      mutationFn: (id: string) => deleteArticle(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["articles"] });
      },
    },
    toastOptions: {
      loading: {
        title: "Eliminando artículo",
        content: "Eliminando el artículo...",
      },
      success: {
        title: "Artículo eliminado",
        content: "El artículo se ha eliminado correctamente",
      },
      error: {
        title: "Error al eliminar el artículo",
        content:
          "Opps, algo salió mal al intentar eliminar el artículo, intenta nuevamente o contacta a soporte.",
      },
    },
  });
  const [, setLocation] = useLocation();
  return (
    !isLoading &&
    !error &&
    sortedArticles.map((article) => (
      <CardArticle
        key={article.id}
        article={article}
        onView={(id) => setLocation(`/${id}`)}
        onEdit={(id) =>
          setLocation(`/editar/${id}`, {
            state: article,
          })
        }
        onDelete={(id: string) => {
          deleteArticleMutation.mutate(id);
        }}
      />
    ))
  );
};
