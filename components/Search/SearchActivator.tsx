"use client";

import { ChangeEvent, KeyboardEvent } from "react";
import type { SearchResultWrapper } from "@/utils/types";

import { forwardRef, type ForwardedRef } from "react";
import { useRouter } from "next/navigation";
import { useSearchQueryActions, useSearchQuery } from "@/hooks/useSearch";
import {
  useDropdownResetFromId,
  useDropdownSettersFromId,
  useDropdownUnitFromId,
} from "@/hooks/useDropdownStore";

interface SearchActivatorProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  searchResults: SearchResultWrapper[];
  dropdownId: string;
  localQuery?: string;
  setLocalQuery?: (_q: string) => void;
}

/**
 * Wrapper for an input element that handles any coin searching functionality.
 */
const SearchActivator = forwardRef(
  (
    {
      dropdownId,
      searchResults,
      localQuery,
      setLocalQuery,
      ...props
    }: SearchActivatorProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const router = useRouter();

    const navQuery = useSearchQuery();
    const navSetQuery = useSearchQueryActions().setQuery;

    const isUsingLocal =
      localQuery !== undefined && setLocalQuery !== undefined;
    const [query, setQuery] = isUsingLocal
      ? [localQuery, setLocalQuery]
      : [navQuery, navSetQuery];

    const { setIsUsingMouse, setIsVisible, setSelectedIndex } =
      useDropdownSettersFromId(dropdownId);
    const { selectedIndex } = useDropdownUnitFromId(dropdownId);

    const resetDropdown = useDropdownResetFromId(dropdownId);
    const resetSearch = () => {
      setQuery("");
      resetDropdown();
    };

    const handleSearchKeyEvents = (e: KeyboardEvent<HTMLInputElement>) => {
      switch (e.key) {
        case "ArrowUp": {
          // stop the default event of jumping to the front/back of input text
          e.preventDefault();
          setIsUsingMouse(false);
          setSelectedIndex(
            selectedIndex > 0 ? selectedIndex - 1 : searchResults.length - 1
          );
          break;
        }
        case "ArrowDown": {
          e.preventDefault();
          setIsUsingMouse(false);
          setSelectedIndex(
            selectedIndex < searchResults.length - 1 ? selectedIndex + 1 : 0
          );
          break;
        }
        case "Enter": {
          e.preventDefault();
          // if there are no results nothing will happen,
          // otherwise if user hits enter with nothing selected then default to the first result
          if (
            searchResults.length > 0 &&
            searchResults.length > selectedIndex
          ) {
            router.push(
              selectedIndex === -1
                ? `/coin/${searchResults[0].id}`
                : `/coin/${searchResults[selectedIndex].id}`
            );
            resetSearch();
          }
          break;
        }
        case "Escape": {
          resetSearch();
          break;
        }
      }
    };

    const handleUpdateQuery = (e: ChangeEvent<HTMLInputElement>) => {
      setQuery(e.currentTarget.value);
      if (e.currentTarget.value !== "") {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    return (
      <input
        ref={ref}
        type="search"
        placeholder={props.disabled ? "" : "Search Coins"}
        value={props.value || query}
        onChange={(e) => handleUpdateQuery(e)}
        onKeyDown={(e) => handleSearchKeyEvents(e)}
        {...props}
      />
    );
  }
);

export default SearchActivator;

SearchActivator.displayName = "SearchActivator";
