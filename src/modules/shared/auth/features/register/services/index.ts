import { axiosInstance } from "@/interceptors";
import type { RegisterRequest, RegisterResponse } from "../types";
import type { Response } from "@/types";

export const register = async (
  registerRequest: RegisterRequest
): Promise<RegisterResponse> => {
  const { data } = await axiosInstance.post<Response<RegisterResponse>>(
    "/users/register",
    registerRequest
  );

  return data.data as RegisterResponse;
};
