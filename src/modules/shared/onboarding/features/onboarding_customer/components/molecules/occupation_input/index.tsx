import type { Control } from "react-hook-form";
import { Controller } from "react-hook-form";
import { AcademicCapIcon } from "@heroicons/react/16/solid";
import { CustomInput } from "~/components/atoms";
import type { CustomerOnboardingFormData } from "../../../types";

interface Props {
  control: Control<CustomerOnboardingFormData>;
}

export const OccupationInput: React.FC<Props> = ({ control }) => {
  return (
    <div>
      <Controller
        control={control}
        name="clientProfile.occupation"
        rules={{ required: "Este campo es requerido" }}
        render={({ field, fieldState: { error } }) => (
          <>
            <CustomInput
              {...field}
              startAdornment={
                <AcademicCapIcon className="size-5 text-gray-400" />
              }
              type="text"
              label="Ocupación"
              placeholder="Ingresa tu ocupación"
              required
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
