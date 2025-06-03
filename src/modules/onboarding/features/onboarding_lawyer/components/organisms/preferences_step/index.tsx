import { Controller, useFormContext } from "react-hook-form";
import { CustomSelector, CustomToggle } from "~/components/atoms";
import {
  paymentMethodsData,
  idealClientsData,
  communicationPreferencesData,
} from "../../../constants/form_data";
import type { LawyerOnboardingFormData } from "../../../types";

export const PreferencesStep = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<LawyerOnboardingFormData>();

  return (
    <>
      <div>
        <label
          htmlFor="payment-method"
          className="block text-sm font-medium text-gray-900 mb-2"
        >
          Método de pago preferido
        </label>
        <Controller
          control={control}
          name="preferences.paymentMethod"
          rules={{ required: "Debes seleccionar un método de pago" }}
          render={({ field }) => (
            <CustomSelector
              options={paymentMethodsData}
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
            htmlFor="ideal-client"
            className="block text-sm font-medium text-gray-900 mb-2"
          >
            Cliente ideal
          </label>
          <Controller
            control={control}
            name="preferences.idealClient"
            rules={{ required: "Debes seleccionar un tipo de cliente" }}
            render={({ field }) => (
              <CustomSelector
                options={idealClientsData}
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
            htmlFor="communication-preference"
            className="block text-sm font-medium text-gray-900 mb-2"
          >
            Preferencia de comunicación
          </label>
          <Controller
            control={control}
            name="preferences.communicationPreference"
            rules={{
              required: "Debes seleccionar una preferencia de comunicación",
            }}
            render={({ field }) => (
              <CustomSelector
                options={communicationPreferencesData}
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
            label="¿Ofreces consultas virtuales?"
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
            label="¿Ofreces trabajo pro bono?"
            description="El trabajo pro bono es trabajo legal gratuito para personas o causas que lo necesitan"
            initialState={value}
            onChange={onChange}
          />
        )}
      />
    </>
  );
};
