import { useMutation } from "@tanstack/react-query";
import { createArticle } from "../../services";
import { ToastManager } from "~/components/molecules/toast_manager";

export const useCreateArticleMutation = (onSuccess: () => void) => {
  return useMutation({
    mutationFn: (formData: FormData) => createArticle(formData),
    onSuccess,
    onError: () => {
      ToastManager.error(
        "Error al crear el artículo",
        "Opps, algo salió mal al intentar crear el artículo, intenta nuevamente o contacta a soporte."
      );
    },
  });
};
