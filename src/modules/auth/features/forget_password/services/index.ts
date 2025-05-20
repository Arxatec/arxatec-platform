import axiosInstance from "~/interceptors";

export const requestPasswordReset = async (email: string) => {
  try {
    const response = await axiosInstance.post(
      "/api/v1/auth/password-reset/request",
      {
        email,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const verifyResetCode = async (code: string, email: string) => {
  try {
    const response = await axiosInstance.post(
      "/api/v1/auth/password-reset/verify-code",
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

export const resetPassword = async (
  password: string,
  confirm_password: string,
  email: string
) => {
  try {
    const response = await axiosInstance.post(
      "/api/v1/auth/password-reset/confirm",
      {
        password,
        confirm_password,
        email,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
