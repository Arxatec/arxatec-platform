import { axiosInstance } from "@/interceptors";
import type { CreateCaseRequest } from "../types";

export const createCase = async (createCaseRequest: CreateCaseRequest) => {
  const { data } = await axiosInstance.post("/cases/create", createCaseRequest);
  return data;
};
