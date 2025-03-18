import { useState } from "react";
import { useTranslation } from "react-i18next";
import { CustomRange, CustomSelector } from "~/components/atoms";
import { LocaleKeys } from "~/lang";

const communicationPreferencesData = [
  {
    id: 1,
    name: LocaleKeys.pages_onboarding_customer_legal_preferences_questions_question_3_answer_1,
  },
  {
    id: 2,
    name: LocaleKeys.pages_onboarding_customer_legal_preferences_questions_question_3_answer_2,
  },
  {
    id: 3,
    name: LocaleKeys.pages_onboarding_customer_legal_preferences_questions_question_3_answer_3,
  },
];

const urgenciesData = [
  {
    id: 1,
    name: LocaleKeys.pages_onboarding_customer_legal_preferences_questions_question_2_answer_1,
  },
  {
    id: 2,
    name: LocaleKeys.pages_onboarding_customer_legal_preferences_questions_question_2_answer_2,
  },
  {
    id: 3,
    name: LocaleKeys.pages_onboarding_customer_legal_preferences_questions_question_2_answer_3,
  },
];

export const LegalPreferencesStep = () => {
  const { t } = useTranslation();
  const communicationPreferences = communicationPreferencesData.map((item) => ({
    id: item.id,
    name: t(item.name),
  }));
  const urgencies = urgenciesData.map((item) => ({
    id: item.id,
    name: t(item.name),
  }));
  const [communicationPreference, setCommunicationPreference] = useState(
    communicationPreferences[0]
  );

  const [urgency, setUrgency] = useState(urgencies[0]);
  const [priceRange, setPriceRange] = useState(100);
  return (
    <>
      <div>
        <label
          htmlFor={"experience"}
          className="block text-sm font-medium text-gray-900 mb-2"
        >
          {t(
            LocaleKeys.pages_onboarding_customer_legal_preferences_questions_question_1_label
          )}
        </label>

        <div className="w-full ">
          <div className="flex items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">${priceRange}.00</p>
            <CustomRange
              min={0}
              max={1000}
              step={1}
              defaultValue={50}
              onChange={setPriceRange}
            />
            <p className="text-gray-500 text-sm">$1000.00</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 ">
        <div>
          <label
            htmlFor={"speciality"}
            className="block text-sm font-medium text-gray-900 mb-2"
          >
            {t(
              LocaleKeys.pages_onboarding_customer_legal_preferences_questions_question_2_label
            )}
          </label>
          <CustomSelector
            options={urgencies}
            selected={urgency}
            onChange={setUrgency}
          />
        </div>
        <div>
          <label
            htmlFor={"experience"}
            className="block text-sm font-medium text-gray-900 mb-2"
          >
            {t(
              LocaleKeys.pages_onboarding_customer_legal_preferences_questions_question_3_label
            )}
          </label>
          <CustomSelector
            options={communicationPreferences}
            selected={communicationPreference}
            onChange={setCommunicationPreference}
          />
        </div>
      </div>
    </>
  );
};
