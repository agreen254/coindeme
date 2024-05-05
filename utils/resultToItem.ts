import { SearchItem, SearchResultWrapper } from "./types";

export function resultToItem(wrapper: SearchResultWrapper): SearchItem {
  const isNameMatch = wrapper.kind === "name";
  const name = isNameMatch ? wrapper.result.target : wrapper.otherText;
  const symbol = isNameMatch ? wrapper.otherText : wrapper.result.target;

  return {
    id: wrapper.id,
    name: name,
    symbol: symbol,
  };
}
