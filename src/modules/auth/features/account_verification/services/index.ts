import axiosInstance from "~/interceptors";

export const verifyCode = async (code: string, email: string) => {
  try {
    console.log(code, email);
    const response = await axiosInstance.post(
      "/api/v1/auth/register/verify-code",
      {
        code,
        email,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const resendCode = async (email: string) => {
  try {
    const response = await axiosInstance.post("/api/v1/auth/register/resend", {
      email,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
