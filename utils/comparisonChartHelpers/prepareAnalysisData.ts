import {
  AnalysisDataMode,
  AnalysisView,
  ComparisonChartResponse,
} from "../types";
import { prepareAxes } from "./prepareComparisonData";

export function prepareAnalysisData(
  data: ComparisonChartResponse[],
  property: AnalysisDataMode,
  decimationThreshold: number,
  view: AnalysisView
) {
  const getLabels = (field: keyof ComparisonChartResponse) =>
    prepareAxes(data[0][field], decimationThreshold).x;
  const getValues = (field: keyof ComparisonChartResponse) =>
    data.map((series) => {
      const seriesValues = prepareAxes(series[field], decimationThreshold).y;
      return view === "Logarithmic"
        ? seriesValues.map((v) => Math.log10(v))
        : seriesValues;
    });
  const getLabelsAndValues = (field: keyof ComparisonChartResponse) => {
    return {
      label: getLabels(field),
      values: getValues(field),
    };
  };

  switch (property) {
    case "Price": {
      return getLabelsAndValues("prices");
    }
    case "Market Cap": {
      return getLabelsAndValues("market_caps");
    }
    case "Total Volume": {
      return getLabelsAndValues("total_volumes");
    }
    case "Rate of Return": {
      return {
        label: getLabels("prices"),
        values: data.map((series) => {
          const initSeries = prepareAxes(
            series["prices"],
            decimationThreshold
          ).y;
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
