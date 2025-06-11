import axios from "axios";
import type { LegalCategoryModel } from "../models";
import { toLegalCategoryModel } from "../adapters";

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
      },
    );
    return response.data;
  } catch (error) {
    throw new Error(error?.message || "Error al crear el artículo");
  }
};

export const getAllCategories = async (): Promise<LegalCategoryModel[]> => {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/v1/cases/categories",
    );
    return response.data.data.map(toLegalCategoryModel);
  } catch (error) {
    throw new Error(error?.message || "Error al obtener las categorías");
  }
};
