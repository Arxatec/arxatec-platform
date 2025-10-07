import { axiosInstance } from "@/interceptors";
import type { Response } from "@/types";
import type { ExternalClient } from "@/types/client";

export const updateExternalClient = async (
  id: string,
  updateExternalClientRequest: FormData
) => {
  const { data } = await axiosInstance.put(
    `/cases/external-clients/update/${id}`,
    updateExternalClientRequest
  );
  return data;
};

export const getExternalClient = async (
  id: string
): Promise<ExternalClient> => {
  const { data } = await axiosInstance.get<Response<ExternalClient>>(
    `/cases/external-clients/detail/${id}`
  );
  if (!data.data) {
    throw new Error("No se pudo obtener el cliente externo");
  }
  return data.data;
};
