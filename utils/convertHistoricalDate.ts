export function convertHistoricalDate(date: Date) {
  return date.toLocaleDateString("en-GB").replaceAll("/", "-");
}
