import type {
  ComparisonChartResponse,
  ComparisonData,
  Dataset,
} from "../types";

import { DEFAULT_DECIMATION_THRESHOLD } from "@/validation/defaults";
import { decimateData } from "../decimateData";
import { unwrapDataset } from "../unwrapDataset";

export function prepareAxes(
  data: (number | null)[][],
  threshold: number
): Dataset {
  const decimatedData = decimateData(data, threshold);
  return unwrapDataset(decimatedData);
}

export function prepareComparisonData(
  data: ComparisonChartResponse[],
  property: keyof ComparisonChartResponse,
  threshold: number = DEFAULT_DECIMATION_THRESHOLD
) {
  // use the decimated x-values of the first dataset for all of them
  const label = prepareAxes(data[0][property], threshold).x;

  const values = data.map(
    (dataset) => prepareAxes(dataset[property], threshold).y,
    threshold
  );

  return <ComparisonData>{
    label: label,
    values: values,
  };
}
