import { useCallback } from "react";
import { utils, writeFileXLSX } from "xlsx";
import { fromUnixTime } from "date-fns";
import { titleTextCallback } from "@/utils/comparisonChartHelpers/analysisHelpers";
import { prepareAnalysisData } from "@/utils/comparisonChartHelpers/prepareAnalysisData";
import {
  AnalysisDataMode,
  AnalysisSeries,
  AnalysisView,
  Currency,
} from "@/utils/types";

export const useExcelSheet = (
  data: ReturnType<typeof prepareAnalysisData>,
  series: AnalysisSeries[],
  mode: AnalysisDataMode,
  view: AnalysisView,
  currency: Currency
) => {
  return useCallback(() => {
    const { label: unixTimestamps, values } = data;

    const workbook = utils.book_new();
    const workbookTitle = titleTextCallback(mode, view, currency);

    const worksheetData = unixTimestamps
      .map((stamp) => fromUnixTime(stamp / 1000))
      .map((time, dataIdx) => {
        const namedValues = series.reduce((acc, curr, seriesIdx) => {
          return {
            ...acc,
            [curr.name]: values[seriesIdx][dataIdx],
          };
        }, {});

        // [{timestamp: ___, bitcoin: ___, ethereum: ___}, ...]
        return {
          timestamp: time.toISOString(),
          ...namedValues,
        };
      });

    const worksheet = utils.json_to_sheet(worksheetData);
    utils.book_append_sheet(workbook, worksheet, workbookTitle);
    writeFileXLSX(workbook, "data.xlsx", { compression: true });
  }, [data, series, mode, view, currency]);
};
