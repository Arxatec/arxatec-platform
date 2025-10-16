import {
  HEADER_HEIGHT_PX,
  SLOT_HEIGHT_PX,
  TOTAL_MINUTES_IN_DAY,
  TOTAL_SLOTS,
} from "../constants";
import type { CalendarEvent } from "../types";

// Función para convertir tiempo (HH:MM) a minutos desde medianoche
export const timeToMinutes = (time: string): number => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

// Función para calcular el tiempo de inicio y fin de un grupo de eventos
export const getGroupTimeRange = (eventGroup: CalendarEvent[]) => {
  const startTimes = eventGroup.map((e) => timeToMinutes(e.startTime));
  const endTimes = eventGroup.map((e) => timeToMinutes(e.endTime));

  const earliestStart = Math.min(...startTimes);
  const latestEnd = Math.max(...endTimes);

  const startHours = Math.floor(earliestStart / 60);
  const startMinutes = earliestStart % 60;
  const endHours = Math.floor(latestEnd / 60);
  const endMinutes = latestEnd % 60;

  return {
    startTime: `${startHours.toString().padStart(2, "0")}:${startMinutes
      .toString()
      .padStart(2, "0")}`,
    endTime: `${endHours.toString().padStart(2, "0")}:${endMinutes
      .toString()
      .padStart(2, "0")}`,
  };
};

// Función para calcular la posición absoluta de un evento
export const calculateAbsolutePosition = (
  startTime: string,
  endTime: string
) => {
  const startMinutes = timeToMinutes(startTime);
  const endMinutes = timeToMinutes(endTime);
  const duration = endMinutes - startMinutes;

  // Calcular posición vertical (top y height en píxeles)
  // Agregamos HEADER_HEIGHT_PX para compensar el header del grid
  const top =
    HEADER_HEIGHT_PX +
    (startMinutes / TOTAL_MINUTES_IN_DAY) * (TOTAL_SLOTS * SLOT_HEIGHT_PX);
  const height =
    (duration / TOTAL_MINUTES_IN_DAY) * (TOTAL_SLOTS * SLOT_HEIGHT_PX);

  return {
    top: `${top}px`,
    height: `${height}px`,
    left: "0%",
    width: "100%", // Por ahora 100%, después manejaremos colisiones
  };
};

// Función para detectar si dos eventos colisionan en tiempo
export const eventsOverlap = (
  event1: CalendarEvent,
  event2: CalendarEvent
): boolean => {
  const start1 = timeToMinutes(event1.startTime);
  const end1 = timeToMinutes(event1.endTime);
  const start2 = timeToMinutes(event2.startTime);
  const end2 = timeToMinutes(event2.endTime);

  // Dos eventos colisionan si se superponen en tiempo
  return start1 < end2 && start2 < end1;
};

// Función para agrupar eventos por colisiones SOLO directas (no transitivas)
export const groupEventsByCollisions = (
  events: CalendarEvent[]
): CalendarEvent[][] => {
  const groups: CalendarEvent[][] = [];
  const processed = new Set<string>();

  // Ordenar eventos por hora de inicio para procesarlos cronológicamente
  const sortedEvents = [...events].sort(
    (a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime)
  );

  sortedEvents.forEach((event) => {
    if (processed.has(event.id)) return;

    // Encontrar SOLO los eventos que colisionan directamente con este
    const directCollisions = sortedEvents.filter(
      (otherEvent) =>
        otherEvent.id !== event.id &&
        !processed.has(otherEvent.id) &&
        eventsOverlap(event, otherEvent)
    );

    if (directCollisions.length > 0) {
      // Crear grupo con el evento actual + sus colisiones directas
      const collisionGroup = [event, ...directCollisions];

      // Marcar todos como procesados
      collisionGroup.forEach((e) => processed.add(e.id));

      groups.push(collisionGroup);
    } else {
      // Evento sin colisiones, va solo
      groups.push([event]);
      processed.add(event.id);
    }
  });

  return groups;
};

// Componente para slots droppables (cada 15 minutos)
// Función para convertir slot a tiempo (HH:MM)
export const slotToTime = (slot: number): string => {
  const totalMinutes = (slot - 1) * 15; // slot 1 = 00:00, slot 2 = 00:15, etc.
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;
};
