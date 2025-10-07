import { createExternalClient } from "../../services";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { ROUTES } from "@/routes/routes";
import { useNavigate } from "react-router-dom";
import type { CreateExternalClientSchemaType } from "../../types";

export const useCreateExternalClient = () => {
  const navigate = useNavigate();
  const { mutate: createClientMutation, isPending } = useMutation({
    mutationFn: (data: FormData) => createExternalClient(data),
  });

  const onSuccess = () => {
    navigate(ROUTES.Lawyer.ViewClients);
    toast.success("Cliente creado correctamente", {
      description:
        "Te estamos redirigiendo a la lista de clientes, tu cliente se encuentra en la lista de clientes.",
    });
  };

  const onError = (error: Error) => {
    toast.error("Error al crear cliente", {
      description: error.message,
    });
  };

  const onSubmit = (data: CreateExternalClientSchemaType) => {
    const createClientFormData = new FormData();
    if (data.avatar) {
      createClientFormData.append("avatar", data.avatar as File);
    }
    createClientFormData.append("full_name", data.full_name);
    createClientFormData.append("email", data.email);
    createClientFormData.append("phone", data.phone);
    createClientFormData.append("dni", data.dni);

    createClientMutation(createClientFormData, {
      onSuccess,
      onError,
    });
  };

  return { onSubmit, isPending };
};
