import { AsyncBoundary, Calendar } from "@/components/ui";
import { useQuery } from "@tanstack/react-query";
import { AlertCircle, ClockIcon, Loader2, MapPinIcon } from "lucide-react";
import { getSoonEvents } from "../../services";
import { cn, getHour } from "@/utilities";

interface Props {
  date: Date | undefined;
  setDate: (date: Date) => void;
  panelOpen: boolean;
}

export const LoadingState = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <Loader2 className="size-4 animate-spin" />
    </div>
  );
};

export const ErrorState = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <AlertCircle className="size-4" />
    </div>
  );
};

export const EmptyState = () => {
  return (
    <div className="flex flex-col h-full bg-accent mt-4 px-4 py-8">
      <h2 className="text-base font-semibold font-serif">
        No hay eventos próximos
      </h2>
      <p className="text-xs text-muted-foreground">
        Recuerda que puedes agregar un evento en el botón que se encuentra en la
        parte superior derecha.
      </p>
    </div>
  );
};

export const SelectorDayCalendar = ({ date, setDate, panelOpen }: Props) => {
  const currentDate = new Date();
  const start = new Date(currentDate.setHours(0, 0, 0, 0));
  const end = new Date(currentDate.setHours(23, 59, 59, 999));

  const { data, isPending, isError } = useQuery({
    queryKey: ["soon-events", start, end],
    queryFn: () => getSoonEvents(start, end),
  });

  return (
    <div
      className={cn(
        "hidden w-1/2 max-w-xs flex-none border-r border-muted bg-card p-6 md:block fixed top-0 h-screen overflow-y-auto z-10 transition-all duration-300",
        panelOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <Calendar
        mode="single"
        selected={date}
        onSelect={(value: Date | undefined) => setDate(value as Date)}
        className="rounded w-full border border-muted [--cell-size:--spacing(8)] md:[--cell-size:--spacing(8)]"
        buttonVariant="ghost"
      />
      <div className="mt-6 border py-4 bg-background rounded">
        <div className="px-4">
          <h2 className="text-lg font-bold font-serif">Eventos del próximos</h2>
          <p className="text-sm text-muted-foreground">
            Aquí puedes ver los eventos próximos en este día
          </p>
        </div>
        <AsyncBoundary
          isLoading={isPending}
          isError={isError}
          data={data}
          LoadingComponent={<LoadingState />}
          ErrorComponent={<ErrorState />}
          EmptyComponent={<EmptyState />}
        >
          {(events) => (
            <div className="mt-4 divide-y divide ">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="flex py-2 px-2 items-center gap-2 bg-accent"
                >
                  <div className="w-[3px] rounded-full bg-muted-foreground "></div>
                  <div>
                    <p className="text-sm font-semibold">{event.title}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-2">
                      <ClockIcon className="size-3" />{" "}
                      {getHour(event.start_date)} - {getHour(event.end_date)}
                    </p>
                    <p className="text-xs text-muted-foreground flex items-center gap-2">
                      <MapPinIcon className="size-3" />{" "}
                      {event.location || "No hay ubicación"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </AsyncBoundary>
      </div>
    </div>
  );
};
