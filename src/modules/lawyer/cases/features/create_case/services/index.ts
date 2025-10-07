import { axiosInstance } from "@/interceptors";
import type { CreateCaseRequest } from "../types";
import type { GetExternalClientsResponse } from "../types";
import type { Response } from "@/types";

export const createCase = async (createCaseRequest: CreateCaseRequest) => {
  await axiosInstance.post("/cases/create", createCaseRequest);
};

export const getExternalClients = async (
  page: number
): Promise<GetExternalClientsResponse> => {
  const params = new URLSearchParams();
  params.set("page", page.toString());
  params.set("limit", "10");
  params.set("all", "true");
  const { data } = await axiosInstance.get<
    Response<GetExternalClientsResponse>
  >(`/cases/external-clients/list?${params.toString()}`);
  if (!data.data) {
    throw new Error("No se pudo obtener los clientes");
  }
  return data.data;
};
