import { Button, FormInput, Label } from "@/components/ui";
import { ROUTES } from "@/routes/routes";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { registerSchema } from "../../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import type { RegisterSchemaType } from "../../types";
import { useMutation } from "@tanstack/react-query";
import { register as registerService } from "../../services";
import { BriefcaseIcon, Loader2, UserIcon } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

export const Form = () => {
  const [userType, setUserType] = useState<"lawyer" | "client">("lawyer");
  const navigate = useNavigate();
  const { mutate: registerUser, isPending } = useMutation({
    mutationFn: registerService,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
  });

  const onSuccess = () => {
    navigate(ROUTES.Auth.VerifyAccount);
    toast.success("Usuario registrado correctamente", {
      description:
        "Por favor, verifica tu correo electrónico para activar tu cuenta.",
    });
  };

  const onError = (error: Error) => {
    toast.error("Error al registrar usuario", {
      description: error.message,
    });
  };

  const onSubmit = (data: RegisterSchemaType) => {
    localStorage.setItem("TEMPORARY_EMAIL", data.email);
    const dataRequest = {
      ...data,
      user_type: userType,
    };
    registerUser(dataRequest, {
      onSuccess,
      onError,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-2 gap-3">
            <FormInput
              label="Nombre"
              name="first_name"
              type="text"
              placeholder="Ej. Juan"
              register={register}
              errors={errors}
            />

            <FormInput
              label="Apellido"
              name="last_name"
              type="text"
              placeholder="Ej. Perez"
              register={register}
              errors={errors}
            />
          </div>
          <FormInput
            label="Correo electrónico"
            name="email"
            type="email"
            placeholder="Ej. correo@ejemplo.com"
            register={register}
            errors={errors}
          />
          <div>
            <Label htmlFor="role">¿Qué tipo de usuario eres?</Label>
            <div className="flex items-center w-full justify-center gap-2 mt-2">
              <Button
                className={twMerge(
                  "flex-1 flex items-center justify-center gap-2 font-normal",
                  userType === "lawyer" &&
                    "text-background bg-primary! hover:text-background! opacity-100!"
                )}
                type="button"
                variant="outline"
                onClick={() => setUserType("lawyer")}
                disabled={userType === "lawyer"}
              >
                <BriefcaseIcon className="w-4 h-4" />
                Soy abogado
              </Button>
              <Button
                className={twMerge(
                  "flex-1 flex items-center justify-center gap-2 font-normal",
                  userType === "client" &&
                    "text-background bg-primary! hover:text-background! opacity-100!"
                )}
                type="button"
                variant="outline"
                onClick={() => setUserType("client")}
                disabled={userType === "client"}
              >
                <UserIcon className="w-4 h-4" />
                Soy cliente
              </Button>
            </div>
          </div>
          <FormInput
            label="Contraseña"
            name="password"
            type="password"
            placeholder="Ej. cfaWR52$!Mja"
            register={register}
            errors={errors}
          />
          <FormInput
            label="Confirmar contraseña"
            name="confirm_password"
            type="password"
            placeholder="Ej. cfaWR52$!Mja"
            register={register}
            errors={errors}
          />
          <div className="flex flex-col gap-3">
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending && <Loader2 className="size-5 animate-spin" />}
              {isPending ? "Registrando..." : "Registrarse"}
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-4 text-center text-sm text-secondary-foreground">
        ¿Ya tienes una cuenta?{" "}
        <Link
          to={ROUTES.Auth.Login}
          className="underline underline-offset-4 text-foreground"
        >
          Ingresar
        </Link>
      </div>
    </form>
  );
};
