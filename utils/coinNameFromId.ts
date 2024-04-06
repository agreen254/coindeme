import { SearchTargets } from "./types";

export function coinNameFromId(id: string, targets: SearchTargets | undefined) {
  if (!targets) return "";

  const target = targets.find((target) => target.id === id);
  return target ? target.name : "";
}
