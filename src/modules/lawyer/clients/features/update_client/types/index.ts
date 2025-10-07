import type z from "zod";
import type { updateExternalClientSchema } from "../schemas";

export type UpdateExternalClientSchemaType = z.infer<
  typeof updateExternalClientSchema
>;
