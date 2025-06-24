import axios from "axios";
import type { ClientsApiResponse } from "../types";

export const getExternalClients = async (): Promise<ClientsApiResponse> => {
  try {
    const token = window.sessionStorage.getItem("TOKEN_AUTH");
    const response = await axios.get<ClientsApiResponse>(
      "http://localhost:3000/api/v1/cases/external_clients",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.data || !response.data.data) {
      throw new Error("No se recibieron datos de clientes del servidor");
    }

    return response.data;
  } catch (error: unknown) {
    throw new Error(
      error instanceof Error
        ? error.message
        : "Error inesperado al obtener los clientes"
    );
  }
};

export const createClient = async (formData: FormData): Promise<void> => {
  try {
    const token = window.sessionStorage.getItem("TOKEN_AUTH");

    const response = await axios.post(
      "http://localhost:3000/api/v1/cases/external_clients",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (!response.data) {
      throw new Error("No se recibió respuesta del servidor");
    }

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || error.message;
      throw new Error(`Error al crear el cliente: ${message}`);
    }

    throw new Error(
      error instanceof Error
        ? error.message
        : "Error inesperado al crear el cliente"
    );
  }
};
