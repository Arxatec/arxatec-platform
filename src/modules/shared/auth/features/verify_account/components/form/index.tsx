import { Button, InputOTPGroup, InputOTPSlot, InputOTP } from "@/components/ui";
import { ROUTES } from "@/routes/routes";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { Link } from "react-router-dom";

export const Form = () => {
  return (
    <form>
      <div className="flex justify-center items-center">
        <InputOTP maxLength={5} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
          </InputOTPGroup>
        </InputOTP>
      </div>
      <div className="flex flex-col gap-3 mt-6">
        <Button type="submit" className="w-full">
          Verificar código
        </Button>
        <p className="text-sm text-center text-secondary-foreground">
          No recibiste el código?{" "}
          <Link
            to={ROUTES.Auth.VerifyAccount}
            className="underline underline-offset-4 text-foreground"
          >
            Reenviar código
          </Link>
        </p>
      </div>
    </form>
  );
};
