import { axiosInstance } from "@/interceptors";

export const createClient = async (createClientRequest: FormData) => {
  const { data } = await axiosInstance.post(
    "/cases/external-clients/create",
    createClientRequest
  );
  return data;
};
