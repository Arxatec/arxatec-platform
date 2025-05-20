import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { CustomSelector, CustomToggle } from "~/components/atoms";
import { LocaleKeys } from "~/lang";
import {
  paymentMethodsData,
  idealClientsData,
  communicationPreferencesData,
} from "../../pages/onboarding_lawyer_page";

type FormValues = {
  preferences: {
    paymentMethod: {
      id: number;
      name: string;
    };
    idealClient: {
      id: number;
      name: string;
    };
    communicationPreference: {
      id: number;
      name: string;
    };
    virtualConsultations: boolean;
    proBonoWork: boolean;
  };
};

export const PreferencesStep = () => {
  const { t } = useTranslation();
  const {
    control,
    formState: { errors },
  } = useFormContext<FormValues>();

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

  return (
    <>
      <div>
        <label
          htmlFor={"payment-method"}
          className="block text-sm font-medium text-gray-900 mb-2"
        >
          {t(
            LocaleKeys.pages_onboarding_lawyer_preferences_questions_question_1_label
          )}
        </label>
        <Controller
          control={control}
          name="preferences.paymentMethod"
          rules={{ required: t("Debes seleccionar un método de pago") }}
          render={({ field }) => (
            <CustomSelector
              options={paymentMethods}
              selected={field.value}
              onChange={field.onChange}
            />
          )}
        />
        {errors.preferences?.paymentMethod && (
          <p className="mt-1 text-sm text-red-600" role="alert">
            {errors.preferences.paymentMethod.message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor={"ideal-client"}
            className="block text-sm font-medium text-gray-900 mb-2"
          >
            {t(
              LocaleKeys.pages_onboarding_lawyer_preferences_questions_question_2_label
            )}
          </label>
          <Controller
            control={control}
            name="preferences.idealClient"
            rules={{ required: t("Debes seleccionar un tipo de cliente") }}
            render={({ field }) => (
              <CustomSelector
                options={idealClients}
                selected={field.value}
                onChange={field.onChange}
              />
            )}
          />
          {errors.preferences?.idealClient && (
            <p className="mt-1 text-sm text-red-600" role="alert">
              {errors.preferences.idealClient.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor={"communication-preference"}
            className="block text-sm font-medium text-gray-900 mb-2"
          >
            {t(
              LocaleKeys.pages_onboarding_lawyer_preferences_questions_question_3_label
            )}
          </label>
          <Controller
            control={control}
            name="preferences.communicationPreference"
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
          {errors.preferences?.communicationPreference && (
            <p className="mt-1 text-sm text-red-600" role="alert">
              {errors.preferences.communicationPreference.message}
            </p>
          )}
        </div>
      </div>

      <Controller
        control={control}
        name="preferences.virtualConsultations"
        render={({ field: { value, onChange } }) => (
          <CustomToggle
            label={t(
              LocaleKeys.pages_onboarding_lawyer_preferences_questions_question_4_label
            )}
            initialState={value}
            onChange={onChange}
          />
        )}
      />

      <Controller
        control={control}
        name="preferences.proBonoWork"
        render={({ field: { value, onChange } }) => (
          <CustomToggle
            label={t(
              LocaleKeys.pages_onboarding_lawyer_preferences_questions_question_5_label
            )}
            description={t(
              LocaleKeys.pages_onboarding_lawyer_preferences_questions_question_5_description
            )}
            initialState={value}
            onChange={onChange}
          />
        )}
      />
    </>
  );
};
