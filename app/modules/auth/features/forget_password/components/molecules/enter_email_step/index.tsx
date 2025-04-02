import { ArrowLeftIcon, FingerPrintIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { CustomInput, PrimaryButton } from "~/components/atoms";
import { LocaleKeys } from "~/lang";
import { APP_PATHS } from "~/routes/routes";

export const EnterEmailStep = () => {
  const { t } = useTranslation();

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
        <form className="space-y-4">
          <div className="space-y-2">
            <CustomInput
              type="text"
              placeholder={t(
                LocaleKeys.pages_auth_forgot_password_email_placeholder
              )}
            />
          </div>
          <PrimaryButton
            className="w-full"
            children={t(LocaleKeys.pages_auth_forgot_password_submit)}
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
