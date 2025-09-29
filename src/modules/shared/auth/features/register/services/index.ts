import { axiosInstance } from "@/interceptors";
import type { RegisterRequest } from "../types";
import type { Response } from "@/types";

export const register = async (
  registerRequest: RegisterRequest
): Promise<Response> => {
  const { data } = await axiosInstance.post<Response>(
    "/auth/register/request",
    registerRequest
  );

  return data;
};
