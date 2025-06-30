import type { LegalCategoryModel } from "../models";
import { toLawyerModel, toLegalCategoryModel } from "../adapters";
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

export const getLawyers = async () => {
  const response = await axiosInstance.get("/lawyers");
  return Promise.all(response.data.data.map(toLawyerModel));
};
