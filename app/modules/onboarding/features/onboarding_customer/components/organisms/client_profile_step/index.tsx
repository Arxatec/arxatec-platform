import { AcademicCapIcon, MapPinIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { CustomInput, CustomSelector, PrimaryButton } from "~/components/atoms";
import { LocaleKeys } from "~/lang";

const rangeAgesData = [
  {
    id: 0,
    name: LocaleKeys.pages_onboarding_customer_client_profile_questions_question_4_answer_1,
  },
  {
    id: 1,
    name: LocaleKeys.pages_onboarding_customer_client_profile_questions_question_4_answer_2,
  },
  {
    id: 2,
    name: LocaleKeys.pages_onboarding_customer_client_profile_questions_question_4_answer_3,
  },
  {
    id: 3,
    name: LocaleKeys.pages_onboarding_customer_client_profile_questions_question_4_answer_4,
  },
  {
    id: 4,
    name: LocaleKeys.pages_onboarding_customer_client_profile_questions_question_4_answer_5,
  },
  {
    id: 5,
    name: LocaleKeys.pages_onboarding_customer_client_profile_questions_question_4_answer_6,
  },
];

export const ClientProfileStep = () => {
  const { t } = useTranslation();
  const rangeAges = rangeAgesData.map((item) => {
    return {
      id: item.id,
      name: t(item.name),
    };
  });
  const [rangeAge, setRangeAge] = useState(rangeAges[0]);
  return (
    <>
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          {t(
            LocaleKeys.pages_onboarding_customer_client_profile_questions_question_1_label
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
                LocaleKeys.pages_onboarding_customer_client_profile_questions_question_1_placeholder
              )}
            </p>
          </PrimaryButton>
        </div>
      </div>

      <CustomInput
        startAdornment={<MapPinIcon className="size-5 text-gray-400" />}
        type="text"
        label={t(
          LocaleKeys.pages_onboarding_customer_client_profile_questions_question_2_label
        )}
        placeholder={t(
          LocaleKeys.pages_onboarding_customer_client_profile_questions_question_2_placeholder
        )}
        required
      />
      <div className="grid grid-cols-2 gap-4">
        <CustomInput
          startAdornment={<AcademicCapIcon className="size-5 text-gray-400" />}
          type="text"
          label={t(
            LocaleKeys.pages_onboarding_customer_client_profile_questions_question_3_label
          )}
          placeholder={t(
            LocaleKeys.pages_onboarding_customer_client_profile_questions_question_3_placeholder
          )}
          required
        />
        <div>
          <label
            htmlFor={"age"}
            className="block text-sm font-medium text-gray-900 mb-2"
          >
            {t(
              LocaleKeys.pages_onboarding_customer_client_profile_questions_question_4_label
            )}
          </label>
          <CustomSelector
            options={rangeAges}
            selected={rangeAge}
            onChange={setRangeAge}
          />
        </div>
      </div>
    </>
  );
};
