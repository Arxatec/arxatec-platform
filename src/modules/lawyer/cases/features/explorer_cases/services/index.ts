import { axiosInstance } from "@/interceptors";
import { CaseStatus, type Response } from "@/types";
import type { ExplorerCasesResponse, TakeCaseRequest } from "../types";

export const explorerCases = async (
  page: number,
  search?: string,
  category?: string
): Promise<ExplorerCasesResponse> => {
  const params = new URLSearchParams();
  params.set("page", page.toString());
  params.set("limit", "20");
  if (search) {
    params.set("search", search);
  }
  if (category) {
    params.set("category", category);
  }
  const { data } = await axiosInstance.get<Response<ExplorerCasesResponse>>(
    `/cases/explore?${params.toString()}`
  );
  if (!data.data) {
    throw new Error("No se pudo obtener los casos");
  }
  return data.data;
};

export const takeCase = async (
  id: string,
  takeCaseRequest: TakeCaseRequest
) => {
  await axiosInstance.patch(`/cases/status/${id}`, {
    ...takeCaseRequest,
    status: CaseStatus.IN_PENDING,
  });
};
