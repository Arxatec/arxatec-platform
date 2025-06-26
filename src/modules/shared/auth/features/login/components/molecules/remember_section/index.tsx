import { CustomLink } from "~/components/atoms";
import { useTranslation } from "react-i18next";
import { LocaleKeys } from "~/lang";
import { ROUTES } from "~/routes/routes";

export const RememberSection = () => {
  const { t } = useTranslation();
  return (
    <div className="flex items-center justify-between">
      <div />

      <div className="text-sm/6">
        <CustomLink
          text={t(LocaleKeys.pages_auth_login_form_forget_password)}
          to={ROUTES.Auth.RecoverPassword}
        />
      </div>
    </div>
  );
};
