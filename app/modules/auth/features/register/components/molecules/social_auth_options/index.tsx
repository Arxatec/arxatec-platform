import { useTranslation } from "react-i18next";
import { LocaleKeys } from "~/lang";
import googleIcon from "~/assets/icons/google.png";
import { Separator } from "~/modules/auth/components/atoms";
import { PrimaryButton } from "~/components/atoms";
import { useGoogleLogin } from "@react-oauth/google";

export const SocialAuthOptions = () => {
  const { t } = useTranslation();
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => console.log(codeResponse),
    flow: "auth-code",
  });
  return (
    <div className="mt-6">
      <Separator />
      <div className="mt-6 ">
        <PrimaryButton
          className="w-full border border-gray-100 bg-white text-gray-900 flex items-center justify-center hover:bg-gray-50 gap-2"
          onClick={() => login()}
        >
          <img src={googleIcon} alt="Google" className="size-4" />
          {t(LocaleKeys.pages_auth_social_google)}
        </PrimaryButton>
      </div>
    </div>
  );
};
