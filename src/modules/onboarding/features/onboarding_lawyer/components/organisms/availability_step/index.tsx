import { Controller, useFormContext } from "react-hook-form";
import { Schedule } from "~/components/atoms";

type FormValues = {
  availability: {
    schedule: Record<string, { enabled: boolean; slots: string[] }>;
  };
};

export const AvailabilityStep = () => {
  const { control } = useFormContext<FormValues>();
  return (
    <div>
      <Controller
        control={control}
        name="availability.schedule"
        defaultValue={{}}
        render={({ field }) => <Schedule onChange={field.onChange} />}
      />
    </div>
  );
};
