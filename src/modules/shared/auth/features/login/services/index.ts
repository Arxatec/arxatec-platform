import type { LoginRequest, LoginResponse } from "../types";
import { axiosInstance } from "@/interceptors";
import type { Response } from "@/types";

export const login = async (
  loginRequest: LoginRequest
): Promise<LoginResponse> => {
  const { data } = await axiosInstance.post<Response<LoginResponse>>(
    "/auth/login",
    loginRequest
  );
  if (!data.data) {
    throw new Error("No se pudo obtener el token");
  }
  return data.data;
};
