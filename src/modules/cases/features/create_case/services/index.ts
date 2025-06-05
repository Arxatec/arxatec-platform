import axios from "axios";
import type { Category } from "../types";

interface ApiResponse<T> {
  status: number;
  message: string;
  description: string;
  timestamp: string;
  path: string;
  data: T;
}

export const createCase = async (formData: FormData) => {
  try {
    const token = window.sessionStorage.getItem("TOKEN_AUTH");
    const response = await axios.post(
      "http://localhost:3000/api/v1/articles",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error?.message || "Error al crear el artículo");
  }
};

export const getAllCategories = async (): Promise<Category[]> => {
  try {
    const response = await axios.get<ApiResponse<Category[]>>(
      "http://localhost:3000/api/v1/cases/categories"
    );
    return response.data.data;
  } catch (error) {
    throw new Error(error?.message || "Error al obtener las categorías");
  }
};
