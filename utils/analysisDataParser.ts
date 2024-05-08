import type { AnalysisCriteria, ComparisonChartResponse } from "./types";

export function analysisDataParser(
  data: ComparisonChartResponse[],
  criteria: AnalysisCriteria,
  isLog: boolean
) {
  const getRoR = (data: (number | null)[]) => {
    const first = data[0];
    const hasFirst = first !== null;
    return data.map((value) => {
      return hasFirst && !!value ? 100 * (value - first) / first : null;
    });
  };

  const handleLog = (data: (number | null)[]) =>
    isLog
      ? data.map((value) => (value && value > 0 ? Math.log10(value) : null))
      : data;

  return data.map((d) => {
    switch (criteria) {
      case "Price": {
        return handleLog(d.prices.map((pt) => pt[1]));
      }
      case "Price (rate of return)": {
        return getRoR(d.prices.map((pt) => pt[1]));
      }
      case "Market Cap": {
        return d.market_caps.map((pt) => pt[1]);
      }
      case "Volume": {
        return d.total_volumes.map((pt) => pt[1]);
      }
    }
  });
}
