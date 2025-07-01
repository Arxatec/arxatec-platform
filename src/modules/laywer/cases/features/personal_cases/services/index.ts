import axios from "axios";
import type { CasesApiResponse } from "../types";
import { axiosInstance } from "~/interceptors";

export const getPersonalCasesOld = async (): Promise<CasesApiResponse> => {
  try {
    const token = window.localStorage.getItem("TOKEN_AUTH");
    const response = await axios.get<CasesApiResponse>(
      "http://localhost:3000/api/v1/cases/me",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error: unknown) {
    throw new Error(
      error instanceof Error
        ? error.message
        : "Error inesperado al obtener los casos"
    );
  }
};
export const getPersonalCases = async (): Promise<CasesApiResponse> => {
  const response = await axiosInstance.get<CasesApiResponse>("/cases/me");
  return response.data;
};
