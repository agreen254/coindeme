import { type ChartData } from "chart.js";
import { Line } from "react-chartjs-2";

import {
  AnalysisDataMode,
  AnalysisScale,
  AnalysisSeries,
  ComparisonChartResponse,
  Currency,
  ThemeType,
} from "@/utils/types";
import { chartColorSets } from "@/utils/comparisonChartHelpers/compareGeneralHelpers";
import { getOptions } from "@/utils/comparisonChartHelpers/comparePriceHelpers";
import { prepareComparisonData } from "@/utils/comparisonChartHelpers/prepareComparisonData";

type Props = {
  series: AnalysisSeries[];
  rawData: ComparisonChartResponse[];
  mode: AnalysisDataMode;
  scale: AnalysisScale;
  currency: Currency;
  theme: ThemeType;
  timeLength: number;
};

const AnalysisChart = ({
  series,
  rawData,
  //   mode,
  //   scale,
  currency,
  theme,
  timeLength,
}: Props) => {
  const { label, values } = prepareComparisonData(rawData, "prices");

  const data: ChartData<"line"> = {
    labels: label,
    datasets: rawData.map((_, idx) => {
      return {
        backgroundColor: "transparent",
        borderColor: chartColorSets[idx].startColor.hex,
        data: values[idx],
        label: series[idx].name,
        pointHoverBorderColor: chartColorSets[idx].highlightColor.hex,
      };
    }),
  };

  return (
    <Line
      data={data}
      options={getOptions(
        currency,
        timeLength,
        series.map((s) => s.name),
        theme
      )}
    />
  );
};

export default AnalysisChart;
