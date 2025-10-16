import { z } from "zod";

export const createEventSchema = z.object({
  title: z
    .string()
    .min(1, "El título es requerido")
    .max(100, "El título no puede exceder 100 caracteres"),
  date: z.date({
    message: "La fecha es requerida",
  }),
  start_time: z.string().min(1, "La hora de inicio es requerida"),
  end_time: z.string().min(1, "La hora de fin es requerida"),
  location: z.string().optional(),
  color: z.string().min(1, "Debe seleccionar un color"),
  description: z.string().optional(),
});
