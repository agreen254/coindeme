import type { SearchResultWrapper } from "@/utils/types";

import fuzzysort from "fuzzysort";
import { motion } from "framer-motion";

import { AnimatePresence } from "framer-motion";
import Link from "next/link";

type Props = {
  results: SearchResultWrapper[];
  searchText: string;
  setSearchText: (text: string) => void;
};

const SearchResultsMenu = ({ results, searchText, setSearchText }: Props) => {
  const isVisible = results.length !== 0 || searchText !== "";

  const clearSearchText = () => setSearchText("");

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
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="searchResults"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="w-[320px] max-h-[240px] overflow-y-auto bg-zinc-800 border border-stone-300 font-normal rounded-md text-zinc-200 absolute top-[52px] z-10"
        >
          {results.map((wrapper) => (
            <Link
              href={`/coin/${wrapper.id}`}
              onClick={clearSearchText}
              key={wrapper.result.target + "searchResult"}
              className="indent-3 hover:bg-zinc-600 py-1 block"
            >
              {wrapper.kind === "symbol"
                ? handleSymbolMatch(wrapper)
                : handleNameMatch(wrapper)}
            </Link>
          ))}
          {results.length === 0 && (
            <p className="italic text-muted-foreground font-medium py-1 indent-3">
              No results found.
            </p>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchResultsMenu;
