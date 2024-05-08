import { Line } from "react-chartjs-2";
import type { ChartData } from "chart.js";

import type { ComparisonChartResponse, CoinItems } from "@/utils/types";
import { analysisDataParser } from "@/utils/analysisDataParser";
import { getOptions } from "@/utils/analysisChartOptions";
import { useAnalysisCriteria } from "@/hooks/useAnalysis";
import { useAnalysisYScale } from "@/hooks/useAnalysis";
import { useUserCurrencySetting } from "@/hooks/useUserSettings";
import { chartColorSets } from "@/utils/comparisonChartHelpers/compareGeneralHelpers";

type Props = {
  data: ComparisonChartResponse[];
  coins: CoinItems;
};

const AnalysisChart = ({ data, coins }: Props) => {
  const currency = useUserCurrencySetting();
  const criteria = useAnalysisCriteria();
  const coinNames = coins.flatMap((c) => (c.name ? [c.name] : []));

  const isLog = useAnalysisYScale() === "logarithmic";
  const datasets = analysisDataParser(data, criteria, isLog);

  const chartData: ChartData<"line"> = {
    labels: data[0].prices.map((p) => p[0]),
    datasets: datasets.map((set, idx) => ({
      borderColor: chartColorSets[idx].startColor.hex,
      data: set,
    })),
  };

  return <Line data={chartData} options={getOptions(currency, 7, coinNames)} />;
};

export default AnalysisChart;
