import React, { useState, type JSX } from "react";
import { Lock } from "lucide-react";
import { Button } from "../../atoms/Button/Button";
import { Input } from "../../atoms/Input/Input";
import { Label } from "../../atoms/Label/Label";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LocaleKeys } from "~/lang";

export default function EstablecerContraseña(): JSX.Element {
  const [contraseña, setContraseña] = useState<string>("");
  const [confirmarContraseña, setConfirmarContraseña] = useState<string>("");
  const [error, setError] = useState<string>("");
  const { t } = useTranslation();

  const manejarEnvio = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (contraseña.length < 8) {
      setError(t(LocaleKeys.pages_auth_set_password_error_min_length));
      return;
    }
    if (contraseña !== confirmarContraseña) {
      setError(t(LocaleKeys.pages_auth_set_password_error_match));
      return;
    }
    setError("");
    alert(t(LocaleKeys.pages_auth_set_password_button_submit));
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center justify-center">
          <div className="p-3 rounded-full bg-blue-50">
            <Lock className="w-6 h-6 text-blue-600" />
          </div>
          <h1 className="mt-6 text-2xl font-semibold text-gray-900">
            {t(LocaleKeys.pages_auth_set_password_title)}
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            {t(LocaleKeys.pages_auth_set_password_description)}
          </p>
        </div>
        <form onSubmit={manejarEnvio} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">
                {t(LocaleKeys.pages_auth_set_password_label_password)}
              </Label>
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
              <Label htmlFor="confirm-password">
                {t(LocaleKeys.pages_auth_set_password_label_confirm_password)}
              </Label>
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
            {t(LocaleKeys.pages_auth_set_password_button_submit)}
          </Button>
        </form>
        <div className="text-center">
          <Link
            to="/login"
            className="text-sm text-gray-600 hover:text-gray-900 flex items-center justify-center gap-2"
          >
            {t(LocaleKeys.pages_auth_set_password_back_to_login)}
          </Link>
        </div>
      </div>
    </div>
  );
}
