import type { Lawyer, Pagination } from "@/types";

export interface GetLawyersResponse {
  lawyers: Lawyer[];
  pagination: Pagination;
}
