import { axiosInstance } from "~/interceptors";
import type { LoginModel } from "../models";
import type { LoginDto } from "../dto";
import type { Response } from "~/types/services";

export const login = async (
  email: string,
  password: string
): Promise<LoginModel> => {
  const response = await axiosInstance.post<Response<LoginDto>>("/auth/login", {
    email,
    password,
  });
  const { data } = response;
  return {
    token: data.data.token,
  };
};
