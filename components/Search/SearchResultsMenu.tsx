"use client";

import type { SearchResultWrapper } from "@/utils/types";

import { motion } from "framer-motion";
import { useClickAway } from "@uidotdev/usehooks";
import {
  useClearBarAndMenu,
  useSearchMenuIsVisible,
} from "@/hooks/useSearchBar";
import React from "react";

import { AnimatePresence } from "framer-motion";
import SearchResultsMenuItem from "./SearchResultsMenuItem";

type Props = {
  results: SearchResultWrapper[];
};

const SearchResultsMenu = ({ results }: Props) => {
  const clearBarAndMenu = useClearBarAndMenu();
  const isVisible = useSearchMenuIsVisible();

  const clickAwayRef: React.MutableRefObject<HTMLDivElement> = useClickAway(
    () => {
      clearBarAndMenu();
    }
  );

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="searchResults"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          ref={clickAwayRef}
          transition={{ ease: "easeIn", duration: 0.2 }}
          className="w-[320px] max-h-[320px] overflow-y-auto bg-dropdown border border-stone-300 overscroll-contain font-normal rounded-md text-zinc-200 absolute top-[52px] z-10"
        >
          {results.map((wrapper, idx) => (
            <SearchResultsMenuItem
              key={wrapper.result.target + "searchResult"}
              wrapper={wrapper}
              idx={idx}
            />
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
