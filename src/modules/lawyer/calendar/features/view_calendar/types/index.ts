import type { createEventSchema } from "../schemas";
import type z from "zod";

export type CreateEventType = z.infer<typeof createEventSchema>;

export interface CreateEventRequest {
  title: string;
  description?: string;
  start_date: string;
  end_date: string;
  location?: string;
}
