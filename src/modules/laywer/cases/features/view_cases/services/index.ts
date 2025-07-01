import { axiosInstance } from "~/interceptors";

export const getCasesSummary = async () => {
  const response = await axiosInstance.get("/dashboard/lawyer/summary");
  console.log(response.data);
  return response.data;
};
