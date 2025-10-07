import type z from "zod";
import type { createExternalClientSchema } from "../schemas";

export type CreateExternalClientSchemaType = z.infer<
  typeof createExternalClientSchema
>;
