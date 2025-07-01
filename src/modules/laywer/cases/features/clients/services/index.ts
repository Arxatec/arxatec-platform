import type { ClientsApiResponse } from "../types";
import { axiosInstance } from "~/interceptors";

export const getExternalClients = async (): Promise<ClientsApiResponse> => {
  const response = await axiosInstance.get<ClientsApiResponse>(
    "/cases/external_clients"
  );
  console.log(response.data);
  return response.data;
};

export const createClient = async (data: FormData): Promise<void> => {
  const response = await axiosInstance.post("/cases/external_clients", data);
  return response.data;
};

export const archiveClient = async (id: string): Promise<void> => {
  const response = await axiosInstance.patch(
    `/cases/external_clients/${id}/archive`
  );
  return response.data;
};

export const updateClient = async (
  id: string,
  data: FormData
): Promise<void> => {
  const response = await axiosInstance.patch(
    `/cases/external_clients/${id}`,
    data
  );
  return response.data;
};
