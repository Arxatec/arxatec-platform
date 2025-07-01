import { useQueryClient } from "@tanstack/react-query";
import { archiveClient } from "../../services";
import { useToastMutation } from "~/components/molecules/toast_manager";

export const useArchiveClient = () => {
  const queryClient = useQueryClient();
  return useToastMutation({
    mutationOptions: {
      mutationFn: (id: string) => archiveClient(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["external-clients"] });
      },
    },
    toastOptions: {
      loading: {
        title: "Archivando cliente",
        content: "Estamos archivando tu cliente, por favor espera un momento.",
      },
      success: {
        title: "Cliente archivado correctamente",
        content: "Tu cliente fue archivado correctamente.",
      },
      error: {
        title: "Error al archivar el cliente",
        content:
          "Opps sucedio un error, intenta nuevamente por favor, si el problema persiste, contacta con el administrador.",
      },
    },
  });
};
