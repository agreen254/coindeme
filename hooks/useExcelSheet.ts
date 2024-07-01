import { useCallback } from "react";
import { utils, writeFileXLSX } from "xlsx";
import { fromUnixTime } from "date-fns";

import {
  AnalysisDataMode,
  AnalysisSeries,
  AnalysisView,
  Currency,
} from "@/utils/types";
import { titleTextCallback } from "@/utils/comparisonChartHelpers/analysisHelpers";
import { prepareAnalysisData } from "@/utils/comparisonChartHelpers/prepareAnalysisData";
import { reverseTimeSelectorsMap as timesMap } from "@/utils/maps";

/**
 * Relevant docs for exporting data:
 *
 * https://docs.sheetjs.com/docs/getting-started/examples/export/
 *
 * https://docs.sheetjs.com/docs/demos/frontend/react/
 */
export const useExcelSheet = (
  data: ReturnType<typeof prepareAnalysisData>,
  series: AnalysisSeries[],
  mode: AnalysisDataMode,
  view: AnalysisView,
  timeLength: number,
  currency: Currency
) => {
  return useCallback(() => {
    const { label, values } = data;

    const workbook = utils.book_new();
    const workbookTitle = titleTextCallback(mode, view, currency);

    const worksheetData = getWorksheetData(label, values, series);
    const worksheet = utils.json_to_sheet(worksheetData);

    const coinNames = series.map((s) => s.name);
    const filename = getFilename(coinNames, mode, view, timeLength, currency);

    utils.book_append_sheet(workbook, worksheet, workbookTitle);
    writeFileXLSX(workbook, filename, { compression: true });
  }, [data, series, mode, view, currency]);
};

function getWorksheetData(
  unixTimestamps: number[],
  values: number[][],
  series: AnalysisSeries[]
) {
  return unixTimestamps
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
}

function getFilename(
  coinNames: string[],
  mode: AnalysisDataMode,
  view: AnalysisView,
  timeLength: number,
  currency: Currency
) {
  const viewSaveFormat = view.toLowerCase();
  const modeSaveFormat = mode.toLowerCase().split(" ").join("-");
  const namesSaveFormat = coinNames.map((n) =>
    n.toLowerCase().split(" ").join()
  );
  const timeLengthSaveFormat = timesMap.get(String(timeLength));
  const dateSaveFormat = new Date().toLocaleDateString("en-US", {
    dateStyle: "short",
  });

  return (
    [
      ...namesSaveFormat,
      currency,
      modeSaveFormat,
      viewSaveFormat,
      timeLengthSaveFormat,
      dateSaveFormat,
    ].join("-") + ".xlsx"
  );
}
