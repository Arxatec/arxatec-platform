import { axiosInstance } from "@/interceptors";
import type { Response } from "@/types";
import type { GetCasesResponse } from "../types";

export const getCases = async (
  page: number,
  search?: string,
  category?: string,
  status?: string
): Promise<GetCasesResponse> => {
  const params = new URLSearchParams();
  params.set("page", page.toString());
  params.set("limit", "20");
  if (search) {
    params.set("search", search);
  }
  if (category) {
    params.set("category", category);
  }
  if (status) {
    params.set("status", status);
  }
  const { data } = await axiosInstance.get<Response<GetCasesResponse>>(
    `/cases/me?${params.toString()}`
  );
  if (!data.data) {
    throw new Error("No se pudo obtener los casos");
  }
  return data.data;
};
