import { useCallback } from "react";
import { ToastManager } from "~/components/molecules/toast_manager";
import type { ArticleForm } from "../../models";

export const useArticleSubmit = (
  isCreate: boolean,
  articleId: string | undefined,
  mutationCreate: { mutate: (data: FormData) => void },
  mutationUpdate: { mutate: (data: { formData: FormData; id: string }) => void }
) => {
  const onSubmit = useCallback(
    (formData: ArticleForm) => {
      const fd = new FormData();

      // Construir FormData de manera más limpia
      const appendIfExists = (
        key: string,
        value: unknown,
        transform?: (v: unknown) => string
      ) => {
        if (value != null) {
          fd.append(key, transform ? transform(value) : String(value));
        }
      };

      appendIfExists("title", formData.title);
      appendIfExists("categoryId", formData.category?.id, String);
      appendIfExists("banner", formData.banner);

      if (formData.content) {
        fd.append(
          "content",
          new Blob([formData.content], { type: "text/html" }),
          "index.html"
        );
      }

      // Ejecutar mutación apropiada
      if (isCreate) {
        mutationCreate.mutate(fd);
      } else if (articleId) {
        mutationUpdate.mutate({ formData: fd, id: articleId });
      } else {
        ToastManager.error(
          "Error de navegación",
          "No se pudo obtener el ID del artículo a editar, vuelve a intentarlo más tarde o contacta a soporte."
        );
        setTimeout(() => {
          window.history.back();
        }, 2000);
      }
    },
    [isCreate, articleId, mutationCreate, mutationUpdate]
  );

  return { onSubmit };
};
