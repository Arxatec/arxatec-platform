import { z } from "zod";

export const createCaseSchema = z.object({
  title: z.string().min(1, "El título es requerido"),
  description: z
    .string()
    .min(20, "La descripción debe tener al menos 20 caracteres")
    .max(2000, "La descripción no puede tener más de 2000 caracteres"),
  category: z.string().min(1, "La categoría es requerida"),
  urgency: z.string().min(1, "La urgencia es requerida"),
  status: z.string().min(1, "El estado es requerido"),
  external_client_id: z.string().min(1, "El ID del cliente es requerido"),
});
