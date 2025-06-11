import type { Control } from "react-hook-form";
import { Controller } from "react-hook-form";
import { CustomSelector } from "~/components/atoms";
import type { CustomerOnboardingFormData } from "../../../types";
import { urgenciesData } from "../../../constants/form_data";

interface Props {
  control: Control<CustomerOnboardingFormData>;
}

export const UrgencySelector: React.FC<Props> = ({ control }) => {
  return (
    <div>
      <label
        htmlFor="urgency"
        className="block text-sm font-medium text-gray-900 mb-2"
      >
        Nivel de urgencia
      </label>
      <Controller
        control={control}
        name="legalPreferences.urgency"
        rules={{ required: "Debes seleccionar un nivel de urgencia" }}
        render={({ field, fieldState: { error } }) => (
          <>
            <CustomSelector
              options={urgenciesData}
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
