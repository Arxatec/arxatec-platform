import axios from "axios";
import type { LegalCategoryModel } from "../models";
import { toClientModel, toLegalCategoryModel } from "../adapters";
import type { CreateCaseDTO } from "../dtos";

export const createCase = async (formData: CreateCaseDTO) => {
  try {
    const token = window.localStorage.getItem("TOKEN_AUTH");
    const response = await axios.post(
      "http://localhost:3000/api/v1/cases",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error(error?.message || "Error al crear el artículo");
  }
};

export const attachFile = async (id: string, formData: FormData) => {
  try {
    const token = window.localStorage.getItem("TOKEN_AUTH");
    const response = await axios.post(
      `http://localhost:3000/api/v1/cases/${id}/attachment`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error?.message || "Error al adjuntar el archivo");
  }
};

export const createCaseWithFiles = async (
  files: FormData[],
  caseData: CreateCaseDTO
) => {
  try {
    const caseResponse = await createCase(caseData);
    const caseId = await caseResponse.data.id;
    let filesResponse = [];

    if (files.length > 0) {
      filesResponse = await Promise.all(
        files.map(async (file) => await attachFile(caseId, file))
      );
    }
    return { case: caseResponse, files: filesResponse };
  } catch (error) {
    throw new Error(error?.message || "Error al crear el caso con archivos");
  }
};

export const getAllCategories = async (): Promise<LegalCategoryModel[]> => {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/v1/cases/categories"
    );

    if (!response.data || !response.data.data) {
      throw new Error("No se recibieron datos de categorías del servidor");
    }

    return response.data.data.map(toLegalCategoryModel);
  } catch (error: unknown) {
    throw new Error(
      error?.toString() || "Error inesperado al obtener las categorías"
    );
  }
};

export const getLawyers = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/v1/clients");
    return Promise.all(response.data.data.map(toClientModel));
  } catch (error) {
    throw new Error(error?.message || "Error al obtener los abogados");
  }
};
