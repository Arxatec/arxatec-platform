import { useEffect } from "react";
import { useTitle } from "~/hooks/useTitle";
import { useGetCategoriesCase, useGetClients } from "../../hooks";
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
    data: dataClients,
    isPending: isPendingClients,
    isError: isErrorClients,
    error: errorClients,
  } = useGetClients();

  const showErrorAndRedirect = (title: string, message: string) => {
    ToastManager.error(title, message);
    navigate(ROUTES.Lawyer.Cases);
  };

  useEffect(() => {
    changeTitle("Crear caso - Arxatec");
  }, []);

  useEffect(() => {
    if (isError || isErrorClients) {
      console.log(isError, isErrorClients, errorClients);
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
  }, [isError, isErrorClients, data, navigate]);

  useEffect(() => {
    console.log(dataClients);
  }, [dataClients]);

  if (isPending || isPendingClients) return <LoaderState />;

  return (
    !isError &&
    !isErrorClients && (
      <CreateCaseContent categories={data} clients={dataClients} />
    )
  );
}
