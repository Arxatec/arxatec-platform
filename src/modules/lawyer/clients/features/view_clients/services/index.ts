import { axiosInstance } from "@/interceptors";
import type { Response } from "@/types";
import type { GetClientsResponse } from "../types";
import type { Client } from "@/types/client";

export const getClients = async (
  page: number,
  search: string
): Promise<GetClientsResponse> => {
  const params = new URLSearchParams();
  params.set("page", page.toString());
  params.set("limit", "18");
  if (search) {
    params.set("search", search);
  }
  const { data } = await axiosInstance.get<Response<GetClientsResponse>>(
    `/cases/external-clients/list?${params.toString()}`
  );
  if (!data.data) {
    throw new Error("No se pudo obtener los clientes");
  }
  return data.data;
};

export const getClient = async (id: string): Promise<Client> => {
  const { data } = await axiosInstance.get<Response<Client>>(
    `/cases/external-clients/detail/${id}`
  );
  if (!data.data) {
    throw new Error("No se pudo obtener el cliente");
  }
  return data.data;
};

export const archiveClient = async (id: string) => {
  await axiosInstance.patch(`/cases/external-clients/archive/${id}`);
};
