import { AnalysisDataMode, ComparisonChartResponse } from "../types";
import { prepareAxes } from "./prepareComparisonData";

export function prepareAnalysisData(
  data: ComparisonChartResponse[],
  property: AnalysisDataMode
) {
  switch (property) {
    case "Price": {
      return {
        label: prepareAxes(data[0]["prices"]).x,
        values: data.map((series) => prepareAxes(series["prices"]).y),
      };
    }
    case "Market Cap": {
      return {
        label: prepareAxes(data[0]["market_caps"]).x,
        values: data.map((series) => prepareAxes(series["market_caps"]).y),
      };
    }
    case "Total Volume": {
      return {
        label: prepareAxes(data[0]["total_volumes"]).x,
        values: data.map((series) => prepareAxes(series["total_volumes"]).y),
      };
    }
    case "Rate of Return": {
      return {
        label: prepareAxes(data[0]["prices"]).x,
        values: data.map((series) => {
          const initSeries = prepareAxes(series["prices"]).y;
          const baseValue = initSeries[0];
          return initSeries.map((currentValue) =>
            getRateOfReturn(baseValue, currentValue)
          );
        }),
      };
    }
  }
}

/**
 * https://www.investopedia.com/terms/r/rateofreturn.asp
 */
function getRateOfReturn(init: number, current: number) {
  return ((current - init) * 100) / init;
}
