import {
  Popover,
  Label,
  Button,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui";
import { Controller, type Control, type FieldErrors } from "react-hook-form";
import type { CreateEventType } from "../../types";
import { twMerge } from "tailwind-merge";
import { COLOR_OPTIONS } from "../../constants";

interface Props {
  control: Control<CreateEventType>;
  errors: FieldErrors<CreateEventType>;
  watchedColor: string;
}
export const ColorPicker: React.FC<Props> = ({
  control,
  errors,
  watchedColor,
}) => {
  return (
    <div>
      <Label className="mb-2 block">Color</Label>
      <Controller
        name="color"
        control={control}
        render={({ field }) => (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={twMerge(
                  "w-full justify-start text-left font-normal bg-card px-4!",
                  errors.color && "border-rose-500/10! border!"
                )}
              >
                {watchedColor ? (
                  <span className="text-foreground flex items-center gap-2">
                    <div
                      className={twMerge("size-5 rounded border", watchedColor)}
                    ></div>
                    {COLOR_OPTIONS.find((c) => c.value === watchedColor)?.label}
                  </span>
                ) : (
                  <span className="text-muted-foreground">
                    Seleccionar color
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-4" align="start">
              <div className="grid grid-cols-5 gap-2">
                {COLOR_OPTIONS.map((color) => (
                  <button
                    key={color.value}
                    type="button"
                    className={twMerge(
                      "size-5 rounded border cursor-pointer",
                      color.value
                    )}
                    onClick={() => field.onChange(color.value)}
                  />
                ))}
              </div>
            </PopoverContent>
          </Popover>
        )}
      />
      {errors.color && (
        <p className="text-rose-500 text-sm mt-1">{errors.color.message}</p>
      )}
    </div>
  );
};
