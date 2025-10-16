import {
  HEADER_HEIGHT_PX,
  SLOT_HEIGHT_PX,
  TOTAL_MINUTES_IN_DAY,
  TOTAL_SLOTS,
} from "../constants";
import type { CalendarEvent } from "../types";

// Function to convert time (HH:MM) to minutes from midnight
export const timeToMinutes = (time: string): number => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

// Function to calculate the start and end time of a group of events
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

// Function to calculate the absolute position of an event
export const calculateAbsolutePosition = (
  startTime: string,
  endTime: string
) => {
  const startMinutes = timeToMinutes(startTime);
  const endMinutes = timeToMinutes(endTime);
  const duration = endMinutes - startMinutes;

  // Calculate vertical position (top and height in pixels)
  // Add HEADER_HEIGHT_PX to compensate for the header of the grid
  const top =
    HEADER_HEIGHT_PX +
    (startMinutes / TOTAL_MINUTES_IN_DAY) * (TOTAL_SLOTS * SLOT_HEIGHT_PX);
  const height =
    (duration / TOTAL_MINUTES_IN_DAY) * (TOTAL_SLOTS * SLOT_HEIGHT_PX);

  return {
    top: `${top}px`,
    height: `${height}px`,
    left: "0%",
    width: "100%", // For now 100%, later we will handle collisions
  };
};

// Function to detect if two events overlap in time
export const eventsOverlap = (
  event1: CalendarEvent,
  event2: CalendarEvent
): boolean => {
  const start1 = timeToMinutes(event1.startTime);
  const end1 = timeToMinutes(event1.endTime);
  const start2 = timeToMinutes(event2.startTime);
  const end2 = timeToMinutes(event2.endTime);

  // Two events overlap if they overlap in time
  return start1 < end2 && start2 < end1;
};

// Function to group events by direct collisions only (no transitive)
export const groupEventsByCollisions = (
  events: CalendarEvent[]
): CalendarEvent[][] => {
  const groups: CalendarEvent[][] = [];
  const processed = new Set<string>();

  // Sort events by start time to process them chronologically
  const sortedEvents = [...events].sort(
    (a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime)
  );

  sortedEvents.forEach((event) => {
    if (processed.has(event.id)) return;

    // Find only the events that directly collide with this one
    const directCollisions = sortedEvents.filter(
      (otherEvent) =>
        otherEvent.id !== event.id &&
        !processed.has(otherEvent.id) &&
        eventsOverlap(event, otherEvent)
    );

    if (directCollisions.length > 0) {
      // Create group with the current event + its direct collisions
      const collisionGroup = [event, ...directCollisions];

      // Mark all as processed
      collisionGroup.forEach((e) => processed.add(e.id));

      groups.push(collisionGroup);
    } else {
      // Event without collisions, goes alone
      groups.push([event]);
      processed.add(event.id);
    }
  });

  return groups;
};

// Component to droppable slots (every 15 minutes)
// Function to convert slot to time (HH:MM)
export const slotToTime = (slot: number): string => {
  const totalMinutes = (slot - 1) * 15; // slot 1 = 00:00, slot 2 = 00:15, etc.
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;
};
