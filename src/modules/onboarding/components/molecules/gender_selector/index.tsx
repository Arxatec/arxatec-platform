import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";

interface Props<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
}

export const GenderSelector = <T extends FieldValues>({
  control,
  name,
}: Props<T>) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-900 mb-2">
        Género
      </label>
      <Controller
        control={control}
        name={name}
        rules={{ required: "Debes seleccionar un género" }}
        render={({ field, fieldState: { error } }) => (
          <>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => field.onChange("male")}
                className={`flex-1 py-1.5 px-4 rounded-lg border text-sm flex items-center gap-2 justify-center ${
                  field.value === "male"
                    ? "bg-blue-50 border-blue-600 text-blue-700 border-2"
                    : "border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-5"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M10 14m-5 0a5 5 0 1 0 10 0a5 5 0 1 0 -10 0" />
                  <path d="M19 5l-5.4 5.4" />
                  <path d="M19 5l-5 0" />
                  <path d="M19 5l0 5" />
                </svg>
                Hombre
              </button>
              <button
                type="button"
                onClick={() => field.onChange("female")}
                className={`flex-1 py-1.5 px-4 rounded-lg border text-sm flex items-center gap-2 justify-center ${
                  field.value === "female"
                    ? "bg-blue-50 border-blue-600 text-blue-700 border-2"
                    : "border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-5"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M12 9m-5 0a5 5 0 1 0 10 0a5 5 0 1 0 -10 0" />
                  <path d="M12 14l0 7" />
                  <path d="M9 18l6 0" />
                </svg>
                Mujer
              </button>
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
  );
};
