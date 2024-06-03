import { z } from "zod";

export function parseAndReturn(
  schema: z.AnyZodObject | z.ZodArray<z.AnyZodObject | z.>,
  item: any
) {
  return schema.safeParse(item) ? item : false;
}
