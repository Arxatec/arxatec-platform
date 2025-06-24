import { axiosInstance } from "~/interceptors";

export const loginWithGoogle = async (accessToken: string) => {
  const response = await axiosInstance.post("/auth/login/google", {
    googleToken: accessToken,
  });
  return response.data;
};
