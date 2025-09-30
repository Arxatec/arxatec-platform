import type z from "zod";
import type { changePasswordSchema } from "../schemas";

export type ChangePasswordSchemaType = z.infer<typeof changePasswordSchema>;
export interface ChangePasswordRequest {
  email: string;
  password: string;
  confirm_password: string;
}
