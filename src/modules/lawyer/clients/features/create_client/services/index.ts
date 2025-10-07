import { axiosInstance } from "@/interceptors";

export const createExternalClient = async (
  createExternalClientRequest: FormData
) => {
  const { data } = await axiosInstance.post(
    "/cases/external-clients/create",
    createExternalClientRequest
  );
  return data;
};
