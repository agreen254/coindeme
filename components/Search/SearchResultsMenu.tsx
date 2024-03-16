import type { SearchResultWrapper } from "@/utils/types";

import fuzzysort from "fuzzysort";

type Props = {
  results: SearchResultWrapper[];
  searchText: string;
};

const SearchResultsMenu = ({ results }: Props) => {
  const highlightMatchedChars = (result: Fuzzysort.Result) => {
    return fuzzysort.highlight(result, (m, i) => (
      <span key={result + "highlight" + i} className="font-bold text-[#4DFDFF]">
        {m}
      </span>
    ));
  };

  const handleNameMatch = (wrapper: SearchResultWrapper) => {
    const symbol = wrapper.otherText;
    return (
      <span>
        <span>{highlightMatchedChars(wrapper.result)} </span>
        <span className="text-zinc-300 font-semibold">{symbol}</span>
      </span>
    );
  };

  const handleSymbolMatch = (wrapper: SearchResultWrapper) => {
    const name = wrapper.otherText;
    return (
      <span>
        <span>{name} </span>
        <span className="text-zinc-300 font-semibold">
          {highlightMatchedChars(wrapper.result)}
        </span>
      </span>
    );
  };

  return (
    <div className="w-[320px] max-h-[240px] overflow-y-auto bg-white/10 font-normal rounded-md mt-2 text-zinc-200">
      {results.map((wrapper) => (
        <p
          key={wrapper.result.target + "searchResult"}
          className="indent-3 hover:bg-zinc-600 py-1"
        >
          {wrapper.kind === "symbol"
            ? handleSymbolMatch(wrapper)
            : handleNameMatch(wrapper)}
        </p>
      ))}
    </div>
  );
};

export default SearchResultsMenu;
