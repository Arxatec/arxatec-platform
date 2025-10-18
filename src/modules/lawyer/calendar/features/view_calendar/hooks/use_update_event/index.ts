import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateEvent } from "../../services";
import type { UpdateEventRequest } from "../../types";

export const useUpdateEvent = (
  id: string,
  onClose: () => void,
  onReset: () => void
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateEventRequest) => updateEvent(id, data),
    onSuccess: () => {
      toast.success("Evento actualizado correctamente", {
        description:
          "El evento ha sido actualizado exitosamente, el modal se cerrará y se actualizará el calendario.",
      });
      onClose();
      onReset();
      queryClient.invalidateQueries({ queryKey: ["calendar-events"] });
    },
    onError: (error: Error) => {
      toast.error("Error al actualizar evento", { description: error.message });
    },
  });
};
