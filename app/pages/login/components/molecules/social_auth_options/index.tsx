import { useTranslation } from "react-i18next";
import { SecondaryButton } from "~/components/atoms";
import { LocaleKeys } from "~/lang";
import { Separator } from "../../atoms/separator";
import googleIcon from "~/assets/icons/google.png";

export const SocialAuthOptions = () => {
  const { t } = useTranslation();
  return (
    <div className="mt-6">
      <Separator />
      <div className="mt-6 ">
        <SecondaryButton
          text={t(LocaleKeys.auth_login_form_google)}
          classNames="w-full"
          leading={<img src={googleIcon} alt="Google" className="size-4" />}
        />
      </div>
    </div>
  );
};
