import fuzzysort from "fuzzysort";
import type { SearchResultWrapper } from "@/utils/types";

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
    return <span>{result.target}</span>;
  }
};

export const HandleNameMatch = (wrapper: SearchResultWrapper) => {
  const symbol = wrapper.otherText;
  return (
    <span>
      <span>{HighlightMatchedChars(wrapper.result)} </span>
      <span className="text-zinc-500 dark:text-zinc-300 font-semibold">
        {symbol}
      </span>
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

export const HighlightedSearchResult = ({
  wrapper,
}: {
  wrapper: SearchResultWrapper;
}) => {
  const kind = wrapper.kind;
  if (kind === "name") return HandleNameMatch(wrapper);
  else if (kind === "symbol") return HandleSymbolMatch(wrapper);
  else throw new Error("Invalid match specifier provided.");
};
