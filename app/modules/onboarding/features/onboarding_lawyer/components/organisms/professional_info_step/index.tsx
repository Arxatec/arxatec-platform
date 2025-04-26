import { BuildingLibraryIcon } from "@heroicons/react/16/solid";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { CustomInput, CustomSelector } from "~/components/atoms";
import { LocaleKeys } from "~/lang";
import {
  experiencesData,
  specialitiesData,
} from "../../pages/onboarding_lawyer_page";

type FormValues = {
  professionalInfo: {
    speciality: {
      id: number;
      name: string;
    };
    experience: {
      id: number;
      name: string;
    };
    education: string;
  };
};

export const ProfessionalInfoStep = () => {
  const { t } = useTranslation();
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<FormValues>();

  const experiences = experiencesData.map((experience) => ({
    id: experience.id,
    name: t(experience.name),
  }));

  const specialities = specialitiesData.map((speciality) => ({
    id: speciality.id,
    name: t(speciality.name),
  }));

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
          <Controller
            control={control}
            name="professionalInfo.speciality"
            rules={{ required: t("Debes seleccionar una especialidad") }}
            render={({ field }) => (
              <CustomSelector
                options={specialities}
                selected={field.value}
                onChange={field.onChange}
              />
            )}
          />
          {errors.professionalInfo?.speciality && (
            <p className="mt-1 text-sm text-red-600" role="alert">
              {errors.professionalInfo.speciality.message}
            </p>
          )}
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
          <Controller
            control={control}
            name="professionalInfo.experience"
            rules={{ required: t("Debes seleccionar tu nivel de experiencia") }}
            render={({ field }) => (
              <CustomSelector
                options={experiences}
                selected={field.value}
                onChange={field.onChange}
              />
            )}
          />
          {errors.professionalInfo?.experience && (
            <p className="mt-1 text-sm text-red-600" role="alert">
              {errors.professionalInfo.experience.message}
            </p>
          )}
        </div>
      </div>
      <div>
        <CustomInput
          {...register("professionalInfo.education", {
            required: t("Este campo es requerido"),
          })}
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
        {errors.professionalInfo?.education && (
          <p className="mt-1 text-sm text-red-600" role="alert">
            {errors.professionalInfo.education.message}
          </p>
        )}
      </div>
    </>
  );
};
