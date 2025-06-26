import axios from "axios";

export const getCasesSummary = async () => {
  try {
    const token = window.sessionStorage.getItem("TOKEN_AUTH");
    const response = await axios.get(
      "http://localhost:3000/api/v1/dashboard/lawyer/summary",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.data || !response.data.data) {
      throw new Error("No se recibieron datos de casos del servidor");
    }

    return response.data;
  } catch (error: unknown) {
    throw new Error(
      error instanceof Error
        ? error.message
        : "Error inesperado al obtener los casos"
    );
  }
};
