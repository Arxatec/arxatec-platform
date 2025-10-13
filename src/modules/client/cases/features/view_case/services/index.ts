import { axiosInstance } from "@/interceptors";
import type { Response } from "@/types";
import type { Case, Lawyer } from "@/types";
import type { GetCaseAttachmentsResponse } from "../types";
import { groupMessagesByDate } from "../utils";

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

export const getHistoryMessages = async (id: string) => {
  const { data } = await axiosInstance.get(`/cases/messages/${id}/history`);
  if (!data.data) {
    throw new Error("No se pudo obtener los mensajes del caso");
  }
  return groupMessagesByDate(data.data.messages);
};

export const getLawyer = async (id: string) => {
  const { data } = await axiosInstance.get<Response<Lawyer>>(
    `/lawyers/detail/${id}`
  );
  if (!data.data) {
    throw new Error("No se pudo obtener el abogado del caso");
  }
  return data.data;
};
