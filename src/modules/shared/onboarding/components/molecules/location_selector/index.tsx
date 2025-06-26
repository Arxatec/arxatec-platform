import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
  useFormContext,
} from "react-hook-form";
import { CustomInputMap } from "../custom_input_map";
import { GOOGLE_MAPS_API_KEY } from "~/config";

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface Props<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  onCoordinatesChange?: (coordinates: Coordinates) => void;
}

export const LocationSelector = <T extends FieldValues>({
  control,
  name,
  onCoordinatesChange,
}: Props<T>) => {
  const { setValue } = useFormContext<T>();

  return (
    <div>
      <Controller
        control={control}
        name={name}
        rules={{ required: "La ubicación es requerida" }}
        render={({ field, fieldState: { error } }) => (
          <>
            <CustomInputMap
              value={field.value}
              onChange={(address, coordinates) => {
                field.onChange(address);
                if (onCoordinatesChange) {
                  onCoordinatesChange({
                    latitude: coordinates.lat,
                    longitude: coordinates.lng,
                  });
                }
              }}
              label="Ubicación"
              googleMapsApiKey={GOOGLE_MAPS_API_KEY}
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
