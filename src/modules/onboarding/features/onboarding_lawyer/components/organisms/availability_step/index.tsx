import { Controller, useFormContext } from "react-hook-form";
import { Schedule } from "~/components/atoms";
import type { LawyerOnboardingFormData } from "../../../types";
import { useEffect, useState } from "react";

const SCHEDULE_STORAGE_KEY = "lawyer_schedule";

type ScheduleType = LawyerOnboardingFormData["availability"]["schedule"];

export const AvailabilityStep = () => {
  const {
    control,
    formState: { errors },
    setValue,
  } = useFormContext<LawyerOnboardingFormData>();

  const [savedSchedule, setSavedSchedule] = useState<ScheduleType | null>(null);

  useEffect(() => {
    try {
      const storedSchedule = localStorage.getItem(SCHEDULE_STORAGE_KEY);
      if (storedSchedule) {
        const parsedSchedule = JSON.parse(storedSchedule);
        setSavedSchedule(parsedSchedule);
        setValue("availability.schedule", parsedSchedule);
      }
    } catch (error) {
      console.error("Error cargando el horario guardado:", error);
    }
  }, [setValue]);

  const scheduleError = errors.availability?.schedule;
  const errorMessage =
    typeof scheduleError?.message === "string" ? scheduleError.message : "";

  return (
    <div>
      <Controller
        control={control}
        name="availability.schedule"
        defaultValue={savedSchedule || {}}
        rules={{
          validate: (value) => {
            if (!value || Object.keys(value).length === 0) {
              return "Debes configurar al menos un horario de disponibilidad";
            }

            const hasValidSchedule = Object.entries(value).some(
              ([, dayConfig]) =>
                dayConfig.enabled &&
                Array.isArray(dayConfig.timeSlots) &&
                dayConfig.timeSlots.length > 0
            );

            if (!hasValidSchedule) {
              return "Debes habilitar al menos un día y configurar horarios disponibles";
            }

            try {
              localStorage.setItem(SCHEDULE_STORAGE_KEY, JSON.stringify(value));
            } catch (error) {
              console.error("Error guardando el horario:", error);
            }
            return true;
          },
        }}
        render={({ field }) => (
          <Schedule
            onChange={(value) => {
              field.onChange(value);
            }}
            defaultSchedule={savedSchedule}
          />
        )}
      />
      {errorMessage && (
        <p className="mt-1 text-sm text-red-600" role="alert">
          {errorMessage}
        </p>
      )}
    </div>
  );
};
