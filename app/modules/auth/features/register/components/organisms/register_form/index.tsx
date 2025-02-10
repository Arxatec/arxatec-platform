import { CustomInput, CustomLink, PrimaryButton } from "~/components/atoms";
import { useTranslation } from "react-i18next";
import { LocaleKeys } from "~/lang";
import { SocialAuthOptions } from "../../molecules";
import { ROUTES } from "~/routes/routes";

export const RegisterForm = () => {
  const { t } = useTranslation();
  return (
    <div className="mt-10">
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <CustomInput
            type="text"
            label={t(LocaleKeys.pages_auth_fields_name_label)}
            placeholder={t(LocaleKeys.pages_auth_fields_name_placeholder)}
            isRequired
          />
          <CustomInput
            type="text"
            label={t(LocaleKeys.pages_auth_fields_lastname_label)}
            placeholder={t(LocaleKeys.pages_auth_fields_lastname_placeholder)}
            isRequired
          />
        </div>
        <CustomInput
          type="text"
          label={t(LocaleKeys.pages_auth_fields_email_label)}
          placeholder={t(LocaleKeys.pages_auth_fields_email_placeholder)}
          isRequired
        />
        <CustomInput
          type="password"
          label={t(LocaleKeys.pages_auth_fields_password_label)}
          placeholder={t(LocaleKeys.pages_auth_fields_password_placeholder)}
          isRequired
        />
        <PrimaryButton
          children={t(LocaleKeys.pages_auth_register_form_submit)}
          className="w-full"
        />

        <SocialAuthOptions />

        <p className="mt-10 sm-n text-center">
          {t(LocaleKeys.pages_auth_register_not_registered)}{" "}
          <CustomLink
            text={t(LocaleKeys.pages_auth_register_start)}
            to={`/${ROUTES.LOGIN}`}
          />
        </p>
      </div>
    </div>
  );
};
