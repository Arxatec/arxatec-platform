import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { CustomRange, CustomSelector } from "~/components/atoms";
import { LocaleKeys } from "~/lang";
import {
  communicationPreferencesData,
  urgenciesData,
} from "../../pages/onboarding_customer_page";

type FormValues = {
  legalPreferences: {
    budgetRange: number;
    urgency: {
      id: number;
      name: string;
    };
    communicationPreference: {
      id: number;
      name: string;
    };
  };
};

export const LegalPreferencesStep = () => {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
  } = useFormContext<FormValues>();

  const communicationPreferences = communicationPreferencesData.map((item) => ({
    id: item.id,
    name: t(item.name),
  }));

  const urgencies = urgenciesData.map((item) => ({
    id: item.id,
    name: t(item.name),
  }));

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

        <div className="w-full">
          <div className="flex items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">
              $
              {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (control._formValues.legalPreferences as any)?.budgetRange || 0
              }
              .00
            </p>
            <Controller
              control={control}
              name="legalPreferences.budgetRange"
              rules={{ required: true }}
              render={({ field }) => (
                <CustomRange
                  min={0}
                  max={1000}
                  step={1}
                  defaultValue={field.value}
                  onChange={(value) => field.onChange(value)}
                />
              )}
            />
            <p className="text-gray-500 text-sm">$1000.00</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor={"speciality"}
            className="block text-sm font-medium text-gray-900 mb-2"
          >
            {t(
              LocaleKeys.pages_onboarding_customer_legal_preferences_questions_question_2_label
            )}
          </label>
          <Controller
            control={control}
            name="legalPreferences.urgency"
            rules={{ required: t("Debes seleccionar un nivel de urgencia") }}
            render={({ field }) => (
              <CustomSelector
                options={urgencies}
                selected={field.value}
                onChange={field.onChange}
              />
            )}
          />
          {errors.legalPreferences?.urgency && (
            <p className="mt-1 text-sm text-red-600" role="alert">
              {errors.legalPreferences.urgency.message}
            </p>
          )}
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
          <Controller
            control={control}
            name="legalPreferences.communicationPreference"
            rules={{
              required: t("Debes seleccionar una preferencia de comunicación"),
            }}
            render={({ field }) => (
              <CustomSelector
                options={communicationPreferences}
                selected={field.value}
                onChange={field.onChange}
              />
            )}
          />
          {errors.legalPreferences?.communicationPreference && (
            <p className="mt-1 text-sm text-red-600" role="alert">
              {errors.legalPreferences.communicationPreference.message}
            </p>
          )}
        </div>
      </div>
    </>
  );
};
