import { Input, Label, Button } from "@/components/ui";
import { ROUTES } from "@/routes/routes";
import { ArrowLeftIcon } from "lucide-react";
import { Link } from "react-router-dom";

export const Form = () => {
  return (
    <form>
      <div className="flex flex-col gap-6">
        <div className="grid gap-3">
          <Label htmlFor="password">Nueva contraseña</Label>
          <Input
            id="password"
            type="password"
            placeholder="Ej. cfaWR52$!Mja"
            required
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="password_confirmation">Confirmar contraseña</Label>
          <Input
            id="password_confirmation"
            type="password"
            placeholder="Ej. cfaWR52$!Mja"
            required
          />
        </div>
        <div className="flex flex-col gap-3">
          <Button type="submit" className="w-full">
            Cambiar contraseña
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
