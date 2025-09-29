import { axiosInstance } from "@/interceptors";
import type { ResendRequest, VerifyCodeRequest } from "../types";

export const resendCode = async (resendRequest: ResendRequest) => {
  const { data } = await axiosInstance.post<Response>(
    "/auth/register/resend",
    resendRequest
  );
  return data;
};

export const verifyCode = async (verifyCodeRequest: VerifyCodeRequest) => {
  const { data } = await axiosInstance.post<Response>(
    "/auth/register/verify-code",
    verifyCodeRequest
  );
  return data;
};
