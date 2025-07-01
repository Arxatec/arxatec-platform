import { archiveCase } from "../../services";
import { useToastMutation } from "~/components/molecules/toast_manager";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "~/routes/routes";

export const useArchiveCase = () => {
  const navigate = useNavigate();
  return useToastMutation({
    mutationOptions: {
      mutationFn: (id: string) => archiveCase(id),
      onSuccess: () => {
        navigate(ROUTES.Client.CasesPersonal);
      },
    },
    toastOptions: {
      loading: {
        title: "Archivando caso",
        content: "Estamos archivando tu caso, por favor espera un momento.",
      },
      success: {
        title: "Caso archivado correctamente",
        content: "Tu caso fue archivado correctamente.",
      },
      error: {
        title: "Error al archivar el caso",
        content:
          "Opps sucedio un error, intenta nuevamente por favor, si el problema persiste, contacta con el administrador.",
      },
    },
  });
};
