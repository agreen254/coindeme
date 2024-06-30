"use client";

import { type ChartData } from "chart.js";
import { Line } from "react-chartjs-2";
import "chartjs-adapter-date-fns";

import { ComparisonChartResponse } from "@/utils/types";
import { chartColorSets } from "@/utils/comparisonChartHelpers/compareGeneralHelpers";
import { getOptions } from "@/utils/comparisonChartHelpers/analysisHelpers";
import { prepareAnalysisData } from "@/utils/comparisonChartHelpers/prepareAnalysisData";
import {
  useAnalysisDataMode,
  useAnalysisDecimationThreshold,
  useAnalysisSeries,
  useAnalysisTimeLength,
  useAnalysisView,
} from "@/hooks/useAnalysis";
import { useUserCurrencySetting } from "@/hooks/useUserSettings";
import { useThemeTyped } from "@/hooks/useThemeTyped";
import { useExcelSheet } from "@/hooks/useExcelSheet";

type Props = {
  rawData: ComparisonChartResponse[];
};

const AnalysisChart = ({ rawData }: Props) => {
  const series = useAnalysisSeries();
  const names = series.map((s) => s.name);
  const mode = useAnalysisDataMode();
  const currency = useUserCurrencySetting();
  const theme = useThemeTyped();
  const timeLength = useAnalysisTimeLength();
  const decimationThreshold = useAnalysisDecimationThreshold();
  const view = useAnalysisView();

  const preparedData = prepareAnalysisData(
    rawData,
    mode,
    decimationThreshold,
    view
  );
  const { label, values } = preparedData;

  const exportData = useExcelSheet(preparedData, series, mode, view, currency);

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
    <>
      <button onClick={exportData}>Export Data</button>
      <Line
        data={data}
        options={getOptions(
          currency,
          timeLength,
          names,
          theme,
          series,
          mode,
          view
        )}
      />
    </>
  );
};

export default AnalysisChart;
