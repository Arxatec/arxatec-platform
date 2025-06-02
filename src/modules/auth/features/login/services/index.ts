import axios from "axios";
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

export const loginWithGoogle = async (accessToken: string) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/v1/auth/login/google",
      {
        googleToken: accessToken,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
