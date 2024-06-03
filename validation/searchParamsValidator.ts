import { z } from "zod";

type SearchParamValidationUnit = {
  schema: z.ZodUnion<any>;
  key: string;
  fallback: string;
};

function validateSearchParam(
  unit: SearchParamValidationUnit,
  searchParams: URLSearchParams
) {
  const { schema, key, fallback } = unit;
  const validation = schema.safeParse(searchParams.get(key));

  return {
    originalStatus: validation.success,
    key: key,
    data: validation.success ? (validation.data as string) : fallback,
  };
}

export function validateSearchParams(
  units: SearchParamValidationUnit[],
  searchParams: URLSearchParams
) {
  return units.map((unit) => validateSearchParam(unit, searchParams));
}
