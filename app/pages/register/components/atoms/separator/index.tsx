import { useTranslation } from "react-i18next";
import { LocaleKeys } from "~/lang";

export const Separator = () => {
  const { t } = useTranslation();
  return (
    <div className="relative">
      <div aria-hidden="true" className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-gray-200" />
      </div>
      <div className="relative flex justify-center text-sm/6 font-medium">
        <span className="bg-white px-6 text-gray-900">
          {t(LocaleKeys.pages_auth_register_form_or)}
        </span>
      </div>
    </div>
  );
};
