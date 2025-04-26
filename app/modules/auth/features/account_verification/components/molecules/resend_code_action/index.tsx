import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { LocaleKeys } from "~/lang";
import { APP_PATHS } from "~/routes/routes";
import { resendCode } from "../../../services";
import { useState } from "react";
import { resendCodeMessages } from "../../../messages";
import { SpinnerLoader } from "~/components/atoms";

export const ResendCodeAction = () => {
  const [error, setError] = useState<any>(null);
  const { t } = useTranslation();
  const mutation = useMutation({
    mutationFn: (email: string) => resendCode(email),
    onSuccess: () => onSuccess(),
    onError: (error: AxiosError) => onError(error),
    mutationKey: ["resendCode"],
  });

  const onSuccess = () => {
    setError(null);
  };

  const handleResendCode = () => {
    setError(null);
    mutation.mutate(localStorage.getItem("EMAIL_REGISTER") || "");
  };

  const onError = (error: AxiosError) => {
    const statusCode = error.response?.status;
    setError({
      title:
        resendCodeMessages[statusCode as keyof typeof resendCodeMessages].title,
      description:
        resendCodeMessages[statusCode as keyof typeof resendCodeMessages]
          .description,
    });
  };
  return (
    <div className="text-center space-y-4">
      <div>
        <p className="text-sm text-gray-500 inline-flex items-center gap-1">
          {t(LocaleKeys.pages_auth_account_verification_resend_text)}{" "}
          {mutation.isPending ? (
            <SpinnerLoader size={18} color="#2563EB" />
          ) : (
            <button
              className="text-[#2563EB] hover:tet-[#1D4ED8] font-medium items-center inline"
              onClick={handleResendCode}
            >
              {t(LocaleKeys.pages_auth_account_verification_resend_action)}
            </button>
          )}
        </p>
        {error && <p className="text-sm text-red-500">{error.description}</p>}
      </div>
      <div className="text-center">
        <Link
          to={APP_PATHS.REGISTER}
          className="flex gap-2 justify-center items-center text-sm text-gray-500 hover:text-gray-900"
        >
          <ArrowLeftIcon className="size-4 " />
          {t(LocaleKeys.pages_auth_account_verification_back_to_create_account)}
        </Link>
      </div>
    </div>
  );
};
