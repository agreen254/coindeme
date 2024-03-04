import type { Dataset } from "../types";

import { decimateData } from "../decimateData";
import { unwrapDataset } from "../unwrapDataset";

export function prepareComparisonChartAxes(
  data: (number | null)[][]
): Dataset {
  const decimatedData = decimateData(data);
  return unwrapDataset(decimatedData);
}
