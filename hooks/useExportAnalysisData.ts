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
 * Relevant docs for exporting excel data:
 *
 * https://docs.sheetjs.com/docs/getting-started/examples/export/
 *
 * https://docs.sheetjs.com/docs/demos/frontend/react/
 */
export const useExportAnalysisData = (
  data: ReturnType<typeof prepareAnalysisData>,
  series: AnalysisSeries[],
  mode: AnalysisDataMode,
  view: AnalysisView,
  timeLength: number,
  currency: Currency
) => {
  return useCallback(
    (extension: string) => {
      switch (extension) {
        case "xlsx": {
          exportAsXLSX(data, series, mode, view, timeLength, currency);
          return;
        }
        case "csv": {
          exportAsCSV(data, series, mode, view, timeLength, currency);
          return;
        }
        default: {
          return;
        }
      }
    },
    [data, series, mode, view, timeLength, currency]
  );
};

function exportAsXLSX(
  data: ReturnType<typeof prepareAnalysisData>,
  series: AnalysisSeries[],
  mode: AnalysisDataMode,
  view: AnalysisView,
  timeLength: number,
  currency: Currency
) {
  const { label, values } = data;

  const workbook = utils.book_new();
  const workbookTitle = titleTextCallback(mode, view, currency);

  const worksheetData = getWorksheetDataXLSX(label, values, series);
  const worksheet = utils.json_to_sheet(worksheetData);

  const coinNames = series.map((s) => s.name);
  const filename = getFilename(
    coinNames,
    mode,
    view,
    timeLength,
    "xlsx",
    currency
  );

  utils.book_append_sheet(workbook, worksheet, workbookTitle);
  writeFileXLSX(workbook, filename, { compression: true });
}

function getWorksheetDataXLSX(
  unixTimestamps: number[],
  values: number[][],
  series: AnalysisSeries[]
) {
  return unixTimestamps
    .map((stamp) => fromUnixTime(stamp / 1000))
    .map((time, dataIdx) => {
      const namedValues = series.reduce(
        (valuePairs, currentSeries, seriesIdx) => {
          return {
            ...valuePairs,
            [currentSeries.name]: values[seriesIdx][dataIdx],
          };
        },
        {}
      );

      // [{timestamp: ___, bitcoin: ___, ethereum: ___}, ...]
      return {
        timestamp: time.toLocaleString("en-US", {
          dateStyle: "short",
          timeStyle: "short",
        }),
        ...namedValues,
      };
    });
}

/**
 * https://stackoverflow.com/questions/14964035/how-to-export-javascript-array-info-to-csv-on-client-side
 *
 * see: kolypto's answer
 */
function exportAsCSV(
  data: ReturnType<typeof prepareAnalysisData>,
  series: AnalysisSeries[],
  mode: AnalysisDataMode,
  view: AnalysisView,
  timeLength: number,
  currency: Currency
) {
  const { label, values } = data;

  const coinNames = series.map((s) => s.name);
  const timestamps = label.map((stamp) =>
    fromUnixTime(stamp / 1000)
      .toLocaleString("en-US", { dateStyle: "short", timeStyle: "short" })
      .replaceAll(",", "")
  );

  const csvColumnData = [timestamps, ...values];
  const csvColumnHeaders = ["timestamps", ...coinNames];

  const csvData = getDataCSV(csvColumnHeaders, csvColumnData);
  const filename = getFilename(
    coinNames,
    mode,
    view,
    timeLength,
    "csv",
    currency
  );

  const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);

  const downloadLink = document.createElement("a");
  downloadLink.href = url;
  downloadLink.setAttribute("download", filename);
  downloadLink.click();

  // clean up
  downloadLink.remove();
  URL.revokeObjectURL(url);
}

function getDataCSV(headers: string[], values: (string | number)[][]) {
  /**
   * Transpose the array to stack the data vertically instead of horizontally.
   * This is necessary to properly stack the values underneath the headers.
   * The sheets library used for xlsx exporting does this automatically for us,
   * but it is necessary to do for manual csv exporting.
   *
   * Have: [
   *   [1, 2, 3, 4, 5],
   *   [1, 2, 3, 4, 5],
   *   [1, 2, 3, 4, 5]
   * ]
   *
   * Want: [
   *   [1, 1, 1],
   *   [2, 2, 2],
   *   [3, 3, 3],
   *   [4, 4, 4],
   *   [5, 5, 5]
   * ]
   *
   * https://stackoverflow.com/questions/17428587/transposing-a-2d-array-in-javascript
   */
  const transposedValues = values[0].map((_, rowIndex) =>
    values.map((row) => row[rowIndex])
  );
  const dataAsArray = [headers, ...transposedValues];

  /**
   * Turn array into a csv-compatible string.
   *
   * Each value needs to be surrounded in double quotes and delimited with a comma.
   * Lines are separated with a carriage return (\r used for Windows compatability) and a newline character.
   */
  return dataAsArray
    .map((row) =>
      row
        .map(String)
        .map((value) => `"${value}"`)
        .join(",")
    )
    .join("\r\n");
}

function getFilename(
  coinNames: string[],
  mode: AnalysisDataMode,
  view: AnalysisView,
  timeLength: number,
  extension: string,
  currency: Currency
) {
  const currencySaveFormat = mode === "Rate of Return" ? "" : currency;
  const viewSaveFormat = view.toLowerCase();
  const modeSaveFormat = mode.toLowerCase().split(" ").join("-");
  const namesSaveFormat = coinNames.map((n) =>
    n.toLowerCase().split(" ").join("")
  );
  const timeLengthSaveFormat = timesMap.get(String(timeLength));
  const dateSaveFormat = new Date().toLocaleDateString("en-US", {
    dateStyle: "short",
  });

  return (
    [
      ...namesSaveFormat,
      modeSaveFormat,
      currencySaveFormat,
      viewSaveFormat,
      timeLengthSaveFormat,
      dateSaveFormat,
    ].join("-") +
    "." +
    extension
  );
}
