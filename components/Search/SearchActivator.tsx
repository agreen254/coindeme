"use client";

import { ChangeEvent } from "react";
import type { CustomKeyHandlers, SearchResultWrapper } from "@/utils/types";

import { forwardRef, type ForwardedRef } from "react";
import { useRouter } from "next/navigation";
import {
  useDropdownResetFromId,
  useDropdownSettersFromId,
  useDropdownUnitFromId,
} from "@/hooks/useDropdownStore";
import { useDropdownKeyEvents } from "@/hooks/useDropdownKeyEvents";
import { getAdjustedIdxAndId } from "@/utils/getSearchElements";

interface SearchActivatorProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  searchResults: SearchResultWrapper[];
  dropdownId: string;
  query: string;
  setQuery: (_q: string) => void;
}

/**
 * Wrapper for an input element that handles any coin searching functionality.
 */
const SearchActivator = forwardRef(
  (
    {
      dropdownId,
      searchResults,
      query,
      setQuery,
      ...props
    }: SearchActivatorProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const router = useRouter();

    const resetDropdown = useDropdownResetFromId(dropdownId);
    const resetDropdownAndQuery = () => {
      resetDropdown();
      setQuery("");
    };

    const { setIsVisible } = useDropdownSettersFromId(dropdownId);
    const { selectedIndex } = useDropdownUnitFromId(dropdownId);

    const numResults = searchResults.length;
    const customKeyHandlers: CustomKeyHandlers = {
      Enter: (e) => {
        e.preventDefault();
        if (numResults) {
          const { adjustedId } = getAdjustedIdxAndId(
            selectedIndex,
            searchResults
          );
          router.push(`/coin/${adjustedId}`);
          resetDropdownAndQuery();
        }
      },
      Escape: (_) => resetDropdownAndQuery(),
      Tab: (_) => resetDropdownAndQuery(),
    };

    const handleKeyDown = useDropdownKeyEvents(
      dropdownId,
      numResults,
      customKeyHandlers
    );

    const handleUpdateQuery = (e: ChangeEvent<HTMLInputElement>) => {
      setQuery(e.currentTarget.value);
      setIsVisible(e.currentTarget.value !== "");
    };

    return (
      <input
        ref={ref}
        type="search"
        placeholder={props.disabled ? "" : "Search"}
        value={props.value || query}
        onChange={handleUpdateQuery}
        onKeyDown={handleKeyDown}
        {...props}
      />
    );
  }
);

export default SearchActivator;

SearchActivator.displayName = "SearchActivator";
