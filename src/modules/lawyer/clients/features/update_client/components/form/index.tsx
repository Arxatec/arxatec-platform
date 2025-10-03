import { useForm, useWatch } from "react-hook-form";
import type { UpdateClientSchemaType } from "../../types";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateClientSchema } from "../../schemas";
import { Button, FormInput } from "@/components/ui";
import { Loader2, PencilIcon } from "lucide-react";
import type { Client } from "@/types/client";
import { useUpdateClient } from "../../hooks";
import { AvatarInput } from "../../../../components";

interface Props {
  defaultValues: Client;
}

export const Form: React.FC<Props> = ({ defaultValues }) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<UpdateClientSchemaType>({
    resolver: zodResolver(updateClientSchema),
    defaultValues: {
      full_name: defaultValues.full_name,
      email: defaultValues.email || "",
      phone: defaultValues.phone,
      dni: defaultValues.dni,
    },
  });

  const fullName = useWatch({
    control,
    name: "full_name",
    defaultValue: defaultValues.full_name,
  });

  const handleAvatarChange = (file: File | undefined) => {
    setValue("avatar", file);
  };

  const { onSubmit, isPending } = useUpdateClient(defaultValues.id);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex items-center justify-between gap-2">
        <h1 className="text-2xl font-bold font-serif mt-4">Editar cliente</h1>
        <Button type="submit" disabled={isPending}>
          {isPending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <PencilIcon />
          )}
          {isPending ? "Editando..." : "Editar cliente"}
        </Button>
      </div>

      <div className="mt-8">
        <AvatarInput
          fullName={fullName}
          onAvatarChange={handleAvatarChange}
          className="mt-4"
          defaultAvatar={defaultValues.profile_image || undefined}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4">
          <FormInput
            label="Nombre y apellido"
            name="full_name"
            type="text"
            placeholder="Ej. Juan Perez"
            register={register}
            errors={errors}
          />
          <FormInput
            label="Correo electrónico"
            name="email"
            type="email"
            placeholder="Ej. juan@gmail.com"
            register={register}
            errors={errors}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4">
          <FormInput
            label="Documento de identidad"
            name="dni"
            type="text"
            placeholder="Ej. 12345678"
            register={register}
            errors={errors}
          />
          <FormInput
            label="Número de contacto"
            name="phone"
            type="text"
            placeholder="Ej. +51 999999999"
            register={register}
            errors={errors}
          />
        </div>
      </div>
    </form>
  );
};
