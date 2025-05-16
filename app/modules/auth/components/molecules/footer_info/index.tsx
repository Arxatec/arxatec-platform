import { useTranslation } from "react-i18next";
import { LocaleKeys } from "~/lang";

export const FooterInfo = () => {
  const { t } = useTranslation();
  return (
    <div className="flex items-center w-full mt-10 py-4 justify-between gap-4 flex-wrap">
      <a href="" className="text-sm text-gray-500">
        © 2020-2025 ArxaTEC.
      </a>
      <div className="flex items-center gap-2 flex-wrap">
        <a
          href="https://arxatec.net/terms"
          className="text-sm text-gray-900"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t(LocaleKeys.common_terms)}
        </a>
        <span className="size-1 bg-gray-400 rounded-full" />
        <a
          href="https://arxatec.net/privacy"
          className="text-sm text-gray-900"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t(LocaleKeys.common_privacy)}
        </a>
      </div>
    </div>
  );
};
