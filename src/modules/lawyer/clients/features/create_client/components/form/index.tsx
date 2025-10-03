import type { CreateClientSchemaType } from "../../types";
import { useForm, useWatch } from "react-hook-form";
import { createClientSchema } from "../../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, FormInput } from "@/components/ui";
import { Loader2, PlusIcon } from "lucide-react";
import { AvatarInput } from "../../../../components";
import { useCreateClient } from "../../hooks";

export const Form = () => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<CreateClientSchemaType>({
    resolver: zodResolver(createClientSchema),
  });

  const fullName = useWatch({
    control,
    name: "full_name",
    defaultValue: "",
  });
  const handleAvatarChange = (file: File | undefined) => {
    setValue("avatar", file);
  };

  const { onSubmit, isPending } = useCreateClient();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex items-center justify-between gap-2">
        <h1 className="text-2xl font-bold font-serif mt-4">Crear cliente</h1>
        <Button type="submit" disabled={isPending}>
          {isPending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <PlusIcon />
          )}
          {isPending ? "Creando..." : "Crear cliente"}
        </Button>
      </div>

      <div className="mt-8">
        <AvatarInput
          fullName={fullName}
          onAvatarChange={handleAvatarChange}
          className="mt-4"
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
