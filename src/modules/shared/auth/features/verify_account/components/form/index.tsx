import { Button, InputOTPGroup, InputOTPSlot, InputOTP } from "@/components/ui";
import { useMutation } from "@tanstack/react-query";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { toast } from "sonner";
import { useState } from "react";
import { verifyCode } from "../../services";
import type { VerifyCodeRequest } from "../../types";
import { Resend } from "../resend";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/routes/routes";

export const Form = () => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { mutate: verifyCodeMutation, isPending } = useMutation({
    mutationFn: (data: VerifyCodeRequest) => verifyCode(data),
  });

  const onSuccess = () => {
    navigate(ROUTES.Auth.Login);
    toast.success("Cuenta verificada exitosamente", {
      description:
        "Te estamos dirigindo a la página de 'ingresar', gracias por registrate.",
    });
  };

  const onError = (err: Error) => {
    toast.error("Código inválido o expirado", {
      description: err.message,
    });
  };

  const handleSubmit = () => {
    const email = localStorage.getItem("TEMPORARY_EMAIL") || "";
    if (!code || code.length !== 4) {
      setError("El código debe tener 4 dígitos");
      return;
    }

    setError("");
    verifyCodeMutation({ code, email }, { onSuccess, onError });
  };

  return (
    <div>
      <div className="flex justify-center items-center">
        <InputOTP
          maxLength={4}
          pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
          value={code}
          onChange={(value) => setCode(value)}
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
          </InputOTPGroup>
        </InputOTP>
      </div>
      {error && (
        <p className="text-sm mt-2 text-red-500 text-center">{error}</p>
      )}

      <Button
        onClick={handleSubmit}
        className="mt-6 w-full"
        disabled={isPending}
      >
        {isPending && <Loader2 className="size-5 animate-spin" />}
        {isPending ? "Verificando..." : "Verificar código"}
      </Button>

      <Resend />
    </div>
  );
};
