import React from "react";
import SetPassword from "../organisms/SetPassword";
import { useTranslation } from "react-i18next";
import { LocaleKeys } from "~/lang";
import { LanguageSelector } from "~/modules/auth/components/molecules";

const SetPasswordPage: React.FC = () => {
  return (
    <div>
      <LanguageSelector />
      <SetPassword />
    </div>
  );
};

export default SetPasswordPage;
