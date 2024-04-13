/**
 * Generates a new date object from the API format of DD-MM-YYYY
 */
export function extractDate(dateStr: string) {
  const [day, month, year] = dateStr.split("-");
  return new Date(parseInt(year), parseInt(month) - 1, parseInt(day) + 1);
}
