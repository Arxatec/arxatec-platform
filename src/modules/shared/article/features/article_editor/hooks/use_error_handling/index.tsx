import { useEffect } from "react";
import { useLocation } from "wouter";
import { ToastManager } from "~/components/molecules/toast_manager";

export const useErrorHandling = (
  isCreate: boolean,
  categoriesError: boolean,
  articleContentError: boolean,
  setLocation: (location: string) => void
) => {
  const [location] = useLocation();
  useEffect(() => {
    if (isCreate && categoriesError) {
      ToastManager.error(
        "Error al cargar las categorías del artículo",
        "Sucedió un error inesperado al intentar cargar las categorías del artículo, vuelve a intentarlo más tarde o contacta a soporte."
      );
      return;
    }

    if (
      location.includes("editar") &&
      (categoriesError || articleContentError)
    ) {
      if (articleContentError) {
        ToastManager.error(
          "Error al cargar el artículo",
          "Sucedió un error inesperado al intentar obtener el artículo, vuelve a intentarlo más tarde o contacta a soporte."
        );
        setTimeout(() => {
          setLocation("/");
        }, 2000);
      }
    }
  }, [categoriesError, articleContentError, setLocation, isCreate]);
};
