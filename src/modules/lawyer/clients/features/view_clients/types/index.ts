import type { Pagination } from "@/types";
import type { Client } from "@/types/client";

export interface GetClientsResponse {
  clients: Client[];
  pagination: Pagination;
}
