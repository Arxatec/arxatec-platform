import { useEffect } from "react";
import { useTitle } from "~/hooks";

export const usePageTitle = (isCreate: boolean) => {
  const { changeTitle } = useTitle();

  useEffect(() => {
    const title = isCreate
      ? "Crear artículo - Arxatec"
      : "Editar artículo - Arxatec";
    changeTitle(title);
  }, [changeTitle, isCreate]);
};
