export function lastYear() {
  const date = new Date();
  return date.setDate(date.valueOf() - 1000 * 60 * 60 * 24 * 365);
}
