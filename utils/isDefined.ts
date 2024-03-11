/**
 * You need this to explicitly filter out a union type with undefined, e.g. (Response | undefined)[]

 * If you just use:
 * filter(ele => ele !== undefined)
 * The typescript compiler will not remove the union with undefined.
 * 
 * https://github.com/microsoft/TypeScript/issues/45097#issuecomment-882526325
 */
export function isDefined<TValue>(
  value: TValue | null | undefined
): value is TValue {
  return value !== null && value !== undefined;
}
