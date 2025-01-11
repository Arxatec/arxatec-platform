import { CustomInput, PrimaryButton } from "~/components/atoms";
import { useTranslation } from "react-i18next";
import { LocaleKeys } from "~/lang";
import { SocialAuthOptions } from "../../molecules";

export const RegisterForm = () => {
  const { t } = useTranslation();
  return (
    <div className="mt-10">
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <CustomInput
            type="text"
            label={t(LocaleKeys.pages_auth_register_form_name_label)}
            placeholder={t(
              LocaleKeys.pages_auth_register_form_name_placeholder
            )}
            isRequired
          />
          <CustomInput
            type="text"
            label={t(LocaleKeys.pages_auth_register_form_lastname_label)}
            placeholder={t(
              LocaleKeys.pages_auth_register_form_lastname_placeholder
            )}
            isRequired
          />
        </div>
        <CustomInput
          type="text"
          label={t(LocaleKeys.pages_auth_register_form_email_label)}
          placeholder={t(LocaleKeys.pages_auth_register_form_email_placeholder)}
          isRequired
        />
        <CustomInput
          type="password"
          label={t(LocaleKeys.pages_auth_register_form_password_label)}
          placeholder={t(
            LocaleKeys.pages_auth_register_form_password_placeholder
          )}
          isRequired
        />
        <PrimaryButton
          text={t(LocaleKeys.pages_auth_register_form_submit)}
          classNames="w-full"
        />

        <SocialAuthOptions />
      </div>
    </div>
  );
};
