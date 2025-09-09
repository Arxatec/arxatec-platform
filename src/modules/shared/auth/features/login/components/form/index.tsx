import { Input, Label, Button } from "@/components/ui";

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
            <a
              href="#"
              className="ml-auto inline-block text-sm underline-offset-4 hover:underline text-neutral-400"
            >
              ¿Olvidaste tu contraseña?
            </a>
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
      <div className="mt-4 text-center text-sm text-neutral-400">
        No tienes una cuenta?{" "}
        <a href="#" className="underline underline-offset-4 text-neutral-200">
          Registrarse
        </a>
      </div>
    </form>
  );
};
