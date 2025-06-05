import axios from "axios";
import type { ApiResponse, Lawyer } from "../types";

export const getLawyers = async (token: string | null) => {
  try {
    // Agregamos un retraso de 5 segundos
    // await new Promise((resolve) => setTimeout(resolve, 5000));

    // const response = await axiosInstance.get("/api/v1/auth/profile");
    const response = await axios.get<ApiResponse<Lawyer[]>>(
      "http://localhost:3000/api/v1/lawyers",
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      }
    );
    return response.data.data;
  } catch (error: any) {
    throw new Error(error?.message || "Error al obtener los abogados");
  }
};
