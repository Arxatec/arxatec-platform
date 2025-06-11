import { useEffect } from "react";
import { useLocation } from "wouter";
import type { LegalCategoryModel } from "../../models";
import { ToastManager } from "~/components/molecules/toast_manager";

export function useGuardCategoriesCase(
  data: LegalCategoryModel[] | undefined,
  error: unknown,
) {
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (error) {
      ToastManager.error(
        "Sucedió un error",
        "Al obtener las categorías de los casos sucedió un error. Por favor, inténtelo de nuevo. Si el problema persiste, contacte al administrador.",
      );
      setLocation("/");
      return;
    }

    if (Array.isArray(data) && data.length === 0) {
      ToastManager.error(
        "No se encontró ninguna categoría de los casos",
        "No se encontró ninguna categoría de los casos. Por favor, inténtelo de nuevo. Si el problema persiste, contacte al administrador.",
      );
      setLocation("/");
    }
  }, [data, error, setLocation]);
}
