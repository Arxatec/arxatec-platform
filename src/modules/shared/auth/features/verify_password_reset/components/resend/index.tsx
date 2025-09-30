import { Button } from "@/components/ui";
import { resendCode } from "../../services";
import type { ResendRequest } from "../../types";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export const Resend = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: (data: ResendRequest) => resendCode(data),
  });

  const onSuccess = () => {
    toast.success("Código reenviado correctamente", {
      description:
        "Por favor, verifica tu correo electrónico para cambiar tu contraseña.",
    });
  };

  const onError = (message: string) => {
    toast.error("Error al reenviar código", {
      description: message,
    });
  };

  const handleResendCode = async () => {
    const resendRequest = {
      email: localStorage.getItem("TEMPORARY_EMAIL_RESET") || "",
    };
    mutate(resendRequest, {
      onSuccess,
      onError: (err) => onError(err.message),
    });
  };

  return (
    <div className="flex flex-col gap-3 mt-4">
      <p className="text-sm text-center text-secondary-foreground flex items-center justify-center gap-2">
        No recibiste el código?{" "}
        <Button
          type="button"
          disabled={isPending}
          onClick={handleResendCode}
          className="underline underline-offset-4 text-foreground bg-transparent p-0 border-none hover:bg-transparent"
        >
          {isPending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            "Reenviar código"
          )}
        </Button>
      </p>
    </div>
  );
};
