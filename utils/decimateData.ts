import { DEFAULT_DECIMATION_THRESHOLD } from "@/validation/defaults";
import { largestTriangleThreeBuckets } from "./comparisonChartHelpers/LTTB";

export function decimateData(
  data: (number | null)[][],
  threshold: number = DEFAULT_DECIMATION_THRESHOLD
): (number | null)[][] {
  if (data.length > threshold) {
    return largestTriangleThreeBuckets(data, threshold);
  } else {
    return data;
  }
}
