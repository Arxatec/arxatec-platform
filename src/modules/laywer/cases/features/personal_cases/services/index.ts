import axios from "axios";
import type { CasesApiResponse } from "../types";

export const getPersonalCases = async (): Promise<CasesApiResponse> => {
  try {
    const token = window.sessionStorage.getItem("TOKEN_AUTH");
    const response = await axios.get<CasesApiResponse>(
      "http://localhost:3000/api/v1/cases/my",
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
