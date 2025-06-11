import { useMutation } from "@tanstack/react-query";
import { updateArticle } from "../../services";
import { ToastManager } from "~/components/molecules/toast_manager";

export const useUpdateArticleMutation = (onSuccess: () => void) => {
  return useMutation({
    mutationFn: ({ formData, id }: { formData: FormData; id: string }) =>
      updateArticle(formData, id),
    onSuccess,
    onError: () => {
      ToastManager.error(
        "Error al actualizar el artículo",
        "Opps, algo salió mal al intentar actualizar el artículo, intenta nuevamente o contacta a soporte."
      );
    },
  });
};
