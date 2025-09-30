import { Button, FormInput } from "@/components/ui";
import { ROUTES } from "@/routes/routes";
import { ArrowLeftIcon, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import type { RecoverPasswordRequest } from "../../types";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { recoverPasswordSchema } from "../../schemas";
import { recoverPassword } from "../../services";

export const Form = () => {
  const navigate = useNavigate();
  const { mutate: recoverPasswordMutation, isPending } = useMutation({
    mutationFn: (data: RecoverPasswordRequest) => recoverPassword(data),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RecoverPasswordRequest>({
    resolver: zodResolver(recoverPasswordSchema),
  });

  const onError = (error: Error) => {
    toast.error("Error al recuperar contraseña", {
      description: error.message,
    });
  };

  const onSuccess = () => {
    localStorage.setItem("TEMPORARY_EMAIL_RESET", watch("email"));
    navigate(ROUTES.Auth.VerifyPasswordReset);
    toast.success("Recuperación de contraseña exitosa", {
      description: "Hemos enviado un código para recuperar tu contraseña",
    });
  };

  const onSubmit = (data: RecoverPasswordRequest) => {
    recoverPasswordMutation(data, {
      onSuccess,
      onError,
    });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-6">
        <FormInput
          label="Correo electrónico"
          name="email"
          type="email"
          placeholder="Ej. correo@ejemplo.com"
          register={register}
          errors={errors}
        />
        <div className="flex flex-col gap-3">
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending && <Loader2 className="size-5 animate-spin" />}
            {isPending ? "Recuperando..." : "Recuperar contraseña"}
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
