import { type ChartData } from "chart.js";
import { Line } from "react-chartjs-2";
import "chartjs-adapter-date-fns";

import {
  AnalysisDataMode,
  AnalysisScale,
  AnalysisSeries,
  ComparisonChartResponse,
  Currency,
  ThemeType,
} from "@/utils/types";
import { chartColorSets } from "@/utils/comparisonChartHelpers/compareGeneralHelpers";
import { getOptions } from "@/utils/comparisonChartHelpers/analysisHelpers";
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
  scale,
  currency,
  theme,
  timeLength,
}: Props) => {
  const { label, values } = prepareComparisonData(rawData, "prices");

  const data: ChartData<"line"> = {
    labels: label,
    datasets: values.map((val, idx) => {
      return {
        backgroundColor: "transparent",
        borderColor: chartColorSets[idx].startColor.hex,
        data: val,
        label: series[idx].name,
        pointHoverBorderColor: chartColorSets[idx].highlightColor.hex,
        yAxisID: series[idx].axis === "left" ? "y" : "y1",
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
        theme,
        scale,
        series
      )}
    />
  );
};

export default AnalysisChart;
