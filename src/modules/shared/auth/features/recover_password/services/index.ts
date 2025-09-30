import { axiosInstance } from "@/interceptors";
import type { RecoverPasswordRequest } from "../types";
import type { Response } from "@/types/services";

export const recoverPassword = async (
  recoverPasswordRequest: RecoverPasswordRequest
) => {
  const { data } = await axiosInstance.post<Response>(
    "/auth/password-reset/request",
    recoverPasswordRequest
  );
  return data;
};
