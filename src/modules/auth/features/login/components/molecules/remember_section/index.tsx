import { useState } from "react";
import { Checkbox } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/outline";
import { CustomLink } from "~/components/atoms";
import { useTranslation } from "react-i18next";
import { LocaleKeys } from "~/lang";
import { APP_PATHS } from "~/routes/routes";

export const RememberSection = () => {
  const { t } = useTranslation();
  const [enabled, setEnabled] = useState(false);
  return (
    <div className="flex items-center justify-between">
      <div />

      <div className="text-sm/6">
        <CustomLink
          text={t(LocaleKeys.pages_auth_login_form_forget_password)}
          to={APP_PATHS.FORGOT_PASSWORD}
        />
      </div>
    </div>
  );
};
