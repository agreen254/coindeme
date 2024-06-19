import { type ChartData } from "chart.js";
import { Line } from "react-chartjs-2";
import "chartjs-adapter-date-fns";

import {
  AnalysisDataMode,
  AnalysisSeries,
  ComparisonChartResponse,
  Currency,
  ThemeType,
} from "@/utils/types";
import { chartColorSets } from "@/utils/comparisonChartHelpers/compareGeneralHelpers";
import { getOptions } from "@/utils/comparisonChartHelpers/analysisHelpers";
import { prepareAnalysisData } from "@/utils/comparisonChartHelpers/prepareAnalysisData";

type Props = {
  series: AnalysisSeries[];
  rawData: ComparisonChartResponse[];
  mode: AnalysisDataMode;
  currency: Currency;
  theme: ThemeType;
  timeLength: number;
};

const AnalysisChart = ({
  series,
  rawData,
  mode,
  currency,
  theme,
  timeLength,
}: Props) => {
  const { label, values } = prepareAnalysisData(rawData, mode);

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
        series,
        mode
      )}
    />
  );
};

export default AnalysisChart;
