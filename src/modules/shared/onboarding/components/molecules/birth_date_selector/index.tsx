import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { CustomCalendar } from "~/components/atoms/custom_calendar";

interface Props<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
}

export const BirthDateSelector = <T extends FieldValues>({
  control,
  name,
}: Props<T>) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-900 mb-2">
        Fecha de nacimiento
      </label>
      <Controller
        control={control}
        name={name}
        rules={{
          required: "La fecha de nacimiento es requerida",
          validate: (value) => {
            if (!value) return true;
            const date = new Date(value);
            const today = new Date();
            let age = today.getFullYear() - date.getFullYear();
            const m = today.getMonth() - date.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < date.getDate())) {
              age--;
            }
            return age >= 18 || "Debes ser mayor de 18 años";
          },
        }}
        render={({ field, fieldState: { error } }) => (
          <>
            <CustomCalendar
              value={field.value}
              onChange={field.onChange}
              placeholder="Selecciona tu fecha de nacimiento"
              format="dd/MM/yyyy"
              iconPosition="left"
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
