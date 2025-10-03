import {
  Button,
  Label,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Select,
  FormInput,
  FormTextarea,
} from "@/components/ui";
import { useTitle } from "@/hooks/use_title";
import { ROUTES } from "@/routes/routes";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeftIcon, Loader2, PlusIcon } from "lucide-react";
import { useEffect } from "react";
import { useForm, useController } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { createCaseSchema } from "../schemas";
import type { CreateCaseRequest } from "../types";
import { CaseCategory } from "@/types/cases";
import { twMerge } from "tailwind-merge";
import { useMutation } from "@tanstack/react-query";
import { createCase } from "../services";
import { toast } from "sonner";

export default function CreateCasePage() {
  const { changeTitle } = useTitle();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createCaseSchema),
  });
  const { mutate: createCaseMutation, isPending } = useMutation({
    mutationFn: (data: CreateCaseRequest) => createCase(data),
  });

  const { field: categoryField } = useController({
    name: "category",
    control,
    defaultValue: CaseCategory.CIVIL,
  });

  const onSuccess = () => {
    toast.success("Caso creado correctamente", {
      description:
        "El caso ha sido creado correctamente, te redirigiremos a la lista de casos.",
    });
    navigate(ROUTES.Client.ViewCases);
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

  useEffect(() => {
    changeTitle("Crear caso - Arxatec");
  }, []);
  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      <Link to={ROUTES.Lawyer.ViewCases} className="flex items-center gap-2">
        <Button variant="outline" className="border-none">
          <ArrowLeftIcon />
          Volver
        </Button>
      </Link>
      <div className="flex items-center justify-between gap-2">
        <h1 className="text-2xl font-bold font-serif mt-4">Crear caso</h1>
        <Button disabled={isPending} type="submit">
          {isPending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <PlusIcon />
          )}
          {isPending ? "Creando..." : "Crear caso"}
        </Button>
      </div>
      <div className="mt-8 space-y-4">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
          <FormInput
            label="Título"
            name="title"
            type="text"
            placeholder="Ej. Denuncia de violencia doméstica"
            register={register}
            errors={errors}
          />
          <div className="grid gap-2 w-full">
            <Label htmlFor="category">Tipo</Label>
            <Select
              value={categoryField.value}
              onValueChange={categoryField.onChange}
            >
              <SelectTrigger
                className={twMerge(
                  "w-full",
                  errors.category && "border-rose-500/10 border"
                )}
              >
                <SelectValue placeholder="Selecciona el tipo" />
              </SelectTrigger>
              <SelectContent className="w-full">
                {Object.values(CaseCategory).map((category) => (
                  <SelectItem key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category && (
              <p className="text-sm text-rose-500">{errors.category.message}</p>
            )}
          </div>
        </div>
        <FormTextarea
          label="Descripción"
          name="description"
          placeholder="Ej. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos..."
          className="h-[150px]"
          register={register}
          errors={errors}
        />
      </div>
    </form>
  );
}
