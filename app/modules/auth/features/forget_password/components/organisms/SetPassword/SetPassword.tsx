import React, { useState, type JSX } from "react";
import { Lock } from "lucide-react";
import { Button } from "../../atoms/Button/Button";
import { Input } from "../../atoms/Input/Input";
import { Label } from "../../atoms/Label/Label";
import { Link } from "react-router-dom";

export default function EstablecerContraseña(): JSX.Element {
  const [contraseña, setContraseña] = useState<string>("");
  const [confirmarContraseña, setConfirmarContraseña] = useState<string>("");
  const [error, setError] = useState<string>("");

  const manejarEnvio = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (contraseña.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres.");
      return;
    }
    if (contraseña !== confirmarContraseña) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    setError("");
    alert("¡Contraseña establecida con éxito!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center justify-center">
          <div className="p-3 rounded-full bg-blue-50">
            <Lock className="w-6 h-6 text-blue-600" />
          </div>
          <h1 className="mt-6 text-2xl font-semibold text-gray-900">
            Establecer nueva contraseña
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Debe tener al menos 8 caracteres.
          </p>
        </div>
        <form onSubmit={manejarEnvio} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                value={contraseña}
                onChange={(e) => setContraseña(e.target.value)}
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirmar contraseña</Label>
              <Input
                id="confirm-password"
                type="password"
                value={confirmarContraseña}
                onChange={(e) => setConfirmarContraseña(e.target.value)}
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Restablecer contraseña
          </Button>
        </form>
        <div className="text-center">
          <Link
            to="/ingresar"
            className="text-sm text-gray-600 hover:text-gray-900 flex items-center justify-center gap-2"
          >
            ← Volver a iniciar sesión
          </Link>
        </div>
      </div>
    </div>
  );
}
