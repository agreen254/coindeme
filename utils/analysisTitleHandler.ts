import { AnalysisCriteria, Currency } from "./types";

export function analysisTitleHandler(
  criteria: AnalysisCriteria,
  currency: Currency
) {
  const cUpper = currency.toUpperCase();
  switch (criteria) {
    case "Price":
      return `Price (${cUpper})`;
    case "Price (rate of return)":
      return `Price Rate of Return (%)`;
    case "Market Cap":
      return `Market Cap (${cUpper})`;
    case "Volume":
      return `Total Volume (${cUpper})`;
  }
}
