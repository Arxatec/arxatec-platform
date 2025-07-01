import type { CasesApiResponse } from "../types";
import { axiosInstance } from "~/interceptors";

export const getExploreCases = async (): Promise<CasesApiResponse> => {
  const response = await axiosInstance.get<CasesApiResponse>(
    "/cases/explore?category=labor&type=consultation"
  );
  return response.data;
};
