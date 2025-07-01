import type { LegalCategoryModel } from "../models";
import { toClientModel, toLegalCategoryModel } from "../adapters";
import type { CreateCaseDTO } from "../dtos";
import { axiosInstance } from "~/interceptors";

export const createCase = async (formData: CreateCaseDTO) => {
  const response = await axiosInstance.post("/cases", formData);
  console.log(response.data);
  return response.data;
};

export const attachFile = async (id: string, formData: FormData) => {
  const response = await axiosInstance.post(
    `/cases/${id}/attachments`,
    formData
  );
  console.log(response.data);
  return response.data;
};

export const createCaseWithFiles = async (
  files: FormData[],
  caseData: CreateCaseDTO
) => {
  try {
    const caseResponse = await createCase(caseData);
    const caseId = await caseResponse.data.case.id;
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
  const response = await axiosInstance.get("/cases/categories");

  return response.data.data.categories.map(toLegalCategoryModel);
};

export const getExternalClients = async () => {
  const response = await axiosInstance.get("/cases/external_clients");
  console.log(response.data);
  if (response.data.data.clients.length === 0) return [];
  return Promise.all(response.data.data.clients.map(toClientModel));
};
