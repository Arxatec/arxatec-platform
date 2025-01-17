import React, { type JSX } from "react";
import { Button } from "../../atoms/Button/Button";
import { Input } from "../../atoms/Input/Input";
import { IconFingerprint, IconArrowLeft } from "../../atoms/Icon/Icon";
import { Link } from "react-router-dom";

export default function OlvidasteContraseña(): JSX.Element {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-[400px] space-y-6">
        <div className="flex flex-col items-center space-y-2 text-center">
          <div className="rounded-full p-3 bg-gray-100">
            <IconFingerprint />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">
            ¿Olvidaste tu contraseña?
          </h1>
          <p className="text-sm text-gray-500">
            No te preocupes, te enviaremos instrucciones para restablecerla.
          </p>
        </div>
        <form className="space-y-4">
          <div className="space-y-2">
            <Input
              type="email"
              placeholder="Ingresa tu correo electrónico"
              required
              className="w-full"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            Restablecer contraseña
          </Button>
        </form>
        <div className="text-center">
          <Link
            to="/ingresar"
            className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900"
          >
            <IconArrowLeft />
            Volver a iniciar sesión
          </Link>
        </div>
      </div>
    </div>
  );
}
