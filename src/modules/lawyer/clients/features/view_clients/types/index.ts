import type { Pagination } from "@/types";
import type { ExternalClient } from "@/types/client";

export interface GetExternalClientsResponse {
  clients: ExternalClient[];
  pagination: Pagination;
}
