import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { archiveExternalClient } from "../../services";
import type { ExternalClient } from "@/types/client";

export const useArchiveExternalClient = () => {
  const queryClient = useQueryClient();
  const { mutateAsync: archiveExternalClientMutation, isPending } = useMutation(
    {
      mutationFn: (id: string) => archiveExternalClient(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["external-clients"] });
      },
      onError: (error) => {
        toast.error("Error al archivar cliente.", {
          description: error.message,
        });
      },
    }
  );

  const handleArchiveExternalClient = async (client: ExternalClient) => {
    toast.promise(archiveExternalClientMutation(client.id), {
      loading: "Archivando cliente...",
      success: "Cliente archivado correctamente.",
    });
  };

  return { handleArchiveExternalClient, isPending };
};
