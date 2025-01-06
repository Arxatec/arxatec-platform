import { CustomInput, PrimaryButton } from "~/components/atoms";
import { RememberSection, SocialAuthOptions } from "../../molecules";
import { useTranslation } from "react-i18next";
import { LocaleKeys } from "~/lang";

export const LoginForm = () => {
  const { t } = useTranslation();
  return (
    <div className="mt-10">
      <div className="space-y-6">
        <CustomInput
          type="text"
          label={t(LocaleKeys.auth_login_form_email_label)}
          placeholder={t(LocaleKeys.auth_login_form_email_placeholder)}
          isRequired
        />
        <CustomInput
          type="password"
          label={t(LocaleKeys.auth_login_form_password_label)}
          placeholder={t(LocaleKeys.auth_login_form_password_placeholder)}
          isRequired
        />
        <RememberSection />
        <PrimaryButton
          text={t(LocaleKeys.auth_login_form_submit)}
          classNames="w-full"
        />
      </div>

      <SocialAuthOptions />
    </div>
  );
};
