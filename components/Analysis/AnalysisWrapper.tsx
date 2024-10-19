"use client";

import { ErrorBoundary } from "react-error-boundary";

import { cn } from "@/utils/cn";
import { useAnalysisChartQueries } from "@/hooks/useAnalysisChartQueries";

import AnalysisChart from "./AnalysisChart";
import AnalysisLegend from "./AnalysisLegend/AnalysisLegend";
import AnalysisViewSelector from "./AnalysisSelectors/AnalysisViewSelector";
import AnalysisDataSelector from "./AnalysisSelectors/AnalysisDataSelector";
import AnalysisDecimationSelector from "./AnalysisSelectors/AnalysisDecimationSelector";
import AnalysisTimeSelector from "./AnalysisSelectors/AnalysisTimeSelector";
import Loader from "../Loader";
import Panel from "../Theme/Panel";

const AnalysisWrapper = () => {
  const responses = useAnalysisChartQueries();
  const someLoading = responses.some((r) => r.isPending);

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <Panel
        className={cn(
          "w-[90vw] screen-xl:w-table-xl relative p-2 pt-4 screen-sm:p-4 screen-md:p-6 mb-[20vh]"
        )}
      >
        <ErrorBoundary
          fallback={
            <p className="text-center text-destructive text-2xl">
              Failed to load the analysis chart.
            </p>
          }
        >
          {someLoading ? (
            <div className="w-full grid grid-cols-1 place-items-center aspect-square screen-sm:aspect-[5/4] screen-md:aspect-[8/5] screen-xl:aspect-[16/7] mb-8">
              <Loader />
            </div>
          ) : (
            <AnalysisChart
              rawData={responses.filter((r) => r.data).map((r) => r.data!)}
            />
          )}
          <div className="grid grid-cols-1 screen-lg:grid-cols-2 screen-xl:gap-x-4 gap-y-12 mb-12">
            <div>
              <AnalysisLegend />
            </div>
            <div className="grid screen-xs:grid-cols-2 screen-xl:grid-cols-4 ml-8 gap-y-4">
              <AnalysisViewSelector />
              <AnalysisDecimationSelector />
              <AnalysisTimeSelector />
              <AnalysisDataSelector />
            </div>
          </div>
        </ErrorBoundary>
      </Panel>
    </div>
  );
};

export default AnalysisWrapper;
