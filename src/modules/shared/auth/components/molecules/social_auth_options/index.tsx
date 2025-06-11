import { useTranslation } from "react-i18next";
import { LocaleKeys } from "~/lang";
import googleIcon from "~/assets/icons/google.png";
import { Separator } from "~/modules/shared/auth/components/atoms";
import { PrimaryButton } from "~/components/atoms";
import { useGoogleLogin } from "@react-oauth/google";
import { ToastManager } from "~/components/molecules/toast_manager";
import { loginWithGoogle } from "../../../features/login/services";
import { useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { ROUTES } from "~/routes/routes";

export const SocialAuthOptions = () => {
  const { t } = useTranslation();
  const [, setLocation] = useLocation();

  const mutation = useMutation({
    mutationFn: (accessToken: string) => loginWithGoogle(accessToken),
    onError: () => {
      ToastManager.error(
        "Problema con nuestros servidores",
        "Ocurrió un error inesperado al iniciar sesión. Por favor, intenta nuevamente en unos minutos. Estamos trabajando para solucionarlo."
      );
    },
    onSuccess: (data: any) => {
      window.sessionStorage.setItem("TOKEN_AUTH", data.data.token);
      if (data.data.isNewUser) {
        setLocation(ROUTES.AuthRoutes.OnboardingGeneral);
      } else {
        setLocation(ROUTES.AppRoutes.LawyerCases);
      }
    },
  });

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      const accessToken = tokenResponse.access_token;
      mutation.mutate(accessToken);
    },
    onError: () => {
      ToastManager.error(
        "No se pudo iniciar sesión con Google",
        "Ocurrió un error inesperado al intentar iniciar sesión con Google. Por favor, espera unos minutos e intenta nuevamente. Estamos trabajando para resolverlo."
      );
    },
    flow: "implicit",
  });

  return (
    <div className="mt-6">
      <Separator />
      <div className="mt-6 ">
        <PrimaryButton
          className="rounded-md gap-3 bg-white px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 text-center flex items-center justify-center text-gray-900 w-full"
          onClick={() => login()}
          loader={mutation.isPending}
          disabled={mutation.isPending}
          colorLoader="#030712"
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
