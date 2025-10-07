import type { Client } from "@/types/client";
import type { createCaseSchema } from "../schemas";
import type z from "zod";
import type { Pagination } from "@/types";

export type CreateCaseRequest = z.infer<typeof createCaseSchema>;

export interface GetClientsResponse {
  clients: Client[];
  pagination: Pagination;
}
