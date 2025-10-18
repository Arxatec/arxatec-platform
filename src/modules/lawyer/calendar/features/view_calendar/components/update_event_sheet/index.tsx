import {
  Button,
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
import { CalendarPlus, Loader2, Trash2Icon } from "lucide-react";
import { ColorPicker } from "../color_picker";

import { EventDateTimeFields } from "../event_date_time_fields";
import { useUpdateEvent, useUpdateEventForm } from "../../hooks";
import type { UpdateEventRequest, UpdateEventType } from "../../types";
import { combineDateAndTime } from "@/utilities";

interface Props {
  id: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const UpdateEventSheet: React.FC<Props> = ({
  id,
  open,
  onOpenChange,
}) => {
  const form = useUpdateEventForm();
  const watchedColor = form.watch("color");

  const onSubmit = (data: UpdateEventType) => {
    const updateEventRequest: UpdateEventRequest = {
      title: data.title,
      start_date: combineDateAndTime(data.date.toISOString(), data.start_time),
      end_date: combineDateAndTime(data.date.toISOString(), data.end_time),
      location: data.location,
      description: data.description,
    };
    updateEventMutation(updateEventRequest);
  };

  const { mutate: updateEventMutation, isPending: isUpdatingEvent } =
    useUpdateEvent(id, () => onOpenChange(false), form.reset);
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[600px]! max-w-[600px]!">
        <SheetHeader>
          <SheetTitle>Actualizar evento</SheetTitle>
          <SheetDescription>
            Aquí puedes actualizar un evento de tu calendario.
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-200px)]">
          <div className="space-y-4 px-4">
            <FormInput
              label="Fecha del evento"
              name="title"
              placeholder="Ej. Reunión con el cliente"
              register={form.register}
              errors={form.formState.errors}
            />

            <EventDateTimeFields form={form} />

            <div className="grid md:grid-cols-2 gap-4">
              <FormInput
                optional
                label="Ubicación"
                name="location"
                placeholder="Ej. Oficina, Casa, etc."
                register={form.register}
                errors={form.formState.errors}
              />

              <ColorPicker
                control={form.control}
                errors={form.formState.errors}
                watchedColor={watchedColor}
              />
            </div>

            <FormTextarea
              optional
              name="description"
              label="Descripción"
              placeholder="Ej. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos..."
              className="h-[100px]"
              register={form.register}
              errors={form.formState.errors}
            />
          </div>
        </ScrollArea>
        <SheetFooter>
          <Button
            className="w-full mt-4"
            type="submit"
            disabled={isUpdatingEvent}
            onClick={form.handleSubmit(onSubmit)}
          >
            {isUpdatingEvent ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <CalendarPlus />
            )}
            {isUpdatingEvent ? "Actualizando evento..." : "Actualizar evento"}
          </Button>
          <Button variant="secondary">
            <Trash2Icon />
            Eliminar evento
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
