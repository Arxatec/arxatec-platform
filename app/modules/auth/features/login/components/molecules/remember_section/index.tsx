import { useState } from "react";
import { Checkbox } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/outline";
import { CustomLink } from "~/components/atoms";
import { useTranslation } from "react-i18next";
import { LocaleKeys } from "~/lang";

export const RememberSection = () => {
  const { t } = useTranslation();
  const [enabled, setEnabled] = useState(false);
  return (
    <div className="flex items-center justify-between">
      <div className="flex gap-3">
        <div className="flex h-6 shrink-0 items-center ">
          <div className="group grid size-4 grid-cols-1">
            <Checkbox
              checked={enabled}
              onChange={setEnabled}
              className="group size-4 rounded border bg-white data-[checked]:bg-blue-500 flex items-center justify-center"
            >
              <CheckIcon
                className="group-data-[checked]:block h-3 w-3 text-white  "
                strokeWidth={4}
              />
            </Checkbox>
          </div>
        </div>
        <label htmlFor="remember-me" className="block text-sm/6 text-gray-900">
          {t(LocaleKeys.pages_auth_login_form_remember_me)}
        </label>
      </div>

      <div className="text-sm/6">
        <CustomLink
          text={t(LocaleKeys.pages_auth_login_form_forget_password)}
          to="#"
        />
      </div>
    </div>
  );
};
