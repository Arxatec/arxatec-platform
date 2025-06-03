import axios from "axios";
import axiosInstance from "~/interceptors";

export const getProfile = async (token: string) => {
  try {
    // Agregamos un retraso de 5 segundos
    // await new Promise((resolve) => setTimeout(resolve, 5000));

    // const response = await axiosInstance.get("/api/v1/auth/profile");
    const response = await axios.get(
      "https://arxatec-service-production.up.railway.app/api/v1/users/profile",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error?.message || "Error al obtener el perfil");
  }
};
