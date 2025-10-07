import type { Case, Pagination } from "@/types";
import type { TakeCaseSchema } from "../schemas";
import type z from "zod";

export interface ExplorerCasesResponse {
  cases: Case[];
  pagination: Pagination;
}

export type TakeCaseRequest = z.infer<typeof TakeCaseSchema>;
