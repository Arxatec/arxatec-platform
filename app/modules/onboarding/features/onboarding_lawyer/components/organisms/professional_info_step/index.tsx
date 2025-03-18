import { BuildingLibraryIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { CustomInput, CustomSelector } from "~/components/atoms";
import { LocaleKeys } from "~/lang";

const specialitiesData = [
  {
    id: 1,
    name: LocaleKeys.pages_onboarding_lawyer_professional_info_questions_question_1_answer_1,
  },
  {
    id: 2,
    name: LocaleKeys.pages_onboarding_lawyer_professional_info_questions_question_1_answer_2,
  },
  {
    id: 3,
    name: LocaleKeys.pages_onboarding_lawyer_professional_info_questions_question_1_answer_3,
  },
];

const experiencesData = [
  {
    id: 1,
    name: LocaleKeys.pages_onboarding_lawyer_professional_info_questions_question_2_answer_1,
  },
  {
    id: 2,
    name: LocaleKeys.pages_onboarding_lawyer_professional_info_questions_question_2_answer_2,
  },
  {
    id: 3,
    name: LocaleKeys.pages_onboarding_lawyer_professional_info_questions_question_2_answer_3,
  },
  {
    id: 4,
    name: LocaleKeys.pages_onboarding_lawyer_professional_info_questions_question_2_answer_4,
  },
  {
    id: 5,
    name: LocaleKeys.pages_onboarding_lawyer_professional_info_questions_question_2_answer_5,
  },
  {
    id: 6,
    name: LocaleKeys.pages_onboarding_lawyer_professional_info_questions_question_2_answer_6,
  },
];

export const ProfessionalInfoStep = () => {
  const { t } = useTranslation();
  const experiences = experiencesData.map((experience) => ({
    id: experience.id,
    name: t(experience.name),
  }));
  const specialities = specialitiesData.map((speciality) => ({
    id: speciality.id,
    name: t(speciality.name),
  }));
  const [speciality, setSpeciality] = useState(specialities[0]);
  const [experience, setExperience] = useState(experiences[0]);

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor={"speciality"}
            className="block text-sm font-medium text-gray-900 mb-2"
          >
            {t(
              LocaleKeys.pages_onboarding_lawyer_professional_info_questions_question_1_label
            )}
          </label>
          <CustomSelector
            options={specialities}
            selected={speciality}
            onChange={setSpeciality}
          />
        </div>
        <div>
          <label
            htmlFor={"experience"}
            className="block text-sm font-medium text-gray-900 mb-2"
          >
            {t(
              LocaleKeys.pages_onboarding_lawyer_professional_info_questions_question_2_label
            )}
          </label>
          <CustomSelector
            options={experiences}
            selected={experience}
            onChange={setExperience}
          />
        </div>
      </div>
      <CustomInput
        startAdornment={
          <BuildingLibraryIcon className="size-5 text-gray-400" />
        }
        type="text"
        label={t(
          LocaleKeys.pages_onboarding_lawyer_professional_info_questions_question_3_label
        )}
        placeholder={t(
          LocaleKeys.pages_onboarding_lawyer_professional_info_questions_question_3_placeholder
        )}
        required
      />
    </>
  );
};
