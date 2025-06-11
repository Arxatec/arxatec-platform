import type { Control } from "react-hook-form";
import { Controller } from "react-hook-form";
import { CustomSelector } from "~/components/atoms";
import type { CustomerOnboardingFormData } from "../../../types";
import { communicationPreferencesData } from "../../../constants/form_data";

interface Props {
  control: Control<CustomerOnboardingFormData>;
}

export const CommunicationPreferenceSelector: React.FC<Props> = ({
  control,
}) => {
  return (
    <div>
      <label
        htmlFor="communication"
        className="block text-sm font-medium text-gray-900 mb-2"
      >
        Preferencia de comunicación
      </label>
      <Controller
        control={control}
        name="legalPreferences.communicationPreference"
        rules={{
          required: "Debes seleccionar una preferencia de comunicación",
        }}
        render={({ field, fieldState: { error } }) => (
          <>
            <CustomSelector
              options={communicationPreferencesData}
              selected={field.value}
              onChange={field.onChange}
            />
            {error && (
              <p className="mt-1 text-sm text-red-600" role="alert">
                {error.message}
              </p>
            )}
          </>
        )}
      />
    </div>
  );
};
