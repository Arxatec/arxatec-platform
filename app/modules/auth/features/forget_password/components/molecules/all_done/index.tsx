import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { CheckBadgeIcon, CheckIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";
import { PrimaryButton } from "~/components/atoms";
import { LocaleKeys } from "~/lang";

export const AllDone = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      <div className="max-w-[300px] w-full flex flex-col items-center text-center space-y-6">
        <div className="rounded-full bg-slate-100 p-3">
          <CheckCircleIcon className="size-5 text-gray-900" />
        </div>
        <div className="space-y-2">
          <h1 className="text-xl text-center font-semibold">
            {t(LocaleKeys.pages_auth_forgot_password_ready_title)}
          </h1>
          <p className="text-gray-500 text-center text-sm">
            {t(LocaleKeys.pages_auth_forgot_password_ready_description)}
          </p>
        </div>
        <PrimaryButton
          className="w-full"
          children={t(LocaleKeys.pages_auth_forgot_password_back_to_login)}
        />
      </div>
    </div>
  );
};
