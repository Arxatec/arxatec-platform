import { MapPinIcon, UserIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { CustomInput, CustomTextArea, PrimaryButton } from "~/components/atoms";
import { LocaleKeys } from "~/lang";

export const LawyerProfileStep = () => {
  const { t } = useTranslation();

  return (
    <>
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          {t(
            LocaleKeys.pages_onboarding_lawyer_lawyer_profile_questions_question_1_label
          )}
        </label>
        <div className="flex items-center gap-4">
          <img
            className="size-16 object-cover rounded-xl border border-gray-200"
            src="https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg"
            alt="avatar"
          />
          <PrimaryButton className="rounded-md gap-3 bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50  text-center flex items-center justify-center">
            <p className="text-gray-900">
              {t(
                LocaleKeys.pages_onboarding_lawyer_lawyer_profile_questions_question_1_placeholder
              )}
            </p>
          </PrimaryButton>
        </div>
      </div>
      <CustomTextArea
        startAdornment={<UserIcon className="size-5 text-gray-400" />}
        label={t(
          LocaleKeys.pages_onboarding_lawyer_lawyer_profile_questions_question_2_label
        )}
        placeholder={t(
          LocaleKeys.pages_onboarding_lawyer_lawyer_profile_questions_question_2_placeholder
        )}
        required
      />
      <CustomInput
        startAdornment={<MapPinIcon className="size-5 text-gray-400" />}
        type="text"
        label={t(
          LocaleKeys.pages_onboarding_lawyer_lawyer_profile_questions_question_3_label
        )}
        placeholder={t(
          LocaleKeys.pages_onboarding_lawyer_lawyer_profile_questions_question_3_placeholder
        )}
        required
      />
    </>
  );
};
