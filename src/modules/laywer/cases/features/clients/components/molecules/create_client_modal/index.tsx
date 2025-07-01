import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import {
  UserPlusIcon,
  XMarkIcon,
  PhotoIcon,
  UserIcon,
  PhoneIcon,
  IdentificationIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/solid";
import { useEffect, useRef, useState } from "react";
import { PrimaryButton, CustomInput, CustomImage } from "~/components/atoms";
import { useCreateClientForm, useCreateClient } from "../../../hooks";
import { clientValidation } from "../../../hooks/use_create_client_form";
import type { CreateClientRequest } from "../../../types";

interface CreateClientModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const CreateClientModal: React.FC<CreateClientModalProps> = ({
  open,
  setOpen,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const { register, handleSubmit, errors, isValid, reset, setValue, watch } =
    useCreateClientForm();

  const { isLoading, isSuccess, error, mutateAsync } = useCreateClient();

  // Watch avatar file changes for preview
  const avatarFile = watch("avatar");

  const onSubmit = async (data: CreateClientRequest) => {
    try {
      await mutateAsync(data);
    } catch (error) {
      console.error("Error creating client:", error);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];

      // Actualizar React Hook Form
      setValue("avatar", files);

      // Crear preview de la imagen
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setValue("avatar", undefined);
      setAvatarPreview(null);
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      setOpen(false);
      reset();
      setAvatarPreview(null);
    }
  };

  // Cerrar modal después de crear exitosamente
  useEffect(() => {
    if (isSuccess) {
      handleClose();
    }
  }, [isSuccess]);

  // Update preview when avatarFile changes
  useEffect(() => {
    if (avatarFile && avatarFile instanceof FileList && avatarFile.length > 0) {
      const file = avatarFile[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else if (!avatarFile) {
      setAvatarPreview(null);
    }
  }, [avatarFile]);

  return (
    <Dialog
      as="div"
      className="relative z-50"
      open={open}
      onClose={handleClose}
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-950/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-xl bg-white text-left shadow-2xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            {/* Header con gradiente */}
            <div className="border-b border-gray-200 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div>
                    <DialogTitle
                      as="h3"
                      className="text-base font-semibold text-gray-900"
                    >
                      Nuevo cliente
                    </DialogTitle>
                    <p className="text-sm text-gray-500">
                      Agregue la información del cliente
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleClose}
                  disabled={isLoading}
                  className="p-2 rounded-md  hover:bg-gray-100 transition-colors disabled:opacity-50"
                >
                  <XMarkIcon className="size-5 text-gray-500" />
                </button>
              </div>
            </div>

            {/* Contenido del formulario */}
            <div className="py-6 ">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="py-4">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="relative">
                      <div className="size-20 rounded-md overflow-hidden bg-gray-100  border-gray-200 shadow-inner">
                        {avatarPreview ? (
                          <CustomImage
                            src={avatarPreview}
                            alt="Vista previa del avatar"
                            className="size-full rounded-md object-cover"
                          />
                        ) : (
                          <div className="size-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                            <UserIcon className="size-8 text-gray-400" />
                          </div>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isLoading}
                        className="absolute -bottom-1 -right-1 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-lg transition-colors disabled:opacity-50"
                      >
                        <PhotoIcon className="size-3" />
                      </button>
                    </div>

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="hidden"
                      disabled={isLoading}
                    />

                    {errors.avatar && (
                      <p className="text-sm text-red-600 text-center">
                        {errors.avatar.message}
                      </p>
                    )}

                    <p className="text-xs text-gray-500 text-center">
                      Seleccione una imagen para el avatar
                    </p>
                  </div>
                  <div className="px-4 mt-4">
                    {/* Campos del formulario en grid */}
                    <div className="grid grid-cols-1 gap-6">
                      {/* Nombre completo */}
                      <div>
                        <CustomInput
                          label="Nombre completo"
                          type="text"
                          placeholder="Ingrese el nombre completo"
                          disabled={isLoading}
                          startAdornment={
                            <UserIcon className="size-4 text-gray-400" />
                          }
                          className={
                            errors.full_name
                              ? "ring-red-300 focus:outline-red-600"
                              : ""
                          }
                          {...register("full_name", clientValidation.full_name)}
                        />
                        {errors.full_name && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.full_name.message}
                          </p>
                        )}
                      </div>

                      {/* Email */}
                      <div>
                        <CustomInput
                          label="Correo electrónico"
                          type="email"
                          placeholder="correo@ejemplo.com"
                          disabled={isLoading}
                          startAdornment={
                            <EnvelopeIcon className="size-4 text-gray-400" />
                          }
                          className={
                            errors.email
                              ? "ring-red-300 focus:outline-red-600"
                              : ""
                          }
                          {...register("email", clientValidation.email)}
                        />
                        {errors.email && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.email.message}
                          </p>
                        )}
                      </div>

                      {/* Grid para teléfono y DNI */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Teléfono */}
                        <div>
                          <CustomInput
                            label="Teléfono"
                            type="tel"
                            placeholder="987654321"
                            disabled={isLoading}
                            startAdornment={
                              <PhoneIcon className="size-4 text-gray-400" />
                            }
                            className={
                              errors.phone
                                ? "ring-red-300 focus:outline-red-600"
                                : ""
                            }
                            {...register("phone", clientValidation.phone)}
                          />
                          {errors.phone && (
                            <p className="mt-1 text-sm text-red-600">
                              {errors.phone.message}
                            </p>
                          )}
                        </div>

                        {/* DNI */}
                        <div>
                          <CustomInput
                            label="DNI"
                            type="text"
                            placeholder="12345678"
                            disabled={isLoading}
                            startAdornment={
                              <IdentificationIcon className="size-4 text-gray-400" />
                            }
                            className={
                              errors.dni
                                ? "ring-red-300 focus:outline-red-600"
                                : ""
                            }
                            {...register("dni", clientValidation.dni)}
                          />
                          {errors.dni && (
                            <p className="mt-1 text-sm text-red-600">
                              {errors.dni.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Error general */}
                    {error && (
                      <div className="py-2.5 px-4 bg-red-50 border border-red-200 rounded-lg mt-4">
                        <p className="text-sm text-red-700 font-medium">
                          Error al crear cliente
                        </p>
                        <p className="text-sm text-red-600">{error.message}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Botones */}
                <div className="flex gap-3 pt-4 border-t border-gray-200 px-4">
                  <PrimaryButton
                    type="button"
                    onClick={handleClose}
                    disabled={isLoading}
                    className="flex-1 px-4 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Cancelar
                  </PrimaryButton>
                  <PrimaryButton
                    type="submit"
                    disabled={!isValid || isLoading}
                    loader={isLoading}
                    className="w-full flex-1 gap-2"
                  >
                    <UserPlusIcon className="size-4" />
                    Crear cliente
                  </PrimaryButton>
                </div>
              </form>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};
