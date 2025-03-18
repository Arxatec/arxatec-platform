import { useState } from "react";
import { useTranslation } from "react-i18next";
import { CustomSelector, CustomToggle } from "~/components/atoms";
import { LocaleKeys } from "~/lang";

const idealClientsData = [
  {
    id: 1,
    name: LocaleKeys.pages_onboarding_lawyer_preferences_questions_question_2_answer_1,
  },
  {
    id: 2,
    name: LocaleKeys.pages_onboarding_lawyer_preferences_questions_question_2_answer_2,
  },
  {
    id: 3,
    name: LocaleKeys.pages_onboarding_lawyer_preferences_questions_question_2_answer_3,
  },
  {
    id: 4,
    name: LocaleKeys.pages_onboarding_lawyer_preferences_questions_question_2_answer_4,
  },
];

const communicationPreferencesData = [
  {
    id: 1,
    name: LocaleKeys.pages_onboarding_lawyer_preferences_questions_question_3_answer_1,
  },
  {
    id: 2,
    name: LocaleKeys.pages_onboarding_lawyer_preferences_questions_question_3_answer_2,
  },
  {
    id: 3,
    name: LocaleKeys.pages_onboarding_lawyer_preferences_questions_question_3_answer_3,
  },
  {
    id: 4,
    name: LocaleKeys.pages_onboarding_lawyer_preferences_questions_question_3_answer_4,
  },
];

const paymentMethodsData = [
  {
    id: 2,
    name: LocaleKeys.pages_onboarding_lawyer_preferences_questions_question_1_answer_1,
  },
  {
    id: 3,
    name: LocaleKeys.pages_onboarding_lawyer_preferences_questions_question_1_answer_2,
  },
  {
    id: 5,
    name: LocaleKeys.pages_onboarding_lawyer_preferences_questions_question_1_answer_3,
  },
  {
    id: 5,
    name: LocaleKeys.pages_onboarding_lawyer_preferences_questions_question_1_answer_4,
  },
  {
    id: 6,
    name: LocaleKeys.pages_onboarding_lawyer_preferences_questions_question_1_answer_5,
  },
  {
    id: 7,
    name: LocaleKeys.pages_onboarding_lawyer_preferences_questions_question_1_answer_6,
  },
];
export const PreferencesStep = () => {
  const { t } = useTranslation();
  const paymentMethods = paymentMethodsData.map((item) => ({
    id: item.id,
    name: t(item.name),
  }));
  const communicationPreferences = communicationPreferencesData.map((item) => ({
    id: item.id,
    name: t(item.name),
  }));
  const idealClients = idealClientsData.map((item) => ({
    id: item.id,
    name: t(item.name),
  }));

  const [idealClient, setIdealClient] = useState(idealClients[0]);
  const [communicationPreference, setCommunicationPreference] = useState(
    communicationPreferences[0]
  );
  const [paymentMethod, setPaymentMethod] = useState(paymentMethods[0]);
  return (
    <>
      <div>
        <label
          htmlFor={"experience"}
          className="block text-sm font-medium text-gray-900 mb-2"
        >
          {t(
            LocaleKeys.pages_onboarding_lawyer_preferences_questions_question_1_label
          )}
        </label>
        <CustomSelector
          options={paymentMethods}
          selected={paymentMethod}
          onChange={setPaymentMethod}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor={"speciality"}
            className="block text-sm font-medium text-gray-900 mb-2"
          >
            {t(
              LocaleKeys.pages_onboarding_lawyer_preferences_questions_question_2_label
            )}
          </label>
          <CustomSelector
            options={idealClients}
            selected={idealClient}
            onChange={setIdealClient}
          />
        </div>
        <div>
          <label
            htmlFor={"experience"}
            className="block text-sm font-medium text-gray-900 mb-2"
          >
            {t(
              LocaleKeys.pages_onboarding_lawyer_preferences_questions_question_3_label
            )}
          </label>
          <CustomSelector
            options={communicationPreferences}
            selected={communicationPreference}
            onChange={setCommunicationPreference}
          />
        </div>
      </div>
      <CustomToggle
        label={t(
          LocaleKeys.pages_onboarding_lawyer_preferences_questions_question_4_label
        )}
      />
      <CustomToggle
        label={t(
          LocaleKeys.pages_onboarding_lawyer_preferences_questions_question_5_label
        )}
        description={t(
          LocaleKeys.pages_onboarding_lawyer_preferences_questions_question_5_description
        )}
      />
    </>
  );
};
