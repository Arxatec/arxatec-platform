import axiosInstance from "~/interceptors";

export const verifyCode = async (code: string, token: string) => {
  try {
    const response = await axiosInstance.post("/api/v1/auth/verify-code", {
      code,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
