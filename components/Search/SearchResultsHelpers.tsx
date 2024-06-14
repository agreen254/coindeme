import type { SearchResultWrapper } from "@/utils/types";

import fuzzysort from "fuzzysort";

const HighlightMatchedChars = (result: Fuzzysort.Result) => {
  try {
    return fuzzysort.highlight(result, (m, i) => (
      <span
        key={result + "highlight" + i}
        className="font-bold text-menu-highlight"
      >
        {m}
      </span>
    ));
  } catch {
    return result.target;
  }
};

export const HandleNameMatch = (wrapper: SearchResultWrapper) => {
  const symbol = wrapper.otherText;
  return (
    <span>
      <span>{HighlightMatchedChars(wrapper.result)} </span>
      <span className="text-zinc-500 dark:text-zinc-300 font-semibold">{symbol}</span>
    </span>
  );
};

export const HandleSymbolMatch = (wrapper: SearchResultWrapper) => {
  const name = wrapper.otherText;
  return (
    <span>
      <span>{name} </span>
      <span className="text-zinc-500 dark:text-zinc-300 font-semibold">
        {HighlightMatchedChars(wrapper.result)}
      </span>
    </span>
  );
};
