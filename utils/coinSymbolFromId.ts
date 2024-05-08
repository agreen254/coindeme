import { CoinItems } from "./types";

export function coinSymbolFromId(id: string, targets: CoinItems | undefined) {
  if (!targets) return "";

  const target = targets.find((target) => target.id === id);
  return target ? target.symbol : "";
}
