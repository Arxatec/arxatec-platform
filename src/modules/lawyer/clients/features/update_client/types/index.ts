import type z from "zod";
import type { updateClientSchema } from "../schemas";

export type UpdateClientSchemaType = z.infer<typeof updateClientSchema>;
