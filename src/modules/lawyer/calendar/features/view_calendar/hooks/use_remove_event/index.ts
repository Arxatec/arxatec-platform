import { toast } from "sonner";
import { deleteEvent } from "../../services";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useRemoveEvent = () => {
  const queryClient = useQueryClient();
  const { mutateAsync: deleteEventMutation, isPending } = useMutation({
    mutationFn: (id: string) => deleteEvent(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["calendar-events"] });
    },
    onError: (error) => {
      toast.error("Error al eliminar evento.", {
        description: error.message,
      });
    },
  });

  const handleRemoveEvent = (id: string) => {
    toast.promise(deleteEventMutation(id), {
      loading: "Eliminando evento...",
      success: "Evento eliminado correctamente.",
    });
  };

  return { handleRemoveEvent, isPending };
};
