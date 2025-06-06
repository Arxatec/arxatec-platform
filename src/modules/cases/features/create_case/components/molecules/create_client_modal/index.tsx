import { Dialog, DialogPanel, DialogBackdrop } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { CustomInput } from "~/components/atoms";
import { useClientsStore } from "../../../store/clients.store";
import type { Client } from "../../../store/clients.store";

interface CreateClientModalProps {
  open: boolean;
  onClose: () => void;
  onClientCreated: (client: Client) => void;
}

type FormValues = Omit<Client, "id" | "imageUrl"> & {
  avatar: FileList;
};

export const CreateClientModal = ({
  open,
  onClose,
  onClientCreated,
}: CreateClientModalProps) => {
  const addClient = useClientsStore((state) => state.addClient);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    const avatar = data.avatar[0];
    const imageUrl = avatar
      ? URL.createObjectURL(avatar)
      : `https://ui-avatars.com/api/?name=${encodeURIComponent(
          data.name
        )}&background=random`;

    const newClient = {
      ...data,
      imageUrl,
    };

    addClient(newClient);
    onClientCreated({
      ...newClient,
      id: 0, // El ID real será asignado por el store
    });
    reset();
    onClose();
  };

  return (
    <Dialog className="relative z-50" open={open} onClose={onClose}>
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-950/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto p-4 sm:p-6 md:p-20">
        <DialogPanel className="mx-auto max-w-xl transform overflow-hidden rounded-xl bg-white p-6 shadow-2xl ring-1 ring-black/5 transition-all">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Crear nuevo cliente
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <CustomInput
                {...register("name", { required: "El nombre es requerido" })}
                label="Nombre completo"
                placeholder="Ej. Juan Pérez"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div>
              <CustomInput
                {...register("phone", { required: "El teléfono es requerido" })}
                label="Teléfono"
                placeholder="Ej. +1234567890"
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.phone.message}
                </p>
              )}
            </div>
            <div>
              <CustomInput
                {...register("email", {
                  required: "El email es requerido",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Email inválido",
                  },
                })}
                label="Email"
                placeholder="Ej. juan@ejemplo.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <CustomInput
                {...register("role")}
                label="Rol"
                placeholder="Ej. Gerente"
              />
            </div>
            <div>
              <CustomInput
                {...register("url")}
                label="Dirección"
                placeholder="Ej. Calle Principal #123"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Foto de perfil
              </label>
              <input
                type="file"
                accept="image/*"
                {...register("avatar")}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Crear cliente
              </button>
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
};
