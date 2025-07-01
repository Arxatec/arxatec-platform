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

export const sendMessage = async (id: string, message: string) => {
  const response = await axiosInstance.post(`/cases/${id}/messages`, {
    content: message,
  });
  return response.data;
};

export const archiveCase = async (id: string) => {
  const response = await axiosInstance.patch(`/cases/${id}/archive`);
  return response.data;
};

export const getLawyer = async (id: string) => {
  const response = await axiosInstance.get(`/lawyers/${id}`);
  return response.data;
};
