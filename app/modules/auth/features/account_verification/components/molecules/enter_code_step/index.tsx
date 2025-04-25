import { ArrowLeftIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
import React, { useState, useRef, type JSX } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router";
import { PrimaryButton } from "~/components/atoms";
import { LocaleKeys } from "~/lang";
import { APP_PATHS } from "~/routes/routes";

export const EnterCodeStep = () => {
  const [code, setCode] = useState<string[]>(["", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const navigateToOnboarding = () => navigate(APP_PATHS.ONBOARDING);

  const verifyCode = () => {
    console.log(code);
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
            {t(LocaleKeys.pages_auth_account_verification_title)}
          </h1>
          <p className="text-sm text-gray-500 text-center">
            {t(LocaleKeys.pages_auth_account_verification_description)}
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
          <PrimaryButton
            className="w-full"
            children={t(
              LocaleKeys.pages_auth_forgot_password_reset_password_button_submit
            )}
            disabled={code.some((value) => value === "")}
            onClick={verifyCode}
          />
          <div className="text-center space-y-4">
            <p className="text-sm text-gray-500">
              {t(LocaleKeys.pages_auth_account_verification_resend_text)}{" "}
              <Link
                to="#"
                className="text-[#2563EB] hover:text-[#1D4ED8] font-medium"
              >
                {t(LocaleKeys.pages_auth_account_verification_resend_action)}
              </Link>
            </p>
            <div className="text-center">
              <Link
                to={APP_PATHS.REGISTER}
                className="flex gap-2 justify-center items-center text-sm text-gray-500 hover:text-gray-900"
              >
                <ArrowLeftIcon className="size-4 " />
                {t(
                  LocaleKeys.pages_auth_account_verification_back_to_create_account
                )}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
