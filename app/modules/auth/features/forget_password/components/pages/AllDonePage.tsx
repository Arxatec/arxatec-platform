import React from "react";
import AllDone from "../organisms/AllDone";
import { useTranslation } from "react-i18next";
import { LocaleKeys } from "~/lang";
import { LanguageSelector } from "~/modules/auth/components/molecules";

const AllDonePage: React.FC = () => {
  return (
    <div>
      <LanguageSelector />
      <AllDone />
    </div>
  );
};

export default AllDonePage;
