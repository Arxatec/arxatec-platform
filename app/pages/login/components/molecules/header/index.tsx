import { useTranslation } from "react-i18next";
import { CustomLink } from "~/components/atoms";
import { LocaleKeys } from "~/lang";
import logo from "~/assets/images/logo.png";

export const Header = () => {
  const { t } = useTranslation();
  return (
    <div>
      <img alt="Your Company" src={logo} className="h-12 w-auto" />
      <h2 className="mt-4 xl2-b tracking-tight text-gray-900">
        {t(LocaleKeys.auth_login_title)}
      </h2>
      <p className="mt-2 sm-n">
        {t(LocaleKeys.auth_login_not_registered)}{" "}
        <CustomLink text={t(LocaleKeys.auth_login_start)} to="" />
      </p>
    </div>
  );
};
