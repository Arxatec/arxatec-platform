import type { z } from "zod";
import type { recoverPasswordSchema } from "../schemas";

export type RecoverPasswordRequest = z.infer<typeof recoverPasswordSchema>;
