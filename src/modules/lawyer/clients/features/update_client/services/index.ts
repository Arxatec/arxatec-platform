import { axiosInstance } from "@/interceptors";
import type { Response } from "@/types";
import type { Client } from "@/types/client";

export const updateClient = async (
  id: string,
  updateClientRequest: FormData
) => {
  const { data } = await axiosInstance.put(
    `/cases/external-clients/update/${id}`,
    updateClientRequest
  );
  return data;
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
