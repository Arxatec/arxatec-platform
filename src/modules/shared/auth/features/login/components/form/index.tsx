import { Input, Label, Button } from "@/components/ui";
import { ROUTES } from "@/routes/routes";
import { Link } from "react-router-dom";

export const Form = () => {
  return (
    <form>
      <div className="flex flex-col gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Correo electrónico</Label>
          <Input
            id="email"
            type="email"
            placeholder="Ej. correo@ejemplo.com"
            required
          />
        </div>
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
          <Input
            id="password"
            placeholder="Ej. cfaWR52$!Mja"
            type="password"
            required
          />
        </div>
        <div className="flex flex-col gap-3">
          <Button type="submit" className="w-full">
            Ingresar
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
