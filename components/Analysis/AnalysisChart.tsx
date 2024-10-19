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
import { useExportAnalysisData } from "@/hooks/useExportAnalysisData";
import { useResponsiveChart } from "@/hooks/useResponsiveChart";

import AnalysisExportMenu from "./AnalysisExportMenu";

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
  const responsiveValues = useResponsiveChart();

  const preparedData = prepareAnalysisData(
    rawData,
    mode,
    decimationThreshold,
    view
  );
  const { label, values } = preparedData;

  const exportData = useExportAnalysisData(
    preparedData,
    series,
    mode,
    view,
    timeLength,
    currency
  );

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
      <div className="absolute top-3 right-3">
        <AnalysisExportMenu downloadCallback={exportData} />
      </div>
      <div className="w-full aspect-square screen-sm:aspect-[5/4] screen-md:aspect-[8/5] screen-xl:aspect-[16/7] mb-8">
        <div className="h-full">
          <Line
            data={data}
            options={getOptions(
              currency,
              timeLength,
              names,
              theme,
              series,
              mode,
              view,
              responsiveValues
            )}
          />
        </div>
      </div>
    </>
  );
};

export default AnalysisChart;
