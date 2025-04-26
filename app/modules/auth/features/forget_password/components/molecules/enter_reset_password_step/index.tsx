import { ArrowLeftIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { CustomInput, PrimaryButton } from "~/components/atoms";
import { LocaleKeys } from "~/lang";
import { APP_PATHS } from "~/routes/routes";
import { ResetPasswordMessages } from "../../../messages";
import { resetPassword } from "../../../services";

interface Props {
  handleNextStep: () => void;
}

interface FormData {
  password: string;
  confirmPassword: string;
}

export const EnterResetPasswordStep = ({ handleNextStep }: Props) => {
  const [apiError, setApiError] = useState<any>(null);
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>({
    mode: "onChange",
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const password = watch("password");

  const mutation = useMutation({
    mutationKey: ["resetPassword"],
    mutationFn: (data: FormData) =>
      resetPassword(
        data.password,
        data.confirmPassword,
        localStorage.getItem("EMAIL_PASSWORD_RESET") || ""
      ),
    onSuccess: () => onSuccess(),
    onError: (error: AxiosError) => onError(error),
  });

  const onSuccess = () => {
    setApiError(null);
    localStorage.removeItem("EMAIL_PASSWORD_RESET");
    handleNextStep();
  };

  const onError = (error: AxiosError) => {
    console.log(error);
    const statusCode = error.response?.status;
    if (statusCode) {
      setApiError({
        title:
          ResetPasswordMessages[
            statusCode as keyof typeof ResetPasswordMessages
          ]?.title,
        description:
          ResetPasswordMessages[
            statusCode as keyof typeof ResetPasswordMessages
          ]?.description,
      });
    } else {
      setApiError({
        title: "Error",
        description:
          "Ha ocurrido un error inesperado. Por favor, intenta nuevamente.",
      });
    }
  };

  const onSubmit = (data: FormData) => {
    setApiError(null);
    mutation.mutate(data);
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
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <CustomInput
                type="password"
                placeholder={t(
                  LocaleKeys.pages_auth_fields_password_placeholder
                )}
                label={t(
                  LocaleKeys.pages_auth_forgot_password_set_password_label_password
                )}
                {...register("password", {
                  required: "La contraseña es requerida",
                  minLength: {
                    value: 8,
                    message: t(
                      LocaleKeys.pages_auth_forgot_password_set_password_error_min_length
                    ),
                  },
                })}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <CustomInput
                type="password"
                placeholder={t(
                  LocaleKeys.pages_auth_fields_password_placeholder
                )}
                label={t(
                  LocaleKeys.pages_auth_forgot_password_set_password_label_confirm_password
                )}
                {...register("confirmPassword", {
                  required: "La confirmación de contraseña es requerida",
                  validate: (value) =>
                    value === password ||
                    t(
                      LocaleKeys.pages_auth_forgot_password_set_password_error_match
                    ),
                })}
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>

          {apiError !== null && (
            <div className="flex flex-col bg-red-50 py-2 px-4 rounded-md border border-red-100">
              <p className="text-red-500 text-sm">{apiError.description}</p>
            </div>
          )}

          <PrimaryButton
            children={t(
              LocaleKeys.pages_auth_forgot_password_set_password_button_submit
            )}
            className="w-full"
            type="submit"
            disabled={mutation.isPending}
            loader={mutation.isPending}
          />
        </form>
        <div className="text-center">
          <Link
            to={APP_PATHS.LOGIN}
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
