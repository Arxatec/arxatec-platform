import { useMutation } from "@tanstack/react-query";
import { updateClient } from "../../services";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/routes/routes";
import type { UpdateClientSchemaType } from "../../types";

export const useUpdateClient = (id: string) => {
  const navigate = useNavigate();
  const { mutate: updateClientMutation, isPending } = useMutation({
    mutationFn: (data: FormData) => updateClient(id, data),
  });

  const onSuccess = () => {
    navigate(ROUTES.Lawyer.ViewClients);
    toast.success("Cliente editado correctamente", {
      description:
        "Te estamos redirigiendo a la lista de clientes, tu cliente se encuentra en la lista de clientes.",
    });
  };

  const onError = (error: Error) => {
    toast.error("Error al editar cliente", {
      description: error.message,
    });
  };

  const onSubmit = (data: UpdateClientSchemaType) => {
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
