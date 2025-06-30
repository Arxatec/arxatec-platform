import { useEffect } from "react";
import { useTitle } from "~/hooks/useTitle";
import { useGetCategoriesCase, useGetLawyers } from "../../hooks";
import { CreateCaseContent } from "../organism";
import { ToastManager } from "~/components/molecules/toast_manager";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "~/routes/routes";
import { LoaderState } from "../atoms";

export default function CreateCasePage() {
  const { changeTitle } = useTitle();
  const navigate = useNavigate();
  const { data, isPending, isError } = useGetCategoriesCase();
  const {
    data: dataLawyers,
    isPending: isPendingLawyers,
    isError: isErrorLawyers,
  } = useGetLawyers();

  const showErrorAndRedirect = (title: string, message: string) => {
    ToastManager.error(title, message);
    navigate(ROUTES.Client.CasesPersonal);
  };

  useEffect(() => {
    changeTitle("Crear caso - Arxatec");
  }, []);

  useEffect(() => {
    if (isError || isErrorLawyers) {
      showErrorAndRedirect(
        "Sucedió un error",
        "Al obtener la información de los casos sucedió un error. Por favor, inténtelo de nuevo. Si el problema persiste, contacte al administrador."
      );
      return;
    }

    if (Array.isArray(data) && data.length === 0) {
      showErrorAndRedirect(
        "No se encontró ninguna categoría de los casos",
        "No se encontró ninguna categoría de los casos. Por favor, inténtelo de nuevo. Si el problema persiste, contacte al administrador."
      );
    }
  }, [isError, isErrorLawyers, data, navigate]);

  if (isPending || isPendingLawyers) return <LoaderState />;

  return (
    !isError &&
    !isErrorLawyers && (
      <CreateCaseContent categories={data} lawyers={dataLawyers} />
    )
  );
}
