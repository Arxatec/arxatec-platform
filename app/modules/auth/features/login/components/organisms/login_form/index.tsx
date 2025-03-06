import { CustomInput, CustomLink, PrimaryButton } from "~/components/atoms";
import { RememberSection, SocialAuthOptions } from "../../molecules";
import { useTranslation } from "react-i18next";
import { LocaleKeys } from "~/lang";
import { ROUTES } from "~/routes/routes";
import { ToastManager } from "~/components/molecules/toast_manager";

export const LoginForm = () => {
  const { t } = useTranslation();

  const handleSuccess = () => {
    ToastManager.warning(
      "Información",
      "Aquí tienes un dato importante. Ya puedes usar esta funcionalidad porque ya esta activado desde tu cuenta de configurción."
    );
  };

  return (
    <div className="mt-10">
      <div className="space-y-6">
        <CustomInput
          type="text"
          label={t(LocaleKeys.pages_auth_fields_email_label)}
          placeholder={t(LocaleKeys.pages_auth_fields_email_placeholder)}
          required
        />
        <CustomInput
          type="password"
          label={t(LocaleKeys.pages_auth_fields_password_label)}
          placeholder={t(LocaleKeys.pages_auth_fields_password_placeholder)}
          required
        />
        <RememberSection />
        <PrimaryButton
          onClick={handleSuccess}
          children={t(LocaleKeys.pages_auth_login_form_submit)}
          className="w-full"
        />
      </div>

      <SocialAuthOptions />
      <p className="mt-10  sm-n text-center">
        {t(LocaleKeys.pages_auth_login_not_registered)}{" "}
        <CustomLink
          text={t(LocaleKeys.pages_auth_login_start)}
          to={`/${ROUTES.REGISTER}`}
        />
      </p>
    </div>
  );
};
