"use client";

import { ChangeEvent, KeyboardEvent } from "react";
import type { SearchResultWrapper } from "@/utils/types";

import { useRouter } from "next/navigation";
import { useDropdownStore, useDropdownReset } from "@/hooks/useDropdownStore";
import { useSearchQueryActions, useSearchQuery } from "@/hooks/useSearch";

import SearchIcon from "@/Icons/Search";

type Props = {
  disabled: boolean;
  results: SearchResultWrapper[];
};

const SearchActivator = ({ disabled, results }: Props) => {
  const query = useSearchQuery();
  const router = useRouter();
  const { setQuery } = useSearchQueryActions();
  const setIsUsingMouse = useDropdownStore((s) => s.setIsUsingMouse);
  const [selectedIndex, setSelectedIndex] = [
    useDropdownStore((s) => s.selectedIndex),
    useDropdownStore((s) => s.setSelectedIndex),
  ];
  const setMenuIsVisible = useDropdownStore((s) => s.setIsVisible);

  const resetMenu = useDropdownReset();
  const resetBarAndMenu = () => {
    setQuery("");
    resetMenu();
  };

  const handleSearchKeyEvents = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      // stop the default event of jumping to the front/back of input text
      e.preventDefault();
      setIsUsingMouse(false);
      setSelectedIndex(
        selectedIndex > 0 ? selectedIndex - 1 : results.length - 1
      );
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setIsUsingMouse(false);
      setSelectedIndex(
        selectedIndex < results.length - 1 ? selectedIndex + 1 : 0
      );
    }

    if (e.key === "Enter") {
      e.preventDefault();
      // if there are no results nothing will happen,
      // otherwise if user hits enter with nothing selected then default to the first result
      if (results.length > 0) {
        router.push(
          selectedIndex === -1
            ? `/coin/${results[0].id}`
            : `/coin/${results[selectedIndex].id}`
        );
        resetBarAndMenu();
      }
    }

    if (e.key === "Escape") {
      e.preventDefault();
      resetBarAndMenu();
    }
  };

  const handleUpdateQuery = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.currentTarget.value);
    if (e.currentTarget.value !== "") {
      setMenuIsVisible(true);
    } else {
      setMenuIsVisible(false);
    }
  };

  return (
    <>
      <input
        type="search"
        placeholder={disabled ? "" : "Search..."}
        value={query}
        disabled={disabled}
        className="pr-5 pl-12 py-[9px] w-[320px] rounded-md bg-white/10 focus:outline-none focus:ring-[1.5px] focus:ring-white/50 shadow-[0_-0.5px_0_1px] shadow-zinc-500/60 disabled:cursor-not-allowed"
        onChange={(e) => handleUpdateQuery(e)}
        onKeyDown={(e) => handleSearchKeyEvents(e)}
      />
      <SearchIcon className="w-[18px] h-[18px] inline absolute left-4 top-[12px]" />
    </>
  );
};

export default SearchActivator;
