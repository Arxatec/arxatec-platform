import axiosInstance from "~/interceptors";

export const login = async (email: string, password: string) => {
  try {
    const response = await axiosInstance.post("/api/v1/auth/login", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
