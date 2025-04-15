import { CustomInput, CustomLink, PrimaryButton } from "~/components/atoms";
import { RememberSection, SocialAuthOptions } from "../../molecules";
import { useTranslation } from "react-i18next";
import { LocaleKeys } from "~/lang";
import { APP_PATHS } from "~/routes/routes";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError, AxiosResponse } from "axios";
import { login } from "../../../services";
import { type LoginFormData } from "../../../models";
import { validation } from "../../../validation";
import { messages } from "../../../messages";
import { useState } from "react";
import { useNavigate } from "react-router";

export const LoginForm = () => {
  const { t } = useTranslation();
  const [error, setError] = useState<any>(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const mutation = useMutation({
    mutationFn: (data: LoginFormData) => login(data.email, data.password),
    onSuccess: () => onSuccess(),
    onError: (error: AxiosError) => onError(error),
  });

  const onSubmit = (data: LoginFormData) => {
    setError(null);
    mutation.mutate(data);
  };

  const onSuccess = () => {
    setError(null);
    navigate(APP_PATHS.DASHBOARD);
  };

  const onError = (error: AxiosError) => {
    const statusCode = error.response?.status;
    setError({
      title: messages[statusCode as keyof typeof messages].title,
      description: messages[statusCode as keyof typeof messages].description,
    });
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
            <p className="text-red-500 text-sm ">{error.description}</p>
          </div>
        )}

        <PrimaryButton
          disabled={mutation.isPending}
          loader={mutation.isPending}
          type="submit"
          children={t(LocaleKeys.pages_auth_login_form_submit)}
          className="w-full"
        />
      </form>

      <SocialAuthOptions />
      <p className="mt-10 sm-n text-center">
        {t(LocaleKeys.pages_auth_login_not_registered)}{" "}
        <CustomLink
          text={t(LocaleKeys.pages_auth_login_start)}
          to={APP_PATHS.REGISTER}
        />
      </p>
    </div>
  );
};
