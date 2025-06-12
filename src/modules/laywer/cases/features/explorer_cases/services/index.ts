import axios from "axios";

export const getAllCategories = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/v1/cases/explore?category=labor&type=consultation"
    );

    if (!response.data || !response.data.data) {
      throw new Error("No se recibieron datos de categorías del servidor");
    }

    return response.data.data;
  } catch (error: unknown) {
    throw new Error(
      error?.toString() || "Error inesperado al obtener las categorías"
    );
  }
};
