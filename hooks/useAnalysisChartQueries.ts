import { useAnalysisSeries } from "./useAnalysis";
import { useAnalysisTimeLength } from "./useAnalysis";
import { useComparisonChartQueries } from "./useComparisonChartQueries";
import { useUserCurrencySetting } from "./useUserSettings";

export const useAnalysisChartQueries = () => {
  const series = useAnalysisSeries();
  const timeLength = useAnalysisTimeLength();
  const currency = useUserCurrencySetting();

  return useComparisonChartQueries({
    ids: series.filter((s) => s.id).map((s) => s.id),
    currency: currency,
    days: String(timeLength),
  });
};
