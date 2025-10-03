import { z } from "zod";

export const createCaseSchema = z.object({
  title: z.string().min(1, "El título es requerido"),
  description: z
    .string()
    .min(150, "La descripción debe tener al menos 150 caracteres")
    .max(1000, "La descripción debe tener menos de 1000 caracteres"),
  category: z.string().min(1, "La categoría es requerida"),
});
