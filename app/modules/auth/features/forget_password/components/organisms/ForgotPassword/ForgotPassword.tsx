import React, { type JSX } from "react";
import { Button } from "../../atoms/Button/Button";
import { Input } from "../../atoms/Input/Input";
import { IconFingerprint, IconArrowLeft } from "../../atoms/Icon/Icon";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LocaleKeys } from "~/lang";

export default function OlvidasteContraseña(): JSX.Element {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-[400px] space-y-6">
        <div className="flex flex-col items-center space-y-2 text-center">
          <div className="rounded-full p-3 bg-gray-100">
            <IconFingerprint />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">
            {t(LocaleKeys.pages_auth_forgot_password_title)}
          </h1>
          <p className="text-sm text-gray-500">
            {t(LocaleKeys.pages_auth_forgot_password_description)}
          </p>
        </div>
        <form className="space-y-4">
          <div className="space-y-2">
            <Input
              type="email"
              placeholder={t(
                LocaleKeys.pages_auth_forgot_password_email_placeholder
              )}
              required
              className="w-full"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            {t(LocaleKeys.pages_auth_forgot_password_submit)}
          </Button>
        </form>
        <div className="text-center">
          <Link
            to="/login"
            className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900"
          >
            <IconArrowLeft />
            {t(LocaleKeys.pages_auth_forgot_password_back_to_login)}
          </Link>
        </div>
      </div>
    </div>
  );
}
