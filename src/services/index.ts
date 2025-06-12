import axios from "axios";

export const getProfile = async (token: string) => {
  if (!token) {
    throw new Error("Token no ingresado");
  }
  try {
    const response = await axios.get(
      "http://localhost:3000/api/v1/users/profile",
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
