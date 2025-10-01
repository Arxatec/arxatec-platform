import type { USER_TYPE } from "@/types";
import type { registerSchema } from "../schemas";
import type z from "zod";

export type RegisterSchemaType = z.infer<typeof registerSchema>;

export interface RegisterRequest {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string;
  user_type: typeof USER_TYPE.LAWYER | typeof USER_TYPE.CLIENT;
}
