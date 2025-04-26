import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";
import { LocaleKeys } from "~/lang";

export const VerificationHeader = () => {
  const { t } = useTranslation();
  return (
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
  );
};
