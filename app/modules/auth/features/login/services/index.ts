import axios from "axios";

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(
      "https://arxatec-service-production.up.railway.app/api/v1/auth/login",
      { email, password }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
