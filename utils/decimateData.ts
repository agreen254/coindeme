import { decimationThreshold } from "./comparisonChartHelpers/compareGeneralHelpers";
import { largestTriangleThreeBuckets } from "./comparisonChartHelpers/LTTB";

export function decimateData(data: (number | null)[][]): (number | null)[][] {
  if (data.length > decimationThreshold) {
    return largestTriangleThreeBuckets(data);
  } else {
    return data;
  }
}
