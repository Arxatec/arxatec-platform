import {
  Input,
  Label,
  Textarea,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  Calendar,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetDescription,
  SheetTitle,
  SheetFooter,
  ScrollArea,
} from "@/components/ui";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarPlus } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Esquema de validación con Zod
const eventSchema = z.object({
  title: z
    .string()
    .min(1, "El título es requerido")
    .max(100, "El título no puede exceder 100 caracteres"),
  date: z.date({
    message: "La fecha es requerida",
  }),
  startTime: z.string().min(1, "La hora de inicio es requerida"),
  endTime: z.string().min(1, "La hora de fin es requerida"),
  location: z.string().optional(),
  color: z.string().min(1, "Debe seleccionar un color"),
  description: z.string().optional(),
});

type EventFormData = z.infer<typeof eventSchema>;

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CreateEventDialog: React.FC<Props> = ({ open, onOpenChange }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: "",
      startTime: "10:30",
      endTime: "11:30",
      location: "",
      description: "",
    },
  });

  const watchedColor = watch("color");
  const watchedDate = watch("date");

  const onSubmit = (data: EventFormData) => {
    // eslint-disable-next-line no-console
    console.log("Datos del evento:", data);
    // Aquí puedes agregar la lógica para crear el evento
    onOpenChange(false);
    reset();
  };

  const colorOptions = [
    { value: "bg-stone-900", label: "Gris" },
    { value: "bg-rose-900", label: "Rosa" },
    { value: "bg-yellow-900", label: "Amarillo" },
    { value: "bg-orange-900", label: "Naranja" },
    { value: "bg-purple-900", label: "Púrpura" },
    { value: "bg-blue-900", label: "Azul" },
    { value: "bg-indigo-900", label: "Índigo" },
    { value: "bg-sky-900", label: "Celeste" },
    { value: "bg-green-900", label: "Verde" },
    { value: "bg-lime-900", label: "Lima" },
  ];

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[720px]! max-w-[720px]!">
        <SheetHeader>
          <SheetTitle>Crear evento</SheetTitle>
          <SheetDescription>
            Aquí puedes crear un nuevo evento para tu calendario.
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-200px)]">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 px-4">
            <div>
              <Label className="mb-2 block">Título</Label>
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Ej. Reunión con el cliente"
                    className="w-full"
                  />
                )}
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>

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
                          className="w-full justify-start text-left font-normal bg-card"
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
                  <p className="text-red-500 text-sm mt-1">
                    {errors.date.message}
                  </p>
                )}
              </div>

              <div>
                <Label className="mb-2 block">Hora de inicio</Label>
                <Controller
                  name="startTime"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="time"
                      className="bg-card appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                    />
                  )}
                />
                {errors.startTime && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.startTime.message}
                  </p>
                )}
              </div>

              <div>
                <Label className="mb-2 block">Hora de fin</Label>
                <Controller
                  name="endTime"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="time"
                      className="bg-card appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                    />
                  )}
                />
                {errors.endTime && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.endTime.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <Label className="mb-2 block">
                Ubicación{" "}
                <span className="text-xs text-muted-foreground">
                  (Opcional)
                </span>
              </Label>
              <Controller
                name="location"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    placeholder="Ej. Oficina, Casa, etc."
                  />
                )}
              />
            </div>

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
                        className="w-full justify-start text-left font-normal bg-card px-4!"
                      >
                        {watchedColor ? (
                          <span className="text-foreground flex items-center gap-2">
                            <div
                              className={twMerge(
                                "size-5 rounded",
                                watchedColor
                              )}
                            ></div>
                            {
                              colorOptions.find((c) => c.value === watchedColor)
                                ?.label
                            }
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
                        {colorOptions.map((color) => (
                          <button
                            key={color.value}
                            type="button"
                            className={twMerge(
                              "size-5 rounded cursor-pointer",
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
                <p className="text-red-500 text-sm mt-1">
                  {errors.color.message}
                </p>
              )}
            </div>

            <div>
              <Label className="mb-2 block">
                Descripción del evento{" "}
                <span className="text-xs text-muted-foreground">
                  (Opcional)
                </span>
              </Label>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    placeholder="Ej. Reunión con el cliente"
                    className="w-full h-[100px]"
                  />
                )}
              />
            </div>
          </form>
        </ScrollArea>
        <SheetFooter>
          <Button
            className="w-full mt-4"
            type="submit"
            onClick={handleSubmit(onSubmit)}
          >
            <CalendarPlus />
            Crear evento
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
