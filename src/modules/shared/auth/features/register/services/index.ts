import { axiosInstance } from "~/interceptors";
import type { Response } from "~/types/services";

export const register = async (
  name: string,
  lastname: string,
  email: string,
  password: string
) => {
  const createUser = {
    first_name: name,
    last_name: lastname,
    email: email,
    password: password,
    confirm_password: password,
  };
  await axiosInstance.post<Response>("/auth/register/request", createUser);
  return null;
};
