import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getEvents } from "../../../../services";
import { toast } from "sonner";
import type { CalendarEvent } from "../../types";
import type { Events } from "@/types";

function getHour(dateParam: string) {
  const date = new Date(dateParam);
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

function convertEvents(events: Events[]): CalendarEvent[] {
  return events.map((event) => ({
    id: event.id,
    title: event.title,
    startTime: getHour(event.start_date),
    endTime: getHour(event.end_date),
    bgColor: "bg-muted-foreground",
    hoverColor: "hover:bg-sidebar-ring",
    textColor: "text-background",
  }));
}

export const useDayEvents = (start: Date, end: Date) => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  const { data, isPending, isError } = useQuery({
    queryKey: ["calendar-events", start, end],
    queryFn: () => getEvents(start, end),
  });

  useEffect(() => {
    if (data && !isPending) setEvents(convertEvents(data));
    if (isError) {
      toast.error("Error al obtener los eventos", {
        description:
          "Intenta nuevamente, si el problema persiste, contacta al soporte.",
      });
    }
  }, [data, isError, isPending]);

  return { events, setEvents, isPending };
};
