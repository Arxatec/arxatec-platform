import { z } from "zod";

export const updateExternalClientSchema = z.object({
  avatar: z.instanceof(File).optional(),
  full_name: z.string().min(1, "El nombre es requerido"),
  email: z.email("El correo electrónico no es válido"),
  phone: z.string().min(1, "El teléfono es requerido"),
  dni: z.string().min(1, "El DNI es requerido"),
});
