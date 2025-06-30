import { axiosInstance } from "~/interceptors";

export const getPersonalCase = async (id: string) => {
  const response = await axiosInstance.get(`/cases/${id}/detail`);
  console.log(response.data);
  return response.data;
};

export const getPersonalCaseAttachments = async (id: string) => {
  const response = await axiosInstance.get(`/cases/${id}/attachments`);
  return response.data;
};
