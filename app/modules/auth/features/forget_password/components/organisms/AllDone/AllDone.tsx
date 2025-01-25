import React, { type JSX } from "react";
import { IconCheck, IconQrCode } from "../../atoms/Icon/Icon";
import { Button } from "../../atoms/Button/Button";
import { useTranslation } from "react-i18next";
import { LocaleKeys } from "~/lang";

export default function TodoListo(): JSX.Element {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-sm w-full flex flex-col items-center text-center space-y-6">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
          <IconCheck />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold">
            {t(LocaleKeys.pages_auth_todo_ready_title)}
          </h1>
          <p className="text-gray-500">
            {t(LocaleKeys.pages_auth_todo_ready_description)}
          </p>
        </div>
        <div className="w-full space-y-3">
          <Button className="w-full bg-[#0061FF] hover:bg-[#0056E6] text-white flex items-center justify-center">
            <IconQrCode />
            {t(LocaleKeys.pages_auth_todo_ready_button_face_id)}
          </Button>
          <Button className="w-full border border-gray-300 text-gray-700 hover:bg-gray-100">
            {t(LocaleKeys.pages_auth_todo_ready_button_later)}
          </Button>
        </div>
      </div>
    </div>
  );
}
