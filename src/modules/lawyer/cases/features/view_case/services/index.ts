import { axiosInstance } from "@/interceptors";
import type { Response } from "@/types";
import type { Case } from "@/types";
import type { GetCaseAttachmentsResponse } from "../types";

export const getCase = async (id: string): Promise<Case> => {
  const { data } = await axiosInstance.get<Response<Case>>(
    `/cases/detail/${id}`
  );
  if (!data.data) {
    throw new Error("No se pudo obtener el caso");
  }
  return data.data;
};

export const getCaseAttachments = async (
  id: string
): Promise<GetCaseAttachmentsResponse> => {
  const { data } = await axiosInstance.get<
    Response<GetCaseAttachmentsResponse>
  >(`/cases/attachments/list/${id}`);
  if (!data.data) {
    throw new Error("No se pudo obtener los adjuntos del caso");
  }
  return data.data;
};

export const createDocument = async (
  createDocumentRequest: FormData,
  id: string
) => {
  await axiosInstance.post(
    `/cases/attachments/create/${id}`,
    createDocumentRequest
  );
};

export const getCaseMessages = async (id: string) => {
  const { data } = await axiosInstance.get(`/cases/messages/${id}/history`);
  if (!data.data) {
    throw new Error("No se pudo obtener los mensajes del caso");
  }
  return data.data;
};

export const sendMessage = async (id: string, message: string) => {
  await axiosInstance.post(`/cases/messages/${id}`, { content: message });
};
