import type {
  ComparisonChartResponse,
  ComparisonData,
  Dataset,
} from "../types";

import { decimateData } from "../decimateData";
import { unwrapDataset } from "../unwrapDataset";

export function prepareAxes(data: (number | null)[][]): Dataset {
  const decimatedData = decimateData(data);
  return unwrapDataset(decimatedData);
}

export function prepareComparisonData(
  data: ComparisonChartResponse[],
  property: keyof ComparisonChartResponse
) {
  // use the decimated x-values of the first dataset for all of them
  const label = prepareAxes(data[0][property]).x;

  const values = data.map((dataset) => prepareAxes(dataset[property]).y);

  const logThreshold = 50;
  const min = Math.min(...values.flat());
  const max = Math.max(...values.flat());

  return <ComparisonData>{
    label: label,
    values: values,
  };
}
