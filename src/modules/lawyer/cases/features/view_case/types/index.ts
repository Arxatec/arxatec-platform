import type { CaseAttachment, Pagination } from "@/types";
import type { createDocumentSchema } from "../schemas";
import type z from "zod";

export interface GetCaseAttachmentsResponse {
  attachments: CaseAttachment[];
  pagination: Pagination;
}

export type CreateDocumentRequest = z.infer<typeof createDocumentSchema>;
