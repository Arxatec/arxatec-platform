import { Button, FormInput } from "@/components/ui";
import { ROUTES } from "@/routes/routes";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeftIcon, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { changePasswordSchema } from "../../schemas";
import type {
  ChangePasswordRequest,
  ChangePasswordSchemaType,
} from "../../types";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { changePassword } from "../../services";

export const Form = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordSchemaType>({
    resolver: zodResolver(changePasswordSchema),
  });

  const { mutate: changePasswordMutation, isPending } = useMutation({
    mutationFn: (data: ChangePasswordRequest) => changePassword(data),
  });

  const onSuccess = () => {
    navigate(ROUTES.Auth.Login);
    toast.success("Contraseña cambiada correctamente", {
      description:
        "Te estamos dirigindo a la página de 'ingresar', gracias por registrate.",
    });
  };

  const onError = (error: Error) => {
    toast.error("Error al cambiar la contraseña", {
      description: error.message,
    });
  };

  const onSubmit = (data: ChangePasswordSchemaType) => {
    const dataRequest = {
      email: localStorage.getItem("TEMPORARY_EMAIL_RESET") || "",
      password: data.password,
      confirm_password: data.confirm_password,
    };
    changePasswordMutation(dataRequest, {
      onSuccess,
      onError,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-6">
        <FormInput
          label="Nueva contraseña"
          name="password"
          type="password"
          placeholder="Ej. cfaWR52$!Mja"
          register={register}
          errors={errors}
        />

        <div className="grid gap-3">
          <FormInput
            label="Confirmar contraseña"
            name="confirm_password"
            type="password"
            placeholder="Ej. cfaWR52$!Mja"
            register={register}
            errors={errors}
          />
        </div>
        <div className="flex flex-col gap-3">
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending && <Loader2 className="size-5 animate-spin" />}
            {isPending ? "Cambiando contraseña..." : "Cambiar contraseña"}
          </Button>
        </div>
      </div>
      <div className="mt-4 text-center text-sm text-secondary-foreground">
        <Link
          to={ROUTES.Auth.Login}
          className="flex items-center justify-center gap-2 text-foreground"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          Volver atrás
        </Link>
      </div>
    </form>
  );
};
