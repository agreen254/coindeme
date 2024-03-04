import { Dataset } from "./types";

export function unwrapDataset(data: (number | null)[][]): Dataset {
  let result: Dataset = { x: [], y: [] };
  for (let i = 0; i < data.length; i++) {
    result.x.push(data[i][0] ?? 0);
    result.y.push(data[i][1] ?? 0);
  }
  return result;
}
