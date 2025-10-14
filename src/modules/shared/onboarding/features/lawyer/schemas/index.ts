import { z } from "zod";
import type { LocationData } from "@/components/ui";

export const lawyerOnboardingSchema = z.object({
  // Step 1: About
  license: z.string().min(1, "La licencia es requerida"),
  bio: z
    .string()
    .min(10, "La descripción debe tener al menos 10 caracteres")
    .max(500, "La descripción no puede tener más de 500 caracteres"),
  experience: z
    .number()
    .min(1, "La experiencia debe ser al menos 1 año")
    .max(50, "La experiencia no puede ser mayor a 50 años"),

  // Step 2: Contact
  avatar: z.instanceof(File).optional(),
  phone: z.string().optional(),
  linkedin: z
    .string()
    .url("El enlace de LinkedIn debe ser una URL válida")
    .optional()
    .or(z.literal("")),
  location: z.custom<LocationData>().optional(),
});

export type LawyerOnboardingSchemaType = z.infer<typeof lawyerOnboardingSchema>;
