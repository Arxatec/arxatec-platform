import { useTranslation } from "react-i18next";
import { CustomLink } from "~/components/atoms";
import { LocaleKeys } from "~/lang";
import logo from "~/assets/images/logo.png";

export const Header = () => {
  const { t } = useTranslation();
  return (
    <div>
      <img alt="Arxatec" src={logo} className="h-12 w-auto" />
      <h2 className="mt-4 xl2-b tracking-tight text-gray-900">
        {t(LocaleKeys.pages_auth_register_title)}
      </h2>
      <p className="mt-2 sm-n">
        {t(LocaleKeys.pages_auth_register_not_registered)}{" "}
        <CustomLink text={t(LocaleKeys.pages_auth_register_start)} to="" />
      </p>
    </div>
  );
};
