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
          className="rounded-md gap-3 bg-white px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50  text-center flex items-center justify-center text-gray-900 w-full"
          onClick={() => login()}
        >
          <img src={googleIcon} alt="Google" className="size-4" />
          <p className="text-gray-900">
            {t(LocaleKeys.pages_auth_social_google)}
          </p>
        </PrimaryButton>
      </div>
    </div>
  );
};
