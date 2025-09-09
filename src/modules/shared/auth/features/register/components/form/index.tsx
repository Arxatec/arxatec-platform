import { Input, Label, Button } from "@/components/ui";
import { ROUTES } from "@/routes/routes";
import { Link } from "react-router-dom";

export const Form = () => {
  return (
    <form>
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-2 gap-3">
          <div className="grid gap-3">
            <Label htmlFor="email">Nombre</Label>
            <Input id="name" type="text" placeholder="Ej. Juan" required />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="email">Apellido</Label>
            <Input
              id="last_name"
              type="text"
              placeholder="Ej. Perez"
              required
            />
          </div>
        </div>
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
          <Label htmlFor="password">Contraseña</Label>
          <Input
            id="password"
            placeholder="Ej. cfaWR52$!Mja"
            type="password"
            required
          />
        </div>
        <div className="flex flex-col gap-3">
          <Button type="submit" className="w-full">
            Registrarse
          </Button>
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
