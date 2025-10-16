import {
  Input,
  Label,
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
  FormInput,
  FormTextarea,
} from "@/components/ui";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarPlus, Loader2 } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { CreateEventRequest, CreateEventType } from "../../types";
import { createEventSchema } from "../../schemas";
import { ColorPicker } from "../color_picker";
import { twMerge } from "tailwind-merge";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEvent } from "../../services";
import { toast } from "sonner";
import { combineDateAndTime } from "@/utilities";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CreateEventSheet: React.FC<Props> = ({ open, onOpenChange }) => {
  const queryClient = useQueryClient();
  const { mutate: createEventMutation, isPending } = useMutation({
    mutationFn: (data: CreateEventRequest) => createEvent(data),
  });
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<CreateEventType>({
    resolver: zodResolver(createEventSchema),
    defaultValues: {
      title: "",
      start_time: "10:30",
      end_time: "11:30",
      location: "",
      description: "",
      color: "bg-stone-900",
      date: new Date(),
    },
  });

  const watchedColor = watch("color");
  const watchedDate = watch("date");

  const onSuccess = () => {
    toast.success("Evento creado correctamente", {
      description: "El evento ha sido creado correctamente",
    });
    onOpenChange(false);
    reset();
    queryClient.invalidateQueries({ queryKey: ["calendar-events"] });
  };

  const onError = (error: Error) => {
    toast.error("Error al crear evento", {
      description: error.message,
    });
  };

  const onSubmit = (data: CreateEventType) => {
    const createEventRequest: CreateEventRequest = {
      title: data.title,
      start_date: combineDateAndTime(data.date.toISOString(), data.start_time),
      end_date: combineDateAndTime(data.date.toISOString(), data.end_time),
      location: data.location,
      description: data.description,
    };
    createEventMutation(createEventRequest, {
      onSuccess,
      onError,
    });
  };

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
            <FormInput
              label="Fecha del evento"
              name="title"
              placeholder="Ej. Reunión con el cliente"
              register={register}
              errors={errors}
            />

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
                  <p className="text-red-500 text-sm mt-1">
                    {errors.date.message}
                  </p>
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
                  <p className="text-red-500 text-sm mt-1">
                    {errors.end_time.message}
                  </p>
                )}
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <FormInput
                optional
                label="Ubicación"
                name="location"
                placeholder="Ej. Oficina, Casa, etc."
                register={register}
                errors={errors}
              />

              <ColorPicker
                control={control}
                errors={errors}
                watchedColor={watchedColor}
              />
            </div>

            <FormTextarea
              optional
              name="description"
              label="Descripción"
              placeholder="Ej. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos..."
              className="h-[100px]"
              register={register}
              errors={errors}
            />
          </form>
        </ScrollArea>
        <SheetFooter>
          <Button
            className="w-full mt-4"
            type="submit"
            disabled={isPending}
            onClick={handleSubmit(onSubmit)}
          >
            {isPending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <CalendarPlus />
            )}
            {isPending ? "Creando evento..." : "Crear evento"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
