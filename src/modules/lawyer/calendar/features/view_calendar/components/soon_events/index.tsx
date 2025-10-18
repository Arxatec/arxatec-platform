import { AsyncBoundary, Skeleton } from "@/components/ui";
import { useQuery } from "@tanstack/react-query";
import { ClockIcon, MapPinIcon } from "lucide-react";
import { getEvents } from "../../services";
import { getHour } from "@/utilities";
import { addDays } from "date-fns";

export const LoadingState = () => {
  return <Skeleton className="w-full h-[200px] mt-4"></Skeleton>;
};

export const ErrorState = () => {
  return (
    <div className="flex flex-col h-full bg-status-background-error mt-4 px-4 py-8">
      <h2 className="text-base font-semibold font-serif text-status-foreground-error">
        Ocurrio un error al cargar los eventos
      </h2>
      <p className="text-xs text-status-foreground-error opacity-80">
        Ocurrió un error al cargar los eventos, intenta nuevamente, si el
        problema persiste, contacta al soporte.
      </p>
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

export const SoonEvents = () => {
  const currentDate = new Date();
  const start = new Date(currentDate.setHours(0, 0, 0, 0));
  const end = new Date(addDays(currentDate, 3).setHours(23, 59, 59, 999));

  const { data, isPending, isError } = useQuery({
    queryKey: ["soon-events", start, end],
    queryFn: () => getEvents(start, end),
  });
  return (
    <div className="mt-6 border py-4 bg-background rounded">
      <div className="px-4">
        <h2 className="text-lg font-bold font-serif">Próximos eventos</h2>
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
                className="flex py-2 px-2 items-center gap-2 bg-card"
              >
                <div className="w-[2px] h-14 rounded bg-muted-foreground "></div>
                <div>
                  <p className="text-sm font-semibold">{event.title}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-2">
                    <ClockIcon className="size-3" /> {getHour(event.start_date)}{" "}
                    - {getHour(event.end_date)}
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
  );
};
