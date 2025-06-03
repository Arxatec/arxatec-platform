import type { Control } from "react-hook-form";
import { Controller } from "react-hook-form";
import { CustomSelector } from "~/components/atoms";
import type { CustomerOnboardingFormData } from "../../../types";
import { rangeAgesData } from "../../../constants/form_data";

interface Props {
  control: Control<CustomerOnboardingFormData>;
}

export const AgeRangeSelector: React.FC<Props> = ({ control }) => {
  return (
    <div>
      <label
        htmlFor="age"
        className="block text-sm font-medium text-gray-900 mb-2"
      >
        Rango de edad
      </label>
      <Controller
        control={control}
        name="clientProfile.ageRange"
        rules={{ required: "Debes seleccionar un rango de edad" }}
        render={({ field, fieldState: { error } }) => (
          <>
            <CustomSelector
              options={rangeAgesData}
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
