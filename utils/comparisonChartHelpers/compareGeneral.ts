import { formatPriceChangeValue } from "../formatHelpers";

export function handleTicksXAxis(label: string, index: number) {
  if (index % 3 !== 0) return "";

  const date = new Date(label);
  const formattedDate = date.toLocaleString("en-US", { dateStyle: "short" });
  return formattedDate;
}

export function handleTicksYAxis(value: number, index: number) {
  if (value === 0) return 0; // don't want '0.00e0'
  return formatPriceChangeValue(value);
}

// gradient colorsets for the comparisons
export const colors = [
  {
    start: "#14B8A6", // 52, 211, 153
    end: "#134E4A", // 19, 78, 74
  },
  {
    start: "#CA54D5", // 202, 84, 213
    end: "#692570", // 105, 37, 112
  },
  {
    start: "#71DCD9",
    end: "#568BC6",
  },
  {
    start: "#D5CA54",
    end: "#D58A54",
  },
  {
    start: "", // 52, 211, 213
    end: "",
  },
];