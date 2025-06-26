import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "../../services";
import type { CreateClientRequest } from "../../types";

interface UseCreateClientReturn {
  createClientMutation: ReturnType<typeof useMutation>;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  isSuccess: boolean;
  mutateAsync: (data: CreateClientRequest) => Promise<void>;
}

export const useCreateClient = (): UseCreateClientReturn => {
  const queryClient = useQueryClient();

  const createClientMutation = useMutation({
    mutationFn: (clientData: CreateClientRequest) => {
      // Crear FormData directamente aquí
      const formData = new FormData();
      formData.append("full_name", clientData.full_name);
      formData.append("phone", clientData.phone);
      formData.append("dni", clientData.dni);
      formData.append("email", clientData.email);

      if (clientData.avatar) {
        // Manejar tanto File como FileList
        const file =
          clientData.avatar instanceof FileList && clientData.avatar.length > 0
            ? clientData.avatar[0]
            : clientData.avatar instanceof File
            ? clientData.avatar
            : null;

        if (file) {
          formData.append("avatar", file);
        }
      }

      return createClient(formData);
    },
    onSuccess: () => {
      // Invalidar las queries de clientes para refrescar la lista
      queryClient.invalidateQueries({ queryKey: ["external_clients"] });
    },
    onError: (error: Error) => {
      console.error("Error al crear cliente:", error.message);
    },
  });

  return {
    createClientMutation,
    isLoading: createClientMutation.isPending,
    isError: createClientMutation.isError,
    error: createClientMutation.error,
    isSuccess: createClientMutation.isSuccess,
    mutateAsync: createClientMutation.mutateAsync,
  };
};
