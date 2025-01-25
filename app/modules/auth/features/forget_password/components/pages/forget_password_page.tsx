import React from "react";
import ForgotPassword from "../organisms/ForgotPassword/ForgotPassword";
import { useTranslation } from "react-i18next";
import { LocaleKeys } from "~/lang";
import { LanguageSelector } from "~/modules/auth/components/molecules";

const ForgotPasswordPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div>
      <LanguageSelector />
      <ForgotPassword />
    </div>
  );
};

export default ForgotPasswordPage;
