import { ArrowLeftIcon, FingerPrintIcon } from "@heroicons/react/24/outline";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { CustomInput, PrimaryButton } from "~/components/atoms";
import { LocaleKeys } from "~/lang";
import { APP_PATHS } from "~/routes/routes";
import { requestPasswordReset } from "../../../services";
import { RequestPasswordResetMessages } from "../../../messages";

interface Props {
  handleNextStep: () => void;
}

export const EnterEmailStep = ({ handleNextStep }: Props) => {
  const { t } = useTranslation();
  const [error, setError] = useState<any>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string }>();

  const mutation = useMutation({
    mutationFn: (data: { email: string }) => requestPasswordReset(data.email),
    onSuccess: () => onSuccess(),
    onError: (error: AxiosError) => onError(error),
  });

  const onSubmit = (data: { email: string }) => {
    setError(null);
    localStorage.setItem("EMAIL_PASSWORD_RESET", data.email);
    mutation.mutate(data);
  };

  const onSuccess = () => {
    setError(null);
    handleNextStep();
  };

  const onError = (error: AxiosError) => {
    localStorage.removeItem("EMAIL_PASSWORD_RESET");
    const statusCode = error.response?.status;
    setError({
      title:
        RequestPasswordResetMessages[
          statusCode as keyof typeof RequestPasswordResetMessages
        ].title,
      description:
        RequestPasswordResetMessages[
          statusCode as keyof typeof RequestPasswordResetMessages
        ].description,
    });
  };

  return (
    <div className="h-full flex items-center justify-center p-4 w-full">
      <div className="w-full max-w-[300px] space-y-6">
        <div className="flex flex-col items-center space-y-2 text-center w-full ">
          <div className="rounded-full p-3 bg-slate-100">
            <FingerPrintIcon className="size-5 text-gray-900" />
          </div>
          <h1 className="text-xl font-semibold tracking-tight text-center">
            {t(LocaleKeys.pages_auth_forgot_password_title)}
          </h1>
          <p className="text-sm text-gray-500 text-center">
            {t(LocaleKeys.pages_auth_forgot_password_description)}
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <CustomInput
              type="text"
              placeholder={t(
                LocaleKeys.pages_auth_forgot_password_email_placeholder
              )}
              {...register("email", {
                required: {
                  value: true,
                  message: "El correo electrónico es requerido",
                },
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "El correo electrónico es inválido",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}

            {error !== null && (
              <div className="flex flex-col bg-red-50 py-2 px-4 rounded-md border border-red-100">
                <p className="text-red-500 text-sm">{error.description}</p>
              </div>
            )}
          </div>
          <PrimaryButton
            className="w-full"
            children={t(LocaleKeys.pages_auth_forgot_password_submit)}
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
