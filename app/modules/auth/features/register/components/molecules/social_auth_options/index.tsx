import { useTranslation } from "react-i18next";
import { SecondaryButton } from "~/components/atoms";
import { LocaleKeys } from "~/lang";
import googleIcon from "~/assets/icons/google.png";
import { Separator } from "~/modules/auth/components/atoms";

export const SocialAuthOptions = () => {
  const { t } = useTranslation();
  return (
    <div className="mt-6">
      <Separator />
      <div className="mt-6 ">
        <SecondaryButton
          text={t(LocaleKeys.pages_auth_social_google)}
          classNames="w-full"
          leading={<img src={googleIcon} alt="Google" className="size-4" />}
        />
      </div>
    </div>
  );
};
