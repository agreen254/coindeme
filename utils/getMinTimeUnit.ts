type MinTimeUnit =
  | "millisecond"
  | "second"
  | "minute"
  | "hour"
  | "day"
  | "week"
  | "month"
  | "quarter"
  | "year"
  | undefined;

export function getMinTimeUnit(days: number): MinTimeUnit {
  switch (days) {
    case 1:
      return "hour";
    case 7: // FALLTHROUGH
    case 14: // FALLTHROUGH
    case 31:
      return "day";
    case 180: // FALLTHROUGH
    case 365: // FALLTHROUGH
    default:
      return "month";
  }
}
