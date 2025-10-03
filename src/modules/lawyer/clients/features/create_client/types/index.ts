import type z from "zod";
import type { createClientSchema } from "../schemas";

export type CreateClientSchemaType = z.infer<typeof createClientSchema>;
