import type { SearchParamValidationUnit } from "@/utils/types";

function validateSearchParam(
  unit: SearchParamValidationUnit,
  searchParams: URLSearchParams
) {
  const { schema, key, fallback } = unit;
  const validation = schema.safeParse(searchParams.get(key));

  return {
    originalStatus: validation.success as boolean,
    key: key,
    data: validation.success ? validation.data : fallback,
  };
}

export function validateSearchParams(
  units: SearchParamValidationUnit[],
  searchParams: URLSearchParams
) {
  return units.map((unit) => validateSearchParam(unit, searchParams));
}
