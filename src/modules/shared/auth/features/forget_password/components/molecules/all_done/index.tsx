import { CheckCircleIcon } from "@heroicons/react/24/outline";
import React from "react";
import { useTranslation } from "react-i18next";
import { PrimaryButton } from "~/components/atoms";
import { LocaleKeys } from "~/lang";

interface Props {
  handleNextStep: () => void;
}

export const AllDone = ({ handleNextStep }: Props) => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-center h-full p-4 w-full">
      <div className="w-full max-w-[300px] space-y-6">
        <div className="flex flex-col items-center justify-center w-full">
          <div className="rounded-full bg-slate-100 p-3 mb-6">
            <CheckCircleIcon className="size-5 text-gray-900" />
          </div>
          <h1 className="text-xl text-center font-semibold tracking-tight mb-2 text-gray-900">
            {t(LocaleKeys.pages_auth_forgot_password_ready_title)}
          </h1>
          <p className="text-sm text-gray-500 text-center">
            {t(LocaleKeys.pages_auth_forgot_password_ready_description)}
          </p>
        </div>
        <div className="space-y-6">
          <PrimaryButton
            className="w-full"
            children={t(LocaleKeys.pages_auth_forgot_password_back_to_login)}
            onClick={handleNextStep}
          />
        </div>
      </div>
    </div>
  );
};
