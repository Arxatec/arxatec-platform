import { ArrowLeftIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import React, { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { PrimaryButton, SpinnerLoader } from "~/components/atoms";
import { LocaleKeys } from "~/lang";
import { APP_PATHS } from "~/routes/routes";
import { VerifyResetCodeMessages, ResendCodeMessages } from "../../../messages";
import { verifyResetCode, requestPasswordReset } from "../../../services";
import type { VerifyResetCodeFormData } from "../../../models";

interface Props {
  handleNextStep: () => void;
}

export const EnterCodeStep = ({ handleNextStep }: Props) => {
  const [code, setCode] = useState<string[]>(["", "", "", ""]);
  const [error, setError] = useState<any>(null);
  const [errorResendCode, setErrorResendCode] = useState<any>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const { t } = useTranslation();
  const isCodeComplete = code.every((digit) => digit !== "");

  const mutation = useMutation({
    mutationKey: ["verifyResetCode"],
    mutationFn: (data: VerifyResetCodeFormData) =>
      verifyResetCode(data.code, data.email),
    onSuccess: () => onSuccess(),
    onError: (error: AxiosError) => onError(error),
  });

  const mutationResendCode = useMutation({
    mutationKey: ["resendCode"],
    mutationFn: () =>
      requestPasswordReset(localStorage.getItem("EMAIL_PASSWORD_RESET") || ""),
    onSuccess: () => onSuccessResendCode(),
    onError: (error: AxiosError) => onErrorResendCode(error),
  });

  const handleResendCode = () => {
    setErrorResendCode(null);
    mutationResendCode.mutate();
  };

  const onSuccessResendCode = () => {
    setErrorResendCode(null);
  };

  const onErrorResendCode = (error: AxiosError) => {
    const statusCode = error.response?.status;
    setErrorResendCode({
      title:
        ResendCodeMessages[statusCode as keyof typeof ResendCodeMessages].title,
      description:
        ResendCodeMessages[statusCode as keyof typeof ResendCodeMessages]
          .description,
    });
  };

  const onSuccess = () => {
    setError(null);
    handleNextStep();
  };

  const onError = (error: AxiosError) => {
    const statusCode = error.response?.status;
    setError({
      title:
        VerifyResetCodeMessages[
          statusCode as keyof typeof VerifyResetCodeMessages
        ].title,
      description:
        VerifyResetCodeMessages[
          statusCode as keyof typeof VerifyResetCodeMessages
        ].description,
    });
  };

  const handleVerifyCode = () => {
    setError(null);
    mutation.mutate({
      code: code.join(""),
      email: localStorage.getItem("EMAIL_PASSWORD_RESET") || "",
    });
  };

  const handleChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      if (value && index < 3) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="flex items-center justify-center h-full p-4 w-full">
      <div className="w-full max-w-[300px] space-y-6">
        <div className="flex flex-col items-center justify-center w-full">
          <div className="rounded-full bg-slate-100 p-3 mb-6">
            <EnvelopeIcon className="size-5 text-gray-900" />
          </div>
          <h1 className="text-xl text-center font-semibold tracking-tight mb-2 text-gray-900">
            {t(LocaleKeys.pages_auth_forgot_password_reset_password_title)}
          </h1>
          <p className="text-sm text-gray-500 text-center">
            {t(
              LocaleKeys.pages_auth_forgot_password_reset_password_description
            )}
          </p>
        </div>
        <div className="space-y-6">
          <div className="flex justify-center gap-6">
            {code.map((value, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                value={value}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-14 h-14 text-center text-2xl font-semibold rounded-lg border border-gray-300 focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB] outline-none transition-colors"
                maxLength={1}
                aria-label={`${t(
                  LocaleKeys.pages_auth_forgot_password_reset_password_code_input_label
                )} ${index + 1}`}
              />
            ))}
          </div>

          {error !== null && (
            <div className="flex flex-col bg-red-50 py-2 px-4 rounded-md border border-red-100">
              <p className="text-red-500 text-sm">{error.description}</p>
            </div>
          )}

          <PrimaryButton
            className="w-full"
            children={t(
              LocaleKeys.pages_auth_forgot_password_reset_password_button_submit
            )}
            disabled={!isCodeComplete || mutation.isPending}
            onClick={handleVerifyCode}
            loader={mutation.isPending}
          />
          <div className="text-center space-y-4">
            <p className="text-sm text-gray-500 inline-flex items-center gap-1">
              {t(
                LocaleKeys.pages_auth_forgot_password_reset_password_resend_text
              )}{" "}
              {mutationResendCode.isPending ? (
                <SpinnerLoader size={18} color="#2563EB" />
              ) : (
                <button
                  className="text-[#2563EB] hover:tet-[#1D4ED8] font-medium items-center inline"
                  onClick={handleResendCode}
                >
                  {t(
                    LocaleKeys.pages_auth_forgot_password_reset_password_resend_action
                  )}
                </button>
              )}
            </p>
            {errorResendCode && (
              <p className="text-sm text-red-500">
                {errorResendCode.description}
              </p>
            )}
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
      </div>
    </div>
  );
};
