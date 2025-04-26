import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import React, { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { PrimaryButton } from "~/components/atoms";
import { LocaleKeys } from "~/lang";
import { APP_PATHS } from "~/routes/routes";
import { verifyCodeMessages } from "../../../messages";
import { verifyCode } from "../../../services";
import type { VerifyCodeFormData } from "../../../models";

export const VerificationCodeForm = () => {
  const [code, setCode] = useState<string[]>(["", "", "", ""]);
  const [error, setError] = useState<any>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const isCodeComplete = code.every((digit) => digit !== "");

  const mutation = useMutation({
    mutationKey: ["verifyCode"],
    mutationFn: (data: VerifyCodeFormData) => verifyCode(data.code, data.email),
    onSuccess: () => onSuccess(),
    onError: (error: AxiosError) => onError(error),
  });

  const onSuccess = () => {
    setError(null);
    localStorage.removeItem("EMAIL_REGISTER");
    navigate(APP_PATHS.ONBOARDING);
  };

  const onError = (error: AxiosError) => {
    console.log(error);
    const statusCode = error.response?.status;
    setError({
      title:
        verifyCodeMessages[statusCode as keyof typeof verifyCodeMessages].title,
      description:
        verifyCodeMessages[statusCode as keyof typeof verifyCodeMessages]
          .description,
    });
  };

  const handleVerifyCode = () => {
    setError(null);
    mutation.mutate({
      code: code.join(""),
      email: localStorage.getItem("EMAIL_REGISTER") || "",
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
    <>
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
    </>
  );
};
