import { CustomInput, CustomLink, PrimaryButton } from "~/components/atoms";
import { RememberSection } from "../../molecules";
import { useTranslation } from "react-i18next";
import { LocaleKeys } from "~/lang";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { login } from "../../../services";
import { type LoginFormData } from "../../../types";
import { validation } from "../../../validation";
import { useState } from "react";
import { SocialAuthOptions } from "~/modules/shared/auth/components/molecules";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "~/routes/routes";
import type { LoginModel } from "../../../models";

export const LoginForm = () => {
  const { t } = useTranslation();
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onError = (error: AxiosError) => setError(error.message);

  const onSuccess = (data: LoginModel) => {
    setError(null);
    window.sessionStorage.setItem("TOKEN_AUTH", data.token);
    navigate(`~${ROUTES.App}${ROUTES.AppRoutes.LawyerCases}`);
  };

  const mutation = useMutation({
    mutationFn: (data: LoginFormData) => login(data.email, data.password),
    onSuccess: (data) => onSuccess(data),
    onError: (error: AxiosError) => onError(error),
  });

  const onSubmit = (data: LoginFormData) => {
    setError(null);
    mutation.mutate(data);
  };

  return (
    <div className="mt-10">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <CustomInput
            type="text"
            label={t(LocaleKeys.pages_auth_fields_email_label)}
            placeholder={t(LocaleKeys.pages_auth_fields_email_placeholder)}
            required
            {...register("email", validation.email)}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <CustomInput
            type="password"
            label={t(LocaleKeys.pages_auth_fields_password_label)}
            placeholder={t(LocaleKeys.pages_auth_fields_password_placeholder)}
            required
            {...register("password", validation.password)}
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <RememberSection />
        {error !== null && (
          <div className="flex flex-col  bg-red-50 py-2 px-4 rounded-md border border-red-100">
            <p className="text-red-500 text-sm ">{error}</p>
          </div>
        )}

        <PrimaryButton
          disabled={mutation.isPending}
          loader={mutation.isPending}
          type="submit"
          className="w-full"
        >
          {t(LocaleKeys.pages_auth_login_form_submit)}
        </PrimaryButton>
      </form>

      <SocialAuthOptions />
      <p className="mt-10 sm-n text-center">
        {t(LocaleKeys.pages_auth_login_not_registered)}{" "}
        <CustomLink
          text={t(LocaleKeys.pages_auth_login_start)}
          to={ROUTES.AuthRoutes.Register}
        />
      </p>
    </div>
  );
};
