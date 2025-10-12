import { z } from "zod";

export const createDocumentSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  description: z.string().optional(),
  category: z.string().min(1, "La categoría es requerida"),
  file: z.instanceof(File, { message: "El archivo es requerido" }),
});

export const sendMessageSchema = z.object({
  content: z
    .string()
    .min(1, "El mensaje es requerido")
    .max(1000, "El mensaje no puede tener más de 1000 caracteres"),
});
