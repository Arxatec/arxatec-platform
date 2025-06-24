import { useCallback } from "react";
import { ToastManager } from "~/components/molecules/toast_manager";
import type { ArticleForm } from "../../models";
import { useNavigate } from "react-router-dom";

export const useArticleSubmit = (
  isCreate: boolean,
  articleId: string | undefined,
  mutationCreate: { mutate: (data: FormData) => void },
  mutationUpdate: { mutate: (data: { formData: FormData; id: string }) => void }
) => {
  const navigate = useNavigate();
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
          // Si es un archivo, lo agregamos directamente
          if (key === "banner" && value instanceof File) {
            fd.append(key, value);
          } else {
            fd.append(key, transform ? transform(value) : String(value));
          }
        }
      };

      appendIfExists("title", formData.title);
      appendIfExists("categoryId", formData.category?.id, String);

      // Manejo específico para el banner
      if (formData.banner instanceof File) {
        fd.append("banner", formData.banner);
      }

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
          navigate("/articulos");
        }, 2000);
      }
    },
    [isCreate, articleId, mutationCreate, mutationUpdate]
  );

  return { onSubmit };
};
