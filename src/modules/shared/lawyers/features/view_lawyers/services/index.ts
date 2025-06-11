import axios from "axios";

export const getLawyers = async (token: string) => {
  try {
    // Agregamos un retraso de 5 segundos
    // await new Promise((resolve) => setTimeout(resolve, 5000));

    // const response = await axiosInstance.get("/api/v1/auth/profile");
    const response = await axios.get("http://localhost:3000/api/v1/lawyers", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error?.message || "Error al obtener el perfil");
  }
};
