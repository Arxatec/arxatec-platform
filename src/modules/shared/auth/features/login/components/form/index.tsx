import { Label, Button, FormInput } from "@/components/ui";
import { ROUTES } from "@/routes/routes";
import { Link, useNavigate } from "react-router-dom";
import { loginSchema } from "../../schemas";
import { useForm } from "react-hook-form";
import type { LoginRequest, LoginResponse } from "../../types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../services";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useUserStore } from "@/store";
import { USER_TYPE } from "@/types";

export const Form = () => {
  const navigate = useNavigate();
  const setUser = useUserStore((s) => s.setUser);
  const { mutate: loginUser, isPending } = useMutation({
    mutationFn: (data: LoginRequest) => login(data),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>({
    resolver: zodResolver(loginSchema),
  });

  const onSuccess = (data: LoginResponse) => {
    localStorage.setItem("TOKEN_AUTH", data.token);
    localStorage.setItem("USER_AUTH", JSON.stringify(data.user));
    setUser(data.user);
    toast.success("Ingreso exitoso", {
      description:
        "Bienvenido a Arxatec, estamos encantados de tenerte de nuevo.",
    });
    if (data.user.user_type === USER_TYPE.LAWYER) {
      navigate(ROUTES.Lawyer.ViewCases);
    } else {
      navigate(ROUTES.Client.ViewCases);
    }
  };

  const onError = (error: Error) => {
    toast.error("Error al ingresar", {
      description: error.message,
    });
  };

  const onSubmit = (data: LoginRequest) => {
    loginUser(data, {
      onSuccess: (data) => onSuccess(data),
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
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Contraseña</Label>
            <Link
              to={ROUTES.Auth.RecoverPassword}
              className="ml-auto inline-block text-sm underline-offset-4 hover:underline text-secondary-foreground"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
          <FormInput
            name="password"
            type="password"
            placeholder="Ej. cfaWR52$!Mja"
            register={register}
            errors={errors}
          />
        </div>
        <div className="flex flex-col gap-3">
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending && <Loader2 className="size-5 animate-spin" />}
            {isPending ? "Ingresando..." : "Ingresar"}
          </Button>
        </div>
      </div>
      <div className="mt-4 text-center text-sm text-secondary-foreground">
        ¿No tienes una cuenta?{" "}
        <Link
          to={ROUTES.Auth.Register}
          className="underline underline-offset-4 text-foreground"
        >
          Registrarse
        </Link>
      </div>
    </form>
  );
};
