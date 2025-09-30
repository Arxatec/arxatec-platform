import type z from "zod";
import type { loginSchema } from "../schemas";
import type { User } from "@/types";

export type LoginRequest = z.infer<typeof loginSchema>;

export interface LoginResponse {
  user: User;
  token: string;
}
