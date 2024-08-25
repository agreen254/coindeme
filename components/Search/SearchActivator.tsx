"use client";

import { ChangeEvent } from "react";
import type { SearchResultWrapper } from "@/utils/types";

import { forwardRef, type ForwardedRef } from "react";
import { useRouter } from "next/navigation";
import { useSearchQueryActions, useSearchQuery } from "@/hooks/useSearch";
import { useDropdownSettersFromId } from "@/hooks/useDropdownStore";
import { useSearchDropdownKeyEvents } from "@/hooks/useDropdownSearchKeyEvents";

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

    const { setIsVisible } = useDropdownSettersFromId(dropdownId);

    const handleSearchKeyEvents = useSearchDropdownKeyEvents(
      dropdownId,
      searchResults,
      setQuery,
      router
    );

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
        placeholder={props.disabled ? "" : "Search"}
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
