import { axiosInstance } from "@/interceptors";
import type { GetLawyersResponse } from "../types";
import type { Response } from "@/types";

export const getLawyers = async (
  page: number,
  search?: string
): Promise<GetLawyersResponse> => {
  const params = new URLSearchParams();
  params.set("page", page.toString());
  params.set("limit", "20");
  if (search) {
    params.set("search", search);
  }
  const { data } = await axiosInstance.get<Response<GetLawyersResponse>>(
    `/lawyers/list?${params.toString()}`
  );
  if (!data.data) {
    throw new Error("No se pudo obtener los abogados");
  }
  return data.data;
};
