import { axiosInstance } from "@/interceptors";
import type { Response, UserResponse } from "@/types";

export const getProfile = async () => {
  const { data } = await axiosInstance.get<Response<UserResponse>>(
    "/users/profile"
  );
  if (!data.data) {
    throw new Error("No se pudo obtener el perfil");
  }
  return data.data;
};
