import { z } from "zod";

export const recoverPasswordSchema = z.object({
  email: z.email("El correo electrónico no es válido"),
});
