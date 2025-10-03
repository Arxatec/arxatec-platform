import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { archiveClient } from "../../services";
import type { Client } from "@/types/client";

export const useArchiveClient = () => {
  const queryClient = useQueryClient();
  const { mutateAsync: archiveClientMutation, isPending } = useMutation({
    mutationFn: (id: string) => archiveClient(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
    },
    onError: (error) => {
      toast.error("Error al archivar cliente.", {
        description: error.message,
      });
    },
  });

  const handleArchiveClient = async (client: Client) => {
    toast.promise(archiveClientMutation(client.id), {
      loading: "Archivando cliente...",
      success: "Cliente archivado correctamente.",
    });
  };

  return { handleArchiveClient, isPending };
};
