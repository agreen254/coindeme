import { Dataset } from "./types";

export function unwrapDataset(data: (number | null)[][]): Dataset {
  return data.reduce(
    (dataset: Dataset, currentValues) => {
      return {
        x: [...dataset.x, currentValues[0] ?? 0],
        y: [...dataset.y, currentValues[1] ?? 0],
      };
    },
    { x: [], y: [] }
  );
}
