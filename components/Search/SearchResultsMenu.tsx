import type { SearchResultWrapper } from "@/utils/types";

import { cn } from "@/utils/cn";
import { motion } from "framer-motion";
import {
  useSearchBarActions,
  useSearchBarQuery,
  useSearchMenuSelectedIndex,
} from "@/hooks/useSearchBar";
import React from "react";

import { AnimatePresence } from "framer-motion";
import { HandleNameMatch, HandleSymbolMatch } from "./SearchResultsHelpers";
import Link from "next/link";

type Props = {
  results: SearchResultWrapper[];
};

const SearchResultsMenu = ({ results }: Props) => {
  const query = useSearchBarQuery();
  const selectedIndex = useSearchMenuSelectedIndex();
  const { setQuery, setMenuSelectedIndex } = useSearchBarActions();

  const activeSearchBar = results.length !== 0 || query !== "";

  const clearSearchText = () => setQuery("");

  // const ref: React.MutableRefObject<HTMLDivElement> = useClickAway(() => {
  //   setIsVisible(false);
  // });

  return (
    <AnimatePresence>
      {activeSearchBar && (
        <motion.div
          key="searchResults"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ ease: "easeIn", duration: 0.2 }}
          className="w-[320px] max-h-[240px] overflow-y-auto bg-[hsl(275,11%,15%)] border border-stone-300 font-normal rounded-md text-zinc-200 absolute top-[52px] z-10"
        >
          {results.map((wrapper, idx) => (
            <Link
              href={`/coin/${wrapper.id}`}
              onClick={clearSearchText}
              key={wrapper.result.target + "searchResult"}
              className={cn(
                "indent-3 py-1 block",
                idx === selectedIndex && "bg-zinc-600"
              )}
              onMouseEnter={() => setMenuSelectedIndex(idx)}
            >
              {wrapper.kind === "symbol"
                ? HandleSymbolMatch(wrapper)
                : HandleNameMatch(wrapper)}
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
