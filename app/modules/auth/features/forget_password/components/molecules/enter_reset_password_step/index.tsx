import { ArrowLeftIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import React, { useState, type JSX } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { CustomInput, PrimaryButton } from "~/components/atoms";
import { LocaleKeys } from "~/lang";
import { ROUTES } from "~/routes/routes";

export const EnterResetPasswordStep = () => {
  const [contraseña, setContraseña] = useState<string>("");
  const [confirmarContraseña, setConfirmarContraseña] = useState<string>("");
  const [error, setError] = useState<string>("");
  const { t } = useTranslation();

  const manejarEnvio = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (contraseña.length < 8) {
      setError(
        t(LocaleKeys.pages_auth_forgot_password_set_password_error_min_length)
      );
      return;
    }
    if (contraseña !== confirmarContraseña) {
      setError(
        t(LocaleKeys.pages_auth_forgot_password_set_password_error_match)
      );
      return;
    }
    setError("");
    alert(t(LocaleKeys.pages_auth_forgot_password_set_password_button_submit));
  };

  return (
    <div className="h-full flex items-center justify-center p-4 w-full">
      <div className="w-full max-w-[300px] space-y-6">
        <div className="flex flex-col items-center justify-center w-full">
          <div className="p-3 rounded-full bg-slate-100">
            <LockClosedIcon className="size-5 text-gray-900" />
          </div>
          <h1 className="mt-6 text-xl font-semibold text-center text-gray-900">
            {t(LocaleKeys.pages_auth_forgot_password_set_password_title)}
          </h1>
          <p className="mt-2 text-sm text-gray-500 text-center">
            {t(LocaleKeys.pages_auth_forgot_password_set_password_description)}
          </p>
        </div>
        <form onSubmit={manejarEnvio} className="mt-8 space-y-6">
          <div className="space-y-4">
            <CustomInput
              type="password"
              placeholder={t(LocaleKeys.pages_auth_fields_password_placeholder)}
              label={t(
                LocaleKeys.pages_auth_forgot_password_set_password_label_password
              )}
            />
            <CustomInput
              type="password"
              placeholder={t(LocaleKeys.pages_auth_fields_password_placeholder)}
              label={t(
                LocaleKeys.pages_auth_forgot_password_set_password_label_confirm_password
              )}
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <PrimaryButton
            children={t(
              LocaleKeys.pages_auth_forgot_password_set_password_button_submit
            )}
            className="w-full"
          />
        </form>
        <div className="text-center">
          <Link
            to={`/${ROUTES.LOGIN}`}
            className="flex gap-2 justify-center items-center text-sm text-gray-500 hover:text-gray-900"
          >
            <ArrowLeftIcon className="size-4 " />
            {t(LocaleKeys.pages_auth_forgot_password_back_to_login)}
          </Link>
        </div>
      </div>
    </div>
  );
};
