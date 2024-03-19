"use client";

import { ChangeEvent, KeyboardEvent } from "react";
import type { SearchResultWrapper } from "@/utils/types";

import {
  useClearBarAndMenu,
  useSearchBarActions,
  useSearchBarQuery,
  useSearchMenuSelectedIndex,
} from "@/hooks/useSearchBar";
import { useRouter } from "next/navigation";

import SearchIcon from "@/Icons/Search";

type Props = {
  disabled: boolean;
  results: SearchResultWrapper[];
};

const SearchBar = ({ disabled, results }: Props) => {
  const clearBarAndMenu = useClearBarAndMenu();
  const query = useSearchBarQuery();
  const router = useRouter();
  const selectedIndex = useSearchMenuSelectedIndex();

  const { setIsUsingMouse, setMenuIsVisible, setMenuSelectedIndex, setQuery } =
    useSearchBarActions();

  const handleSearchKeyEvents = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      // stop the default event of jumping to the front/back of input text
      e.preventDefault();
      setIsUsingMouse(false);
      setMenuSelectedIndex(
        selectedIndex > 0 ? selectedIndex - 1 : results.length - 1
      );
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setIsUsingMouse(false);
      setMenuSelectedIndex(
        selectedIndex < results.length - 1 ? selectedIndex + 1 : 0
      );
    }
    if (e.key === "Enter") {
      e.preventDefault();
      router.push(`/coin/${results[selectedIndex].id}`);
      clearBarAndMenu();
    }
    if (e.key === "Escape") {
      e.preventDefault();
      clearBarAndMenu();
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

export default SearchBar;
