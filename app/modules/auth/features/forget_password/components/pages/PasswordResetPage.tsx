import React from "react";
import PasswordReset from "../organisms/PasswordReset";
import { useTranslation } from "react-i18next";
import { LocaleKeys } from "~/lang";
import { LanguageSelector } from "~/modules/auth/components/molecules";

const PasswordResetPage: React.FC = () => {
  return (
    <div>
      <LanguageSelector />
      <PasswordReset />
    </div>
  );
};

export default PasswordResetPage;
