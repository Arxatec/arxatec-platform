import { axiosInstance } from "@/interceptors";
import type { ChangePasswordRequest } from "../types";
import type { Response } from "@/types";

export const changePassword = async (
  changePasswordRequest: ChangePasswordRequest
) => {
  const { data } = await axiosInstance.post<Response>(
    "/auth/password-reset/confirm",
    changePasswordRequest
  );
  return data;
};
