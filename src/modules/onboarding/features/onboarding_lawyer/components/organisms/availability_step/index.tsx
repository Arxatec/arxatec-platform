import { Controller, useFormContext } from "react-hook-form";
import { Schedule } from "~/components/atoms";
import type { LawyerOnboardingFormData } from "../../../types";

export const AvailabilityStep = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<LawyerOnboardingFormData>();

  const scheduleError = errors.availability?.schedule;
  const errorMessage =
    typeof scheduleError?.message === "string" ? scheduleError.message : "";

  return (
    <div>
      <Controller
        control={control}
        name="availability.schedule"
        defaultValue={{}}
        rules={{
          validate: (value) => {
            const hasEnabledDays = Object.values(value).some(
              (day) => day.enabled && day.slots.length > 0
            );
            return (
              hasEnabledDays ||
              "Debes seleccionar al menos un horario disponible"
            );
          },
        }}
        render={({ field }) => <Schedule onChange={field.onChange} />}
      />
      {errorMessage && (
        <p className="mt-1 text-sm text-red-600" role="alert">
          {errorMessage}
        </p>
      )}
    </div>
  );
};
