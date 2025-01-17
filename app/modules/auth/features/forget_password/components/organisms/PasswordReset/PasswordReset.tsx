import React, { useState, useRef, type JSX } from "react";
import { IconMail } from "../../atoms/Icon/Icon";
import { Button } from "../../atoms/Button/Button";
import { Link } from "react-router-dom";

export default function RestablecerContraseña(): JSX.Element {
  const [codigo, setCodigo] = useState<string[]>(["", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const manejarCambio = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const nuevoCodigo = [...codigo];
      nuevoCodigo[index] = value;
      setCodigo(nuevoCodigo);

      if (value && index < 3) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const manejarTecla = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !codigo[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center justify-center">
          <div className="rounded-full bg-gray-50 p-3 mb-6">
            <IconMail />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight mb-2 text-gray-900">
            Restablecer contraseña
          </h1>
          <p className="text-sm text-gray-500">
            Hemos enviado un código a{" "}
            <span className="text-gray-900">amelie@untitledui.com</span>
          </p>
        </div>
        <div className="space-y-6">
          <div className="flex justify-center gap-3">
            {codigo.map((valor, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }} // Ajuste aquí
                type="text"
                inputMode="numeric"
                value={valor}
                onChange={(e) => manejarCambio(index, e.target.value)}
                onKeyDown={(e) => manejarTecla(index, e)}
                className="w-14 h-14 text-center text-2xl font-semibold rounded-lg border border-gray-300 focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] outline-none transition-colors"
                maxLength={1}
                aria-label={`Dígito ${index + 1}`}
              />
            ))}
          </div>
          <Button className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold py-3 px-4 rounded-lg transition-colors">
            Continuar
          </Button>
          <div className="text-center space-y-4">
            <p className="text-sm text-gray-500">
              ¿No recibiste el correo?{" "}
              <Link
                to="#"
                className="text-[#2563EB] hover:text-[#1D4ED8] font-medium"
              >
                Haz clic para reenviar
              </Link>
            </p>
            <Link
              to="/ingresar"
              className="text-sm text-gray-500 hover:text-gray-900 inline-flex items-center gap-2"
            >
              ← Volver a iniciar sesión
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
