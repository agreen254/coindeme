"use client";

import { motion } from "framer-motion";
import { useClickAway } from "@uidotdev/usehooks";
import { useSearchQueryActions } from "@/hooks/useSearch";
import { useDropdownContext, useResetDropdown } from "@/hooks/useDropdown";

import { AnimatePresence } from "framer-motion";

type Props = {
  children: React.ReactNode;
};

const SearchResultsMenu = ({ children }: Props) => {
  const isVisible = useDropdownContext((s) => s.menuIsVisible);
  const { setQuery } = useSearchQueryActions();
  const resetMenu = useResetDropdown();

  const resetBarAndMenu = () => {
    setQuery("");
    resetMenu();
  };

  const clickAwayRef: React.MutableRefObject<HTMLDivElement> = useClickAway(
    () => {
      resetBarAndMenu();
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
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchResultsMenu;
