import { CustomInput, CustomLink, PrimaryButton } from "~/components/atoms";
import { useTranslation } from "react-i18next";
import { LocaleKeys } from "~/lang";
import { SocialAuthOptions } from "../../molecules";
import { APP_PATHS} from "~/routes/routes";
import { useNavigate } from "react-router";

export const RegisterForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const navigateToVerifyAccount = () => navigate(APP_PATHS.VERIFY_ACCOUNT);
  return (
    <div className="mt-10">
      <form className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <CustomInput
            type="text"
            label={t(LocaleKeys.pages_auth_fields_name_label)}
            placeholder={t(LocaleKeys.pages_auth_fields_name_placeholder)}
            required
          />
          <CustomInput
            type="text"
            label={t(LocaleKeys.pages_auth_fields_lastname_label)}
            placeholder={t(LocaleKeys.pages_auth_fields_lastname_placeholder)}
            required
          />
        </div>
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
        <PrimaryButton
          children={t(LocaleKeys.pages_auth_register_form_submit)}
          className="w-full"
          onClick={navigateToVerifyAccount}
        />

        <SocialAuthOptions />

        <p className="mt-10 sm-n text-center">
          {t(LocaleKeys.pages_auth_register_not_registered)}{" "}
          <CustomLink
            text={t(LocaleKeys.pages_auth_register_start)}
            to={APP_PATHS.LOGIN}
          />
        </p>
      </form>
    </div>
  );
};
