import type { Case, Pagination } from "@/types";

export interface ExplorerCasesResponse {
  cases: Case[];
  pagination: Pagination;
}