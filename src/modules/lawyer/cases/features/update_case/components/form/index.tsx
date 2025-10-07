import { Button, FormInput, FormSelect, FormTextarea } from "@/components/ui";
import { ClientSelect } from "../client_select";
import { Loader2, PencilIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createCaseSchema } from "../../schemas";
import type { CreateCaseRequest } from "../../types";
import { useMutation } from "@tanstack/react-query";
import { createCase } from "../../services";
import { toast } from "sonner";
import {
  CaseCategoryLabel,
  CaseStatusLabel,
  CaseUrgencyLabel,
} from "@/types/cases";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/routes/routes";
import { mapToOptions } from "@/utilities";

export const Form = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createCaseSchema),
    defaultValues: {
      urgency: "",
      category: "",
      status: "",
      external_client_id: "",
    },
  });

  const { mutate: createCaseMutation, isPending } = useMutation({
    mutationFn: (data: CreateCaseRequest) => createCase(data),
  });

  const onSuccess = () => {
    toast.success("Caso creado correctamente", {
      description:
        "El caso ha sido creado correctamente, te redirigiremos a la lista de casos.",
    });
    navigate(ROUTES.Lawyer.ViewCases);
  };

  const onError = (error: Error) => {
    toast.error("Error al crear caso", {
      description: error.message,
    });
  };

  const onSubmit = (data: CreateCaseRequest) => {
    createCaseMutation(data, {
      onSuccess,
      onError,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex items-center justify-between gap-2">
        <h1 className="text-2xl font-bold font-serif mt-4">Editar caso</h1>
        <Button disabled={isPending} type="submit">
          {isPending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <PencilIcon />
          )}
          {isPending ? "Editando..." : "Editar caso"}
        </Button>
      </div>
      <div className="mt-8">
        <FormInput
          label="Título"
          name="title"
          type="text"
          placeholder="Ej. Denuncia de violencia doméstica"
          register={register}
          errors={errors}
        />

        <div className="grid md:grid-cols-2 mt-4 gap-3">
          <FormSelect
            label="Urgencia"
            name="urgency"
            control={control}
            options={mapToOptions(CaseUrgencyLabel)}
            errors={errors}
          />
          <FormSelect
            label="Categoría"
            name="category"
            control={control}
            options={mapToOptions(CaseCategoryLabel)}
            errors={errors}
          />
          <FormSelect
            label="Estado"
            name="status"
            control={control}
            options={mapToOptions(CaseStatusLabel)}
            errors={errors}
          />

          <ClientSelect control={control} errors={errors} />
        </div>

        <div className="grid gap-3 mt-4">
          <FormTextarea
            label="Descripción"
            name="description"
            placeholder="Ej. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos..."
            className="h-[150px]"
            register={register}
            errors={errors}
          />
        </div>
      </div>
    </form>
  );
};
