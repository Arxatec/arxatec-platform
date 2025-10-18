import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createEvent } from "../../services";
import type { CreateEventRequest } from "../../types";

export const useCreateEvent = (onClose: () => void, onReset: () => void) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateEventRequest) => createEvent(data),
    onSuccess: () => {
      toast.success("Evento creado correctamente", {
        description:
          "El evento ha sido creado exitosamente, el modal se cerrará y se actualizará el calendario.",
      });
      onClose();
      onReset();
      queryClient.invalidateQueries({ queryKey: ["calendar-events"] });
    },
    onError: (error: Error) => {
      toast.error("Error al crear evento", { description: error.message });
    },
  });
};
