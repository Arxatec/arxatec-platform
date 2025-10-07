import { useMutation } from "@tanstack/react-query";
import { updateExternalClient } from "../../services";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/routes/routes";
import type { UpdateExternalClientSchemaType } from "../../types";

export const useUpdateExternalClient = (id: string) => {
  const navigate = useNavigate();
  const { mutate: updateClientMutation, isPending } = useMutation({
    mutationFn: (data: FormData) => updateExternalClient(id, data),
  });

  const onSuccess = () => {
    navigate(ROUTES.Lawyer.ViewClients);
    toast.success("Cliente editado correctamente", {
      description:
        "Te estamos redirigiendo a la lista de clientes, tu cliente se encuentra en la lista de clientes.",
    });
  };

  const onError = (error: Error) => {
    toast.error("Error al editar cliente externo", {
      description: error.message,
    });
  };

  const onSubmit = (data: UpdateExternalClientSchemaType) => {
    const updateClientFormData = new FormData();
    if (data.avatar) {
      updateClientFormData.append("avatar", data.avatar as File);
    }
    updateClientFormData.append("full_name", data.full_name);
    updateClientFormData.append("email", data.email);
    updateClientFormData.append("phone", data.phone);
    updateClientFormData.append("dni", data.dni);

    updateClientMutation(updateClientFormData, {
      onSuccess,
      onError,
    });
  };

  return { onSubmit, isPending };
};
