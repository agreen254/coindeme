import { useAnalysisChartQueries } from "./useAnalysisChartQueries";

export const useAnalysisChartIsLoading = () =>
  useAnalysisChartQueries().some((res) => res.isPending);
