import { z } from "zod";

export const TakeCaseSchema = z.object({
  note: z
    .string()
    .max(255, "La nota no puede tener más de 255 caracteres")
    .optional(),
});
