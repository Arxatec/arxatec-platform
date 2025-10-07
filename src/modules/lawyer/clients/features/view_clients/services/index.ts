import { axiosInstance } from "@/interceptors";
import type { Response } from "@/types";
import type { GetExternalClientsResponse } from "../types";
import type { ExternalClient } from "@/types/client";

export const getExternalClients = async (
  page: number,
  search: string
): Promise<GetExternalClientsResponse> => {
  const params = new URLSearchParams();
  params.set("page", page.toString());
  params.set("limit", "18");
  if (search) {
    params.set("search", search);
  }
  const { data } = await axiosInstance.get<
    Response<GetExternalClientsResponse>
  >(`/cases/external-clients/list?${params.toString()}`);
  if (!data.data) {
    throw new Error("No se pudo obtener los clientes");
  }
  return data.data;
};

export const getExternalClient = async (
  id: string
): Promise<ExternalClient> => {
  const { data } = await axiosInstance.get<Response<ExternalClient>>(
    `/cases/external-clients/detail/${id}`
  );
  if (!data.data) {
    throw new Error("No se pudo obtener el cliente");
  }
  return data.data;
};

export const archiveExternalClient = async (id: string) => {
  await axiosInstance.patch(`/cases/external-clients/archive/${id}`);
};
