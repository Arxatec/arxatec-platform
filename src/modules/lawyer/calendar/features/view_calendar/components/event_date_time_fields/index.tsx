import {
  Input,
  Label,
  Button,
  Calendar,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui";
import { Controller, type UseFormReturn } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import type { CreateEventType } from "../../types";

interface Props {
  form: UseFormReturn<CreateEventType>;
}
export const EventDateTimeFields: React.FC<Props> = ({ form }) => {
  const {
    control,
    watch,
    formState: { errors },
  } = form;
  const watchedDate = watch("date");

  return (
    <div className="grid grid-cols-3 gap-4">
      <div>
        <Label className="mb-2 block">Fecha del evento</Label>
        <Controller
          name="date"
          control={control}
          render={({ field }) => (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={twMerge(
                    "w-full justify-start text-left font-normal bg-card",
                    errors.date && "border-rose-500/10! border!"
                  )}
                >
                  {watchedDate ? (
                    format(watchedDate, "dd 'de' MMMM 'del' yyyy", {
                      locale: es,
                    })
                  ) : (
                    <span className="text-muted-foreground">
                      Seleccionar fecha
                    </span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          )}
        />
        {errors.date && (
          <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>
        )}
      </div>

      <div>
        <Label className="mb-2 block">Hora de inicio</Label>
        <Controller
          name="start_time"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              type="time"
              className="bg-card appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
            />
          )}
        />
        {errors.start_time && (
          <p className="text-red-500 text-sm mt-1">
            {errors.start_time.message}
          </p>
        )}
      </div>

      <div>
        <Label className="mb-2 block">Hora de fin</Label>
        <Controller
          name="end_time"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              type="time"
              className="bg-card appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
            />
          )}
        />
        {errors.end_time && (
          <p className="text-red-500 text-sm mt-1">{errors.end_time.message}</p>
        )}
      </div>
    </div>
  );
};
