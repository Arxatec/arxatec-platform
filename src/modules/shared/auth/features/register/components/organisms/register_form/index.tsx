import { CustomInput, CustomLink, PrimaryButton } from "~/components/atoms";
import { useTranslation } from "react-i18next";
import { LocaleKeys } from "~/lang";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { register as registerUser } from "../../../services";
import { type RegisterFormData } from "../../../types";
import { validation } from "../../../validation";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SocialAuthOptions } from "~/modules/shared/auth/components/molecules";
import { ROUTES } from "~/routes/routes";

export const RegisterForm = () => {
  const { t } = useTranslation();
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const mutation = useMutation({
    mutationFn: (data: RegisterFormData) =>
      registerUser(data.name, data.lastname, data.email, data.password),
    onSuccess: () => onSuccess(),
    onError: (error: AxiosError) => onError(error),
  });

  const onSubmit = (data: RegisterFormData) => {
    setError(null);
    localStorage.setItem("EMAIL_REGISTER", data.email);
    mutation.mutate(data);
  };

  const onSuccess = () => {
    setError(null);
    navigate(ROUTES.Auth.VerifyAccount);
  };

  const onError = (error: AxiosError) => setError(error.message);

  return (
    <div className="mt-10">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <CustomInput
              type="text"
              label={t(LocaleKeys.pages_auth_fields_name_label)}
              placeholder={t(LocaleKeys.pages_auth_fields_name_placeholder)}
              required
              {...register("name", validation.name)}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>
          <div>
            <CustomInput
              type="text"
              label={t(LocaleKeys.pages_auth_fields_lastname_label)}
              placeholder={t(LocaleKeys.pages_auth_fields_lastname_placeholder)}
              required
              {...register("lastname", validation.lastname)}
            />
            {errors.lastname && (
              <p className="text-red-500 text-sm mt-1">
                {errors.lastname.message}
              </p>
            )}
          </div>
        </div>
        <div>
          <CustomInput
            type="text"
            label={t(LocaleKeys.pages_auth_fields_email_label)}
            placeholder={t(LocaleKeys.pages_auth_fields_email_placeholder)}
            required
            {...register("email", validation.email)}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
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
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {error !== null && (
          <div className="flex flex-col bg-red-50 py-2 px-4 rounded-md border border-red-100">
            <p className="text-red-500 text-sm">{error}</p>
          </div>
        )}

        <PrimaryButton
          disabled={mutation.isPending}
          loader={mutation.isPending}
          type="submit"
          children={t(LocaleKeys.pages_auth_register_form_submit)}
          className="w-full"
        />
      </form>
      <SocialAuthOptions />

      <p className="mt-10 sm-n text-center">
        {t(LocaleKeys.pages_auth_register_not_registered)}{" "}
        <CustomLink
          text={t(LocaleKeys.pages_auth_register_start)}
          to={ROUTES.Auth.Login}
        />
      </p>
    </div>
  );
};
