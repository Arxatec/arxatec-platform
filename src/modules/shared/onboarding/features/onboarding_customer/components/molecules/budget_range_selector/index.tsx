import type { Control } from "react-hook-form";
import { Controller } from "react-hook-form";
import { CustomRange } from "~/components/atoms";
import type { CustomerOnboardingFormData } from "../../../types";

interface Props {
  control: Control<CustomerOnboardingFormData>;
}

export const BudgetRangeSelector: React.FC<Props> = ({ control }) => {
  return (
    <div>
      <label
        htmlFor="budget"
        className="block text-sm font-medium text-gray-900 mb-2"
      >
        Presupuesto estimado
      </label>
      <div className="w-full">
        <Controller
          control={control}
          name="legalPreferences.budgetRange"
          rules={{ required: "Debes seleccionar un presupuesto" }}
          render={({ field, fieldState: { error } }) => (
            <>
              <div className="flex items-center justify-between gap-4">
                <p className="text-gray-500 text-sm flex items-end">
                  <span className="text-gray-500 font-semibold tracking-tighter mr-1 block text-xs">
                    S/
                  </span>
                  {field.value || 0}.00
                </p>
                <CustomRange
                  min={100}
                  max={4000}
                  step={1}
                  defaultValue={field.value}
                  onChange={(value) => field.onChange(value)}
                />
                <p className="text-gray-500 text-sm flex items-end">
                  <span className="text-gray-500 font-semibold tracking-tighter mr-1 block text-xs">
                    S/
                  </span>
                  4000.00
                </p>
              </div>
              {error && (
                <p className="mt-1 text-sm text-red-600" role="alert">
                  {error.message}
                </p>
              )}
            </>
          )}
        />
      </div>
    </div>
  );
};
