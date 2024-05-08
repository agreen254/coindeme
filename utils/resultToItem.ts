import { CoinItem, SearchResultWrapper } from "./types";

export function resultToItem(wrapper: SearchResultWrapper): CoinItem {
  const isNameMatch = wrapper.kind === "name";
  const name = isNameMatch ? wrapper.result.target : wrapper.otherText;
  const symbol = isNameMatch ? wrapper.otherText : wrapper.result.target;

  return {
    id: wrapper.id,
    name: name,
    symbol: symbol,
  };
}
