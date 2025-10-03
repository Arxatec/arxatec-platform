import type { Case, Pagination } from "@/types";

export interface GetCasesResponse {
  cases: Case[];
  pagination: Pagination;
}
